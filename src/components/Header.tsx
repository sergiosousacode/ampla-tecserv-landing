import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="m-auto ps-10 pe-10 w-full border-b">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo_ampla.svg"
              alt="Logo Ampla TecServ"
              width={50}
              height={50}
              priority
            />
        </Link>

        <ul className="flex gap-6">
          <li><Link href="/" className="transition-color hover:text-blue-600">Home</Link></li>
          <li><Link href="/about" className="transition-color hover:text-blue-600">Sobre</Link></li>
          <li><Link href="/services" className="transition-color hover:text-blue-600">Serviços</Link></li>
          <li><Link href="/contact" className="transition-color hover:text-blue-600">Contatos</Link></li>
          <li><Link href="/help" className="transition-color hover:text-blue-600">Ajuda</Link></li>
        </ul>

        <a
          href="https://wa.me/5583993711271"
          target="_blank"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
