"use server";

import { revalidatePath } from "next/cache";
import { BillingType, ServiceStatus, UserRole } from "@prisma/client";
import { requirePortalRole } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

export interface ServiceFormState {
  error?: string;
  success?: string;
}

function parseServiceFormData(formData: FormData) {
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

  return {
    data: {
      name,
      category,
      description,
      billingType: billingTypeInput as BillingType,
      status: statusInput as ServiceStatus,
      basePrice: normalizedBasePrice || null,
    },
  };
}

export async function createServiceAction(
  _previousState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requirePortalRole(UserRole.ADMIN);

  const parsed = parseServiceFormData(formData);

  if ("error" in parsed) {
    return parsed;
  }

  const prisma = getPrisma();

  await prisma.service.create({
    data: parsed.data,
  });

  revalidatePath("/admin/servicos");
  revalidatePath("/admin/contratos");
  revalidatePath("/admin");
  revalidatePath("/portal-servicos");

  return {
    success: `Servico ${parsed.data.name} cadastrado com sucesso.`,
  };
}

export async function updateServiceAction(
  _previousState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requirePortalRole(UserRole.ADMIN);

  const serviceId = String(formData.get("serviceId") || "").trim();

  if (!serviceId) {
    return { error: "Servico nao informado para edicao." };
  }

  const parsed = parseServiceFormData(formData);

  if ("error" in parsed) {
    return parsed;
  }

  const prisma = getPrisma();
  const existingService = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { id: true },
  });

  if (!existingService) {
    return { error: "Servico nao encontrado." };
  }

  await prisma.service.update({
    where: { id: serviceId },
    data: parsed.data,
  });

  revalidatePath("/admin/servicos");
  revalidatePath("/admin/contratos");
  revalidatePath("/admin");
  revalidatePath("/portal-servicos");

  return {
    success: `Servico ${parsed.data.name} atualizado com sucesso.`,
  };
}
