import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="flex flex-col justify-around py-16">
        <h3 className="text-white mb-10 text-center text-2xl font-bold">
          O QUE DIZEM NOSSOS CLIENTES!
        </h3>

        <div className="grid gap-6 md:grid-cols-3">     
          <div className="max-w-sm mx-auto rounded-2xl bg-white p-6 shadow-md text-center">
            {/* Avatar */}
            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="/partners/logo_ampla.svg"
                alt="Logo do cliente"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Depoimento */}
            <p className="mb-4 italic text-gray-700">
              “Obrigado pela atenção, do incício ao fim do problema você sempre me manteve informado. Parabéns pelo serviço!”
            </p>

            {/* Autor */}
            <strong className="block text-gray-900">
              Rogério Barreto
            </strong>
            <span className="text-sm text-gray-500">
              Farmácia Barreto/ MG
            </span>
          </div>

          <div className="max-w-sm mx-auto rounded-2xl bg-white p-6 shadow-md text-center">
            {/* Avatar */}
            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="/partners/logo_ampla.svg"
                alt="Logo do cliente"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Depoimento */}
            <p className="mb-4 italic text-gray-700">
              “Gratidão pela sua assessoria e pode deixar, quando tiver problemas de meus
              clientes na ANVISA eu direciono pra seu escritório.”
            </p>

            {/* Autor */}
            <strong className="block text-gray-900">
              Yuri
            </strong>
            <span className="text-sm text-gray-500">
              Contábil / MG
            </span>
          </div>
          <div className="max-w-sm mx-auto rounded-2xl bg-white p-6 shadow-md text-center">
            {/* Avatar */}
            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
              <Image
                src="/partners/logo_ampla.svg"
                alt="Logo do cliente"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Depoimento */}
            <p className="mb-4 italic text-gray-700">
              “Sistema muito bom, ótimo custo benefício e se adaptou muito bem a minha Distribuidora Pet. Além de força de venda que é uma ótima ferramenta de vendas.”
            </p>

            {/* Autor */}
            <strong className="block text-gray-900">
              Thiago
            </strong>
            <span className="text-sm text-gray-500">
              Recife Pets Distribuidora / PE
            </span>
          </div>
        </div>
    </section>
  );
}
