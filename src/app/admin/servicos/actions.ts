"use server";

import { revalidatePath } from "next/cache";
import { BillingType, ServiceStatus } from "@prisma/client";
import { requirePortalAdminAccess } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

export interface CreateServiceFormState {
  error?: string;
  success?: string;
}

export async function createServiceAction(
  _previousState: CreateServiceFormState,
  formData: FormData
): Promise<CreateServiceFormState> {
  await requirePortalAdminAccess();

  const name = String(formData.get("name") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const billingTypeInput = String(formData.get("billingType") || "");
  const statusInput = String(formData.get("status") || "");
  const basePriceInput = String(formData.get("basePrice") || "").trim();

  if (!name || !category || !description) {
    return { error: "Preencha nome, categoria e descricao do servico." };
  }

  if (!Object.values(BillingType).includes(billingTypeInput as BillingType)) {
    return { error: "Tipo de faturamento invalido." };
  }

  if (!Object.values(ServiceStatus).includes(statusInput as ServiceStatus)) {
    return { error: "Status invalido." };
  }

  const normalizedBasePrice = basePriceInput.replace(",", ".");

  if (normalizedBasePrice && Number.isNaN(Number(normalizedBasePrice))) {
    return { error: "Informe um preco base numerico ou deixe em branco." };
  }

  const prisma = getPrisma();

  await prisma.service.create({
    data: {
      name,
      category,
      description,
      billingType: billingTypeInput as BillingType,
      status: statusInput as ServiceStatus,
      basePrice: normalizedBasePrice || null,
    },
  });

  revalidatePath("/admin/servicos");
  revalidatePath("/admin/contratos");
  revalidatePath("/admin");

  return {
    success: `Servico ${name} cadastrado com sucesso.`,
  };
}
