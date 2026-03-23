import { URLS } from "@/config/urls";

export default function WhatsAppFloat() {
  return (
    <a
      href={URLS.WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-secondary text-white shadow-lg transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-blue-500"
    >
      <span className="sr-only">Abrir WhatsApp</span>
      <span className="px-2 text-center">Solicitar ajuda</span>
    </a>
  );
}
