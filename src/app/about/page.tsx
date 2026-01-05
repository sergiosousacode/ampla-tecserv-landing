export const metadata = {
  title: "Sobre a Empresa",
  description:
    "Conheça a Ampla TecServ, especializada em suporte técnico e assessoria em TI para empresas.",
};

export default function About() {
  return (
    <section className="container mx-auto py-16 text-center md:text-center">
      <h2 className="mb-4 text-3xl font-bold">Sobre a Ampla TecServ</h2>

      <p className="mx-auto max-w-3xl text-lg">
        A Ampla TecServ nasceu com o objetivo de oferecer suporte técnico e
        assessoria em TI para empresas que precisam de estabilidade,
        segurança e crescimento tecnológico.
      </p>
    </section>
  );
}
