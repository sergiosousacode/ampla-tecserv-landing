import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import { Wrapper } from "@/components/Layout/Wrapper";
import { MaxWidth } from "@/components/Layout/MaxWidth";

export default function Home() {
  return (
    <>
      <Wrapper className="bg-sky-500 px-50">
        <MaxWidth>
          <section id="topo">
            <Hero />
          </section>
        </MaxWidth>
          <MaxWidth>
          <section className="flex flex-col justify-center py-16 px-4">
              <h3 className="text-white text-2xl font-bold text-center mb-6">
                NOSSOS PARCEIROS COMERCIAIS
              </h3>

              <p className="text-black mx-auto mb-10 max-w-4xl text-justify">
                Trabalhamos com parceiros comerciais de renome para garantir que nossos clientes recebam as melhores soluções e serviços disponíveis no mercado. Nossa rede de parceiros nos permite oferecer uma ampla gama de tecnologias e expertise para atender às necessidades específicas de cada cliente.
              </p>

              {/* LOGOS */}
                <div className="grid place-items-center grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
                  
                  <Image src="/partners/arpa.svg" alt="Arpa Sistemas" width={100} height={100}
                    className="grayscale transition hover:grayscale-0" />

                  <Image src="/partners/khelpdesk.svg" alt="Suporte Remoto" width={100} height={100}
                    className="grayscale transition hover:grayscale-0" />

                  <Image src="/partners/prodo.svg" alt="Prodo Sistemas" width={160} height={80}
                    className="grayscale transition hover:grayscale-0" />

                  <Image src="/partners/mpcard.svg" alt="MP Card" width={160} height={80}
                    className="grayscale transition hover:grayscale-0" />

                  <Image src="/partners/intellitools.svg" alt="MP Card" width={100} height={100}
                    className="grayscale transition hover:grayscale-0" />
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
