export default function Hero() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          Suporte e assessoria em TI para empresas que não podem parar
        </h2>

        <p className="mx-auto mb-8 max-w-3xl text-lg">
          A Ampla TecServ ajuda sua empresa a manter sistemas estáveis,
          seguros e prontos para crescer.
        </p>

        <a
          href="/contact"
          className="rounded bg-blue-600 px-8 py-4 text-white text-lg"
        >
          Fale com um especialista
        </a>
      </div>
    </section>
  );
}
