export const metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Ampla TecServ e fale com especialistas em suporte e assessoria em TI.",
};

export default function Contact() {
  return (
    <section className="container mx-auto py-16 text-center">
      <h2 className="mb-4 text-3xl font-bold">
        Precisa de suporte confiável?
      </h2>

      <p className="mb-8 text-lg">
        Fale com a Ampla TecServ e encontre a solução ideal para sua empresa.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href="https://wa.me/5583993711271"
          target="_blank"
          className="rounded bg-green-600 px-6 py-3 text-white"
        >
          WhatsApp
        </a>

        <a
          href="mailto:amplatecserv@gmail.com"
          className="rounded border px-6 py-3"
        >
          Email
        </a>
      </div>
    </section>
  );
}
