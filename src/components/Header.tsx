import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-1">
      <nav className="flex flex-wrap items-center justify-between gap-4 px-10 py-10">
        
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/partners/logo_ampla.svg"
            alt="Logo Ampla TecServ"
            width={50}
            height={50}
            priority
          />
        </Link>

        <ul className="hidden w-full 
          flex-col 
          gap-4 
          text-lg 
          font-medium
          md:flex 
          md:w-auto 
          md:flex-row 
          md:gap-6
        ">
          <li><Link href="/" className="transition-colors hover:text-blue-600">Home</Link></li>
          <li><Link href="/about" className="transition-colors hover:text-blue-600">Sobre</Link></li>
          <li><Link href="/services" className="transition-colors hover:text-blue-600">Serviços</Link></li>
          <li><Link href="/contact" className="transition-colors hover:text-blue-600">Contatos</Link></li>
          <li><Link href="/help" className="transition-colors hover:text-blue-600">Ajuda</Link></li>
        </ul>

        {/* BOTÃO */}
        <a
          href="https://wa.me/5583993711271"
          target="_blank"
          className="
            rounded 
            bg-green-600 
            px-4 
            py-2 
            text-center 
            text-white 
            transition 
            hover:bg-green-700
            md:w-auto
          "
        >
          WhatsApp
        </a>

      </nav>
    </header>
  );
}
