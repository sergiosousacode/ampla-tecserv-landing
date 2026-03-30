"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  type UpdateServiceOrderProgressFormState,
  updateServiceOrderProgressAction,
} from "@/app/admin/contratos/actions";

const initialState: UpdateServiceOrderProgressFormState = {};

const statusOptions = [
  {
    value: "DRAFT",
    label: "Rascunho",
    description: "Preparação interna antes do início da execução.",
  },
  {
    value: "ACTIVE",
    label: "Em andamento",
    description: "Serviço em execução pela equipe técnica.",
  },
  {
    value: "PENDING_SIGNATURE",
    label: "Aguardando cliente",
    description: "Concluído pela equipe e liberado para avaliação do cliente.",
  },
];

interface ServiceOrderProgressFormProps {
  orderId: string;
  currentStatus: "DRAFT" | "PENDING_SIGNATURE" | "ACTIVE" | "ARCHIVED";
  technicianFeedback: string | null;
}

export default function ServiceOrderProgressForm({
  orderId,
  currentStatus,
  technicianFeedback,
}: ServiceOrderProgressFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    updateServiceOrderProgressAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [router, state.success]);

  const isArchived = currentStatus === "ARCHIVED";

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="orderId" value={orderId} />

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        <p className="font-semibold">Etapa-chave para abrir a avaliação</p>
        <p className="mt-2 leading-6">
          Quando o atendimento terminar, selecione <strong>Aguardando cliente</strong> e salve o andamento.
          Isso libera o formulário de avaliação na área `/cliente`.
        </p>
      </div>

      <label className="grid gap-2 text-sm text-slate-700">
        <span className="font-medium">Status operacional</span>
        <select
          name="status"
          defaultValue={isArchived ? "ACTIVE" : currentStatus}
          disabled={isArchived}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-3 md:grid-cols-3">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            disabled={isArchived}
            onClick={(event) => {
              const form = event.currentTarget.form;

              if (!form) {
                return;
              }

              const statusField = form.elements.namedItem("status");

              if (statusField instanceof HTMLSelectElement) {
                statusField.value = option.value;
              }
            }}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <p className="font-semibold text-slate-900">{option.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {option.description}
            </p>
          </button>
        ))}
      </div>

      <label className="grid gap-2 text-sm text-slate-700">
        <span className="font-medium">Atualização de andamento</span>
        <textarea
          name="technicianFeedback"
          defaultValue={technicianFeedback || ""}
          rows={5}
          disabled={isArchived}
          placeholder="Registre andamento, atividades executadas, pendencias e próximos passos."
          className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </label>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">Próximo passo esperado</p>
        <p className="mt-2 leading-6">
          Depois de salvar em <strong>Aguardando cliente</strong>, entre com o usuário
          `CLIENT` correspondente e verifique se o card da OS exibiu o bloco de avaliação.
        </p>
      </div>

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
          disabled={isPending || isArchived}
          className="rounded-full border border-sky-500 px-5 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Salvando andamento..." : "Salvar andamento"}
        </button>
      </div>
    </form>
  );
}
