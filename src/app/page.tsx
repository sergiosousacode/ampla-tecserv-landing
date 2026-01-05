import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="container mx-auto py-16 text-center md:text-center">
        <h3 className="mb-4 text-3xl font-bold">Quem somos</h3>
        <p className="mx-auto max-w-3xl text-lg">
          A Ampla TecServ é especializada em suporte técnico e assessoria
          em TI para empresas que precisam de confiança e eficiência.
        </p>
      </section>

      <Testimonials />
      <CTA />
    </>
  );
}
