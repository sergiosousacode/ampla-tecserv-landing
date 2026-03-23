import Link from "next/link";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { URLS } from "@/config/urls";
import { APP } from "@/config/constants";

export default function Footer() {
  return (
    <footer className="bg-bg px-4 pb-8 pt-4 text-slate-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-slate-950 p-6 shadow-2xl ring-1 ring-white/10 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                Ampla TecServ
              </span>
              <h2 className="mt-5 text-2xl font-bold text-white">
                Suporte, assessoria e operação com mais previsibilidade.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-300">
                Atendemos empresas que precisam manter a tecnologia organizada,
                funcional e pronta para acompanhar o crescimento do negócio.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                Contato
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <p>
                  Rua Severino Nicolau de Melo, 420 Sala 207 B
                  <br />
                  Jardim Oceânia - Joao Pessoa/PB
                </p>
                <p>
                  Telefone: <strong className="text-white">83 99371-1271</strong>
                </p>
                <p>
                  E-mail: <strong className="text-white">amplatecserv@gmail.com</strong>
                </p>
                <p>
                  Horario: <strong className="text-white">{APP.SUPPORT_HOURS}</strong>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                Navegação
              </h3>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <Link className="transition hover:text-white" href="/">
                  Início
                </Link>
                <Link className="transition hover:text-white" href="/about">
                  Sobre
                </Link>
                <Link className="transition hover:text-white" href="/contact">
                  Contato
                </Link>
                <Link className="transition hover:text-white" href="/portal-servicos">
                  Portal de servicos
                </Link>
                <Link className="transition hover:text-white" href="/help">
                  Ajuda
                </Link>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Redes
                </p>
                <div className="mt-3 flex gap-3 text-lg">
                  <a
                    href={URLS.FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 hover:text-white"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={URLS.INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 hover:text-white"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={URLS.LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href={URLS.WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 hover:text-white"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy;{new Date().getFullYear()} <strong className="text-white">{APP.NAME}</strong>. Todos os direitos reservados.
            </p>
            <p>
              Versão <strong className="text-white">{APP.VERSION}</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
