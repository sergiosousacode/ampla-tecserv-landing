export type PortalUserRole = "admin" | "operacional" | "cliente";

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  role: PortalUserRole;
  status: "ativo" | "pendente";
}

export interface ServiceCatalogItem {
  id: string;
  name: string;
  category: string;
  billing: "mensal" | "avulso" | "projeto";
  status: "ativo" | "rascunho";
  summary: string;
}

export interface ContractRecord {
  id: string;
  client: string;
  services: string[];
  status: "em elaboracao" | "aguardando assinatura" | "ativo";
  pdfStatus: "pronto" | "pendente";
  sharing: "email" | "whatsapp" | "portal";
}
