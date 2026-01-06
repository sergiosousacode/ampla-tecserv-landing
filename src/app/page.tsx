import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container mx-auto py-16 text-center md:text-center">
        <h3 className="mb-4 text-3xl font-bold">Nossos Parceiros Comerciais</h3>
        <p className="mx-auto max-w-3xl text-lg mb-8">
          Trabalhamos com parceiros comerciais de renome para garantir que nossos clientes recebam as melhores soluções e serviços disponíveis no mercado. Nossa rede de parceiros nos permite oferecer uma ampla gama de tecnologias e expertise para atender às necessidades específicas de cada cliente.
        </p>
        {/* LOGOS */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          <Image
            src="/partners/arpa.svg"
            alt="Arpa Sistemas"
            width={160}
            height={80}
            className="mx-auto grayscale transition hover:grayscale-0"
          />
          <Image
            src="/partners/intellitools.svg"
            alt="Intellitools SNGPC"
            width={160}
            height={80}
            className="mx-auto grayscale transition hover:grayscale-0"
          />
          <Image
            src="/partners/khelpdesk.svg"
            alt="Suporte Remoto"
            width={160}
            height={80}
            className="mx-auto grayscale transition hover:grayscale-0"
          />
          <Image
            src="/partners/prodo.svg"
            alt="Prodo Sistemas"
            width={160}
            height={80}
            className="mx-auto grayscale transition hover:grayscale-0"
          />
        </div>
        
      </section>

      <Testimonials />
      <CTA />
    </>
  );
}
