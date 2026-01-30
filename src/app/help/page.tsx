import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";

export const metadata = {
  title: "Help Desk | Ampla TecServ",
  description:
    "Acesse a central de ajuda e abra chamados de suporte com a Ampla TecServ.",
};

export default function Help() {
  return (
    <Wrapper className="bg-sky-500 px-50">
      <MaxWidth>
        <section className="mt-20 mx-auto px-4 text-center">
          <h2 className="text-blue-600 mb-4 text-2xl font-bold">Central de Ajuda</h2>

            <p className="mb-8 text-lg">
              Já é cliente? Abra um chamado no nosso helpdesk.
            </p>

            <a
              href="#"
              className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Baixar Helpdesk
            </a>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
