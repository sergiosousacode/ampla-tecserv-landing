import Link from "next/link";
import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";

export const metadata = {
  title: "Serviços",
  description: "Suporte em TI, automação comercial, desenvolvimento de sistemas e assessoria ANVISA para sua empresa.",
  alternates: { canonical: "/portal-servicos" },
  openGraph: {
    title: "Serviços | Ampla TecServ",
    description: "Suporte em TI, automação comercial, desenvolvimento de sistemas e assessoria ANVISA para sua empresa.",
    url: "https://www.amplatecserv.com.br/portal-servicos",
    siteName: "Ampla TecServ",
    locale: "pt_BR",
    type: "website",
  },
};

const quickAccess = [
  {
    title: "Suporte e assessoria em TI",
    description: "Suporte técnico, manutenção e orientação para manter a tecnologia da sua empresa funcionando.",
  },
  {
    title: "Sistemas e automação comercial",
    description: "Softwares homologados, automação para pequenos negócios e desenvolvimento de aplicações web sob medida.",
  },
  {
    title: "Assessoria ANVISA",
    description: "Assessoria para drogarias, suporte ao SNGPC e acompanhamento de processos junto à ANVISA.",
  },
];

export default function Services() {
  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth className="py-12 sm:py-16 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="rounded-[2rem] bg-white/10 p-6 text-white shadow-xl ring-1 ring-white/20 backdrop-blur sm:p-8 lg:p-10 dark:bg-white/5 dark:text-text">
            <span className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 dark:text-text">
              Nossos serviços
            </span>

            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Tecnologia e assessoria para o crescimento da sua empresa.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg dark:text-text">
              Conheça as soluções da Ampla TecServ em suporte, sistemas,
              automação comercial e assessoria farmacêutica. Entre em contato
              com nossa equipe para encontrar o atendimento adequado à sua empresa.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {quickAccess.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl bg-slate-950/20 p-5 ring-1 ring-white/15 dark:bg-slate-900/40"
                >
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/80 dark:text-text">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Fale com a equipe
                </p>
                <h2 className="mt-2 text-2xl font-bold">Solicite atendimento</h2>
              </div>

              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                Atendimento próximo
              </span>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Vamos conversar sobre sua necessidade</p>

              <Link
                href="/contact"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
              >
                Entre em contato
              </Link>
            </div>
          </aside>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
