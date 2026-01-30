import { URLS } from "@/config/urls";
import Button_cta from "./ui/Button_cta";

export default function CTA() {
  return (
    <section className="py-10 text-white text-center">
        <h3 className="mb-1 text-2xl font-bold p-1">
          PRONTO PARA MELHORAR A TECNOLOGIA DA SUA EMPRESA?
        </h3>

        <p className="mb-8 text-lg px-4 text-black">
          Entre em contato agora e fale com nossa equipe.
        </p>

        <Button_cta />
    </section>
  );
}
