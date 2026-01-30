import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { URLS } from "@/config/urls";
import { APP } from "@/config/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 px-50 py-10">
        <div className="flex flex-col gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-bold mb-2">Entre em contato</h2>
            <p>
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

          <div className="md:self-end text-sm">
            <p>©{new Date().getFullYear()} <b>{APP.NAME} </b>. v{APP.VERSION}<br />
            <b>Todos os direitos reservados.</b></p>
          </div>
        </div>
    </footer>
  );
}
