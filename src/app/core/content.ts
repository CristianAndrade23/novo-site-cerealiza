import { IconName } from '../shared/icon';

/** Conteúdo do site. Marca, pessoas e depoimentos são fictícios (projeto de portfólio). */

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'conheca', label: 'Conheça' },
  { id: 'beneficios', label: 'Benefícios' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'contato', label: 'Contato' },
];

export interface Benefit {
  id: string;
  icon: IconName;
  title: string;
  question: string;
  points: readonly string[];
}

export const BENEFITS: readonly Benefit[] = [
  {
    id: 'coleta',
    icon: 'clipboard',
    title: 'Simplificar a coleta de dados',
    question: 'Rotinas simples que evitam ao máximo a busca nota a nota pelo produtor.',
    points: [
      'Lançamentos por lavoura e por safra',
      'Custos diretos, indiretos e administrativos separados',
      'Funciona no celular, direto do campo',
    ],
  },
  {
    id: 'margem',
    icon: 'chart',
    title: 'Analisar margem e custos',
    question: 'Sua margem está boa? Vendeu bem? Seus custos estão competitivos na região?',
    points: [
      'Receita, custo e margem por hectare',
      'Cenário estimado e efetivo lado a lado',
      'Comparação com grupos de lavouras da região',
    ],
  },
  {
    id: 'planejamento',
    icon: 'target',
    title: 'Planejar a construção de margem',
    question: 'Como estão as finanças? Dívidas de curto prazo? E os juros? Há como melhorar?',
    points: [
      'Dívidas de curto e de longo prazo em um só lugar',
      'Impacto dos juros na margem da safra',
      'Metas de produtividade e de preço por saca',
    ],
  },
  {
    id: 'venda',
    icon: 'trending-up',
    title: 'Orientar para a venda',
    question: 'Seu preço médio está compatível com o da região? Você acompanha o mercado?',
    points: [
      'Preço médio de venda por cultura',
      'Quantas sacas faltam vender para cobrir o custo',
      'Aviso quando o preço alcança a sua meta',
    ],
  },
];

export interface Testimonial {
  name: string;
  role: string;
  city: string;
  quote: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: 'Marcos Antunes',
    role: 'Produtor de soja',
    city: 'Santa Maria, RS',
    quote: 'Sem números, não dá para decidir nada. Hoje eu sei quanto custa cada saca.',
  },
  {
    name: 'Rogério Kunz',
    role: 'Produtor de soja',
    city: 'Cruz Alta, RS',
    quote: 'Mostrou os pontos certos para melhorar a eficiência econômica da fazenda.',
  },
  {
    name: 'Helena Brum',
    role: 'Produtora de arroz e soja',
    city: 'Itaqui, RS',
    quote: 'Botamos as contas no sistema e fomos atrás do que estava pesando.',
  },
  {
    name: 'Fábio Dornelles',
    role: 'Produtor de arroz',
    city: 'Uruguaiana, RS',
    quote: 'Várias decisões da última safra eu não teria como tomar sem essa ferramenta.',
  },
  {
    name: 'Patrícia Lemos',
    role: 'Engenheira agrônoma',
    city: 'Alegrete, RS',
    quote: 'Muito útil na hora de decidir quando e quanto vender.',
  },
  {
    name: 'Sílvia Maciel',
    role: 'Produtora de milho e soja',
    city: 'Passo Fundo, RS',
    quote: 'Comparar minha lavoura com as da região mudou o meu planejamento.',
  },
  {
    name: 'André Tessele',
    role: 'Produtor de trigo e soja',
    city: 'Ijuí, RS',
    quote: 'Os lançamentos são rápidos. Faço quase tudo pelo celular, na lavoura.',
  },
  {
    name: 'Juliana Prestes',
    role: 'Consultora financeira rural',
    city: 'Santa Rosa, RS',
    quote: 'Uso com todos os meus clientes para preparar a renegociação de dívidas.',
  },
  {
    name: 'Vitor Goulart',
    role: 'Produtor de soja',
    city: 'São Gabriel, RS',
    quote: 'Antes eu vendia pelo preço do vizinho. Agora vendo pensando no meu custo.',
  },
];

export interface TeamMember {
  name: string;
  role: string;
}

export const TEAM: readonly TeamMember[] = [
  { name: 'Ricardo Sartori', role: 'Produtor rural, empresário e sócio' },
  { name: 'Alessandra Lima', role: 'Sócia, especialista em TI' },
  { name: 'Diego Ferraz', role: 'Engenheiro de software' },
  { name: 'Rafael Moura', role: 'Engenheiro de software' },
  { name: 'Sabrina Vieira', role: 'Engenheira de software' },
  { name: 'Joana Falcone', role: 'Designer UX/UI' },
  { name: 'Eduardo Matos', role: 'Advogado' },
];

export const PLANTED_AREAS = [
  { value: '1-500', label: 'Entre 1 e 500 hectares' },
  { value: '501-1000', label: 'Entre 501 e 1.000 hectares' },
  { value: '1001-2000', label: 'Entre 1.001 e 2.000 hectares' },
  { value: '2001-5000', label: 'Entre 2.001 e 5.000 hectares' },
  { value: '5000+', label: 'Mais de 5.000 hectares' },
] as const;

export const CONTACT_EMAIL = 'contato@agropainel.example';
export const PANEL_REPO_URL = 'https://github.com/CristianAndrade23/agro-painel';
export const SITE_REPO_URL = 'https://github.com/CristianAndrade23/novo-site-cerealiza';
