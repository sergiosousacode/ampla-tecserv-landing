import { BillingType, ServiceStatus } from "@prisma/client";
import AdminServiceCreateForm from "@/components/portal/AdminServiceCreateForm";
import { requirePortalAdminAccess } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

const billingLabel: Record<BillingType, string> = {
  MONTHLY: "Mensal",
  ONE_OFF: "Avulso",
  PROJECT: "Projeto",
};

const statusLabel: Record<ServiceStatus, string> = {
  ACTIVE: "Ativo",
  DRAFT: "Rascunho",
  INACTIVE: "Inativo",
};

export default async function AdminServicesPage() {
  await requirePortalAdminAccess();

  const prisma = getPrisma();
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="grid gap-6">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
          Catálogo de serviços
        </p>
        <h2 className="mt-3 text-2xl font-bold">Estruture o que será contratado</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Este módulo prepara a sua base comercial e operacional. Cada serviço
          pode virar item contratável, tipo de chamado, escopo padrao e modelo de
          atendimento dentro do portal.
        </p>
      </div>

      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <h3 className="text-xl font-bold">Cadastrar servico</h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Este cadastro passa a alimentar o editor de ordem de servico com dados
          reais. O escopo aqui ainda e enxuto para manter o MVP leve.
        </p>

        <div className="mt-6">
          <AdminServiceCreateForm />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.id}
            className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              {service.category}
            </p>
            <h3 className="mt-3 text-xl font-bold">{service.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {service.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
                {billingLabel[service.billingType]}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-white/10 dark:text-slate-300">
                {statusLabel[service.status]}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
        <h3 className="text-lg font-semibold text-white">O que adicionar depois</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Preço base, SLA, anexos, checklist de execução, tipo de faturamento,
          modelo de contrato vinculado e permissão para o cliente solicitar esse
          servico pelo portal.
        </p>
      </div>
    </section>
  );
}
