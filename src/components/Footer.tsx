import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { URLS } from "@/config/urls";
import { APP } from "@/config/constants";

export default function Footer() {
  return (
    <footer className="bg-bg py-10 text-gray-600 dark:text-text">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
          <div>
            <h2 className="font-bold mb-2">Entre em contato</h2>
            <p className="leading-7">
              Rua Severino Nicolau de Melo, 420 Sala 207 B
              <br />
              CAXPST 884, Jardim Oceania - João Pessoa/PB
            </p>
            <p>
              Contato: <b>83 99371-1271</b>
            </p>
            <p>
              Email: <b>amplatecserv@gmail.com</b>
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-2">Nossos canais</h2>
            <p>
              <a className="transition-colors hover:text-sky-600" href="#topo">Início</a>
            </p>
            <p>
              <a className="transition-colors hover:text-sky-600" href="/help">Suporte Técnico</a>
            </p>

            <p className="font-bold mt-2">Social Mídia</p>
            <div className="flex justify-center md:justify-start mt-2 text-xl gap-4">
              <a
                href={URLS.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href={URLS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href={URLS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={URLS.WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="text-sm md:self-end">
            <p>©{new Date().getFullYear()} <b>{APP.NAME} </b>. v{APP.VERSION}<br />
            <b>Todos os direitos reservados.</b></p>
          </div>
        </div>
    </footer>
  );
}
