import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import Container from "@/components/Container";

export default function Home() {
  return (
    <>
      <div id="topo">
        <Hero />
      </div>

      {/* SECTION full width */}
      <section className="bg-white py-12">
        {/* CONTAINER só pro conteúdo */}
        <Container className="text-center">
          
          <h3 className="text-blue-600 text-2xl font-bold">
            Nossos Parceiros Comerciais
          </h3>

          <p className="text-black mx-auto mb-10 max-w-4xl text-justify">
            Trabalhamos com parceiros comerciais de renome para garantir que nossos clientes recebam as melhores soluções e serviços disponíveis no mercado. Nossa rede de parceiros nos permite oferecer uma ampla gama de tecnologias e expertise para atender às necessidades específicas de cada cliente.
          </p>

          {/* LOGOS */}
          <div className="max-w-1xl mx-auto">

            <div className="grid place-items-center grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
              
              <Image src="/partners/arpa.svg" alt="Arpa Sistemas" width={100} height={100}
                className="grayscale transition hover:grayscale-0" />

              <Image src="/partners/intellitools.svg" alt="Intellitools SNGPC" width={160} height={80}
                className="grayscale transition hover:grayscale-0" />

              <Image src="/partners/khelpdesk.svg" alt="Suporte Remoto" width={100} height={100}
                className="grayscale transition hover:grayscale-0" />

              <Image src="/partners/prodo.svg" alt="Prodo Sistemas" width={160} height={80}
                className="grayscale transition hover:grayscale-0" />

              <Image src="/partners/mpcard.svg" alt="MP Card" width={160} height={80}
                className="grayscale transition hover:grayscale-0" />
            </div>
          </div>

        </Container>
      </section>

      <Testimonials />
      <CTA />
    </>
  );
}
