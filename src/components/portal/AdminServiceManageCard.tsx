"use client";

import { useActionState } from "react";
import {
  type ServiceFormState,
  updateServiceAction,
} from "@/app/admin/servicos/actions";
import AdminServiceFormFields from "@/components/portal/AdminServiceFormFields";

const initialState: ServiceFormState = {};

interface AdminServiceManageCardProps {
  service: {
    id: string;
    name: string;
    category: string;
    description: string;
    billingType: "MONTHLY" | "ONE_OFF" | "PROJECT";
    status: "ACTIVE" | "DRAFT" | "INACTIVE";
    basePrice: string;
    updatedAtLabel: string;
  };
}

export default function AdminServiceManageCard({
  service,
}: AdminServiceManageCardProps) {
  const [state, formAction, isPending] = useActionState(
    updateServiceAction,
    initialState
  );

  return (
    <article className="rounded-[1.5rem] bg-white p-5 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
            {service.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{service.name}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Última atualização: {service.updatedAtLabel}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
            {service.billingType}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-white/10 dark:text-slate-300">
            {service.status}
          </span>
        </div>
      </div>

      <form action={formAction} className="mt-5 grid gap-4">
        <input type="hidden" name="serviceId" value={service.id} />
        <AdminServiceFormFields
          defaults={{
            name: service.name,
            category: service.category,
            description: service.description,
            billingType: service.billingType,
            basePrice: service.basePrice,
            status: service.status,
          }}
        />

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

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full border border-sky-500 px-5 py-2.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 disabled:cursor-wait disabled:opacity-70 dark:border-sky-400/40 dark:text-sky-300 dark:hover:bg-sky-400/10"
          >
            {isPending ? "Salvando..." : "Salvar alteracoes"}
          </button>
        </div>
      </form>
    </article>
  );
}
