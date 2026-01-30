"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeContext"; // 👈 ajuste aqui

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggleTheme } = useTheme(); // 👈 vem do contexto

  return (
    <nav className="text-text border-b border-b">
      <div className="mx-auto px-4 flex items-center justify-between h-20 py-4 max-w-7xl">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/partners/logo_ampla.svg"
            alt="Logo Ampla TecServ"
            width={50}
            height={50}
            priority
          />
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-6 items-center">
          <li><Link href="/" className="hover:text-sky-600">Home</Link></li>
          <li><Link href="/about" className="hover:text-sky-600">Sobre</Link></li>
          <li><Link href="/contact" className="hover:text-sky-600">Contato</Link></li>
          <li><Link href="/help" className="hover:text-sky-600">Ajuda</Link></li>

          {/* 🌙 Toggle Dark Mode */}
          <li>
            <button
              onClick={toggleTheme}
              className="ml-4 text-xl"
              aria-label="Alternar tema"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>

        {/* Botão hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      <ul
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-60 py-4" : "max-h-0"
        }`}
      >
        <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link href="/about" onClick={() => setOpen(false)}>Sobre</Link></li>
        <li><Link href="/contact" onClick={() => setOpen(false)}>Contato</Link></li>
        <li><Link href="/help" onClick={() => setOpen(false)}>Ajuda</Link></li>

        {/* 🌙 Toggle no mobile */}
        <li className="mt-4 px-4">
          <button onClick={toggleTheme} className="text-xl">
            {dark ? "☀️ Tema claro" : "🌙 Tema escuro"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
