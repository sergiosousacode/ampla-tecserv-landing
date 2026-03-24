import Link from "next/link";
import { logoutPortalAction } from "@/app/portal-servicos/login/actions";
import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";
import { requirePortalAuth } from "@/lib/portal-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requirePortalAuth();

  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth className="py-10 sm:py-12">
        <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl ring-1 ring-white/10 sm:p-6 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                Área administrativa
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                Portal de serviços da Ampla TecServ
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Logado como {user.name} ({user.email})
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link
                href="/admin"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:bg-white/10"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/usuarios"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:bg-white/10"
              >
                Usuários
              </Link>
              <Link
                href="/admin/servicos"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:bg-white/10"
              >
                Serviços
              </Link>
              <Link
                href="/admin/contratos"
                className="rounded-full border border-white/15 px-4 py-2 transition hover:bg-white/10"
              >
                Contratos
              </Link>
              <form action={logoutPortalAction}>
                <button
                  type="submit"
                  className="rounded-full bg-sky-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-sky-300"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>

          <div className="mt-6">{children}</div>
        </div>
      </MaxWidth>
    </Wrapper>
  );
}
