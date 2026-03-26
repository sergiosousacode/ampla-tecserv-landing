import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";

export const metadata = {
  title: "Sobre a Ampla TecServ | Suporte e Assessoria em TI",
  description:
    "Conheça a Ampla TecServ, empresa especializada em suporte técnico, assessoria em TI e soluções tecnológicas para empresas que buscam eficiência e segurança.",
};

export default function About() {
  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth className="py-12 sm:py-16 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white/10 p-6 text-white shadow-xl ring-1 ring-white/20 backdrop-blur sm:p-8 lg:p-10 dark:bg-white/5 dark:text-text">
            <span className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 dark:text-text">
              Nossa história
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Uma trajetória construída com proximidade, suporte técnico em constante
              evolução.
            </h1>

            <div className="mt-6 space-y-4 text-base leading-7 text-white/85 sm:text-lg dark:text-text">
              <p>
                A Ampla TecServ iniciou sua história em 2014, no Estado de
                Pernambuco. No início, atuavamos com assessoria farmacêutica para
                drogarias, incluindo o suporte ao SNGPC (sistema responsável pelo
                envio dos arquivos XML para a ANVISA).
              </p>
              <p>
                Com o passar do tempo, ampliamos nossa atuação e passamos a
                oferecer softwares de automação comercial de baixo custo,
                pensados especialmente para pequenos empreendimentos, tanto
                drogarias quanto outros tipos de comércios.
              </p>
              <p>
                Hoje, estamos sediados no estado da Paraíba e trabalhamos com
                softwares homologados e meios de pagamento que facilitam o dia a
                dia dos nossos clientes, alem de trazer mais seguranca e ampliação 
                no faturamento.
              </p>
              <p>
                Contamos com parceiros comerciais que fornecem alguns dos
                melhores softwares homologados do país. Somando a isso, temos
                uma equipe de profissionais e parceiros qualificados, prontos para oferecer
                suporte sempre que necessário.
              </p>
              <p>
                Nossa trajetória sempre foi construída no porta a porta, prezando sempre na
                qualidade dos servicos prestados e no crescimento de nossos clientes. Atuamos com assessoria
                farmacêutica para drogarias em todo o Brasil, transmitindo
                confianca e eficiência aos nossos clientes.
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-xl ring-1 ring-slate-200 sm:p-8 dark:bg-slate-900 dark:text-text dark:ring-white/10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
              O que sustenta a Ampla
            </p>

            <div className="mt-6 space-y-5">
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-white/10">
                <h2 className="text-lg font-semibold">Atendimento próximo</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Crescemos com relacionamento direto, linguagem simples e apoio
                  contínuo para empresas que precisam de resposta rápida.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-white/10">
                <h2 className="text-lg font-semibold">Especialização prática</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Unimos assessoria para drogarias, automação comercial e suporte
                  operacional em uma entrega mais completa.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-white/10">
                <h2 className="text-lg font-semibold">Crescimento com segurança</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  A evolucao da empresa acompanha as necessidades dos clientes,
                  sem perder estabilidade, conformidade e continuidade.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
