import Link from "next/link";

export default function Button_cta() {
  return (
    <Link
      href="/contact"
      className="inline-flex items-center justify-center rounded-2xl bg-sky-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-900/10 transition hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2 focus:ring-offset-transparent sm:px-8"
    >
      Fale com nosso time
    </Link>
  );
}
