import { Wrapper } from "@/components/Layout/Wrapper";
import { MaxWidth } from "@/components/Layout/MaxWidth";
import Button_wa from "@/components/ui/Button_wa";
import Button_email from "@/components/ui/Button_email";

export const metadata = {
  title: "Entre em Contato | Ampla TecServ",
  description:
    "Entre em contato com a Ampla TecServ e fale com especialistas em suporte e assessoria em TI.",
};

export default function Contact() {
  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth>
        <section className="text-center">
          <div className="mx-auto py-12 sm:py-16 lg:py-20">
            <h2 className="mb-4 text-2xl font-bold text-white dark:text-text sm:text-3xl">
              PRECISA DE SUPORTE CONFIÁVEL?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 sm:text-lg">
              Fale com a Ampla TecServ e encontre a solução ideal para sua empresa.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Button_wa />
              <Button_email />
            </div>

            <div className="mx-auto mt-10 h-[280px] w-full max-w-5xl overflow-hidden rounded-lg sm:h-[350px]">
              <iframe
                src="https://www.google.com/maps?q=R.%20Severino%20Nicolau%20de%20Melo,%20420&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
