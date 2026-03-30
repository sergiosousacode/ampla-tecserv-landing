"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import {
  createServiceOrderAction,
  type CreateServiceOrderFormState,
} from "@/app/admin/contratos/actions";
import {
  defaultServiceOrderTemplate,
  renderServiceOrderTemplate,
  serviceOrderVariableLabels,
} from "@/lib/service-order-template";
import { buildServiceSelectionSummary } from "@/lib/service-order-services";

interface ServiceOrderEditorProps {
  currentUserName: string;
  clients: Array<{
    id: string;
    companyName: string;
    contactName: string | null;
    document: string | null;
  }>;
  services: Array<{
    id: string;
    name: string;
    category: string;
    basePriceLabel: string;
    basePriceValue: number | null;
  }>;
  orders: Array<{
    id: string;
    title: string;
    clientName: string;
    serviceName: string;
    createdByName: string;
    statusLabel: string;
    updatedAtLabel: string;
  }>;
}

const initialState: CreateServiceOrderFormState = {};

function getTodayLabel() {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(new Date());
}

export default function ServiceOrderEditor({
  currentUserName,
  clients,
  services,
  orders,
}: ServiceOrderEditorProps) {
  const [state, formAction, isPending] = useActionState(
    createServiceOrderAction,
    initialState
  );
  const [title, setTitle] = useState("Atendimento preventivo de TI");
  const [clientId, setClientId] = useState(clients[0]?.id || "");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    services[0]?.id ? [services[0].id] : []
  );
  const [template, setTemplate] = useState(defaultServiceOrderTemplate);

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === clientId) || clients[0],
    [clientId, clients]
  );
  const selectedServices = useMemo(
    () =>
      services.filter((service) => selectedServiceIds.includes(service.id)),
    [selectedServiceIds, services]
  );
  const serviceSummary = useMemo(
    () =>
      buildServiceSelectionSummary(
        selectedServices.map((service) => ({
          name: service.name,
          category: service.category,
          basePriceValue: service.basePriceValue,
          basePriceLabel: service.basePriceLabel,
        }))
      ),
    [selectedServices]
  );

  const preview = renderServiceOrderTemplate(template, {
    client: {
      companyName: selectedClient?.companyName || "",
      contactName: selectedClient?.contactName || "-",
      document: selectedClient?.document || "-",
    },
    service: {
      name: serviceSummary.primaryService.name,
      category: serviceSummary.primaryService.category,
      basePrice: serviceSummary.primaryService.basePriceLabel,
    },
    services: {
      count: serviceSummary.count,
      names: serviceSummary.names,
      list: serviceSummary.list,
      totalPrice: serviceSummary.totalPriceLabel,
    },
    order: {
      title,
      createdAt: getTodayLabel(),
    },
    user: {
      name: currentUserName,
    },
  });

  return (
    <section className="grid gap-6">
      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10 print:hidden">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
          Ordem de serviço
        </p>
        <h2 className="mt-3 text-2xl font-bold">
          Editor dinâmico com dados reais e impressão pelo navegador
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
          O editor agora trabalha com clientes e serviços cadastrados no banco e
          salva a ordem emitida para consulta e impressao posterior.
        </p>
      </div>

      <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10 print:hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Ordens salvas no banco</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
              Cada ordem criada aqui fica registrada com cliente, serviço,
              responsável e data de atualização.
            </p>
          </div>

          <p className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
            {orders.length} ordens cadastradas
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          {orders.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-white/10">
              Nenhuma ordem salva ainda. Crie a primeira logo abaixo.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">
                      {order.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {order.clientName} • {order.serviceName}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Criado por {order.createdByName} • atualizado em {order.updatedAtLabel}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 dark:bg-white/10 dark:text-slate-300">
                      {order.statusLabel}
                    </span>
                    <Link
                      href={`/admin/contratos/${order.id}`}
                      className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
                    >
                      Abrir página
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] print:block">
        <div className="grid gap-6 print:hidden">
          <form
            action={formAction}
            className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10"
          >
            <input type="hidden" name="template" value={template} />

            <h3 className="text-lg font-semibold">Dados da ordem</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Titulo</span>
                <input
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
                />
              </label>

              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Cliente</span>
                <select
                  name="clientId"
                  value={clientId}
                  onChange={(event) => setClientId(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
                >
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.companyName}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Servicos da ordem</span>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-slate-900">
                  <div className="grid gap-2">
                    {services.map((service) => {
                      const checked = selectedServiceIds.includes(service.id);

                      return (
                        <label
                          key={service.id}
                          className="flex items-start gap-3 rounded-2xl bg-white px-3 py-3 text-sm ring-1 ring-slate-200 dark:bg-slate-950/70 dark:ring-white/10"
                        >
                          <input
                            name="serviceIds"
                            type="checkbox"
                            value={service.id}
                            checked={checked}
                            onChange={(event) => {
                              setSelectedServiceIds((current) =>
                                event.target.checked
                                  ? [...current, service.id]
                                  : current.filter((id) => id !== service.id)
                              );
                            }}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                          />
                          <span>
                            <span className="font-medium text-slate-900 dark:text-white">
                              {service.name}
                            </span>
                            <span className="mt-1 block text-slate-600 dark:text-slate-400">
                              {service.category} • {service.basePriceLabel}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </label>

              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Responsavel do cliente</span>
                <input
                  value={selectedClient?.contactName || ""}
                  readOnly
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
                />
              </label>

              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Documento</span>
                <input
                  value={selectedClient?.document || ""}
                  readOnly
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
                />
              </label>

              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Resumo dos servicos</span>
                <input
                  value={serviceSummary.names}
                  readOnly
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
                />
              </label>

              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Valor total estimado</span>
                <input
                  value={serviceSummary.totalPriceLabel}
                  readOnly
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
                />
              </label>
            </div>

            {state.error ? (
              <p className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-200">
                {state.error}
              </p>
            ) : null}

            {state.success ? (
              <p className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
                {state.success}
              </p>
            ) : null}

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={isPending || !clients.length || !services.length || !selectedServiceIds.length}
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
              >
                {isPending ? "Salvando ordem..." : "Salvar ordem no banco"}
              </button>
            </div>
          </form>

          <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">Modelo textual</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Edite o texto livremente e use as variaveis entre chaves duplas.
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                Imprimir pagina
              </button>
            </div>

            <textarea
              value={template}
              onChange={(event) => setTemplate(event.target.value)}
              className="mt-5 min-h-[360px] w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm leading-7 text-slate-900 outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-950/60 dark:text-text dark:ring-white/10">
            <h3 className="text-lg font-semibold">Variaveis disponiveis</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {serviceOrderVariableLabels.map((item) => (
                <article
                  key={item.key}
                  className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10"
                >
                  <p className="font-mono text-sm text-sky-700 dark:text-sky-300">
                    {`{{${item.key}}}`}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Exemplo: {item.example}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 ring-1 ring-slate-200 dark:bg-white dark:text-slate-900 dark:ring-slate-200 print:rounded-none print:border-0 print:p-0 print:shadow-none print:ring-0">
          <div className="border-b border-slate-200 pb-4 print:pb-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
              Previa para impressao
            </p>
            <h3 className="mt-3 text-2xl font-bold">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">
              Documento operacional preparado para impressao direta no navegador.
            </p>
          </div>

          <pre className="mt-6 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-800 print:mt-4">
            {preview}
          </pre>
        </div>
      </div>
    </section>
  );
}
