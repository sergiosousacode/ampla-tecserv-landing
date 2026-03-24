import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole, UserStatus } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";

export const PORTAL_SESSION_COOKIE = "ampla_portal_session";

function getPortalAuthConfig() {
  return {
    email: (
      process.env.PORTAL_ADMIN_EMAIL ||
      process.env.NEXT_PUBLIC_EMAIL ||
      "amplatecserv@gmail.com"
    )
      .trim()
      .toLowerCase(),
  };
}

export function getPortalAdminEmail() {
  return getPortalAuthConfig().email;
}

export async function validatePortalCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const { email: adminEmail } = getPortalAuthConfig();

  if (normalizedEmail !== adminEmail) {
    return null;
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (
    !user ||
    user.status !== UserStatus.ACTIVE ||
    user.role !== UserRole.ADMIN
  ) {
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

  cookieStore.set(PORTAL_SESSION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
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

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { id: current },
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

  const prisma = getPrisma();

  const user = await prisma.user.findUnique({
    where: { id: current },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  if (!user) {
    return null;
  }

  const { email: adminEmail } = getPortalAuthConfig();

  if (user.email.trim().toLowerCase() !== adminEmail) {
    return null;
  }

  return user;
}

export async function requirePortalAuth() {
  const user = await getPortalSessionUser();

  if (!user || user.status !== UserStatus.ACTIVE || user.role !== UserRole.ADMIN) {
    await clearPortalSession();
    redirect("/portal-servicos/login");
  }

  return user;
}
