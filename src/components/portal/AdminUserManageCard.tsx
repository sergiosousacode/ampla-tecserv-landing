"use client";

import { useActionState } from "react";
import {
  resetPortalUserPasswordAction,
  updatePortalUserAction,
  type UpdatePortalUserFormState,
} from "@/app/admin/usuarios/actions";

const initialState: UpdatePortalUserFormState = {};

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

interface AdminUserManageCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "OPERATIONAL" | "CLIENT";
    status: "ACTIVE" | "PENDING" | "INACTIVE";
  };
}

export default function AdminUserManageCard({
  user,
}: AdminUserManageCardProps) {
  const [profileState, profileAction, profilePending] = useActionState(
    updatePortalUserAction,
    initialState
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    resetPortalUserPasswordAction,
    initialState
  );

  return (
    <article className="rounded-[1.5rem] bg-white p-5 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {user.email}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
            {user.role}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-white/10 dark:text-slate-300">
            {user.status}
          </span>
        </div>
      </div>

      <form action={profileAction} className="mt-5 grid gap-4">
        <input type="hidden" name="userId" value={user.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="font-medium">Nome</span>
            <input
              name="name"
              type="text"
              defaultValue={user.name}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="font-medium">E-mail</span>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="font-medium">Perfil</span>
            <select
              name="role"
              defaultValue={user.role}
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
              defaultValue={user.status}
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

        {profileState.error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-200">
            {profileState.error}
          </p>
        ) : null}

        {profileState.success ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
            {profileState.success}
          </p>
        ) : null}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={profilePending}
            className="rounded-full border border-sky-500 px-5 py-2.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 disabled:cursor-wait disabled:opacity-70 dark:border-sky-400/40 dark:text-sky-300 dark:hover:bg-sky-400/10"
          >
            {profilePending ? "Salvando..." : "Salvar dados"}
          </button>
        </div>
      </form>

      <div className="mt-5 border-t border-slate-200 pt-5 dark:border-white/10">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Redefinir senha
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          Use esta acao quando o usuario perder o acesso. A nova senha passa a
          valer imediatamente no login do portal.
        </p>

        <form
          action={passwordAction}
          className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]"
        >
          <input type="hidden" name="userId" value={user.id} />
          <input
            name="password"
            type="password"
            placeholder="Nova senha com minimo de 6 caracteres"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          />
          <button
            type="submit"
            disabled={passwordPending}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
          >
            {passwordPending ? "Redefinindo..." : "Redefinir senha"}
          </button>
        </form>

        {passwordState.error ? (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-200">
            {passwordState.error}
          </p>
        ) : null}

        {passwordState.success ? (
          <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
            {passwordState.success}
          </p>
        ) : null}
      </div>
    </article>
  );
}
