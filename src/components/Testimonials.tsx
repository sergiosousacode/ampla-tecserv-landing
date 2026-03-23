import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mb-8 text-center">
        <span className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 dark:text-text">
          Relacionamento
        </span>
      </div>

      <h3 className="mb-10 text-center text-2xl font-bold text-white dark:text-text sm:text-3xl">
        O QUE DIZEM NOSSOS CLIENTES!
      </h3>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <article
            key={t.id}
            className="mx-auto flex h-full max-w-sm flex-col rounded-[2rem] bg-white p-6 text-center text-slate-900 shadow-xl ring-1 ring-slate-200 dark:bg-slate-900 dark:text-text dark:ring-white/10"
            aria-labelledby={`t-${t.id}-name`}
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <Image
                src={t.avatar ?? "/partners/logo_ampla.svg"}
                alt={`${t.name} avatar`}
                width={80}
                height={80}
                className="object-contain"
                loading="lazy"
                sizes="80px"
              />
            </div>

            <p className="mb-4 flex-1 text-base italic leading-7 text-slate-700 dark:text-slate-300">
              {t.quote}
            </p>

            <strong id={`t-${t.id}-name`} className="block text-slate-900 dark:text-gray-100">
              {t.name}
            </strong>
            {t.role && <span className="text-sm text-slate-500 dark:text-slate-400">{t.role}</span>}
          </article>
        ))}
      </div>
    </section>
  );
}
