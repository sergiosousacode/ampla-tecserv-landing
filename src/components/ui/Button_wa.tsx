import { URLS } from "@/config/urls";

export default function Button_wa(){
    return(
        <a 
        href={URLS.WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded bg-sky-600 px-6 py-3 text-base text-white transition hover:bg-sky-700 sm:w-auto"
        aria-label="Abrir WhatsApp"
        >Whatsapp</a>
    )
}
