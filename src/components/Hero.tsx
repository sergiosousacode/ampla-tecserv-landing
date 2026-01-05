import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-3xl">
          Suporte e assessoria em TI para empresas que não podem parar
        </h2>

        <p className="text-black mx-auto mb-8 max-w-4xl text-justify">
          Prestar serviços de desenvolvimento, implantação, suporte e manutenção de sistemas e aplicações de software, incluindo soluções web e tecnológicas sob demanda. Atuar com consultoria em tecnologia da informação, gestão e organização empresarial. Oferecer suporte técnico, manutenção de equipamentos e soluções digitais. Realizar treinamentos, cursos livres e capacitações na área de tecnologia e inovação.
        </p>

        <a
          href="/contact"
          className="rounded bg-blue-600 px-8 py-4 text-white text-lg hover:bg-blue-700 shadow-2xl"
        >
          Fale com um especialista
        </a>
      </div>
    </section>
  );
}
