export type TarotVisual = {
  nome: string;
  roman: string;
  marseilleTitle: string;
  symbol: string;
  detail: string;
};

export const tarotVisuals: TarotVisual[] = [
  { nome: "O Louco", roman: "", marseilleTitle: "LE MAT", symbol: "☄", detail: "passo livre" },
  { nome: "O Mago", roman: "I", marseilleTitle: "LE BATELEUR", symbol: "✦", detail: "mesa e bastão" },
  { nome: "A Sacerdotisa", roman: "II", marseilleTitle: "LA PAPESSE", symbol: "☾", detail: "livro secreto" },
  { nome: "A Imperatriz", roman: "III", marseilleTitle: "L'IMPERATRICE", symbol: "♛", detail: "escudo e criação" },
  { nome: "O Imperador", roman: "IIII", marseilleTitle: "L'EMPEREUR", symbol: "♜", detail: "trono e ordem" },
  { nome: "O Hierofante", roman: "V", marseilleTitle: "LE PAPE", symbol: "✚", detail: "chave espiritual" },
  { nome: "Os Enamorados", roman: "VI", marseilleTitle: "L'AMOUREUX", symbol: "♡", detail: "escolha do coração" },
  { nome: "O Carro", roman: "VII", marseilleTitle: "LE CHARIOT", symbol: "♞", detail: "direção e vitória" },
  { nome: "A Justiça", roman: "VIII", marseilleTitle: "LA JUSTICE", symbol: "⚖", detail: "espada e balança" },
  { nome: "O Eremita", roman: "VIIII", marseilleTitle: "L'HERMITE", symbol: "♢", detail: "lanterna interior" },
  { nome: "A Roda da Fortuna", roman: "X", marseilleTitle: "LA ROUE", symbol: "◎", detail: "ciclo em movimento" },
  { nome: "A Força", roman: "XI", marseilleTitle: "LA FORCE", symbol: "∞", detail: "coragem suave" },
  { nome: "O Enforcado", roman: "XII", marseilleTitle: "LE PENDU", symbol: "⇵", detail: "nova perspectiva" },
  { nome: "A Morte", roman: "XIII", marseilleTitle: "L'ARCANE XIII", symbol: "✂", detail: "fim e renascimento" },
  { nome: "A Temperança", roman: "XIIII", marseilleTitle: "TEMPERANCE", symbol: "♒", detail: "vasos e cura" },
  { nome: "O Diabo", roman: "XV", marseilleTitle: "LE DIABLE", symbol: "♆", detail: "sombra e desejo" },
  { nome: "A Torre", roman: "XVI", marseilleTitle: "LA MAISON DIEU", symbol: "⌂", detail: "queda da ilusão" },
  { nome: "A Estrela", roman: "XVII", marseilleTitle: "L'ETOILE", symbol: "✶", detail: "água e esperança" },
  { nome: "A Lua", roman: "XVIII", marseilleTitle: "LA LUNE", symbol: "☽", detail: "sonho e intuição" },
  { nome: "O Sol", roman: "XVIIII", marseilleTitle: "LE SOLEIL", symbol: "☼", detail: "clareza e calor" },
  { nome: "O Julgamento", roman: "XX", marseilleTitle: "LE JUGEMENT", symbol: "♬", detail: "chamado da alma" },
  { nome: "O Mundo", roman: "XXI", marseilleTitle: "LE MONDE", symbol: "⊕", detail: "coroa e integração" },
];

export function getTarotVisual(nome: string) {
  return tarotVisuals.find((visual) => visual.nome === nome) || tarotVisuals[0];
}
