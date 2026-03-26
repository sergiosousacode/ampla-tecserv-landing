export const serviceOrderVariableLabels = [
  {
    key: "client.companyName",
    label: "Nome da empresa",
    example: "Farmacia Modelo Ltda",
  },
  {
    key: "client.contactName",
    label: "Responsavel do cliente",
    example: "Maria Silva",
  },
  {
    key: "client.document",
    label: "Documento",
    example: "12.345.678/0001-90",
  },
  {
    key: "service.name",
    label: "Nome do servico",
    example: "Suporte tecnico empresarial",
  },
  {
    key: "service.category",
    label: "Categoria do servico",
    example: "Suporte",
  },
  {
    key: "service.basePrice",
    label: "Valor do servico",
    example: "R$ 350,00",
  },
  {
    key: "order.title",
    label: "Titulo da ordem",
    example: "Ordem de servico para atendimento preventivo",
  },
  {
    key: "order.createdAt",
    label: "Data da emissao",
    example: "26/03/2026",
  },
  {
    key: "user.name",
    label: "Responsavel interno",
    example: "Administrador Ampla",
  },
];

export interface ServiceOrderTemplateData {
  client: {
    companyName: string;
    contactName: string;
    document: string;
  };
  service: {
    name: string;
    category: string;
    basePrice: string;
  };
  order: {
    title: string;
    createdAt: string;
  };
  user: {
    name: string;
  };
}

export const defaultServiceOrderTemplate = `ORDEM DE SERVICO

Titulo: {{order.title}}
Data de emissao: {{order.createdAt}}

Cliente: {{client.companyName}}
Responsavel: {{client.contactName}}
Documento: {{client.document}}

Servico: {{service.name}}
Categoria: {{service.category}}
Valor: {{service.basePrice}}

Descricao do atendimento
Executar a atividade descrita nesta ordem de servico com acompanhamento da equipe interna da Ampla TecServ.

Responsavel interno
{{user.name}}`;

function getValueByPath(
  source: Record<string, unknown>,
  path: string
): string | undefined {
  const parts = path.split(".");
  let current: unknown = source;

  for (const part of parts) {
    if (!current || typeof current !== "object" || !(part in current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  if (typeof current === "string") {
    return current;
  }

  return undefined;
}

export function renderServiceOrderTemplate(
  template: string,
  data: ServiceOrderTemplateData
) {
  return template.replace(/\{\{\s*([a-zA-Z0-9.]+)\s*\}\}/g, (_, key: string) => {
    return getValueByPath(data as unknown as Record<string, unknown>, key) || "";
  });
}
