import { URLS } from "@/config/urls";

export default function Button_email() {
  return (
    <a
      href={URLS.EMAIL}
      className="inline-block rounded text-base bg-sky-600 px-6 py-2 text-white hover:bg-sky-700 transition ml-4"
      aria-label="Enviar email"
    >
      Enviar Email
    </a>
  );
}
