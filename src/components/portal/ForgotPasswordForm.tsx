"use client";

import { useActionState } from "react";
import {
  forgotPasswordAction,
  type ForgotPasswordFormState,
} from "@/app/portal-servicos/esqueci-senha/actions";

const initialState: ForgotPasswordFormState = {};

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction,
    initialState
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          E-mail de acesso
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="voce@empresa.com.br"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white/10"
        />
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {state.success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? "Enviando link..." : "Enviar link de redefinicao"}
      </button>
    </form>
  );
}
