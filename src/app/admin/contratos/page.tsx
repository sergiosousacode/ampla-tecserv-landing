import { contractRecords } from "@/data/portal-admin";

export default function AdminContractsPage() {
  return (
    <section className="grid gap-6">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
          Contratos e documentos
        </p>
        <h2 className="mt-3 text-2xl font-bold">
          Elaboracao, PDF e compartilhamento
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          Aqui voce organiza a geracao de contratos por cliente, acompanha status,
          define o canal de envio e prepara a proxima etapa de impressao ou
          exportacao em PDF.
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-slate-200 dark:bg-slate-950/60 dark:ring-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="px-5 py-4">Cliente</th>
              <th className="px-5 py-4">Servico</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">PDF</th>
              <th className="px-5 py-4">Compartilhamento</th>
            </tr>
          </thead>
          <tbody>
            {contractRecords.map((contract) => (
              <tr
                key={contract.id}
                className="border-t border-slate-200 text-slate-800 dark:border-white/10 dark:text-slate-200"
              >
                <td className="px-5 py-4 font-medium">{contract.client}</td>
                <td className="px-5 py-4">{contract.service}</td>
                <td className="px-5 py-4 capitalize">{contract.status}</td>
                <td className="px-5 py-4 capitalize">{contract.pdfStatus}</td>
                <td className="px-5 py-4 uppercase">{contract.sharing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Arquivos e recursos</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            O passo seguinte e criar um editor de contratos, templates com dados
            variaveis e uma funcao de exportacao para PDF antes do envio.
          </p>
        </article>

        <article className="rounded-[1.5rem] bg-white/5 p-5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Canais de entrega</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            O contrato pode ser compartilhado por e-mail, WhatsApp ou dentro do
            proprio portal, conforme o perfil de cada cliente.
          </p>
        </article>
      </div>
    </section>
  );
}
