"use server";

import { revalidatePath } from "next/cache";
import { ContractStatus, SharingChannel } from "@prisma/client";
import { redirect } from "next/navigation";
import { requirePortalAdminAccess } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";
import { autoFinalizePendingClientFeedback } from "@/lib/service-order-lifecycle";
import { buildServiceSelectionSummary, formatServicePrice } from "@/lib/service-order-services";
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

export interface UpdateServiceOrderProgressFormState {
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
  const serviceIds = formData
    .getAll("serviceIds")
    .map((value) => String(value).trim())
    .filter(Boolean);
  const template = String(formData.get("template") || "").trim();

  if (!title || !clientId || !serviceIds.length || !template) {
    return {
      error: "Preencha titulo, cliente, ao menos um servico e o texto da ordem de servico.",
    };
  }

  const prisma = getPrisma();
  await autoFinalizePendingClientFeedback(prisma);
  const [client, services] = await Promise.all([
    prisma.client.findUnique({
      where: { id: clientId },
      select: {
        id: true,
        companyName: true,
        contactName: true,
        document: true,
      },
    }),
    prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: {
        id: true,
        name: true,
        category: true,
        basePrice: true,
      },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!client || services.length !== serviceIds.length) {
    return { error: "Cliente ou servico nao encontrado para criar a ordem." };
  }

  const servicesById = new Map(services.map((service) => [service.id, service]));
  const orderedServices = serviceIds
    .map((serviceId) => servicesById.get(serviceId))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const serviceSummary = buildServiceSelectionSummary(
    orderedServices.map((service) => ({
      name: service.name,
      category: service.category,
      basePriceValue:
        service.basePrice !== null ? Number(service.basePrice) : null,
      basePriceLabel: formatServicePrice(
        service.basePrice !== null ? Number(service.basePrice) : null
      ),
    }))
  );

  const content = renderServiceOrderTemplate(template, {
    client: {
      companyName: client.companyName,
      contactName: client.contactName || "-",
      document: client.document || "-",
    },
    service: {
      name: serviceSummary.primaryService.name,
      category: serviceSummary.primaryService.category,
      basePrice: serviceSummary.primaryService.basePriceLabel,
    },
    services: {
      count: serviceSummary.count,
      names: serviceSummary.names,
      list: serviceSummary.list,
      totalPrice: serviceSummary.totalPriceLabel,
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
      createdById: currentUser.id,
      contractServices: {
        create: orderedServices.map((service, index) => ({
          serviceId: service.id,
          position: index,
        })),
      },
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/admin/contratos");
  revalidatePath("/admin");
  revalidatePath("/cliente");

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
      contractServices: {
        orderBy: { position: "asc" },
        select: {
          service: {
            select: {
              name: true,
            },
          },
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
  const serviceSummary = buildServiceSelectionSummary(
    order.contractServices.map((item) => ({
      name: item.service.name,
      category: "",
      basePriceValue: null,
      basePriceLabel: item.service.name,
    }))
  );
  const message = buildServiceOrderWhatsappMessage({
    title: order.title,
    clientName: order.client.companyName,
    serviceSummary: serviceSummary.shortLabel,
    companyName: "Ampla TecServ",
  });

  redirect(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
}

export async function updateServiceOrderProgressAction(
  _previousState: UpdateServiceOrderProgressFormState,
  formData: FormData
): Promise<UpdateServiceOrderProgressFormState> {
  await requirePortalAdminAccess();

  const orderId = String(formData.get("orderId") || "").trim();
  const statusInput = String(formData.get("status") || "").trim();
  const technicianFeedback = String(formData.get("technicianFeedback") || "").trim();

  if (!orderId) {
    return { error: "Ordem nao informada para atualizar o andamento." };
  }

  if (
    ![
      ContractStatus.DRAFT,
      ContractStatus.PENDING_SIGNATURE,
      ContractStatus.ACTIVE,
    ].includes(statusInput as ContractStatus)
  ) {
    return { error: "Selecione um status operacional valido para a OS." };
  }

  const prisma = getPrisma();

  await prisma.contract.update({
    where: { id: orderId },
    data: {
      status: statusInput as ContractStatus,
      technicianFeedback: technicianFeedback || null,
      completedAt: null,
    },
  });

  revalidatePath(`/admin/contratos/${orderId}`);
  revalidatePath("/admin/contratos");
  revalidatePath("/admin");
  revalidatePath("/cliente");

  return {
    success: "Andamento operacional atualizado com sucesso.",
  };
}

export async function finalizeServiceOrderAction(
  _previousState: FinalizeServiceOrderFormState,
  formData: FormData
): Promise<FinalizeServiceOrderFormState> {
  await requirePortalAdminAccess();

  const orderId = String(formData.get("orderId") || "").trim();
  const technicianFeedback = String(formData.get("technicianFeedback") || "").trim();

  if (!orderId) {
    return {
      error: "Informe a OS que deve ser finalizada manualmente.",
    };
  }

  const prisma = getPrisma();

  await prisma.contract.update({
    where: { id: orderId },
    data: {
      status: ContractStatus.ARCHIVED,
      completedAt: new Date(),
      technicianFeedback: technicianFeedback || null,
    },
  });

  revalidatePath(`/admin/contratos/${orderId}`);
  revalidatePath("/admin/contratos");
  revalidatePath("/admin");
  revalidatePath("/cliente");

  return {
    success: "OS finalizada manualmente pela equipe interna.",
  };
}
