import { Wrapper } from "@/components/Layout/Wrapper";
import { MaxWidth } from "@/components/Layout/MaxWidth";
import Button_wa from "@/components/ui/Button_wa";
import Button_email from "@/components/ui/Button_email";

export const metadata = {
  title: "Entre em Contato | Ampla TecServ",
  description:
    "Entre em contato com a Ampla TecServ e fale com especialistas em suporte e assessoria em TI.",
};

export default function Contact() {
  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth className="py-12 sm:py-16 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8 dark:bg-slate-900">
            <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
              Contato direto
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              PRECISA DE SUPORTE CONFIÁVEL?
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
              Fale com a Ampla TecServ e encontre a solução ideal para sua
              empresa. Estamos prontos para orientar, atender e montar o melhor
              caminho para a sua operação.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Button_wa />
              <Button_email />
            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Quando usar esta página?</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Solicitar suporte, tirar dúvidas sobre serviços, pedir uma proposta
                ou iniciar uma conversa sobre infraestrutura e sistemas.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-xl ring-1 ring-slate-200 sm:p-6 dark:bg-slate-900 dark:ring-white/10">
            <div className="mb-4 rounded-2xl bg-slate-50 p-4 text-slate-900 dark:bg-slate-950/50 dark:text-text">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                Localização
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                Atendimento on-line, via acesso remoto ou presencialmente aos Estados da Paraiba e Pernambuco
                e operacao adaptada à diferentes perfis de cliente.
              </p>
            </div>

            <div className="h-[300px] w-full overflow-hidden rounded-[1.5rem] sm:h-[380px]">
              <iframe
                src="https://www.google.com/maps?q=R.%20Severino%20Nicolau%20de%20Melo,%20420&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
