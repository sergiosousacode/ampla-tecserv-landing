import Container from "./Container";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex justify-around ... p-8 bg-gray-200 text-gray-700">
      <Container className="flex justify-between">

          <div>
            <h2 className="font-bold">Entre em contato</h2>
            <p>Rua Severino Nicolau de Melo, 420 Sala 207 B<br/>CAXPST 884, Jardim Oceania - João Pessoa/PB</p>
            <p>Contato: <b>83 99371-1271</b></p>
            <p>Email: <b>amplatecserv@gmail.com</b></p>
          </div>
          <div>
            <h2 className="font-bold">Nossos canais</h2>
            <p><a href="#topo" className="cursor-pointer">Início</a></p>
            <p><a href="/help">Suporte Técnico</a></p>
            <p className="font-bold">Social Mídia</p>
            <div className="flex mt-2 text-xl gap-4">
              <a href="https://www.facebook.com/profile.php?id=61586066113887" target="_blank" rel="noopener noreferrer" className="mr-2"><FaFacebookF /></a>
              <a href="https://www.instagram.com/ampla_tecserv/" target="_blank" rel="noopener noreferrer" className="mr-2"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/ampla-tecserv" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://wa.me/5583993711271" target="_blank" rel="noopener noreferrer" className="mr-2"><FaWhatsapp /></a>
            </div>
          </div>
          <div>
            © 2026 - AMPLA TecServ - 1.0.0v
          </div>
      </Container>
    </footer>
  );
}