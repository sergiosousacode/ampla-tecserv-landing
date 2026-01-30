import Button_cta from "./ui/Button_cta";

export default function Hero() {
  return (
    <section className="">
        <div className="mx-auto px-4 py-25 text-center">
          <h2 className="text-white mb-4 text-3xl font-bold dark:text-text">
            SUPORTE E ASSESSORIA PARA EMPRESAS QUE NÃO PODEM PARAR.
          </h2>

          <p className="mb-8 text-2xl text-justify dark:text-text">
            Resolvemos os problemas de tecnologia que travam o crescimento da sua empresa. Criamos sistemas e aplicações sob medida para automatizar processos, reduzir erros e ganhar tempo. Implantamos, damos suporte e mantemos tudo funcionando para você focar no que realmente importa: vender e crescer. Atuamos com consultoria em TI para organizar a casa, melhorar a gestão e cortar desperdícios. Também oferecemos suporte técnico, manutenção de equipamentos e treinamentos práticos para que sua equipe produza mais e dependa menos de improviso.
          </p>
          <Button_cta />
        </div>
    </section>
  );
}
