import { portalUsers } from "@/data/portal-admin";

export default function AdminUsersPage() {
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
          restrito aos próprios contratos e chamados.
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-slate-200 dark:bg-slate-950/60 dark:ring-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="px-5 py-4">Nome</th>
              <th className="px-5 py-4">E-mail</th>
              <th className="px-5 py-4">Perfil</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {portalUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-200 text-slate-800 dark:border-white/10 dark:text-slate-200"
              >
                <td className="px-5 py-4 font-medium">{user.name}</td>
                <td className="px-5 py-4">{user.email}</td>
                <td className="px-5 py-4 capitalize">{user.role}</td>
                <td className="px-5 py-4 capitalize">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Arquivos que entram aqui</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            O próximo passo natural e criar formulários de crição, edição e
            redefinicao de senha, alem de politicas de permissão por perfil.
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
