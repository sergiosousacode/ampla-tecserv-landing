import Image from "next/image";
import { Wrapper } from "@/components/Layout/Wrapper";
import { MaxWidth } from "@/components/Layout/MaxWidth";

export const metadata = {
  title: "Nossos Serviços | Ampla TecServ",
  description:
    "Serviços de suporte técnico, assessoria em TI e infraestrutura para empresas.",
};

export default function Services() {
  return (
    <Wrapper className="bg-sky-500 min-h-screen px-50 dark:bg-bg">
      <MaxWidth>
        <section className="mx-auto text-center py-16 px-50">
          <h2 className="text-white mb-8 text-2xl font-bold dark:text-text">NOSSOS SERVIÇOS</h2>
          <div className="flex flex-wrap gap-6">
            <div className="rounded outline-4 outline-offset-2 bg-white dark:bg-gray-800 border p-10 shadow-lg text-justify">
              <Image
                src="/partners/suporte.svg"
                alt="Suporte técnico"
                width={100}
                height={100}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="font-bold">Suporte Técnico</h3>
              <p>Atendimento rápido e especializado para sua empresa. Nosso suporte pode ser remotamente ou presencial, nas proximidades da sede de nossa empresa.</p>
            </div>

            <div className="rounded outline-4 outline-offset-2 bg-white dark:bg-gray-800 border p-10 shadow-lg text-justify">
              <Image
                src="/partners/servicos.svg"
                alt="Serviços de TI"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold">Assessoria à pequenas empresas</h3>
              <p>Planejamento, orientação e preparação de documentos para Microempresas, principalmente no ramo de Drogarias ao que se refere a assuntos regulatórios junto a ANVISA. Troca de Responsabilidade técnica e legal, alterações de cadastro de Pessoas Física e Juídica, declaração de porte e outros serviços relacionados a Regulados.</p>
            </div>

            <div className="rounded outline-4 outline-offset-2 bg-white dark:bg-gray-800 border p-10 shadow-lg text-justify">
              <Image
                src="/partners/automacao.svg"
                alt="Suporte técnico"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold">Automação comercial</h3>
              <p>Construção de rede cooporativa SERVIDOR e TERMINAL em automação comercial para pequenos comércios. Nossos parceiros comerciais nos fornece softwares homologados, atendendo todos os Estados brasileiros. Fornecemos também meios de pagamento TEF, exigência para empresas de adequar à emissão de notas vinculadas a NFCE do seu estado</p>
            </div>
          </div>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}

