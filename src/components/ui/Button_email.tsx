import { URLS } from "@/config/urls";

export default function Button_email() {
  return (
    <a
      href={URLS.EMAIL}
      className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent sm:w-auto"
      aria-label="Enviar email"
    >
      Enviar Email
    </a>
  );
}
