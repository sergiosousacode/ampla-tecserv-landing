"use server";

import { requestPortalPasswordReset } from "@/application/portal/password-reset";
import { createPrismaPasswordResetTokensRepository } from "@/infra/portal/prisma-password-reset-tokens-repository";
import { createPrismaUsersRepository } from "@/infra/portal/prisma-users-repository";
import { smtpPasswordResetMailer } from "@/infra/portal/smtp-password-reset-mailer";
import { getPrisma } from "@/lib/prisma";

export interface ForgotPasswordFormState {
  error?: string;
  success?: string;
}

export async function forgotPasswordAction(
  _previousState: ForgotPasswordFormState,
  formData: FormData
): Promise<ForgotPasswordFormState> {
  const prisma = getPrisma();
  const email = String(formData.get("email") || "");

  try {
    return await requestPortalPasswordReset({
      usersRepository: createPrismaUsersRepository(prisma),
      tokensRepository: createPrismaPasswordResetTokensRepository(prisma),
      mailer: smtpPasswordResetMailer,
      email,
    });
  } catch (error) {
    console.error("[password-reset] failed to send reset email", error);

    return {
      error:
        "Nao foi possivel enviar o e-mail de redefinicao. Tente novamente em instantes.",
    };
  }
}
