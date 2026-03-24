import Link from "next/link";
import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";

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
  "Login interno para sua operacao administrativa.",
  "Cadastro de clientes e contratos com acompanhamento de status.",
  "Abertura de chamados e solicitacoes por cada cliente no futuro.",
];

export default function Services() {
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
              <p className="text-sm font-semibold text-white">Estrutura planejada</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Quando você liberar essa área para clientes, eles poderão abrir
                chamados, escolher o tipo de serviço e acompanhar o andamento de
                cada atendimento em um painel próprio.
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
      </MaxWidth>
    </Wrapper>
  );
}
