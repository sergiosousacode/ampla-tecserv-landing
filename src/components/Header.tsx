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
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/help">Help</Link></li>
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
