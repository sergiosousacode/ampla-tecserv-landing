export const metadata = {
  title: "Central de Ajuda",
  description:
    "Acesse a central de ajuda e abra chamados de suporte com a Ampla TecServ.",
};

export default function Help() {
  return (
    <section className="container mx-auto py-16 text-center">
      <h2 className="mb-4 text-3xl font-bold">Central de Ajuda</h2>

      <p className="mb-8 text-lg">
        Já é cliente? Abra um chamado no nosso helpdesk.
      </p>

      <a
        href="#"
        className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        Acessar Helpdesk
      </a>
    </section>
  );
}
