export const metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Ampla TecServ e fale com especialistas em suporte e assessoria em TI.",
};

export default function Contact() {
  return (
    <section className="container mx-auto py-16 text-center mb-40 space-y-8">
      <h2 className="mb-4 text-3xl font-bold">
        Precisa de suporte confiável?
      </h2>

      <p className="mb-8 text-lg justify-center">
        Fale com a Ampla TecServ e encontre a solução ideal para sua empresa.
      </p>

      <div className="flex justify-center gap-4 ">
        <a
          href="https://wa.me/5583993711271"
          target="_blank"
          className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          WhatsApp
        </a>

        <a
          href="mailto:amplatecserv@gmail.com"
          className="rounded border px-6 py-3 hover:bg-gray-100 shadow-2xl"
        >
          Email
        </a>
      </div>

      <div className="mx-auto h-[350px] w-full max-w-5xl overflow-hidden rounded-lg border shadow">
        <iframe
          src="https://www.google.com/maps?q=R.%Severino Nicolau%de%Melo,420&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0"
        />
      </div>
    </section>
  );
}
