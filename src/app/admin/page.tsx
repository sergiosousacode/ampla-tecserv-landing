import Link from "next/link";
import {
  contractRecords,
  portalUsers,
  serviceCatalog,
} from "@/data/portal-admin";

const highlights = [
  {
    label: "Usuarios cadastrados",
    value: String(portalUsers.length).padStart(2, "0"),
    description: "Administradores, operacao e futuros acessos de cliente.",
  },
  {
    label: "Servicos no catalogo",
    value: String(serviceCatalog.length).padStart(2, "0"),
    description: "Itens que serao vendidos, contratados e executados.",
  },
  {
    label: "Contratos acompanhados",
    value: String(contractRecords.length).padStart(2, "0"),
    description: "Documentos que podem virar PDF e ser compartilhados.",
  },
];

const quickActions = [
  {
    href: "/admin/usuarios",
    title: "Cadastro de usuarios",
    description: "Controle acesso administrativo e prepare a futura area do cliente.",
  },
  {
    href: "/admin/servicos",
    title: "Catalogo de servicos",
    description: "Estruture categorias, forma de cobranca e escopo de atendimento.",
  },
  {
    href: "/admin/contratos",
    title: "Contratos e PDF",
    description: "Monte contratos, acompanhe status e organize envio e impressao.",
  },
];

export default function AdminDashboardPage() {
  return (
    <section className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
              {item.label}
            </p>
            <p className="mt-4 text-4xl font-bold text-white">{item.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
            Proximos modulos
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {quickActions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 dark:bg-slate-900 dark:ring-white/10"
              >
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-[1.5rem] bg-white/5 p-6 ring-1 ring-white/10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Fluxo recomendado
          </p>
          <ol className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
            <li>1. Cadastrar administradores e definir quem pode operar o portal.</li>
            <li>2. Montar o catalogo oficial de servicos antes de gerar contratos.</li>
            <li>3. Criar modelos de contrato e exportar PDF para envio e assinatura.</li>
            <li>4. Depois abrir o acesso do cliente com chamados e acompanhamento.</li>
          </ol>
        </aside>
      </div>
    </section>
  );
}
