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
              “Obrigado pela atenção, do incício ao fim do problema você sempre me manteve informado. Parabéns pelo serviço!”
            </p>
            <strong>Rogério, Farmácia Barreto/MG</strong>
          </div>

          <div className="rounded border bg-white p-6 shadow-sm">
            <p className="mb-4 italic">
              “Gratidão pela sua assessoria e pode deixar, quando tiver problemas de meus clientes na ANVISA eu direciono pra seu escritório.”
            </p>
            <strong>Yuri, Contábil/MG</strong>
          </div>

          <div className="rounded border bg-white p-6 shadow-sm">
            <p className="mb-4 italic">
              “Sistema muito bom, ótimo custo benefício e se adaptou muito bem a minha Distribuidora Pet. Além de força de venda que é uma ótima ferramenta de vendas.”
            </p>
            <strong>Thiago, Recife Pets Distribuidora/PE</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
