import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";

export const metadata = {
  title: "Sobre a Ampla TecServ | TI, Sistemas e Assessoria ANVISA",
  description:
    "Conheça a Ampla TecServ. Há mais de 10 anos oferecendo suporte de TI, desenvolvimento de sistemas, automação comercial e assessoria ANVISA para empresas em todo o Brasil.",
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
              Quem somos?
            </h1>

            <div className="mt-6 space-y-4 text-base leading-7 text-white/85 sm:text-lg dark:text-text">
              <p>
                A Ampla TecServ nasceu em 2014, em Pernambuco, com um propósito claro: simplificar a tecnologia para quem toca um negócio de verdade.
              </p>
              <p>
                Começamos com assessoria farmacêutica para drogarias, incluindo suporte ao SNGPC e envio dos arquivos XML à ANVISA. Com o tempo, ampliamos nossa atuação e passamos a oferecer soluções de automação comercial acessíveis para pequenos negócios — drogarias, farmácias e outros tipos de comércio.
              </p>
              <p>
                Hoje, sediados na Paraíba e com 12 anos de trajetória, atendemos clientes em todo o Brasil. Nossa atuação cobre desde softwares homologados e meios de pagamento até o desenvolvimento de aplicações web sob medida — sempre com suporte próximo e comprometido com o crescimento de cada cliente.
              </p>
              <p>
                Somos especialistas em assessoria a drogarias e conformidade com a ANVISA, e trabalhamos com parceiros que oferecem alguns dos melhores softwares homologados do país.
              </p>
              <p>
                Nossa história foi construída no porta a porta, com qualidade, confiança e foco no resultado dos nossos clientes. E é assim que seguimos.
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-xl ring-1 ring-slate-200 sm:p-8 dark:bg-slate-900 dark:text-text dark:ring-white/10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
              Porque escolher a AMPLA TecServ?
            </p>

            <div className="mt-6 space-y-5">
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-white/10">
                <h2 className="text-lg font-semibold">Atendimento personalizado</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Seja onde for, estamos sempre ao seu lado com suporte e orientação remota ou presencial. Atualmente ampliamos nosso atendimento em todo território nacional e oferecemos nossas soluções conforme sua necessidade.
                  <p>
                    <i>✌️Acreditar em nossos clientes é o segredo do nosso sucesso!</i>
                  </p>
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-white/10">
                <h2 className="text-lg font-semibold">Somos especialistas em Assessoria farmacêutica</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Burocracia é complicado e costumamos descomplicar. Fazemos sua análise na hora e entregamos o parece técnico sem compromisso, sem surpresas e com garantia de quem faz e acontece. Garantimos do pagamento de sua GRU e fazemos todo acompanhamento até a publicação do DOU.
                  <p>
                    ✌️<i>Garantia de quem sabe fazer!</i>
                  </p>
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950/50 dark:ring-white/10">
                <h2 className="text-lg font-semibold">12 anos de experiência no Mercado</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Sabemos que é um grande desafio empreender e uma empresa com 12 anos de prestação de serviços com seus clientes, mostra a capacidade e o compromisso na entrega de produtos digitais confiáveis e melhor resolução.
                  <p>
                    <i>✌️Nós não temos clientes, temos parceiros. Vem pro time AMPLA!</i>
                  </p>
                </p>
              </div>
            </div>
          </aside>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
