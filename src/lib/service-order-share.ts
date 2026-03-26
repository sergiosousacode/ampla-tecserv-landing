export function normalizeWhatsappPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function buildServiceOrderWhatsappMessage(input: {
  title: string;
  clientName: string;
  serviceName: string;
  companyName: string;
}) {
  return [
    "Ampla TecServ",
    "",
    `A ordem de servico "${input.title}" esta pronta para atendimento.`,
    `Cliente: ${input.clientName}`,
    `Servico: ${input.serviceName}`,
    `Empresa responsavel: ${input.companyName}`,
    "",
    "Entre em contato com a equipe da Ampla TecServ para validacao e alinhamento final.",
  ].join("\n");
}
