"use server";

import { revalidatePath } from "next/cache";
import { ContractStatus, SharingChannel } from "@prisma/client";
import { redirect } from "next/navigation";
import { requirePortalAdminAccess } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";
import {
  buildServiceOrderWhatsappMessage,
  normalizeWhatsappPhone,
} from "@/lib/service-order-share";
import { renderServiceOrderTemplate } from "@/lib/service-order-template";

export interface CreateServiceOrderFormState {
  error?: string;
  success?: string;
}

export interface FinalizeServiceOrderFormState {
  error?: string;
  success?: string;
}

export async function createServiceOrderAction(
  _previousState: CreateServiceOrderFormState,
  formData: FormData
): Promise<CreateServiceOrderFormState> {
  const currentUser = await requirePortalAdminAccess();

  const title = String(formData.get("title") || "").trim();
  const clientId = String(formData.get("clientId") || "").trim();
  const serviceId = String(formData.get("serviceId") || "").trim();
  const template = String(formData.get("template") || "").trim();

  if (!title || !clientId || !serviceId || !template) {
    return {
      error: "Preencha titulo, cliente, servico e o texto da ordem de servico.",
    };
  }

  const prisma = getPrisma();
  const [client, service] = await Promise.all([
    prisma.client.findUnique({
      where: { id: clientId },
      select: {
        id: true,
        companyName: true,
        contactName: true,
        document: true,
      },
    }),
    prisma.service.findUnique({
      where: { id: serviceId },
      select: {
        id: true,
        name: true,
        category: true,
        basePrice: true,
      },
    }),
  ]);

  if (!client || !service) {
    return { error: "Cliente ou servico nao encontrado para criar a ordem." };
  }

  const content = renderServiceOrderTemplate(template, {
    client: {
      companyName: client.companyName,
      contactName: client.contactName || "-",
      document: client.document || "-",
    },
    service: {
      name: service.name,
      category: service.category,
      basePrice:
        service.basePrice !== null
          ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.basePrice))
          : "A combinar",
    },
    order: {
      title,
      createdAt: new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
      }).format(new Date()),
    },
    user: {
      name: currentUser.name,
    },
  });

  const order = await prisma.contract.create({
    data: {
      title,
      content,
      clientId: client.id,
      serviceId: service.id,
      createdById: currentUser.id,
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/admin/contratos");
  revalidatePath("/admin");

  return {
    success: `Ordem criada com sucesso. Abra /admin/contratos/${order.id} para imprimir.`,
  };
}

export async function shareServiceOrderWhatsappAction(formData: FormData) {
  await requirePortalAdminAccess();

  const orderId = String(formData.get("orderId") || "").trim();

  if (!orderId) {
    redirect("/admin/contratos");
  }

  const prisma = getPrisma();
  const order = await prisma.contract.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      title: true,
      content: true,
      client: {
        select: {
          companyName: true,
          phone: true,
        },
      },
      service: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!order || !order.client.phone) {
    redirect(`/admin/contratos/${orderId}`);
  }

  await prisma.contract.update({
    where: { id: orderId },
    data: {
      sharingChannel: SharingChannel.WHATSAPP,
    },
  });

  const phone = normalizeWhatsappPhone(order.client.phone);
  const message = buildServiceOrderWhatsappMessage({
    title: order.title,
    clientName: order.client.companyName,
    serviceName: order.service.name,
    companyName: "Ampla TecServ",
  });

  redirect(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
}

export async function finalizeServiceOrderAction(
  _previousState: FinalizeServiceOrderFormState,
  formData: FormData
): Promise<FinalizeServiceOrderFormState> {
  await requirePortalAdminAccess();

  const orderId = String(formData.get("orderId") || "").trim();
  const technicianFeedback = String(formData.get("technicianFeedback") || "").trim();
  const clientSatisfactionValue = String(formData.get("clientSatisfaction") || "").trim();
  const clientFeedback = String(formData.get("clientFeedback") || "").trim();

  if (!orderId || !technicianFeedback || !clientSatisfactionValue) {
    return {
      error: "Informe o parecer tecnico e a nota de satisfacao do cliente.",
    };
  }

  const clientSatisfaction = Number(clientSatisfactionValue);

  if (!Number.isInteger(clientSatisfaction) || clientSatisfaction < 1 || clientSatisfaction > 5) {
    return {
      error: "A satisfacao do cliente deve ser uma nota entre 1 e 5.",
    };
  }

  const prisma = getPrisma();

  await prisma.contract.update({
    where: { id: orderId },
    data: {
      status: ContractStatus.ARCHIVED,
      completedAt: new Date(),
      technicianFeedback,
      clientSatisfaction,
      clientFeedback: clientFeedback || null,
    },
  });

  revalidatePath(`/admin/contratos/${orderId}`);
  revalidatePath("/admin/contratos");
  revalidatePath("/admin");

  return {
    success: "Ordem finalizada com feedback tecnico e retorno do cliente.",
  };
}
