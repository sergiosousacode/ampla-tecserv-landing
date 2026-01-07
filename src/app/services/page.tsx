export const metadata = {
  title: "Serviços",
  description:
    "Serviços de suporte técnico, assessoria em TI e infraestrutura para empresas.",
};

export default function Services() {
  return (
    <section className="container mx-auto px-4 py-16 text-center sm:px-6 lg:px-100">
      <h2 className="text-blue-600 mb-8 text-3xl font-bold">Nossos Serviços</h2>

      <ul className="grid grid-cols-1 gap-6">
        <li className="rounded border p-6 shadow-lg">
          <h3 className="font-bold">Suporte Técnico</h3>
          <p>Atendimento rápido e especializado para sua empresa. Nosso suporte pode ser remotamente ou presencial, nas proximidades da sede de nossa empresa.</p>
        </li>

        <li className="rounded border p-6 shadow-lg">
          <h3 className="font-bold">Assessoria à pequenas empresas</h3>
          <p>Planejamento, orientação e preparação de documentos para Microempresas, principalmente no ramo de Drogarias ao que se refere a assuntos regulatórios junto a ANVISA. Troca de Responsabilidade técnica e legal, alterações de cadastro de Pessoas Física e Juídica, declaração de porte e outros serviços relacionados a Regulados.</p>
        </li>

        <li className="rounded border p-6 shadow-lg">
          <h3 className="font-bold">Automação comercial</h3>
          <p>Construção de rede cooporativa SERVIDOR e TERMINAL em automação comercial para pequenos comércios. Nossos parceiros comerciais nos fornece softwares homologados, atendendo todos os Estados brasileiros. Fornecemos também meios de pagamento TEF, exigência para empresas de adequar à emissão de notas vinculadas a NFCE do seu estado</p>
        </li>
      </ul>
    </section>
  );
}

