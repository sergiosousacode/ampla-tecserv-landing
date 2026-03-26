import { requirePortalRole } from "@/lib/portal-auth";
import { UserRole } from "@prisma/client";

export default async function ClientPortalPage() {
  const user = await requirePortalRole(UserRole.CLIENT);

  return (
    <section className="grid gap-6">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
          Visao do cliente
        </p>
        <h2 className="mt-3 text-2xl font-bold">Seu acesso esta isolado da area interna</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Este espaco foi separado para que usuarios do tipo cliente acompanhem
          contratos, arquivos e os proximos modulos liberados sem enxergar o
          ambiente administrativo da Ampla TecServ.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
            Usuario logado
          </p>
          <p className="mt-4 text-2xl font-bold text-white">{user.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{user.email}</p>
        </article>

        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
            Contratos
          </p>
          <p className="mt-4 text-2xl font-bold text-white">Somente os seus</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            As consultas reais devem filtrar por vinculo do cliente antes de
            listar contratos, PDFs e anexos.
          </p>
        </article>

        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
            Proximos modulos
          </p>
          <p className="mt-4 text-2xl font-bold text-white">Chamados e documentos</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Esta area ja esta reservada para evoluir com historico,
            compartilhamento e atendimento.
          </p>
        </article>
      </div>
    </section>
  );
}
