import { UserRole } from "@prisma/client";
import AdminUserCreateForm from "@/components/portal/AdminUserCreateForm";
import AdminUserManageCard from "@/components/portal/AdminUserManageCard";
import { requirePortalRole } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

const roleLabel: Record<UserRole, string> = {
  ADMIN: "Administrador",
  OPERATIONAL: "Operacional",
  CLIENT: "Cliente",
};

const statusLabel = {
  ACTIVE: "Ativo",
  PENDING: "Pendente",
  INACTIVE: "Inativo",
};

export default async function AdminUsersPage() {
  await requirePortalRole(UserRole.ADMIN);
  const prisma = getPrisma();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="grid gap-6">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
          Cadastro de usuários
        </p>
        <h2 className="mt-3 text-2xl font-bold">Controle de acesso administrativo</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Esta área foi preparada para centralizar administradores, operação
          interna e, numa próxima fase, usuários do tipo cliente com acesso
          restrito aos próprios contratos e chamados. Apenas administradores
          podem entrar aqui para gerenciar perfis e status de acesso.
        </p>
      </div>

      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
          Novo acesso
        </p>
        <h3 className="mt-3 text-xl font-bold">Criar usuario com senha inicial</h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Use este formulario para liberar login de administradores, operacao e
          clientes sem depender do seed. A senha informada aqui ja fica pronta
          para uso no portal.
        </p>

        <div className="mt-6">
          <AdminUserCreateForm />
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-slate-200 dark:bg-slate-950/60 dark:ring-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="px-5 py-4">Nome</th>
              <th className="px-5 py-4">E-mail</th>
              <th className="px-5 py-4">Perfil</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-200 text-slate-800 dark:border-white/10 dark:text-slate-200"
              >
                <td className="px-5 py-4 font-medium">{user.name}</td>
                <td className="px-5 py-4">{user.email}</td>
                <td className="px-5 py-4">{roleLabel[user.role]}</td>
                <td className="px-5 py-4">{statusLabel[user.status]}</td>
                <td className="px-5 py-4">
                  {new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(user.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
            Edicao e recuperacao
          </p>
          <h3 className="mt-3 text-xl font-bold">
            Atualize perfil, status e senha de qualquer usuario
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
            Esta secao foi pensada para suporte administrativo do dia a dia,
            inclusive em casos de perda de senha. A redefinicao abaixo troca a
            senha no banco e o novo acesso vale imediatamente.
          </p>
        </div>

        {users.map((user) => (
          <AdminUserManageCard
            key={`manage-${user.id}`}
            user={{
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              status: user.status,
            }}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Arquivos que entram aqui</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            O cadastro inicial ja cria a senha com hash bcrypt no banco. Agora
            a area tambem cobre edicao de perfil, status e redefinicao manual de
            senha para recuperacao de acesso.
          </p>
        </article>

        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Campos recomendados</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Nome, e-mail, perfil, empresa vinculada, status, último acesso e
            histórico de alterações administrativas.
          </p>
        </article>
      </div>
    </section>
  );
}
