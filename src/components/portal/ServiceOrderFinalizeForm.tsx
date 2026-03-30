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
}

export default function ServiceOrderFinalizeForm({
  orderId,
  technicianFeedback,
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
          placeholder="Descreva o fechamento do atendimento, entregas executadas e orientacoes finais."
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
          {isPending ? "Finalizando..." : "Registrar finalização"}
        </button>
      </div>
    </form>
  );
}
