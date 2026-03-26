"use server";

import { revalidatePath } from "next/cache";
import { UserStatus } from "@prisma/client";
import { requirePortalAdminAccess } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

export interface CreateClientFormState {
  error?: string;
  success?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createClientAction(
  _previousState: CreateClientFormState,
  formData: FormData
): Promise<CreateClientFormState> {
  await requirePortalAdminAccess();

  const companyName = String(formData.get("companyName") || "").trim();
  const document = String(formData.get("document") || "").trim();
  const contactName = String(formData.get("contactName") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const statusInput = String(formData.get("status") || "");

  if (!companyName) {
    return { error: "Informe o nome da empresa." };
  }

  if (email && !EMAIL_REGEX.test(email)) {
    return { error: "Informe um e-mail valido para o cliente." };
  }

  if (!Object.values(UserStatus).includes(statusInput as UserStatus)) {
    return { error: "Status invalido." };
  }

  const prisma = getPrisma();

  await prisma.client.create({
    data: {
      companyName,
      document: document || null,
      contactName: contactName || null,
      email: email || null,
      phone: phone || null,
      status: statusInput as UserStatus,
    },
  });

  revalidatePath("/admin/clientes");
  revalidatePath("/admin/contratos");
  revalidatePath("/admin");

  return {
    success: `Cliente ${companyName} cadastrado com sucesso.`,
  };
}
