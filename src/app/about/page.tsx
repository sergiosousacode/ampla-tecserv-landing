import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";

export const metadata = {
  title: "Sobre a Ampla TecServ | Suporte e Assessoria em TI",
  description:
    "Conheça a Ampla TecServ, empresa especializada em suporte técnico, assessoria em TI e soluções tecnológicas para empresas que buscam eficiência e segurança.",
};

export default function About() {
  return (
    <Wrapper className="bg-sky-500 min-h-screen px-50 dark:bg-bg">
      <MaxWidth>
        <section className="mx-auto px-4 text-center md:text-center py-25">
          <h2 className="text-3xl text-white mb-4 font-bold dark:text-text">UM POUCO DE NOSSA TRAJETÓRIA</h2>
            <p className="mx-auto max-w-2xl text-justify">
              A Ampla TecServ começou sua história em 2014, no estado de Pernambuco. No início, atuávamos com assessoria farmacêutica para drogarias, incluindo o suporte ao SNGPC, sistema responsável pelo envio dos arquivos XML para a ANVISA.<br/><br/>Com o passar do tempo, ampliamos nossa atuação e passamos a oferecer softwares de automação comercial de baixo custo, pensados especialmente para pequenos empreendimentos — tanto drogarias quanto outros tipos de comércios.<br/><br/>Hoje, estamos sediados no estado da Paraíba e trabalhamos com softwares homologados e meios de pagamento que facilitam o dia a dia dos nossos clientes, além de trazer mais segurança e aumento no faturamento.<br/><br/>Contamos com parceiros comerciais que fornecem alguns dos melhores softwares homologados do país. Somando a isso, temos uma equipe de profissionais qualificados, pronta para oferecer suporte sempre que necessário.<br/><br/>Nossa trajetória sempre foi construída no boca a boca e na qualidade dos serviços prestados. Atuamos com assessoria farmacêutica para drogarias em todo o Brasil, transmitindo confiança e segurança. Crescemos junto com nossos clientes e parceiros, mostrando que é possível evoluir com quem entende do assunto.
            </p>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
