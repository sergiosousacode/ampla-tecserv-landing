import Link from "next/link";
import { ServiceStatus } from "@prisma/client";
import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Portal de Servicos",
  description:
    "Area reservada para gestao de contratos, atendimentos e solicitacoes de servicos da Ampla TecServ.",
};

const quickAccess = [
  {
    title: "Contratos em andamento",
    description:
      "Centralize acordos ativos, acompanhe renovacoes e organize as entregas recorrentes.",
  },
  {
    title: "Chamados e solicitacoes",
    description:
      "Registre demandas de suporte, manutencao, infraestrutura e novos projetos em um unico fluxo.",
  },
  {
    title: "Historico do cliente",
    description:
      "Conecte servicos prestados, observacoes tecnicas e proximos passos para cada empresa atendida.",
  },
];

const roadmap = [
  "Login do portal já separado por perfis administrativos e cliente.",
  "Cadastro de clientes e contratos com acompanhamento de status.",
  "Abertura de chamados e solicitacoes por cada cliente no futuro.",
];

export default async function Services() {
  const prisma = getPrisma();
  const services = await prisma.service.findMany({
    where: { status: ServiceStatus.ACTIVE },
    orderBy: [{ category: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      category: true,
      description: true,
      billingType: true,
    },
  });

  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth className="py-12 sm:py-16 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="rounded-[2rem] bg-white/10 p-6 text-white shadow-xl ring-1 ring-white/20 backdrop-blur sm:p-8 lg:p-10 dark:bg-white/5 dark:text-text">
            <span className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 dark:text-text">
              Portal reservado
            </span>

            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Uma base para você gerenciar contratos, serviços e futuros chamados dos clientes.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg dark:text-text">
              Esta página deixa de ser apenas uma vitrine e passa a funcionar como
              a entrada do portal operacional da Ampla TecServ. Neste primeiro
              momento, o acesso será somente seu. Depois, a mesma estrutura pode
              evoluir para que cada cliente acompanhe contratos e solicite
              atendimento diretamente por aqui.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {quickAccess.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl bg-slate-950/20 p-5 ring-1 ring-white/15 dark:bg-slate-900/40"
                >
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/80 dark:text-text">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-white p-5 text-slate-900 shadow-lg sm:p-6 dark:bg-slate-900 dark:text-text">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                Próxima fase
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 sm:text-base">
                {roadmap.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500 dark:bg-sky-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Acesso interno
                </p>
                <h2 className="mt-2 text-2xl font-bold">Entrar no painel</h2>
              </div>

              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                Somente você
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Esta página funciona como apresentação do portal. O login real fica
              na tela restrita e válida o e-mail e a senha no servidor.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Acesso administrativo</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Para entrar no painel, siga para a tela de login protegida. Os
                campos não aparecem aqui para evitar a impressao de que esta página
                já autentica o acesso.
              </p>

              <Link
                href="/portal-servicos/login"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
              >
                Ir para o login real
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Cliente já liberado</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                O perfil `CLIENT` já pode entrar no portal para consultar a OS
                vinculada ao seu e-mail e acompanhar o status da execução em uma
                área própria e somente leitura.
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              Ajustar esse fluxo depois com integração real
            </Link>
          </aside>
        </section>

        <section className="mt-8 rounded-[2rem] bg-white p-6 text-slate-900 shadow-xl ring-1 ring-slate-200 sm:p-8 dark:bg-slate-900 dark:text-text dark:ring-white/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                Vitrine de serviços
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Serviços ativos publicados pelo administrador
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              Alterações feitas em `/admin/servicos` passam a refletir aqui.
            </p>
          </div>

          {services.length ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-white/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                    {service.category}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
                    {service.billingType === "MONTHLY"
                      ? "Mensal"
                      : service.billingType === "PROJECT"
                        ? "Projeto"
                        : "Avulso"}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-300">
              Nenhum serviço ativo foi publicado ainda. Assim que um administrador
              cadastrar ou ativar serviços no painel, eles aparecerão nesta vitrine.
            </div>
          )}
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
