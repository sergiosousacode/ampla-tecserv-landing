import Link from "next/link";
import { MaxWidth } from "@/components/Layout/MaxWidth";
import { Wrapper } from "@/components/Layout/Wrapper";
import ResetPasswordForm from "@/components/portal/ResetPasswordForm";

export const metadata = {
  title: "Redefinir senha do Portal",
  description:
    "Defina uma nova senha para recuperar o acesso ao portal de servicos.",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token = "" } = await searchParams;

  return (
    <Wrapper className="min-h-screen bg-sky-500 dark:bg-bg">
      <MaxWidth className="py-12 sm:py-16 lg:py-20">
        <section className="mx-auto max-w-xl rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
            Nova senha
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            Redefinir senha
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Escolha uma nova senha para voltar a acessar o portal.
          </p>

          <ResetPasswordForm token={token} />

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
