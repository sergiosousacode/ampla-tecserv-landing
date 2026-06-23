import Button_cta from "./ui/Button_cta";

export default function Hero() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="rounded-[2rem] bg-white/10 p-6 text-center text-white shadow-xl ring-1 ring-white/20 backdrop-blur sm:p-8 lg:p-10 dark:bg-white/5 dark:text-text">
        <span className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 dark:text-text">
          Operacao estável
        </span>

        <h3 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          TECNOLOGIAS E GESTÃO PARA PEQUENOS EMPREENDIMENTOS.
        </h3>

        <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-white/85 sm:text-lg dark:text-text">
          Somos especialistas em assessoria para drogarias e automação comercial para pequenos negócios. Automatizamos processos, organizamos a gestão e mantemos tudo funcionando — para você focar no que importa: <strong>VENDER e CRESCER.</strong>
        </p>

        <div className="mt-8">
          <Button_cta />
        </div>
      </div>
    </section>
  );
}
