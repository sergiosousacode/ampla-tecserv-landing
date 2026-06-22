"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  loginPortalAction,
  type LoginFormState,
} from "@/app/portal-servicos/login/actions";

const initialState: LoginFormState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginPortalAction,
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
        {/*
        <p className="mt-2 text-xs text-slate-400">
          Use o e-mail e a senha cadastrados por um administrador do portal.
        </p>
        */}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-200"
          >
            Senha
          </label>
          <Link
            href="/portal-servicos/esqueci-senha"
            className="text-xs font-semibold text-sky-300 transition hover:text-sky-200"
          >
            Esqueci minha senha
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Sua senha de acesso"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white/10"
        />
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-2xl bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? "Validando acesso..." : "Entrar no portal"}
      </button>
    </form>
  );
}
