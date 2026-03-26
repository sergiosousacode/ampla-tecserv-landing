import Link from "next/link";
import { requirePortalAdminAccess } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

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
    href: "/admin/clientes",
    title: "Base de clientes",
    description: "Cadastre empresas e deixe o editor pronto para ordens reais.",
  },
  {
    href: "/admin/contratos",
    title: "Ordens de servico",
    description: "Monte ordens dinamicas, salve no banco e imprima pelo navegador.",
  },
];

export default async function AdminDashboardPage() {
  await requirePortalAdminAccess();
  const prisma = getPrisma();

  const [userCount, serviceCount, clientCount, orderCount] = await Promise.all([
    prisma.user.count(),
    prisma.service.count(),
    prisma.client.count(),
    prisma.contract.count(),
  ]);

  const highlights = [
    {
      label: "Usuários cadastrados",
      value: String(userCount).padStart(2, "0"),
      description: "Administradores, operacao e futuros acessos de cliente.",
    },
    {
      label: "Serviços no catálogo",
      value: String(serviceCount).padStart(2, "0"),
      description: "Itens que serao vendidos, contratados e executados.",
    },
    {
      label: "Clientes na base",
      value: String(clientCount).padStart(2, "0"),
      description: "Empresas prontas para uso nas ordens de servico.",
    },
    {
      label: "Ordens registradas",
      value: String(orderCount).padStart(2, "0"),
      description: "Documentos operacionais salvos no banco e reimprimiveis.",
    },
  ];

  return (
    <section className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
            Módulos principais
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
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
            <li>2. Montar o catalogo de servicos e a base de clientes.</li>
            <li>3. Emitir ordens de servico dinamicas e salvar o historico no banco.</li>
            <li>4. Reabrir a pagina da ordem sempre que precisar imprimir novamente.</li>
          </ol>
        </aside>
      </div>
    </section>
  );
}
