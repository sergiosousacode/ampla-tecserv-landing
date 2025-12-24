import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Ampla TecServ</h1>

        <ul className="flex gap-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/help">Help</Link></li>
        </ul>

        <a
          href="https://wa.me/5599999999999"
          target="_blank"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
