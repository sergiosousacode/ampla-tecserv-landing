import { createHash, randomBytes } from "node:crypto";
import { UserStatus } from "@prisma/client";
import type { PasswordHasher } from "@/application/portal/passwords";
import {
  EMAIL_REGEX,
  normalizeEmail,
} from "@/application/portal/validation";
import type { PortalUsersRepository } from "@/domain/portal/users";

const PASSWORD_RESET_TOKEN_BYTES = 32;
const PASSWORD_RESET_TOKEN_TTL_MS = 1000 * 60 * 60;

export interface PasswordResetTokensRepository {
  create(input: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<void>;
  findValidByTokenHash(tokenHash: string, now: Date): Promise<{
    id: string;
    userId: string;
    user: { name: string; status: UserStatus };
  } | null>;
  invalidateActiveTokensForUser(userId: string, usedAt: Date): Promise<void>;
  resetPasswordAndUseToken(input: {
    tokenId: string;
    userId: string;
    passwordHash: string;
    usedAt: Date;
  }): Promise<void>;
}

export interface PasswordResetMailer {
  sendPasswordReset(input: {
    to: string;
    name: string;
    resetUrl: string;
    expiresAt: Date;
  }): Promise<void>;
}

export interface PasswordResetResult {
  error?: string;
  success?: string;
}

function hashPasswordResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function createPasswordResetToken() {
  return randomBytes(PASSWORD_RESET_TOKEN_BYTES).toString("base64url");
}

function getAppUrl() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (!appUrl) {
    return "http://localhost:3000";
  }

  return appUrl.replace(/\/$/, "");
}

export async function requestPortalPasswordReset(input: {
  usersRepository: PortalUsersRepository;
  tokensRepository: PasswordResetTokensRepository;
  mailer: PasswordResetMailer;
  email: string;
}): Promise<PasswordResetResult> {
  const email = normalizeEmail(input.email);
  const genericSuccess =
    "Se o e-mail estiver cadastrado, enviaremos um link para redefinir a senha.";

  if (!email || !EMAIL_REGEX.test(email)) {
    return { error: "Informe um e-mail valido." };
  }

  const user = await input.usersRepository.findByEmail(email);

  if (!user || user.status !== UserStatus.ACTIVE) {
    return { success: genericSuccess };
  }

  const token = createPasswordResetToken();
  const tokenHash = hashPasswordResetToken(token);
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_TOKEN_TTL_MS);
  const resetUrl = `${getAppUrl()}/portal-servicos/redefinir-senha?token=${encodeURIComponent(token)}`;

  await input.tokensRepository.invalidateActiveTokensForUser(user.id, new Date());
  await input.tokensRepository.create({
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  await input.mailer.sendPasswordReset({
    to: user.email,
    name: user.name,
    resetUrl,
    expiresAt,
  });

  return { success: genericSuccess };
}

export async function resetPortalPasswordWithToken(input: {
  tokensRepository: PasswordResetTokensRepository;
  passwordHasher: PasswordHasher;
  token: string;
  password: string;
  confirmPassword: string;
}): Promise<PasswordResetResult> {
  const token = input.token.trim();

  if (!token) {
    return { error: "Link de redefinicao invalido." };
  }

  if (!input.password || !input.confirmPassword) {
    return { error: "Informe e confirme a nova senha." };
  }

  if (input.password.length < 6) {
    return { error: "A nova senha precisa ter pelo menos 6 caracteres." };
  }

  if (input.password !== input.confirmPassword) {
    return { error: "As senhas informadas nao conferem." };
  }

  const tokenHash = hashPasswordResetToken(token);
  const now = new Date();
  const resetToken = await input.tokensRepository.findValidByTokenHash(
    tokenHash,
    now
  );

  if (!resetToken || resetToken.user.status !== UserStatus.ACTIVE) {
    return { error: "Link expirado ou invalido. Solicite uma nova redefinicao." };
  }

  const passwordHash = await input.passwordHasher.hash(input.password);

  await input.tokensRepository.resetPasswordAndUseToken({
    tokenId: resetToken.id,
    userId: resetToken.userId,
    passwordHash,
    usedAt: now,
  });

  return { success: "Senha redefinida com sucesso. Acesse o portal com a nova senha." };
}
