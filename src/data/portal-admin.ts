import type {
  ContractRecord,
  PortalUser,
  ServiceCatalogItem,
} from "@/types/portal";

export const portalUsers: PortalUser[] = [
  {
    id: "usr_admin_1",
    name: "Administrador Ampla",
    email: "admin@amplatecserv.com.br",
    role: "admin",
    status: "ativo",
  },
  {
    id: "usr_ops_1",
    name: "Equipe Operacional",
    email: "operacional@amplatecserv.com.br",
    role: "operacional",
    status: "ativo",
  },
  {
    id: "usr_client_1",
    name: "Cliente Exemplo",
    email: "cliente@empresa.com.br",
    role: "cliente",
    status: "ativo",
  },
];

export const serviceCatalog: ServiceCatalogItem[] = [
  {
    id: "svc_1",
    name: "Suporte tecnico empresarial",
    category: "Suporte",
    billing: "mensal",
    status: "ativo",
    summary: "Atendimento remoto e presencial para manter a operacao estavel.",
  },
  {
    id: "svc_2",
    name: "Assessoria regulatoria para drogarias",
    category: "Consultoria",
    billing: "projeto",
    status: "ativo",
    summary: "Apoio em processos regulatorios, SNGPC e documentacao tecnica.",
  },
  {
    id: "svc_3",
    name: "Automacao comercial",
    category: "Infraestrutura",
    billing: "avulso",
    status: "rascunho",
    summary: "Implantacao de software, terminais, rede e meios de pagamento.",
  },
];

export const contractRecords: ContractRecord[] = [
  {
    id: "ctr_1",
    client: "Drogaria Exemplo",
    service: "Suporte tecnico empresarial",
    status: "ativo",
    pdfStatus: "pronto",
    sharing: "email",
  },
  {
    id: "ctr_2",
    client: "Mercadinho Central",
    service: "Automacao comercial",
    status: "aguardando assinatura",
    pdfStatus: "pronto",
    sharing: "whatsapp",
  },
  {
    id: "ctr_3",
    client: "Farmacia Modelo",
    service: "Assessoria regulatoria para drogarias",
    status: "em elaboracao",
    pdfStatus: "pendente",
    sharing: "portal",
  },
];
