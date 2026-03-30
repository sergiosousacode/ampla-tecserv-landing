interface ServiceSelectionInput {
  name: string;
  category: string;
  basePriceValue: number | null;
  basePriceLabel?: string;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatServicePrice(
  value: number | null,
  fallback = "A combinar"
) {
  return value !== null ? formatCurrency(value) : fallback;
}

export function buildServiceSelectionSummary(services: ServiceSelectionInput[]) {
  const normalizedServices = services.map((service) => ({
    ...service,
    basePriceLabel:
      service.basePriceLabel || formatServicePrice(service.basePriceValue),
  }));
  const totalPrice = normalizedServices.every(
    (service) => service.basePriceValue !== null
  )
    ? normalizedServices.reduce(
        (sum, service) => sum + Number(service.basePriceValue),
        0
      )
    : null;

  const names = normalizedServices.map((service) => service.name);

  return {
    primaryService: normalizedServices[0] || {
      name: "",
      category: "",
      basePriceLabel: "A combinar",
    },
    count: String(normalizedServices.length),
    names: names.join(", "),
    shortLabel:
      normalizedServices.length <= 2
        ? names.join(", ")
        : `${names.slice(0, 2).join(", ")} +${normalizedServices.length - 2}`,
    list: normalizedServices
      .map(
        (service, index) =>
          `${index + 1}. ${service.name} (${service.category}) - ${service.basePriceLabel}`
      )
      .join("\n"),
    totalPriceLabel:
      totalPrice !== null ? formatCurrency(totalPrice) : "A combinar",
  };
}
