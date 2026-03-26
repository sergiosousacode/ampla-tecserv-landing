import { ContractStatus } from "@prisma/client";
import ServiceOrderEditor from "@/components/portal/ServiceOrderEditor";
import { requirePortalAdminAccess } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

const statusLabel: Record<ContractStatus, string> = {
  DRAFT: "Rascunho",
  PENDING_SIGNATURE: "Pendente",
  ACTIVE: "Em andamento",
  ARCHIVED: "Finalizada",
};

export default async function AdminContractsPage() {
  const user = await requirePortalAdminAccess();
  const prisma = getPrisma();

  const [clients, services, orders] = await Promise.all([
    prisma.client.findMany({
      where: { status: { not: "INACTIVE" } },
      select: {
        id: true,
        companyName: true,
        contactName: true,
        document: true,
      },
      orderBy: { companyName: "asc" },
    }),
    prisma.service.findMany({
      where: { status: { not: "INACTIVE" } },
      select: {
        id: true,
        name: true,
        category: true,
        basePrice: true,
      },
      orderBy: { name: "asc" },
    }),
    prisma.contract.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
        client: {
          select: {
            companyName: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
        createdBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <section className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 print:hidden">
        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">MVP operacional</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Nesta fase o portal trabalha com ordem de servico em vez de contrato
            formal. Isso reduz custo, evita complexidade juridica e acelera a
            validacao do fluxo operacional.
          </p>
        </article>

        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Saida inicial</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            A propria pagina salva no banco pode ser reaberta e impressa no
            navegador. O PDF continua como uma evolucao posterior.
          </p>
        </article>
      </div>

      <ServiceOrderEditor
        currentUserName={user.name}
        clients={clients}
        services={services.map((service) => ({
          id: service.id,
          name: service.name,
          category: service.category,
          basePrice:
            service.basePrice !== null
              ? new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.basePrice))
              : "A combinar",
        }))}
        orders={orders.map((order) => ({
          id: order.id,
          title: order.title,
          clientName: order.client.companyName,
          serviceName: order.service.name,
          createdByName: order.createdBy.name,
          statusLabel: statusLabel[order.status],
          updatedAtLabel: new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(order.updatedAt),
        }))}
      />
    </section>
  );
}
