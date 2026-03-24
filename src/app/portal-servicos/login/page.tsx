import Link from "next/link";
import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";
import LoginForm from "@/components/portal/LoginForm";
import { getPortalAdminEmail } from "@/lib/portal-auth";

export const metadata = {
  title: "Login do Portal",
  description:
    "Acesso administrativo ao portal de servicos da Ampla TecServ.",
};

export default function PortalLoginPage() {
  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth className="py-12 sm:py-16 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-[2rem] bg-white/10 p-6 text-white shadow-xl ring-1 ring-white/20 backdrop-blur sm:p-8 lg:p-10 dark:bg-white/5 dark:text-text">
            <span className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 dark:text-text">
              Acesso administrativo
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Entre no portal para gerenciar usuários, serviços e contratos.
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/85 sm:text-lg dark:text-text">
              Esta etapa foi preparada para o seu acesso interno. A partir daqui,
              você consegue evoluir o portal em três frentes: autenticação,
              cadastro administrativo e fluxo de contratos com geração de PDF e
              compartilhamento.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl bg-slate-950/20 p-5 ring-1 ring-white/15 dark:bg-slate-900/40">
                <h2 className="text-lg font-semibold">Usuários</h2>
                <p className="mt-2 text-sm leading-6 text-white/80 dark:text-text">
                  Controle de administradores, operação e futuros clientes.
                </p>
              </article>
              <article className="rounded-2xl bg-slate-950/20 p-5 ring-1 ring-white/15 dark:bg-slate-900/40">
                <h2 className="text-lg font-semibold">Serviços</h2>
                <p className="mt-2 text-sm leading-6 text-white/80 dark:text-text">
                  Catálogo de ofertas, categorias, precificacao e escopo.
                </p>
              </article>
              <article className="rounded-2xl bg-slate-950/20 p-5 ring-1 ring-white/15 dark:bg-slate-900/40">
                <h2 className="text-lg font-semibold">Contratos</h2>
                <p className="mt-2 text-sm leading-6 text-white/80 dark:text-text">
                  Elaboração, exportação em PDF e envio por e-mail, WhatsApp ou portal.
                </p>
              </article>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Login interno
                </p>
                <h2 className="mt-2 text-2xl font-bold">Entrar no painel</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                Restrito
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              O administrador inicial e criado pelo seed com base nas variáveis
              de ambiente. Depois disso, este formulário autentica consultando o
              banco PostgreSQL.
            </p>

            <LoginForm defaultEmail={getPortalAdminEmail()} />

            <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Fluxo previsto</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Primeiro entra apenas o administrador. Depois, o mesmo fluxo pode
                ser adaptado para clientes acompanharem serviços e chamados.
              </p>
            </div>

            <Link
              href="/portal-servicos"
              className="mt-6 inline-flex text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              Voltar para a apresentação do portal
            </Link>
          </aside>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
