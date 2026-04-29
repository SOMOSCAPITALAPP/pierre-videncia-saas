export type PremiumOffer = {
  tipo: string;
  valor: string;
  label: string;
  badge: string;
  text: string;
  maxQuestions: number;
  durationMinutes: number;
  questionsLabel: string;
  durationLabel: string;
  signature: string;
};

export const premiumOffers: PremiumOffer[] = [
  {
    tipo: "Pergunta única",
    valor: "19.90",
    label: "R$19,90",
    badge: "rápida",
    text: "Uma resposta direta para uma dúvida específica.",
    maxQuestions: 1,
    durationMinutes: 20,
    questionsLabel: "1 pergunta",
    durationLabel: "20 min",
    signature: "Um arcano central para uma decisão simples.",
  },
  {
    tipo: "Tiragem do Amor",
    valor: "39.90",
    label: "R$39,90",
    badge: "amor",
    text: "Para dúvidas sobre conexão, retorno, silêncio e caminhos afetivos.",
    maxQuestions: 2,
    durationMinutes: 30,
    questionsLabel: "2 perguntas",
    durationLabel: "30 min",
    signature: "Leitura afetiva com nome da pessoa ligada ao vínculo.",
  },
  {
    tipo: "Tiragem Completa",
    valor: "79.90",
    label: "R$79,90",
    badge: "mais escolhida",
    text: "Cinco cartas aprofundadas com orientação emocional e prática.",
    maxQuestions: 3,
    durationMinutes: 45,
    questionsLabel: "3 perguntas",
    durationLabel: "45 min",
    signature: "Tiragem em cruz com conselho e evolução.",
  },
  {
    tipo: "Mapa Espiritual Completo",
    valor: "149.90",
    label: "R$149,90",
    badge: "premium",
    text: "Tarô, numerologia, astrologia e orientação com prioridade no WhatsApp.",
    maxQuestions: 5,
    durationMinutes: 90,
    questionsLabel: "5 perguntas",
    durationLabel: "90 min",
    signature: "Visão ampla do momento emocional e espiritual.",
  },
  {
    tipo: "Premium Mensal",
    valor: "99.90",
    label: "R$99,90",
    badge: "whatsapp premium",
    text: "Acompanhamento espiritual mensal com canal premium no WhatsApp.",
    maxQuestions: 20,
    durationMinutes: 43200,
    questionsLabel: "20 perguntas",
    durationLabel: "30 dias",
    signature: "Acompanhamento recorrente para amadurecer escolhas.",
  },
];

export function getOfferByTipo(tipo: string) {
  return premiumOffers.find((offer) => offer.tipo === tipo) || premiumOffers[2];
}
