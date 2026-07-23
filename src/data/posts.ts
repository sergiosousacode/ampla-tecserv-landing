export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: {
    nome: string;
    slug: string;
  };
};

export const posts: Post[] = [
  {
    slug: "como-obter-afe-anvisa",
    titulo: "Como obter a AFE da Anvisa",
    resumo: "Veja os principais passos para solicitar a AFE.",
    conteudo:
      "A Autorização de Funcionamento de Empresa é obrigatória para determinados estabelecimentos.",
    categoria: {
      nome: "Poster",
      slug: "anvisa",
    },
  },
  {
    slug: "importancia-do-suporte-tecnico",
    titulo: "A importância do suporte técnico",
    resumo: "Entenda como o suporte reduz paradas e prejuízos.",
    conteudo:
      "O suporte técnico preventivo ajuda a manter equipamentos e sistemas disponíveis.",
    categoria: {
      nome: "Categoria",
      slug: "tecnologia",
    },
  },
];