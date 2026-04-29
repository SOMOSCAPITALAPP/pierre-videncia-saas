export type TarotVisual = {
  nome: string;
  roman: string;
  marseilleTitle: string;
  symbol: string;
  detail: string;
  image: string;
};

export const tarotVisuals: TarotVisual[] = [
  { nome: "O Louco", roman: "", marseilleTitle: "LE MAT", symbol: "☄", detail: "passo livre", image: "/tarot/o-louco.webp" },
  { nome: "O Mago", roman: "I", marseilleTitle: "LE BATELEUR", symbol: "✦", detail: "mesa e bastão", image: "/tarot/o-mago.webp" },
  { nome: "A Sacerdotisa", roman: "II", marseilleTitle: "LA PAPESSE", symbol: "☾", detail: "livro secreto", image: "/tarot/a-sacerdotisa.webp" },
  { nome: "A Imperatriz", roman: "III", marseilleTitle: "L'IMPERATRICE", symbol: "♛", detail: "escudo e criação", image: "/tarot/a-imperatriz.webp" },
  { nome: "O Imperador", roman: "IIII", marseilleTitle: "L'EMPEREUR", symbol: "♜", detail: "trono e ordem", image: "/tarot/o-imperador.webp" },
  { nome: "O Hierofante", roman: "V", marseilleTitle: "LE PAPE", symbol: "✚", detail: "chave espiritual", image: "/tarot/o-hierofante.webp" },
  { nome: "Os Enamorados", roman: "VI", marseilleTitle: "L'AMOUREUX", symbol: "♡", detail: "escolha do coração", image: "/tarot/os-enamorados.webp" },
  { nome: "O Carro", roman: "VII", marseilleTitle: "LE CHARIOT", symbol: "♞", detail: "direção e vitória", image: "/tarot/o-carro.webp" },
  { nome: "A Justiça", roman: "VIII", marseilleTitle: "LA JUSTICE", symbol: "⚖", detail: "espada e balança", image: "/tarot/a-justica.webp" },
  { nome: "O Eremita", roman: "VIIII", marseilleTitle: "L'HERMITE", symbol: "♢", detail: "lanterna interior", image: "/tarot/o-eremita.webp" },
  { nome: "A Roda da Fortuna", roman: "X", marseilleTitle: "LA ROUE", symbol: "◎", detail: "ciclo em movimento", image: "/tarot/a-roda-da-fortuna.webp" },
  { nome: "A Força", roman: "XI", marseilleTitle: "LA FORCE", symbol: "∞", detail: "coragem suave", image: "/tarot/a-forca.webp" },
  { nome: "O Enforcado", roman: "XII", marseilleTitle: "LE PENDU", symbol: "⇵", detail: "nova perspectiva", image: "/tarot/o-enforcado.webp" },
  { nome: "A Morte", roman: "XIII", marseilleTitle: "L'ARCANE XIII", symbol: "✂", detail: "fim e renascimento", image: "/tarot/a-morte.webp" },
  { nome: "A Temperança", roman: "XIIII", marseilleTitle: "TEMPERANCE", symbol: "♒", detail: "vasos e cura", image: "/tarot/a-temperanca.webp" },
  { nome: "O Diabo", roman: "XV", marseilleTitle: "LE DIABLE", symbol: "♆", detail: "sombra e desejo", image: "/tarot/o-diabo.webp" },
  { nome: "A Torre", roman: "XVI", marseilleTitle: "LA MAISON DIEU", symbol: "⌂", detail: "queda da ilusão", image: "/tarot/a-torre.webp" },
  { nome: "A Estrela", roman: "XVII", marseilleTitle: "L'ETOILE", symbol: "✶", detail: "água e esperança", image: "/tarot/a-estrela.webp" },
  { nome: "A Lua", roman: "XVIII", marseilleTitle: "LA LUNE", symbol: "☽", detail: "sonho e intuição", image: "/tarot/a-lua.webp" },
  { nome: "O Sol", roman: "XVIIII", marseilleTitle: "LE SOLEIL", symbol: "☼", detail: "clareza e calor", image: "/tarot/o-sol.webp" },
  { nome: "O Julgamento", roman: "XX", marseilleTitle: "LE JUGEMENT", symbol: "♬", detail: "chamado da alma", image: "/tarot/o-julgamento.webp" },
  { nome: "O Mundo", roman: "XXI", marseilleTitle: "LE MONDE", symbol: "⊕", detail: "coroa e integração", image: "/tarot/o-mundo.webp" },
];

export function getTarotVisual(nome: string) {
  return tarotVisuals.find((visual) => visual.nome === nome) || tarotVisuals[0];
}
