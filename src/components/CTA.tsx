import Button_cta from "./ui/Button_cta";
import { Wrapper } from "@/components/Layout/Wrapper";
import { MaxWidth } from "@/components/Layout/MaxWidth";

export default function CTA() {
  return (
    <MaxWidth>
      <Wrapper className="bg-sky-500 py-16 px-4 rounded-lg dark:bg-bg">
        <section className="text-center">
            <h3 className="text-white mb-1 text-3xl font-bold p-1 dark:text-text">
              PRONTO PARA MELHORAR A TECNOLOGIA DA SUA EMPRESA?
            </h3>

            <p className="mb-8 text-2xl px-4">
              Entre em contato agora e fale com nossa equipe.
            </p>
            <Button_cta />
        </section>
      </Wrapper>
    </MaxWidth>
  );
}
