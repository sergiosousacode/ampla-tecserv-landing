import { UserStatus } from "@prisma/client";
import AdminClientCreateForm from "@/components/portal/AdminClientCreateForm";
import { requirePortalAdminAccess } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

const statusLabel: Record<UserStatus, string> = {
  ACTIVE: "Ativo",
  PENDING: "Pendente",
  INACTIVE: "Inativo",
};

export default async function AdminClientsPage() {
  await requirePortalAdminAccess();

  const prisma = getPrisma();
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="grid gap-6">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
          Clientes
        </p>
        <h2 className="mt-3 text-2xl font-bold">Base de empresas para ordens de serviços</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Este cadastro alimenta o editor de ordens. Ao criar uma nova empresa
          aqui, ela já fica disponível para seleção no fluxo operacional.
        </p>
      </div>

      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <h3 className="text-xl font-bold">Cadastrar cliente</h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Use um cadastro leve no MVP. Depois podemos expandir para endereço,
          anexos, multiplos contatos e vinculo com usuários cliente.
        </p>

        <div className="mt-6">
          <AdminClientCreateForm />
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-slate-200 dark:bg-slate-950/60 dark:ring-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="px-5 py-4">Empresa</th>
              <th className="px-5 py-4">Responsável</th>
              <th className="px-5 py-4">Contato</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-t border-slate-200 text-slate-800 dark:border-white/10 dark:text-slate-200"
              >
                <td className="px-5 py-4 font-medium">{client.companyName}</td>
                <td className="px-5 py-4">{client.contactName || "-"}</td>
                <td className="px-5 py-4">
                  {client.email || client.phone || client.document || "-"}
                </td>
                <td className="px-5 py-4">{statusLabel[client.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
