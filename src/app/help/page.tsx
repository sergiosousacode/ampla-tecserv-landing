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
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth>
        <section className="mx-auto py-12 text-center sm:py-16 lg:py-20">
          <h2 className="mb-4 text-2xl font-bold text-white dark:text-text sm:text-3xl">CENTRAL DE AJUDA</h2>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 sm:text-lg">
            Já é cliente? Abra um chamado no nosso helpdesk.
          </p>

          <div className="flex justify-center">
            <Button_baixar />
          </div>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
