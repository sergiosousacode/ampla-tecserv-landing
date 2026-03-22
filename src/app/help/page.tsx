import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";
import Button_baixar from "@/components/ui/Button_baixar";

export const metadata = {
  title: "Help Desk | Ampla TecServ",
  description:
    "Acesse a central de ajuda e abra chamados de suporte com a Ampla TecServ.",
};

export default function Help() {
  return (
    <Wrapper className="bg-sky-500 min-h-screen px-50 dark:bg-bg">
      <MaxWidth>
        <section className="mx-auto text-center py-16 px-4">
          <h2 className="text-white mb-4 text-3xl font-bold dark:text-text">CENTRAL DE AJUDA</h2>

            <p className="mb-8 text-2xl">
              Já é cliente? Abra um chamado no nosso helpdesk.
            </p>

            <Button_baixar />
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
