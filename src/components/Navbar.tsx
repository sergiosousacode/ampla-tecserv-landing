"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeContext"; // 👈 ajuste aqui

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, toggleTheme } = useTheme(); // 👈 vem do contexto

  return (
    <nav className="border-b text-text">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
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
          <li><Link href="/portal-servicos" className="hover:text-sky-600">Portal de Serviços</Link></li>
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
          className="text-2xl md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      <ul
        className={`mx-auto max-w-7xl overflow-hidden px-4 transition-all duration-300 sm:px-6 lg:px-8 md:hidden ${
          open ? "max-h-80 pb-4" : "max-h-0"
        }`}
      >
        <li><Link href="/" className="block py-3" onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link href="/about" className="block py-3" onClick={() => setOpen(false)}>Sobre</Link></li>
        <li><Link href="/contact" className="block py-3" onClick={() => setOpen(false)}>Contato</Link></li>
        <li><Link href="/portal-servicos" className="block py-3" onClick={() => setOpen(false)}>Portal de Serviços</Link></li>
        <li><Link href="/help" className="block py-3" onClick={() => setOpen(false)}>Ajuda</Link></li>

        {/* 🌙 Toggle no mobile */}
        <li className="mt-4 border-t pt-4">
          <button onClick={toggleTheme} className="text-xl">
            {dark ? "☀️ Tema claro" : "🌙 Tema escuro"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
