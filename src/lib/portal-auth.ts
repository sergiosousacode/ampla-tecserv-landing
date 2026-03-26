import bcrypt from "bcrypt";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole, UserStatus } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import {
  canAccessAdmin,
  getPortalHomeByRole,
} from "@/lib/portal-permissions";

export const PORTAL_SESSION_COOKIE = "ampla_portal_session";
const PORTAL_SESSION_MAX_AGE = 60 * 60 * 8;
const DUMMY_PASSWORD_HASH =
  "$2b$10$CwTycUXWue0Thq9StjUM0uJ8UQ4m4v1C7L1NVr7DiIP9N6byN1NsS";

interface PortalSessionPayload {
  userId: string;
  expiresAt: number;
}

function getPortalSessionSecret() {
  const secret = process.env.PORTAL_SESSION_SECRET?.trim();

  if (!secret) {
    throw new Error("PORTAL_SESSION_SECRET precisa estar configurado.");
  }

  if (process.env.NODE_ENV === "production" && secret.length < 32) {
    throw new Error(
      "PORTAL_SESSION_SECRET precisa ter pelo menos 32 caracteres em producao."
    );
  }

  return secret;
}

function encodeSessionPayload(payload: PortalSessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodeSessionPayload(value: string): PortalSessionPayload | null {
  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function signSessionValue(value: string) {
  return createHmac("sha256", getPortalSessionSecret())
    .update(value)
    .digest("base64url");
}

function createSignedSessionToken(userId: string) {
  const payload = encodeSessionPayload({
    userId,
    expiresAt: Date.now() + PORTAL_SESSION_MAX_AGE * 1000,
  });

  return `${payload}.${signSessionValue(payload)}`;
}

function verifySignedSessionToken(token: string) {
  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signSessionValue(payload);

  if (expectedSignature.length !== signature.length) {
    return null;
  }

  const isValidSignature = timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );

  if (!isValidSignature) {
    return null;
  }

  const sessionPayload = decodeSessionPayload(payload);

  if (
    !sessionPayload ||
    typeof sessionPayload.userId !== "string" ||
    typeof sessionPayload.expiresAt !== "number" ||
    sessionPayload.expiresAt <= Date.now()
  ) {
    return null;
  }

  return sessionPayload;
}

export async function validatePortalCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || user.status !== UserStatus.ACTIVE) {
    await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  return user;
}

export async function createPortalSession(userId: string) {
  const cookieStore = await cookies();
  const token = createSignedSessionToken(userId);

  cookieStore.set(PORTAL_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: PORTAL_SESSION_MAX_AGE,
  });
}

export async function clearPortalSession() {
  const cookieStore = await cookies();

  cookieStore.set(PORTAL_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  cookieStore.delete(PORTAL_SESSION_COOKIE);
}

export async function isPortalAuthenticated() {
  const cookieStore = await cookies();
  const current = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;

  if (!current) {
    return false;
  }

  const session = verifySignedSessionToken(current);

  if (!session) {
    await clearPortalSession();
    return false;
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, status: true },
  });

  return Boolean(user && user.status === UserStatus.ACTIVE);
}

export async function getPortalSessionUser() {
  const cookieStore = await cookies();
  const current = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;

  if (!current) {
    return null;
  }

  const session = verifySignedSessionToken(current);

  if (!session) {
    await clearPortalSession();
    return null;
  }

  const prisma = getPrisma();

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  if (!user) {
    await clearPortalSession();
    return null;
  }

  if (user.status !== UserStatus.ACTIVE) {
    await clearPortalSession();
    return null;
  }

  return user;
}

export function getPortalRedirectForUser(role: UserRole) {
  return getPortalHomeByRole(role);
}

export async function requirePortalAuth(allowedRoles?: UserRole[]) {
  const user = await getPortalSessionUser();

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    await clearPortalSession();
    redirect("/portal-servicos/login");
  }

  return user;
}

export async function requirePortalAdminAccess() {
  const user = await requirePortalAuth();

  if (!canAccessAdmin(user.role)) {
    redirect(getPortalRedirectForUser(user.role));
  }

  return user;
}

export async function requirePortalRole(role: UserRole) {
  return requirePortalAuth([role]);
}
