import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="flex flex-col justify-around py-16">
      <h3 className="text-white mb-10 text-center text-3xl font-bold dark:text-text">
        O QUE DIZEM NOSSOS CLIENTES!
      </h3>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <article key={t.id} className="max-w-sm mx-auto rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md text-center" aria-labelledby={`t-${t.id}-name`}>
            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
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

            <p className="mb-4 italic text-gray-700 dark:text-gray-300 text-base">{t.quote}</p>

            <strong id={`t-${t.id}-name`} className="block text-gray-900 dark:text-gray-100">{t.name}</strong>
            {t.role && <span className="text-sm text-gray-500 dark:text-gray-400">{t.role}</span>}
          </article>
        ))}
      </div>
    </section>
  );
}
