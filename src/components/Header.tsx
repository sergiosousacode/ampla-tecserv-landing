import Link from "next/link";
import { URLS } from "@/config/urls";
import Image from "next/image";
import Button_wa from "./ui/Button_wa";


export default function Header() {
  return (
    <header>

      <nav className="flex flex-wrap items-center justify-between gap-4 px-50 py-10">
        
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/partners/logo_ampla.svg"
            alt="Logo Ampla TecServ"
            width={50}
            height={50}
            priority
          />
        </Link>

        <ul className="
          hidden 
          w-full
          flex 
          flex-col 
          gap-4 
          text-lg 
          font-medium
          md:flex 
          md:w-auto 
          md:flex-row 
          md:gap-6
        ">
          <li><Link href="/" className="transition-colors hover:text-sky-600">Home</Link></li>
          <li><Link href="/about" className="transition-colors hover:text-sky-600">Sobre</Link></li>
          <li><Link href="/services" className="transition-colors hover:text-sky-600">Serviços</Link></li>
          <li><Link href="/contact" className="transition-colors hover:text-sky-600">Contatos</Link></li>
          <li><Link href="/help" className="transition-colors hover:text-sky-600">Ajuda</Link></li>
        </ul>
        
        <Button_wa />

      </nav>
    </header>
  );
}
