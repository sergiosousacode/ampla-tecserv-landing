import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import { Wrapper } from "@/components/Layout/Wrapper";
import { MaxWidth } from "@/components/Layout/MaxWidth";

export default function Home() {
  return (
    <>
      <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
        <MaxWidth>
          <section id="topo">
            <Hero />
          </section>
        </MaxWidth>
        <MaxWidth>
          <section className="flex flex-col justify-center py-12 sm:py-16">
            <h3 className="mb-6 text-center text-2xl font-bold text-white dark:text-text sm:text-3xl">
                NOSSOS PARCEIROS COMERCIAIS
            </h3>

            <p className="mb-8 text-base leading-7 text-justify dark:text-text sm:text-lg">
                Trabalhamos com parceiros comerciais de renome para garantir que nossos clientes recebam as melhores soluções e serviços disponíveis no mercado. Nossa rede de parceiros nos permite oferecer uma ampla gama de tecnologias e expertise para atender às necessidades específicas de cada cliente.
            </p>

            <div className="grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
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
          </section>
        </MaxWidth>
        <MaxWidth>
          <Testimonials />
        </MaxWidth>
        <MaxWidth>
          <CTA />
        </MaxWidth>
      </Wrapper>
    </>
  );
}
