import Container from "./Container";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 p-8">
      <Container>
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
              <a href="#topo">Início</a>
            </p>
            <p>
              <a href="/help">Suporte Técnico</a>
            </p>

            <p className="font-bold mt-2">Social Mídia</p>
            <div className="flex justify-center md:justify-start mt-2 text-xl gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61586066113887"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/ampla_tecserv/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/ampla-tecserv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://wa.me/5583993711271"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="md:self-end text-sm">
            By Ampla TecServ © 2026 – AMPLA TecServ – 1.0.0v
          </div>
        </div>
      </Container>
    </footer>
  );
}
