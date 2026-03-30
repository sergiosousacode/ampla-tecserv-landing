import { ContractStatus, UserRole } from "@prisma/client";
import ServiceOrderClientFeedbackForm from "@/components/portal/ServiceOrderClientFeedbackForm";
import { requirePortalRole } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";
import { autoFinalizePendingClientFeedback } from "@/lib/service-order-lifecycle";
import { buildServiceSelectionSummary, formatServicePrice } from "@/lib/service-order-services";

const statusLabel: Record<ContractStatus, string> = {
  DRAFT: "Rascunho",
  PENDING_SIGNATURE: "Aguardando sua avaliação",
  ACTIVE: "Em andamento",
  ARCHIVED: "Finalizada",
};

const statusMeta: Record<
  ContractStatus,
  { description: string; progress: number; tone: string }
> = {
  DRAFT: {
    description: "A ordem foi registrada e aguarda avanço operacional da equipe.",
    progress: 20,
    tone: "bg-slate-500",
  },
  PENDING_SIGNATURE: {
    description: "A execução foi concluída pela equipe e agora aguarda sua avaliação.",
    progress: 45,
    tone: "bg-amber-500",
  },
  ACTIVE: {
    description: "A OS está em execução e pode receber atualizações de andamento.",
    progress: 75,
    tone: "bg-sky-500",
  },
  ARCHIVED: {
    description: "Atendimento concluído e fechado no histórico do cliente.",
    progress: 100,
    tone: "bg-emerald-500",
  },
};

export default async function ClientPortalPage() {
  const user = await requirePortalRole(UserRole.CLIENT);
  const prisma = getPrisma();

  const client = await prisma.client.findFirst({
    where: {
      email: user.email,
      status: { not: "INACTIVE" },
    },
    select: {
      id: true,
      companyName: true,
      contactName: true,
      contracts: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          status: true,
          updatedAt: true,
          completedAt: true,
          content: true,
          technicianFeedback: true,
          clientSatisfaction: true,
          clientFeedback: true,
          contractServices: {
            orderBy: { position: "asc" },
            select: {
              service: {
                select: {
                  name: true,
                  category: true,
                  basePrice: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (client) {
    await autoFinalizePendingClientFeedback(prisma, client.id);
  }

  const refreshedClient = client
    ? await prisma.client.findUnique({
        where: { id: client.id },
        select: {
          id: true,
          companyName: true,
          contactName: true,
          contracts: {
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              title: true,
              status: true,
              updatedAt: true,
              completedAt: true,
              content: true,
              technicianFeedback: true,
              clientSatisfaction: true,
              clientFeedback: true,
              contractServices: {
                orderBy: { position: "asc" },
                select: {
                  service: {
                    select: {
                      name: true,
                      category: true,
                      basePrice: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
    : null;

  return (
    <section className="grid gap-6">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
          Visao do cliente
        </p>
        <h2 className="mt-3 text-2xl font-bold">Seu acesso esta isolado da área interna</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Este espaço foi separado para que usuários do tipo cliente acompanhem
          apenas as próprias ordens de serviço e seus status, sem enxergar o
          ambiente administrativo da Ampla TecServ.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
            Usuário logado
          </p>
          <p className="mt-4 text-2xl font-bold text-white">{user.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{user.email}</p>
        </article>

        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
            Empresa vinculada
          </p>
          <p className="mt-4 text-2xl font-bold text-white">
            {refreshedClient?.companyName || "Não localizada"}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {refreshedClient
              ? `Consulta liberada em modo leitura para ${refreshedClient.contactName || "o contato principal"}.`
              : "Cadastre a empresa com o mesmo e-mail do login do cliente para liberar a consulta automática."}
          </p>
        </article>

        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
            Ordens visíveis
          </p>
          <p className="mt-4 text-2xl font-bold text-white">
            {refreshedClient?.contracts.length || 0}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            O cliente só acompanha a própria OS e o andamento de cada atendimento.
          </p>
        </article>
      </div>

      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
              Acompanhamento liberado
            </p>
            <h3 className="mt-2 text-xl font-bold">
              O cliente já pode acompanhar a OS em modo leitura
            </h3>
          </div>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
            Sem edição pelo cliente
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              1. Login do cliente
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              O usuário do tipo `CLIENT` entra pelo mesmo portal e é enviado automaticamente para `/cliente`.
            </p>
          </article>
          <article className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              2. Consulta da OS
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              A área mostra status atual, lista de serviços, valor estimado e o conteúdo operacional salvo.
            </p>
          </article>
          <article className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              3. Atualização de andamento
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Sempre que a equipe alterar o status da OS, o cliente passa a enxergar o novo estágio aqui.
            </p>
          </article>
        </div>
      </div>

      {refreshedClient ? (
        <div className="grid gap-4">
          {refreshedClient.contracts.length ? (
            refreshedClient.contracts.map((order) => {
              const services = buildServiceSelectionSummary(
                order.contractServices.map((item) => ({
                  name: item.service.name,
                  category: item.service.category,
                  basePriceValue:
                    item.service.basePrice !== null
                      ? Number(item.service.basePrice)
                      : null,
                  basePriceLabel: formatServicePrice(
                    item.service.basePrice !== null
                      ? Number(item.service.basePrice)
                      : null
                  ),
                }))
              );

              return (
                <article
                  key={order.id}
                  className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                        Ordem de serviço
                      </p>
                      <h3 className="mt-2 text-xl font-bold">{order.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        Serviços: {services.shortLabel}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-2">
                      <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
                        {statusLabel[order.status]}
                      </span>
                      <p className="max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {statusMeta[order.status].description}
                      </p>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Atualizada em{" "}
                        {new Intl.DateTimeFormat("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(order.updatedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Progresso da execução
                      </p>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {statusMeta[order.status].progress}%
                      </span>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${statusMeta[order.status].tone}`}
                        style={{ width: `${statusMeta[order.status].progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Serviços contratados
                    </p>
                    <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {services.list}
                    </pre>
                    <p className="mt-3 text-sm font-medium text-slate-900 dark:text-white">
                      Valor total estimado: {services.totalPriceLabel}
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Última atualização da equipe
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {order.technicianFeedback ||
                        "A equipe ainda não registrou uma atualização operacional para esta OS."}
                    </p>
                  </div>

                  {order.status === "PENDING_SIGNATURE" && !order.clientSatisfaction ? (
                    <div className="mt-5 rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-200 dark:bg-sky-400/10 dark:ring-sky-400/20">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Sua avaliação finaliza a OS
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                        Se não houver retorno em até 1 dia, a OS será finalizada automaticamente.
                      </p>
                      <div className="mt-4">
                        <ServiceOrderClientFeedbackForm
                          orderId={order.id}
                          clientSatisfaction={order.clientSatisfaction}
                          clientFeedback={order.clientFeedback}
                        />
                      </div>
                    </div>
                  ) : null}

                  {order.clientSatisfaction ? (
                    <div className="mt-5 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:ring-emerald-400/20">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Avaliação registrada
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                        Nota: {order.clientSatisfaction}/5
                      </p>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">
                        {order.clientFeedback || "Cliente não deixou comentário adicional."}
                      </p>
                    </div>
                  ) : null}

                  {order.status === "ARCHIVED" &&
                  !order.clientSatisfaction &&
                  !order.clientFeedback ? (
                    <div className="mt-5 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200 dark:bg-amber-400/10 dark:ring-amber-400/20">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        OS finalizada sem avaliação do cliente
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                        Como não houve retorno dentro do prazo previsto, a OS foi
                        encerrada automaticamente pelo portal.
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Conteúdo da OS
                    </p>
                    <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700 dark:text-slate-300">
                      {order.content}
                    </pre>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-[1.5rem] bg-white p-6 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-slate-300 dark:ring-white/10">
              Nenhuma ordem de serviço foi vinculada a esta empresa ainda.
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
          Nenhuma empresa ativa foi encontrada com o e-mail <strong>{user.email}</strong>.
          Para liberar a consulta do cliente, use esse mesmo e-mail no cadastro da empresa em
          `/admin/clientes`.
        </div>
      )}
    </section>
  );
}
