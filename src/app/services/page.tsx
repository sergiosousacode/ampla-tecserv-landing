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
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth>
        <section className="mx-auto py-12 text-center sm:py-16 lg:py-20">
          <h2 className="mb-8 text-2xl font-bold text-white dark:text-text sm:text-3xl">NOSSOS SERVICOS</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="h-full rounded border bg-white p-6 text-left shadow-lg dark:bg-gray-800 sm:p-8">
              <Image
                src="/partners/suporte.svg"
                alt="Suporte técnico"
                width={100}
                height={100}
                className="mx-auto mb-4 h-auto w-20 rounded-full sm:w-[100px]"
              />
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Suporte Tecnico</h3>
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-base">
                Atendimento rapido e especializado para sua empresa. Nosso suporte pode ser remoto ou presencial, nas proximidades da sede da empresa.
              </p>
            </div>

            <div className="h-full rounded border bg-white p-6 text-left shadow-lg dark:bg-gray-800 sm:p-8">
              <Image
                src="/partners/servicos.svg"
                alt="Serviços de TI"
                width={100}
                height={100}
                className="mx-auto mb-4 h-auto w-20 sm:w-[100px]"
              />
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Assessoria a pequenas empresas</h3>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200 sm:text-base">
                Planejamento, orientacao e preparacao de documentos para microempresas, principalmente drogarias, em assuntos regulatorios junto a ANVISA, incluindo trocas de responsabilidade tecnica e legal, alteracoes cadastrais e declaracoes de porte.
              </p>
            </div>

            <div className="h-full rounded border bg-white p-6 text-left shadow-lg dark:bg-gray-800 sm:p-8">
              <Image
                src="/partners/automacao.svg"
                alt="Suporte técnico"
                width={100}
                height={100}
                className="mx-auto mb-4 h-auto w-20 sm:w-[100px]"
              />
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Automacao comercial</h3>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-200 sm:text-base">
                Estruturacao de rede servidor e terminal para pequenos comércios, com softwares homologados em todo o Brasil e meios de pagamento TEF para adequacao da emissao de notas vinculadas a NFC-e do estado.
              </p>
            </div>
          </div>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
