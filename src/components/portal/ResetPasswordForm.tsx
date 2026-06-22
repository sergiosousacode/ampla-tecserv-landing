"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  resetPasswordAction,
  type ResetPasswordFormState,
} from "@/app/portal-servicos/redefinir-senha/actions";

const initialState: ResetPasswordFormState = {};

export default function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState
  );

  if (!token) {
    return (
      <div className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
        Link de redefinicao invalido.
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input type="hidden" name="token" value={token} />

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Nova senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Digite a nova senha"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white/10"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Confirmar nova senha
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Repita a nova senha"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white/10"
        />
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <div className="space-y-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          <p>{state.success}</p>
          <Link
            href="/portal-servicos/login"
            className="inline-flex font-semibold text-emerald-100 transition hover:text-white"
          >
            Ir para o login
          </Link>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending || Boolean(state.success)}
        className="w-full rounded-2xl bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? "Redefinindo senha..." : "Redefinir senha"}
      </button>
    </form>
  );
}
