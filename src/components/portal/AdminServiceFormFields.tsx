"use client";

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

interface AdminServiceFormFieldsProps {
  defaults?: {
    name?: string;
    category?: string;
    description?: string;
    billingType?: string;
    basePrice?: string;
    status?: string;
  };
}

export default function AdminServiceFormFields({
  defaults,
}: AdminServiceFormFieldsProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Nome</span>
          <input
            name="name"
            type="text"
            defaultValue={defaults?.name}
            placeholder="Nome do servico"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Categoria</span>
          <input
            name="category"
            type="text"
            defaultValue={defaults?.category}
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
          defaultValue={defaults?.description}
          placeholder="Descreva o escopo operacional do servico"
          className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Faturamento</span>
          <select
            name="billingType"
            defaultValue={defaults?.billingType || "MONTHLY"}
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
            defaultValue={defaults?.basePrice}
            placeholder="0,00"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
          <span className="font-medium">Status</span>
          <select
            name="status"
            defaultValue={defaults?.status || "ACTIVE"}
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
    </>
  );
}
