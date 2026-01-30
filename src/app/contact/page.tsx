import { URLS } from "@/config/urls";
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
    <Wrapper className="bg-sky-500 px-50">
      <MaxWidth>
        <section className="text-center">
          <div className="mx-auto px-4 py-25">
            <h2 className="text-white mb-4 text-2xl font-bold">
              Precisa de suporte confiável?
            </h2>

            <p className="mb-8 text-lg justify-center">
              Fale com a Ampla TecServ e encontre a solução ideal para sua empresa.
            </p>
            <Button_wa />
            <Button_email />

            <div className="mt-10 h-[350px] w-full max-w-5xl overflow-hidden rounded-lg mx-auto">
              <iframe
                src="https://www.google.com/maps?q=R.%Severino Nicolau%de%Melo,420&output=embed"
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
