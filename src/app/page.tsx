import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import { Wrapper } from "@/components/Layout/Wrapper";
import { MaxWidth } from "@/components/Layout/MaxWidth";

export default function Home() {
  return (
    <>
      <Wrapper className="bg-sky-500 min-h-screen px-50 dark:bg-bg">
        <MaxWidth>
          <section id="topo">
            <Hero />
          </section>
        </MaxWidth>
          <MaxWidth>
          <section className="flex flex-col justify-center py-16 px-4">
              <h3 className="text-white text-3xl font-bold text-center mb-6 dark:text-text">
                NOSSOS PARCEIROS COMERCIAIS
              </h3>

              <p className="mb-8 text-2xl text-justify dark:text-text">
                Trabalhamos com parceiros comerciais de renome para garantir que nossos clientes recebam as melhores soluções e serviços disponíveis no mercado. Nossa rede de parceiros nos permite oferecer uma ampla gama de tecnologias e expertise para atender às necessidades específicas de cada cliente.
              </p>

              {/* LOGOS */}
                <div className="grid place-items-center grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
                  
                  <Image
                    src="/partners/arpa.svg"
                    alt="Arpa Sistemas"
                    width={100}
                    height={100}
                    className="grayscale transition hover:grayscale-0"
                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 100px"
                    loading="lazy"
                  />

                  <Image
                    src="/partners/khelpdesk.svg"
                    alt="Suporte Remoto"
                    width={100}
                    height={100}
                    className="grayscale transition hover:grayscale-0"
                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 100px"
                    loading="lazy"
                  />

                  <Image
                    src="/partners/prodo.svg"
                    alt="Prodo Sistemas"
                    width={160}
                    height={80}
                    className="grayscale transition hover:grayscale-0"
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 120px, 160px"
                    loading="lazy"
                  />

                  <Image
                    src="/partners/mpcard.svg"
                    alt="MP Card"
                    width={160}
                    height={80}
                    className="grayscale transition hover:grayscale-0"
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 120px, 160px"
                    loading="lazy"
                  />

                  <Image
                    src="/partners/intellitools.svg"
                    alt="Intellitools SNGPC"
                    width={100}
                    height={100}
                    className="grayscale transition hover:grayscale-0"
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
