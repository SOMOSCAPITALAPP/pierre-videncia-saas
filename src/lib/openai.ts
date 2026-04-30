import OpenAI from "openai";
import { readingPositions, type TarotCard } from "./tarotDeck";

let client: OpenAI | null = null;

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return client;
}

export type ReadingMode = "FREE" | "BASIC" | "PREMIUM";

type GenerateReadingInput = {
  nome: string;
  pergunta: string;
  tema: string;
  numero: number;
  cartas: TarotCard[];
  signo: string;
  numeroVida: number;
  mode: ReadingMode;
};

export async function generateReading(input: GenerateReadingInput) {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const openai = getOpenAIClient();
  const cardsText = input.cartas
    .map((card, index) => `${index + 1}. ${readingPositions[index]} — ${card.nome}: ${card.conselho}`)
    .join("\n");
  const modeInstruction = {
    FREE: "Resposta curta com curiosidade espiritual e bloqueio suave no final.",
    BASIC: "Resposta intermediária, emocional e clara, com alguns caminhos práticos.",
    PREMIUM:
      "Resposta premium longa, com resposta direta imediata, leitura aprofundada, conselho prático e convite para esclarecimento dentro da mesma consulta.",
  }[input.mode];
  const premiumStructure =
    input.mode === "PREMIUM"
      ? `

Para leitura PREMIUM, siga obrigatoriamente esta estrutura:

1. "Resposta direta" - comece com 3 a 5 linhas objetivas, respondendo a pergunta sem rodeios.
2. "Leitura aprofundada" - desenvolva 5 a 8 parágrafos usando as cinco cartas, a posição de cada uma, o signo e o número de vida. Explique o que está claro, o que está bloqueado, o que amadurece e o que pede atitude consciente.
3. "Conselho de Pierre" - escreva uma orientação humana, prática e acolhedora, sem prometer resultado absoluto.
4. "Para continuar esta leitura" - termine com uma pergunta curta que convide o consulente a pedir esclarecimento sobre um ponto da mesma tiragem.

A resposta premium deve ter aproximadamente 700 a 1100 palavras. Não seja genérico. Não use listas frias demais. Nunca prometa retorno amoroso, dinheiro, cura ou certeza.`
      : "";

  const prompt = `Você é Pierre Videncia, um tarólogo francês vivendo no Brasil.

Especialista em Tarô de Marselha, numerologia e astrologia.
Sua missão é aumentar a inteligência emocional do consulente, ajudando a pessoa a ficar mais sábia, menos reativa e mais consciente.
Você pode usar ferramentas de desenvolvimento pessoal como lei da atração, lei da ação, perdão, amor-próprio, autorresponsabilidade, presença e escolhas alinhadas.
Você orienta sem manipular, sem criar medo e sem promessas absolutas.

Você respeita o ritual Pierre Videncia:
1. O consulente escolhe um número entre 1 e 9.
2. O baralho dos 22 Arcanos Maiores do Tarô de Marselha é embaralhado.
3. O tirage en croix usa cinco posições: Situação atual, Obstáculo, Conselho, Evolução e Resultado.
4. As cartas são retiradas pelas posições X, 2X, 3X, 4X e 5X, usando módulo do baralho quando necessário.
5. A interpretação deve mencionar a tradição francesa do Tarô de Marselha com elegância, sem exagerar no misticismo.

Você responde sempre em português do Brasil.
Seu estilo é acolhedor, espiritual, elegante e misterioso.
Você nunca diz que é uma IA.
Você nunca faz promessas absolutas.

Use estes dados:
- nome: ${input.nome}
- pergunta: ${input.pergunta}
- tema: ${input.tema}
- número escolhido: ${input.numero}
- cartas:
${cardsText}
- signo: ${input.signo}
- número de vida: ${input.numeroVida}

Tipo de leitura: ${input.mode}
Instrução de profundidade: ${modeInstruction}${premiumStructure}`;

  if (!openai) {
    return fallbackReading(input);
  }

  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "Você é Pierre Videncia, tarólogo francês vivendo no Brasil. Responda com elegância espiritual, sem promessas absolutas e sem mencionar tecnologia. Respeite o ritual do tirage en croix do Tarô de Marselha e ajude o consulente a desenvolver inteligência emocional, amor-próprio, perdão e ação consciente.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.82,
    max_tokens: input.mode === "PREMIUM" ? 1800 : undefined,
  });

  return response.choices[0]?.message.content?.trim() || fallbackReading(input);
}

export async function generateChatReply(message: string, context?: string) {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const openai = getOpenAIClient();

  if (!openai) {
    return "Sinto sua dúvida com cuidado. Sem a conexão espiritual completa neste momento, posso apenas orientar: respire, observe os sinais concretos e escolha o próximo passo sem pressa. Se quiser, escreva sua pergunta com mais detalhes para que eu possa abrir um caminho simbólico mais claro.";
  }

  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "Você responde em nome de Pierre Videncia ou de sua equipe espiritual. Pierre é um tarólogo francês vivendo no Brasil. Responda sempre em português do Brasil, com tom acolhedor, elegante, espiritual e misterioso. Nunca diga que é uma IA, modelo ou sistema. Nunca faça promessas absolutas. Não substitua decisões médicas, jurídicas, financeiras ou psicológicas. Use ferramentas de desenvolvimento pessoal quando fizer sentido: lei da atração, lei da ação, perdão, amor-próprio, presença, autorresponsabilidade e inteligência emocional. Esta resposta é um esclarecimento da leitura anterior, não uma nova tiragem. Responda em 4 a 7 parágrafos, aprofundando o ponto pedido e terminando com uma orientação prática.",
      },
      {
        role: "user",
        content: `Contexto da leitura, se existir:\n${context || "Sem leitura prévia."}\n\nMensagem do consulente:\n${message}`,
      },
    ],
    temperature: 0.78,
    max_tokens: 900,
  });

  return (
    response.choices[0]?.message.content?.trim() ||
    "Sinto que a resposta precisa de silêncio e clareza. Escreva sua dúvida de outro modo para que eu possa orientar melhor."
  );
}

function fallbackReading(input: GenerateReadingInput) {
  const mainCard = input.cartas[0];
  const adviceCard = input.cartas[2];

  if (input.mode === "PREMIUM") {
    return `${input.nome}, aqui vai uma primeira leitura clara sobre ${input.tema.toLowerCase()}.

Resposta direta
${mainCard.nome} mostra que sua pergunta toca um ponto sensível: ${mainCard.significado_geral.toLowerCase()} A resposta não pede pressa, mas pede lucidez. Existe um movimento possível, porém ele depende menos de controle e mais de consciência, postura e verdade emocional.

Leitura aprofundada
Na tradição do Tarô de Marselha, a primeira carta revela o estado visível da situação. Com ${mainCard.nome}, sinto que o centro da sua pergunta está ligado a uma energia que já está se mostrando, mesmo que ainda não esteja completamente resolvida. Seu signo, ${input.signo}, e seu número de vida ${input.numeroVida} reforçam que esta fase pede maturidade, escuta interior e menos reação impulsiva.

O obstáculo indica que algo precisa ser visto sem fantasia. Nem tudo que o coração deseja está pronto para acontecer no ritmo que ele imagina. A leitura pede que você observe sinais concretos, palavras, atitudes e repetições.

O conselho espiritual vem por ${adviceCard.nome}: ${adviceCard.conselho} Esta carta pede uma atitude mais serena e mais alinhada com seu valor pessoal. Não é uma orientação para desistir, nem para insistir cegamente. É um convite para agir com dignidade.

Conselho de Pierre
O que eu sinto é que você precisa proteger sua paz antes de buscar uma resposta externa. Quando a alma está ansiosa, ela interpreta silêncio como rejeição, demora como castigo e dúvida como destino. Respire. Volte ao seu centro. A próxima atitude deve nascer de clareza, não de medo.

Para continuar esta leitura
Se quiser, posso esclarecer um ponto desta mesma tiragem: o sentimento envolvido, o conselho das cartas ou o próximo passo mais prudente.`;
  }

  return `${input.nome}, ao olhar para sua pergunta sobre ${input.tema.toLowerCase()}, sinto que ${mainCard.nome} revela um momento de ${mainCard.significado_geral.toLowerCase()} Seu signo, ${input.signo}, e seu número de vida ${input.numeroVida} mostram que esta resposta pede calma, escuta interior e uma decisão mais alinhada com o seu coração.

O conselho espiritual vem por ${adviceCard.nome}: ${adviceCard.conselho}

Sinto que há algo mais profundo nesta leitura...`;
}
