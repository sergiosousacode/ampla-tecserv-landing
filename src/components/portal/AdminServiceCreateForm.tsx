"use client";

import { useActionState } from "react";
import {
  createServiceAction,
  type ServiceFormState,
} from "@/app/admin/servicos/actions";
import AdminServiceFormFields from "@/components/portal/AdminServiceFormFields";

const initialState: ServiceFormState = {};

export default function AdminServiceCreateForm() {
  const [state, formAction, isPending] = useActionState(
    createServiceAction,
    initialState
  );

  return (
    <form action={formAction} className="grid gap-4">
      <AdminServiceFormFields />

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
