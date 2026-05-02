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
    badge: "direta",
    text: "Para uma dúvida específica que precisa de resposta clara, sem rodeios e com acolhimento.",
    maxQuestions: 1,
    durationMinutes: 20,
    questionsLabel: "1 tiragem",
    durationLabel: "20 min",
    signature: "Inclui esclarecimentos sobre a mesma leitura.",
  },
  {
    tipo: "Tiragem do Amor",
    valor: "39.90",
    label: "R$39,90",
    badge: "amor",
    text: "Para vínculos, silêncio, retorno, escolha afetiva, medo de perder ou coragem de seguir.",
    maxQuestions: 2,
    durationMinutes: 30,
    questionsLabel: "2 tiragens",
    durationLabel: "30 min",
    signature: "Leitura afetiva com espaço para aprofundar sentimentos e próximos passos.",
  },
  {
    tipo: "Tiragem Completa",
    valor: "79.90",
    label: "R$79,90",
    badge: "mais escolhida",
    text: "Para amor, trabalho, dinheiro, família ou saúde emocional quando a situação pede visão ampla.",
    maxQuestions: 3,
    durationMinutes: 45,
    questionsLabel: "3 tiragens",
    durationLabel: "45 min",
    signature: "Tiragem em cruz com resposta direta, leitura profunda e conselho prático.",
  },
  {
    tipo: "Mapa Espiritual Completo",
    valor: "149.90",
    label: "R$149,90",
    badge: "premium",
    text: "Tarô, numerologia, astrologia e orientação aprofundada para organizar ciclos, decisões e energia.",
    maxQuestions: 5,
    durationMinutes: 90,
    questionsLabel: "5 tiragens",
    durationLabel: "90 min",
    signature: "Visão ampla do momento emocional, espiritual e prático.",
  },
  {
    tipo: "Premium Mensal",
    valor: "99.90",
    label: "R$99,90",
    badge: "mensal",
    text: "Acompanhamento mensal para quem quer clareza recorrente sem decidir tudo sozinho.",
    maxQuestions: 20,
    durationMinutes: 43200,
    questionsLabel: "20 tiragens",
    durationLabel: "30 dias",
    signature: "Para amadurecer escolhas ao longo do mês, com calma e presença.",
  },
];

export function getOfferByTipo(tipo: string) {
  return premiumOffers.find((offer) => offer.tipo === tipo) || premiumOffers[2];
}
