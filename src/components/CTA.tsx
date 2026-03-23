import Button_cta from "./ui/Button_cta";

export default function CTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="rounded-[2rem] bg-slate-950 p-6 text-center text-white shadow-2xl ring-1 ring-white/10 sm:p-8 dark:bg-slate-900">
        <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
          Proximo passo
        </span>

        <h3 className="mt-5 text-2xl font-bold sm:text-3xl">
          PRONTO PARA MELHORAR A TECNOLOGIA DA SUA EMPRESA?
        </h3>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300 sm:text-lg">
          Entre em contato agora e fale com nossa equipe para organizar suporte,
          infraestrutura e crescimento com mais previsibilidade.
        </p>

        <div className="mt-8">
          <Button_cta />
        </div>
      </div>
    </section>
  );
}
