"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  type ClientOrderFeedbackFormState,
  submitClientOrderFeedbackAction,
} from "@/app/cliente/actions";

const initialState: ClientOrderFeedbackFormState = {};

interface ServiceOrderClientFeedbackFormProps {
  orderId: string;
  clientSatisfaction: number | null;
  clientFeedback: string | null;
}

export default function ServiceOrderClientFeedbackForm({
  orderId,
  clientSatisfaction,
  clientFeedback,
}: ServiceOrderClientFeedbackFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    submitClientOrderFeedbackAction,
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

      <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
        <span className="font-medium">Sua avaliação</span>
        <select
          name="clientSatisfaction"
          defaultValue={clientSatisfaction ? String(clientSatisfaction) : "5"}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
        >
          <option value="5">5 - Muito satisfeito</option>
          <option value="4">4 - Satisfeito</option>
          <option value="3">3 - Neutro</option>
          <option value="2">2 - Insatisfeito</option>
          <option value="1">1 - Muito insatisfeito</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
        <span className="font-medium">Comentário do cliente</span>
        <textarea
          name="clientFeedback"
          defaultValue={clientFeedback || ""}
          rows={4}
          placeholder="Conte como foi o atendimento e se ficou alguma observação."
          className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
        />
      </label>

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
          className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Enviando..." : "Enviar avaliação e finalizar"}
        </button>
      </div>
    </form>
  );
}
