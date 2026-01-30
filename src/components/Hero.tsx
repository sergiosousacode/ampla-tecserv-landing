import Button_cta from "./ui/Button_cta";

export default function Hero() {
  return (
    <section className="p-8 bg-fixed">

        <div className="flex flex-col justify-items-center w-full px-4 py-16 text-black md:px-8">
          <h2 className="mb-6 font-bold md:text-2xl text-center text-white">
            SUPORTE E ASSESSORIA PARA EMPRESAS QUE NÃO PODEM PARAR.
          </h2>

          <p className="mx-auto mb-8 max-w-4xl text-justify">
            Resolvemos os problemas de tecnologia que travam o crescimento da sua empresa. Criamos sistemas e aplicações sob medida para automatizar processos, reduzir erros e ganhar tempo. Implantamos, damos suporte e mantemos tudo funcionando para você focar no que realmente importa: vender e crescer. Atuamos com consultoria em TI para organizar a casa, melhorar a gestão e cortar desperdícios. Também oferecemos suporte técnico, manutenção de equipamentos e treinamentos práticos para que sua equipe produza mais e dependa menos de improviso.
          </p>
          <Button_cta />
        </div>
    </section>
  );
}
