import { URLS } from "@/config/urls";

export default function Button_wa(){
    return(
        <a 
        href={URLS.WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
        className="inline-block rounded text-base bg-sky-600 px-6 py-2 text-white hover:bg-sky-700 transition"
        aria-label="Abrir WhatsApp"
        >Whatsapp</a>
    )
}