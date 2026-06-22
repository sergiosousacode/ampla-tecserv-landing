import Link from "next/link";
import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";
import ForgotPasswordForm from "@/components/portal/ForgotPasswordForm";

export const metadata = {
  title: "Recuperar senha do Portal",
  description:
    "Solicite um link temporario para recuperar o acesso ao portal de servicos.",
};

export default function ForgotPasswordPage() {
  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth className="py-12 sm:py-16 lg:py-20">
        <section className="mx-auto max-w-xl rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Recuperar acesso
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            Esqueci minha senha
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Informe o e-mail cadastrado no portal para receber um link temporario
            de redefinicao.
          </p>

          <ForgotPasswordForm />

          <Link
            href="/portal-servicos/login"
            className="mt-6 inline-flex text-sm font-semibold text-sky-300 transition hover:text-sky-200"
          >
            Voltar para o login
          </Link>
        </section>
      </MaxWidth>
    </Wrapper>
  );
}
