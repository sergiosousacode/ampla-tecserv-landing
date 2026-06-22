"use server";

import { resetPortalPasswordWithToken } from "@/application/portal/password-reset";
import { bcryptPasswordHasher } from "@/infra/portal/bcrypt-password-hasher";
import { createPrismaPasswordResetTokensRepository } from "@/infra/portal/prisma-password-reset-tokens-repository";
import { getPrisma } from "@/lib/prisma";

export interface ResetPasswordFormState {
  error?: string;
  success?: string;
}

export async function resetPasswordAction(
  _previousState: ResetPasswordFormState,
  formData: FormData
): Promise<ResetPasswordFormState> {
  return resetPortalPasswordWithToken({
    tokensRepository: createPrismaPasswordResetTokensRepository(getPrisma()),
    passwordHasher: bcryptPasswordHasher,
    token: String(formData.get("token") || ""),
    password: String(formData.get("password") || ""),
    confirmPassword: String(formData.get("confirmPassword") || ""),
  });
}
