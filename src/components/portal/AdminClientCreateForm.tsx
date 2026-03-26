"use client";

import { useActionState } from "react";
import {
  createClientAction,
  type CreateClientFormState,
} from "@/app/admin/clientes/actions";

const initialState: CreateClientFormState = {};

const statusOptions = [
  { value: "ACTIVE", label: "Ativo" },
  { value: "PENDING", label: "Pendente" },
  { value: "INACTIVE", label: "Inativo" },
];

export default function AdminClientCreateForm() {
  const [state, formAction, isPending] = useActionState(
    createClientAction,
    initialState
  );

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Empresa</span>
          <input
            name="companyName"
            type="text"
            placeholder="Nome da empresa"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Documento</span>
          <input
            name="document"
            type="text"
            placeholder="CNPJ ou CPF"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Responsável</span>
          <input
            name="contactName"
            type="text"
            placeholder="Responsavel do cliente"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">E-mail</span>
          <input
            name="email"
            type="email"
            placeholder="contato@empresa.com.br"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Telefone</span>
          <input
            name="phone"
            type="text"
            placeholder="(00) 00000-0000"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-[0.7fr_auto]">
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

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-wait disabled:opacity-70"
          >
            {isPending ? "Cadastrando..." : "Cadastrar cliente"}
          </button>
        </div>
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
    </form>
  );
}
