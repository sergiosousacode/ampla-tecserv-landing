"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  finalizeServiceOrderAction,
  type FinalizeServiceOrderFormState,
} from "@/app/admin/contratos/actions";

const initialState: FinalizeServiceOrderFormState = {};

interface ServiceOrderFinalizeFormProps {
  orderId: string;
  technicianFeedback: string | null;
  clientSatisfaction: number | null;
  clientFeedback: string | null;
}

export default function ServiceOrderFinalizeForm({
  orderId,
  technicianFeedback,
  clientSatisfaction,
  clientFeedback,
}: ServiceOrderFinalizeFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    finalizeServiceOrderAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [router, state.success]);

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="orderId" value={orderId} />

      <label className="grid gap-2 text-sm text-slate-700">
        <span className="font-medium">Parecer tecnico</span>
        <textarea
          name="technicianFeedback"
          defaultValue={technicianFeedback || ""}
          rows={5}
          placeholder="Descreva o que foi executado, pendencias e orientacoes finais."
          className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
        />
      </label>

      <label className="grid gap-2 text-sm text-slate-700">
        <span className="font-medium">Satisfacao do cliente</span>
        <select
          name="clientSatisfaction"
          defaultValue={clientSatisfaction ? String(clientSatisfaction) : "5"}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
        >
          <option value="5">5 - Muito satisfeito</option>
          <option value="4">4 - Satisfeito</option>
          <option value="3">3 - Neutro</option>
          <option value="2">2 - Insatisfeito</option>
          <option value="1">1 - Muito insatisfeito</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm text-slate-700">
        <span className="font-medium">Retorno do cliente</span>
        <textarea
          name="clientFeedback"
          defaultValue={clientFeedback || ""}
          rows={4}
          placeholder="Registre aqui a fala do cliente sobre o atendimento."
          className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400"
        />
      </label>

      {state.error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {state.success}
        </p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Finalizando..." : "Finalizar OS"}
        </button>
      </div>
    </form>
  );
}
