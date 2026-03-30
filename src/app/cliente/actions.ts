"use server";

import { revalidatePath } from "next/cache";
import { ContractStatus, UserRole } from "@prisma/client";
import { requirePortalRole } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

export interface ClientOrderFeedbackFormState {
  error?: string;
  success?: string;
}

export async function submitClientOrderFeedbackAction(
  _previousState: ClientOrderFeedbackFormState,
  formData: FormData
): Promise<ClientOrderFeedbackFormState> {
  const user = await requirePortalRole(UserRole.CLIENT);

  const orderId = String(formData.get("orderId") || "").trim();
  const clientSatisfactionValue = String(formData.get("clientSatisfaction") || "").trim();
  const clientFeedback = String(formData.get("clientFeedback") || "").trim();

  if (!orderId || !clientSatisfactionValue) {
    return { error: "Informe a nota de satisfação para finalizar a OS." };
  }

  const clientSatisfaction = Number(clientSatisfactionValue);

  if (!Number.isInteger(clientSatisfaction) || clientSatisfaction < 1 || clientSatisfaction > 5) {
    return { error: "A satisfação precisa ser uma nota entre 1 e 5." };
  }

  const prisma = getPrisma();
  const client = await prisma.client.findFirst({
    where: {
      email: user.email,
      status: { not: "INACTIVE" },
    },
    select: { id: true },
  });

  if (!client) {
    return { error: "Empresa do cliente não encontrada para registrar o feedback." };
  }

  const order = await prisma.contract.findFirst({
    where: {
      id: orderId,
      clientId: client.id,
      status: ContractStatus.PENDING_SIGNATURE,
    },
    select: { id: true },
  });

  if (!order) {
    return { error: "OS não disponível para feedback do cliente." };
  }

  await prisma.contract.update({
    where: { id: orderId },
    data: {
      clientSatisfaction,
      clientFeedback: clientFeedback || null,
      status: ContractStatus.ARCHIVED,
      completedAt: new Date(),
    },
  });

  revalidatePath("/cliente");
  revalidatePath(`/admin/contratos/${orderId}`);
  revalidatePath("/admin/contratos");
  revalidatePath("/admin");

  return {
    success: "Feedback registrado. A OS foi finalizada com sucesso.",
  };
}
