import { URLS } from "@/config/urls";

export default function Button_email() {
  return (
    <a
      href={URLS.EMAIL}
      className="inline-flex w-full items-center justify-center rounded bg-sky-600 px-6 py-3 text-base text-white transition hover:bg-sky-700 sm:w-auto"
      aria-label="Enviar email"
    >
      Enviar Email
    </a>
  );
}
