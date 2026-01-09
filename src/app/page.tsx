import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon-v2.ico" />
      </Head>
      <Hero />
      <section className="container p-8 mx-auto py-16 text-center md:text-center">
        <h3 className="text-blue-600 mb-4 text-2xl

 font-bold">Nossos Parceiros Comerciais</h3>
        <p className="text-black mx-auto mb-8 max-w-4xl text-justify">
          Trabalhamos com parceiros comerciais de renome para garantir que nossos clientes recebam as melhores soluções e serviços disponíveis no mercado. Nossa rede de parceiros nos permite oferecer uma ampla gama de tecnologias e expertise para atender às necessidades específicas de cada cliente.
        </p>
        {/* LOGOS */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          <Image
            src="/partners/arpa.svg"
            alt="Arpa Sistemas"
            width={100}
            height={100}
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
            width={100}
            height={100}
            className="mx-auto grayscale transition hover:grayscale-0"
          />
          <Image
            src="/partners/prodo.svg"
            alt="Prodo Sistemas"
            width={160}
            height={80}
            className="mx-auto grayscale transition hover:grayscale-0"
          />
          <Image
            src="/partners/mpcard.svg"
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
