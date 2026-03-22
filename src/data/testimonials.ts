export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  role?: string;
  avatar?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rogério Barreto",
    quote:
      "Obrigado pela atenção, do incício ao fim do problema você sempre me manteve informado. Parabéns pelo serviço!",
    role: "Farmácia Barreto / MG",
    avatar: "/partners/logo_ampla.svg",
  },
  {
    id: "t2",
    name: "Yuri",
    quote:
      "Gratidão pela sua assessoria e pode deixar, quando tiver problemas de meus clientes na ANVISA eu direciono pra seu escritório.",
    role: "Contábil / MG",
    avatar: "/partners/logo_ampla.svg",
  },
  {
    id: "t3",
    name: "Thiago",
    quote:
      "Sistema muito bom, ótimo custo benefício e se adaptou muito bem a minha Distribuidora Pet. Além de força de venda que é uma ótima ferramenta de vendas.",
    role: "Recife Pets Distribuidora / PE",
    avatar: "/partners/logo_ampla.svg",
  },
];
