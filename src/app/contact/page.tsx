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
    <Wrapper className="bg-sky-500 min-h-screen px-50 dark:bg-bg">
      <MaxWidth>
        <section className="text-center">
          <div className="mx-auto px-4 py-25">
            <h2 className="text-white mb-4 text-3xl font-bold dark:text-text">
              PRECISA DE SUPORTE CONFIÁVEL?
            </h2>

            <p className="mb-8 text-2xl justify-center">
              Fale com a Ampla TecServ e encontre a solução ideal para sua empresa.
            </p>
            <Button_wa />
            <Button_email />

            <div className="mt-10 h-[350px] w-full max-w-5xl overflow-hidden rounded-lg mx-auto">
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
