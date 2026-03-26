import Link from "next/link";
import { notFound } from "next/navigation";
import { ContractStatus } from "@prisma/client";
import PrintPageButton from "@/components/portal/PrintPageButton";
import ServiceOrderFinalizeForm from "@/components/portal/ServiceOrderFinalizeForm";
import { shareServiceOrderWhatsappAction } from "@/app/admin/contratos/actions";
import { requirePortalAdminAccess } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

const statusLabel: Record<ContractStatus, string> = {
  DRAFT: "Rascunho",
  PENDING_SIGNATURE: "Pendente",
  ACTIVE: "Em andamento",
  ARCHIVED: "Finalizada",
};

export default async function AdminServiceOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePortalAdminAccess();
  const { id } = await params;
  const prisma = getPrisma();

  const order = await prisma.contract.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      completedAt: true,
      sharingChannel: true,
      technicianFeedback: true,
      clientSatisfaction: true,
      clientFeedback: true,
      client: {
        select: {
          companyName: true,
          contactName: true,
          document: true,
          phone: true,
        },
      },
      service: {
        select: {
          name: true,
          category: true,
          basePrice: true,
        },
      },
      createdBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Ordem salva
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">{order.title}</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/contratos"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 print:rounded-none print:border-0 print:p-0 print:shadow-none print:ring-0">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5 print:hidden">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
              Documento operacional
            </p>
            <h1 className="mt-2 text-3xl font-bold">{order.title}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Cliente: {order.client.companyName} • Serviço: {order.service.name}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {statusLabel[order.status]}
            </span>
            {order.client.phone ? (
              <form action={shareServiceOrderWhatsappAction}>
                <input type="hidden" name="orderId" value={order.id} />
                <button
                  type="submit"
                  className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  Compartilhar no WhatsApp
                </button>
              </form>
            ) : (
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                Cliente sem WhatsApp cadastrado
              </span>
            )}
            <PrintPageButton />
          </div>
        </div>

        <div className="grid gap-4 border-b border-slate-200 py-5 text-sm text-slate-600 print:grid-cols-2 print:gap-3 print:py-3">
          <p>
            <strong className="text-slate-900">Cliente:</strong> {order.client.companyName}
          </p>
          <p>
            <strong className="text-slate-900">Responsavel:</strong>{" "}
            {order.client.contactName || "-"}
          </p>
          <p>
            <strong className="text-slate-900">Documento:</strong> {order.client.document || "-"}
          </p>
          <p>
            <strong className="text-slate-900">WhatsApp:</strong> {order.client.phone || "-"}
          </p>
          <p>
            <strong className="text-slate-900">Categoria:</strong> {order.service.category}
          </p>
          <p>
            <strong className="text-slate-900">Valor:</strong>{" "}
            {order.service.basePrice !== null
              ? new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(order.service.basePrice))
              : "A combinar"}
          </p>
          <p>
            <strong className="text-slate-900">Criado por:</strong> {order.createdBy.name}
          </p>
          <p>
            <strong className="text-slate-900">Atualizado em:</strong>{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(order.updatedAt)}
          </p>
          <p>
            <strong className="text-slate-900">Canal de envio:</strong> {order.sharingChannel}
          </p>
          <p>
            <strong className="text-slate-900">Finalizada em:</strong>{" "}
            {order.completedAt
              ? new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(order.completedAt)
              : "-"}
          </p>
        </div>

        <pre className="mt-6 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-800 print:mt-4">
          {order.content}
        </pre>

        <div className="mt-8 grid gap-6 border-t border-slate-200 pt-6 print:hidden">
          <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">
              Finalização técnica e satisfação do cliente
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use esta etapa para registrar o encerramento da OS, o parecer do
              técnico e a percepção final do cliente sobre o atendimento.
            </p>

            <div className="mt-5 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
              <p>
                <strong className="text-slate-900">Status atual:</strong>{" "}
                {statusLabel[order.status]}
              </p>
              <p>
                <strong className="text-slate-900">Satisfação:</strong>{" "}
                {order.clientSatisfaction ? `${order.clientSatisfaction}/5` : "-"}
              </p>
              <p>
                <strong className="text-slate-900">Retorno do cliente:</strong>{" "}
                {order.clientFeedback || "-"}
              </p>
            </div>

            {order.technicianFeedback ? (
              <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">
                  Ultimo parecer tecnico
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {order.technicianFeedback}
                </p>
              </div>
            ) : null}

            <div className="mt-5">
              <ServiceOrderFinalizeForm
                orderId={order.id}
                technicianFeedback={order.technicianFeedback}
                clientSatisfaction={order.clientSatisfaction}
                clientFeedback={order.clientFeedback}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
