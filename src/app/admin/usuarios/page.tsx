import { portalUsers } from "@/data/portal-admin";

export default function AdminUsersPage() {
  return (
    <section className="grid gap-6">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
          Cadastro de usuarios
        </p>
        <h2 className="mt-3 text-2xl font-bold">Controle de acesso administrativo</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Esta area foi preparada para centralizar administradores, operacao
          interna e, numa proxima fase, usuarios do tipo cliente com acesso
          restrito aos proprios contratos e chamados.
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
            O proximo passo natural e criar formularios de criacao, edicao e
            redefinicao de senha, alem de politicas de permissao por perfil.
          </p>
        </article>

        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Campos recomendados</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Nome, e-mail, perfil, empresa vinculada, status, ultimo acesso e
            historico de alteracoes administrativas.
          </p>
        </article>
      </div>
    </section>
  );
}
