"use client";

import { useActionState } from "react";
import {
  createServiceAction,
  type CreateServiceFormState,
} from "@/app/admin/servicos/actions";

const initialState: CreateServiceFormState = {};

const billingOptions = [
  { value: "MONTHLY", label: "Mensal" },
  { value: "ONE_OFF", label: "Avulso" },
  { value: "PROJECT", label: "Projeto" },
];

const statusOptions = [
  { value: "ACTIVE", label: "Ativo" },
  { value: "DRAFT", label: "Rascunho" },
  { value: "INACTIVE", label: "Inativo" },
];

export default function AdminServiceCreateForm() {
  const [state, formAction, isPending] = useActionState(
    createServiceAction,
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
            placeholder="Nome do servico"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Categoria</span>
          <input
            name="category"
            type="text"
            placeholder="Suporte, consultoria, infraestrutura..."
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
        <span className="font-medium">Descrição</span>
        <textarea
          name="description"
          rows={4}
          placeholder="Descreva o escopo operacional do servico"
          className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Faturamento</span>
          <select
            name="billingType"
            defaultValue="MONTHLY"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          >
            {billingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Preço base</span>
          <input
            name="basePrice"
            type="text"
            placeholder="0,00"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
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

      <div className="flex items-center justify-between gap-3">
        <div>
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
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Cadastrando..." : "Cadastrar servico"}
        </button>
      </div>
    </form>
  );
}
