import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import { Wrapper } from "@/components/Layout/Wrapper";
import { MaxWidth } from "@/components/Layout/MaxWidth";

export default function Home() {
  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth>
        <section id="topo">
          <Hero />
        </section>
      </MaxWidth>
      <MaxWidth>
        <section className="py-12 sm:py-16">
          <div className="rounded-[2rem] bg-white p-6 text-slate-900 shadow-xl ring-1 ring-slate-200 sm:p-8 lg:p-10 dark:bg-slate-900 dark:text-text dark:ring-white/10">
            <div className="text-center">
              <span className="inline-flex rounded-full border border-sky-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:border-sky-400/30 dark:text-sky-300">
                Ecossistema
              </span>

              <h3 className="mt-5 text-2xl font-bold sm:text-3xl">
                NOSSOS PARCEIROS COMERCIAIS
              </h3>

              <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-slate-700 dark:text-slate-300 sm:text-lg">
                Trabalhamos com parceiros comerciais de renome para garantir que
                nossos clientes recebam as melhores soluções e serviços
                disponivéis no mercado. Nossa rede amplia a capacidade de entrega
                e nos permite montar soluções ajustadas a cada necessidade.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 place-items-center gap-6 rounded-[1.5rem] bg-slate-50 p-6 ring-1 ring-slate-200 sm:grid-cols-3 md:grid-cols-5 dark:bg-slate-950/50 dark:ring-white/10">
              <Image
                src="/partners/arpa.svg"
                alt="Arpa Sistemas"
                width={100}
                height={100}
                className="h-auto w-16 grayscale transition hover:grayscale-0 sm:w-20 md:w-[100px]"
                sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 100px"
                loading="lazy"
              />

              <Image
                src="/partners/khelpdesk.svg"
                alt="Suporte Remoto"
                width={100}
                height={100}
                className="h-auto w-16 grayscale transition hover:grayscale-0 sm:w-20 md:w-[100px]"
                sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 100px"
                loading="lazy"
              />

              <Image
                src="/partners/prodo.svg"
                alt="Prodo Sistemas"
                width={160}
                height={80}
                className="h-auto w-24 grayscale transition hover:grayscale-0 sm:w-32 md:w-[160px]"
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 120px, 160px"
                loading="lazy"
              />

              <Image
                src="/partners/mpcard.svg"
                alt="MP Card"
                width={160}
                height={80}
                className="h-auto w-24 grayscale transition hover:grayscale-0 sm:w-32 md:w-[160px]"
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 120px, 160px"
                loading="lazy"
              />

              <Image
                src="/partners/intellitools.svg"
                alt="Intellitools SNGPC"
                width={100}
                height={100}
                className="h-auto w-16 grayscale transition hover:grayscale-0 sm:w-20 md:w-[100px]"
                sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 100px"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </MaxWidth>
      <MaxWidth>
        <Testimonials />
      </MaxWidth>
      <MaxWidth>
        <CTA />
      </MaxWidth>
    </Wrapper>
  );
}
