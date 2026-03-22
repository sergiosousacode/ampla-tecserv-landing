import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";

export const metadata = {
  title: "Sobre a Ampla TecServ | Suporte e Assessoria em TI",
  description:
    "Conheça a Ampla TecServ, empresa especializada em suporte técnico, assessoria em TI e soluções tecnológicas para empresas que buscam eficiência e segurança.",
};

export default function About() {
  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth>
        <section className="mx-auto py-12 text-center sm:py-16 lg:py-20">
          <h2 className="mb-6 text-2xl font-bold text-white dark:text-text sm:text-3xl">
            UM POUCO DE NOSSA TRAJETORIA
          </h2>
          <div className="mx-auto max-w-3xl space-y-4 text-justify text-base leading-7 dark:text-text sm:text-lg">
            <p>
              A Ampla TecServ comecou sua historia em 2014, no estado de Pernambuco. No inicio, atuavamos com assessoria farmaceutica para drogarias, incluindo o suporte ao SNGPC, sistema responsavel pelo envio dos arquivos XML para a ANVISA.
            </p>
            <p>
              Com o passar do tempo, ampliamos nossa atuacao e passamos a oferecer softwares de automacao comercial de baixo custo, pensados especialmente para pequenos empreendimentos, tanto drogarias quanto outros tipos de comercios.
            </p>
            <p>
              Hoje, estamos sediados no estado da Paraiba e trabalhamos com softwares homologados e meios de pagamento que facilitam o dia a dia dos nossos clientes, alem de trazer mais seguranca e aumento no faturamento.
            </p>
            <p>
              Contamos com parceiros comerciais que fornecem alguns dos melhores softwares homologados do pais. Somando a isso, temos uma equipe de profissionais qualificados, pronta para oferecer suporte sempre que necessario.
            </p>
            <p>
              Nossa trajetoria sempre foi construida no boca a boca e na qualidade dos servicos prestados. Atuamos com assessoria farmaceutica para drogarias em todo o Brasil, transmitindo confianca e seguranca. Crescemos junto com nossos clientes e parceiros, mostrando que e possivel evoluir com quem entende do assunto.
            </p>
          </div>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
