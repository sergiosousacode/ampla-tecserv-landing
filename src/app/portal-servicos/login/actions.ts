"use server";

import { redirect } from "next/navigation";
import {
  clearPortalSession,
  createPortalSession,
  validatePortalCredentials,
} from "@/lib/portal-auth";

export interface LoginFormState {
  error?: string;
}

export async function loginPortalAction(
  _previousState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  await clearPortalSession();

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Preencha e-mail e senha para acessar o portal." };
  }

  const user = await validatePortalCredentials(email, password);

  if (!user) {
    return { error: "Credenciais invalidas. Revise seu acesso administrativo." };
  }

  await createPortalSession(user.id);
  redirect("/admin");
}

export async function logoutPortalAction() {
  await clearPortalSession();
  redirect("/portal-servicos/login");
}
