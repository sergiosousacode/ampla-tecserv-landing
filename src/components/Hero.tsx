import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-[url('/bg_service.jpg')] bg-cover bg-center p-8">
      <div className="container p-8 text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-3xl">
          Suporte e assessoria para empresas que não podem parar.
        </h2>

        <p className="mx-auto mb-8 max-w-4xl text-justify">
          Resolvemos os problemas de tecnologia que travam o crescimento da sua empresa. Criamos sistemas e aplicações sob medida para automatizar processos, reduzir erros e ganhar tempo. Implantamos, damos suporte e mantemos tudo funcionando para você focar no que realmente importa: vender e crescer. Atuamos com consultoria em TI para organizar a casa, melhorar a gestão e cortar desperdícios. Também oferecemos suporte técnico, manutenção de equipamentos e treinamentos práticos para que sua equipe produza mais e dependa menos de improviso.
        </p>

        <a
          href="/contact"
          className="rounded bg-blue-600 px-8 py-4 text-white text-lg hover:bg-blue-700"
        >
          Fale com um especialista
        </a>
      </div>
    </section>
  );
}
