import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";
import Button_baixar from "@/components/ui/Button_baixar";

export const metadata = {
  title: "Help Desk | Ampla TecServ",
  description:
    "Acesse a central de ajuda e suporte helpdesk de chamados com a Ampla TecServ.",
};

export default function Help() {
  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth className="py-12 sm:py-16 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white/10 p-6 text-white shadow-xl ring-1 ring-white/20 backdrop-blur sm:p-8 lg:p-10 dark:bg-white/5 dark:text-text">
            <span className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 dark:text-text">
              Suporte ativo
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              CENTRAL DE AJUDA
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/85 sm:text-lg dark:text-text">
              Se você já e cliente, faça o download do aquivo abaixo para podermos te ajudar com o HelpDesk. Execute na sua máquina e tire um print da tela para quue o técnico posso atender sua demanda. Você verá uma tela onde você confirma a conexão.
            </p>

            <div className="mt-8">
              <Button_baixar />
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-xl ring-1 ring-slate-200 sm:p-8 dark:bg-slate-900 dark:text-text dark:ring-white/10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
              Como esta área ajuda
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-white/10">
                <h2 className="text-lg font-semibold">Abrir chamado com contexto</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Você poderá clicar em "SOLICITAR AJUDA" abaixa para informar o problema, prioridade e detalhes técnicos para reduzir
                  retrabalho e acelerar o ínicio do seu atendimento.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-white/10">
                <h2 className="text-lg font-semibold">Acompanhar a execução.</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Use o helpdesk como ponto central para acesso remoto, nós verificamos suas
                  pendências e os próximos passos de sua solução. Esteja sempre presente em tela, algumas observações poderão ser solicitadas e acompanhando o processo você aprende com as ocorrências. Mantenha o software sempre bem atualizado.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
