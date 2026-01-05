export const metadata = {
  title: "Serviços",
  description:
    "Serviços de suporte técnico, assessoria em TI e infraestrutura para empresas.",
};

export default function Services() {
  return (
    <section className="container mx-auto px-4 py-16 text-center sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold">Nossos Serviços</h2>

      <ul className="grid grid-cols-1 gap-6">
        <li className="rounded border p-6">
          <h3 className="font-semibold">Suporte Técnico</h3>
          <p>Atendimento rápido e especializado para sua empresa.</p>
        </li>

        <li className="rounded border p-6">
          <h3 className="font-semibold">Assessoria em TI</h3>
          <p>Planejamento e orientação tecnológica estratégica.</p>
        </li>

        <li className="rounded border p-6">
          <h3 className="font-semibold">Infraestrutura</h3>
          <p>Servidores, redes e ambientes seguros.</p>
        </li>
      </ul>
    </section>
  );
}

