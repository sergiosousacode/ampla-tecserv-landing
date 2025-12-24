export default function Testimonials() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4"
>
        <h3 className="mb-10 text-center text-3xl font-bold">
          O que nossos clientes dizem
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded border bg-white p-6 shadow-sm">
            <p className="mb-4 italic">
              “A Ampla TecServ resolveu problemas críticos de TI da nossa empresa
              com rapidez e profissionalismo.”
            </p>
            <strong>Empresa Alpha</strong>
          </div>

          <div className="rounded border bg-white p-6 shadow-sm">
            <p className="mb-4 italic">
              “Suporte confiável e sempre disponível. Hoje temos muito mais
              estabilidade nos sistemas.”
            </p>
            <strong>Empresa Beta</strong>
          </div>

          <div className="rounded border bg-white p-6 shadow-sm">
            <p className="mb-4 italic">
              “A assessoria em TI foi fundamental para nosso crescimento.”
            </p>
            <strong>Parceiro Gama</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
