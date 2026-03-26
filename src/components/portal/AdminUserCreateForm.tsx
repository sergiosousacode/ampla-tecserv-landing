"use client";

import { useActionState } from "react";
import {
  createPortalUserAction,
  type CreatePortalUserFormState,
} from "@/app/admin/usuarios/actions";

const initialState: CreatePortalUserFormState = {};

const roleOptions = [
  { value: "ADMIN", label: "Administrador" },
  { value: "OPERATIONAL", label: "Operacional" },
  { value: "CLIENT", label: "Cliente" },
];

const statusOptions = [
  { value: "ACTIVE", label: "Ativo" },
  { value: "PENDING", label: "Pendente" },
  { value: "INACTIVE", label: "Inativo" },
];

export default function AdminUserCreateForm() {
  const [state, formAction, isPending] = useActionState(
    createPortalUserAction,
    initialState
  );

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Nome</span>
          <input
            name="name"
            type="text"
            placeholder="Nome do usuario"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">E-mail</span>
          <input
            name="email"
            type="email"
            placeholder="usuario@empresa.com.br"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_0.8fr_0.8fr]">
        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Senha inicial</span>
          <input
            name="password"
            type="password"
            placeholder="Minimo de 6 caracteres"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Perfil</span>
          <select
            name="role"
            defaultValue="OPERATIONAL"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Status</span>
          <select
            name="status"
            defaultValue="ACTIVE"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-200">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
          {state.success}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
          Depois do cadastro, o usuário já pode usar o login do portal com o
          e-mail e a senha inicial definidos aqui.
        </p>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Criando usuario..." : "Criar usuario"}
        </button>
      </div>
    </form>
  );
}
