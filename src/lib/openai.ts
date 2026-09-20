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

export type ChatReplyResult = {
  reply: string;
  countsAsClarification: boolean;
};

function getModelForMode(mode: ReadingMode) {
  if (mode === "PREMIUM") {
    return process.env.OPENAI_PREMIUM_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini";
  }

  return process.env.OPENAI_MODEL || "gpt-4o-mini";
}

function getMaxTokensForMode(mode: ReadingMode) {
  if (mode === "PREMIUM") return 2600;
  if (mode === "BASIC") return 1200;
  return 650;
}

function getModeInstruction(mode: ReadingMode) {
  if (mode === "PREMIUM") {
    return `
Consulta PREMIUM:
- entregue uma leitura de alto valor, profunda, humana e organizada;
- responda a pergunta diretamente antes de desenvolver;
- use Tarot de Marselha, numerologia, astrologia, inteligencia emocional, psicologia pratica e desenvolvimento pessoal;
- conecte as cartas entre si, nao interprete cada carta de forma isolada;
- traga nuances: o que a pessoa sente, o que evita, o que precisa enxergar, qual atitude concreta ajuda;
- nunca prometa retorno, dinheiro, cura, resultado juridico, diagnostico ou certeza absoluta;
- escreva de 900 a 1400 palavras, com calor humano e autoridade tranquila.`;
  }

  if (mode === "BASIC") {
    return `
Consulta intermediaria:
- entregue uma resposta clara e acolhedora, com 450 a 700 palavras;
- mostre valor real, mas deixe claro que a leitura premium aprofunda cartas, bloqueios e proximos passos;
- termine convidando a pessoa a continuar numa consulta paga se quiser orientacao completa.`;
  }

  return `
Consulta gratuita:
- entregue uma amostra boa, mas limitada, com 220 a 350 palavras;
- responda o essencial sem revelar toda a estrategia emocional;
- crie curiosidade legitima sobre a leitura completa;
- termine com um convite natural para desbloquear a consulta premium, sem pressao agressiva.`;
}

function getPremiumStructure(mode: ReadingMode) {
  if (mode !== "PREMIUM") return "";

  return `

Estrutura obrigatoria, com estes titulos em primeira pessoa:
1. Minha resposta direta: responda em 4 a 6 linhas.
2. O que as cartas mostram: conecte as cinco posicoes da tiragem.
3. Leitura aprofundada: aprofunde a situacao concreta da pessoa.
4. O que isso revela sobre voce: integre emocao, numerologia e astrologia simbolica sem diagnosticar.
5. Meu conselho pratico: diga o que fazer hoje, nesta semana e o que evitar.
6. Proximo passo consciente: transforme a leitura em uma decisao possivel.
7. Para continuar esta leitura: convide a um esclarecimento da mesma tiragem.`;
}

function buildPersonaPrompt() {
  return `Voce e Pierre Videncia, um tarologo frances vivendo no Brasil.

Pierre e taromancista do Tarot de Marselha, numerologo, astrologologo simbolico, conselheiro espiritual, estudioso de psicologia pratica, desenvolvimento pessoal e inteligencia emocional.

Seu papel nao e adivinhar a vida como destino fixo. Seu papel e ajudar a pessoa a enxergar padroes, escolhas, bloqueios, sentimentos e proximos passos com mais lucidez.

Voz de Pierre:
- portugues do Brasil, elegante, caloroso, misterioso e humano;
- frases com ritmo natural, como uma pessoa cuidadosa escrevendo;
- autoridade tranquila, sem arrogancia;
- espiritualidade com pe no chao;
- acolhimento sem bajular;
- profundidade sem assustar;
- nunca mencione tecnologia, IA, modelo, sistema ou prompt.

Limites eticos:
- nunca prometa retorno amoroso, cura, dinheiro, resultado juridico, gravidez, morte ou certeza absoluta;
- em saude emocional, ofereca orientacao simbolica e emocional, sem diagnostico e sem substituir profissionais;
- em dinheiro/trabalho, fale de postura, sinais, estrategia e prudencia, sem promessa financeira;
- nao manipule medo, culpa ou dependencia.`;
}

export async function generateReading(input: GenerateReadingInput) {
  const model = getModelForMode(input.mode);
  const openai = getOpenAIClient();
  const cardsText = input.cartas
    .map((card, index) => {
      const themeMeaning =
        input.tema === "Amor" ? card.amor : input.tema === "Trabalho" || input.tema === "Dinheiro" ? card.trabalho : card.significado_geral;

      return `${index + 1}. ${readingPositions[index]} - ${card.nome}
Significado geral: ${card.significado_geral}
Aplicacao ao tema: ${themeMeaning}
Conselho: ${card.conselho}`;
    })
    .join("\n\n");

  const prompt = `Ritual Pierre Videncia:
1. O consulente escolhe um numero entre 1 e 9.
2. O baralho dos 22 Arcanos Maiores do Tarot de Marselha e embaralhado.
3. A tiragem em cruz usa cinco posicoes: Situacao atual, Obstaculo, Conselho, Evolucao e Resultado.
4. As cartas sao retiradas pelas posicoes X, 2X, 3X, 4X e 5X, usando modulo do baralho quando necessario.
5. A leitura deve mencionar a tradicao francesa do Tarot de Marselha com elegancia, sem exagero teatral.

Dados da consulta:
- nome: ${input.nome}
- pergunta: ${input.pergunta}
- tema: ${input.tema}
- numero escolhido: ${input.numero}
- signo: ${input.signo}
- numero de vida: ${input.numeroVida}

Cartas abertas:
${cardsText}

Profundidade:
${getModeInstruction(input.mode)}
${getPremiumStructure(input.mode)}

Regras de escrita:
- nao seja generico;
- nao repita a pergunta mecanicamente;
- nao use markdown com tabelas;
- use subtitulos simples quando a estrutura pedir;
- escreva como Pierre, nao como um relatorio;
- feche com uma sensacao de cuidado e continuidade.`;

  if (!openai) {
    return fallbackReading(input);
  }

  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: buildPersonaPrompt(),
      },
      { role: "user", content: prompt },
    ],
    temperature: input.mode === "PREMIUM" ? 0.78 : 0.82,
    max_tokens: getMaxTokensForMode(input.mode),
  });

  return response.choices[0]?.message.content?.trim() || fallbackReading(input);
}

function parseChatReply(raw: string): ChatReplyResult {
  const trimmed = raw.trim();
  const marker = trimmed.match(/^CONTADOR:\s*(SIM|NAO|NÃO)\s*/i);

  if (!marker) {
    return {
      reply: trimmed,
      countsAsClarification: true,
    };
  }

  return {
    reply: trimmed.replace(/^CONTADOR:\s*(SIM|NAO|NÃO)\s*/i, "").trim(),
    countsAsClarification: marker[1].toUpperCase() === "SIM",
  };
}

export async function generateChatReply(message: string, context?: string): Promise<ChatReplyResult> {
  const model = process.env.OPENAI_CHAT_MODEL || process.env.OPENAI_PREMIUM_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini";
  const openai = getOpenAIClient();

  if (!openai) {
    return fallbackChatReply(message, context);
  }

  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `${buildPersonaPrompt()}

Voce esta no chat premium. A pessoa ja pagou e merece profundidade real.
Esta resposta e um esclarecimento da leitura anterior, nao uma nova tiragem.
Escreva sempre em primeira pessoa. Diga "minha resposta", "minha leitura", "eu sinto", "eu recomendo". Nunca escreva "a resposta de Pierre".

Controle do contador:
- A primeira linha da sua resposta deve ser exatamente "CONTADOR: SIM" ou "CONTADOR: NAO".
- Use "CONTADOR: SIM" quando voce entregar uma interpretacao, conselho ou aprofundamento real da leitura.
- Use "CONTADOR: NAO" quando voce estiver apenas pedindo uma informacao necessaria para responder melhor, confirmando dados, acolhendo uma resposta curta do consulente, ou explicando que precisa de contexto.
- Perguntas de esclarecimento que voce precisa fazer para orientar melhor nao devem consumir o contador.
- Depois da primeira linha, escreva normalmente como Pierre. O usuario nao vera a primeira linha.

Gestao da conversa:
- Diferencie aprofundamento da mesma leitura de uma nova pergunta. Se a pessoa perguntar "que tipo de trabalho?", "quanto?", "o que devo fazer?", "qual caminho?", isso costuma ser aprofundamento.
- Nova tiragem so deve ser sugerida quando o tema mudar muito ou quando a pessoa pedir explicitamente nova pergunta/nova tiragem.
- Se a pergunta estiver vaga demais, primeiro faca uma pergunta simples e humana para entender melhor, sem consumir contador.

Responda em 6 a 10 paragrafos, com:
1. acolhimento direto do ponto pedido;
2. aprofundamento emocional e simbolico;
3. conexao com as cartas ou com o conselho da leitura;
4. orientacao pratica;
5. uma pergunta final curta que mantenha a conversa humana.

Nunca responda seco. Nunca diga que nao pode ajudar sem oferecer um caminho simbolico e prudente.`,
      },
      {
        role: "user",
        content: `Contexto da leitura, se existir:
${context || "Sem leitura previa."}

Mensagem do consulente:
${message}`,
      },
    ],
    temperature: 0.76,
    max_tokens: 1500,
  });

  return (
    parseChatReply(
      response.choices[0]?.message.content?.trim() ||
        "CONTADOR: NAO\nSinto que a resposta precisa de silencio e clareza. Escreva sua duvida de outro modo para que eu possa orientar melhor.",
    )
  );
}

function fallbackReading(input: GenerateReadingInput) {
  const mainCard = input.cartas[0];
  const obstacleCard = input.cartas[1];
  const adviceCard = input.cartas[2];
  const outcomeCard = input.cartas[4];

  if (input.mode === "PREMIUM") {
    if (input.tema === "Trabalho") {
      return `${input.nome}, vou responder com cuidado, porque uma pergunta sobre trabalho bem pago nao deve ser tratada como uma simples previsao. Ela precisa virar direcao.

Resposta direta
Minha resposta e: existe possibilidade de voce encontrar um trabalho melhor remunerado, mas as cartas nao mostram isso como algo automatico. ${mainCard.nome} convida voce a observar seus recursos, experiencia e escolhas antes de aceitar qualquer oportunidade por urgencia.

O que as cartas mostram
Na situacao atual, ${mainCard.nome} fala de ${mainCard.significado_geral.toLowerCase()} Para trabalho, isso mostra um momento de revisao: olhar curriculo, contatos, habilidades, reputacao e o tipo de vaga que voce esta buscando.

O obstaculo vem por ${obstacleCard.nome}. Isso sugere que existe um chamado de mudanca, mas talvez voce ainda esteja preso a uma identidade profissional antiga, a uma inseguranca, ou a uma forma de procurar trabalho que ja nao combina com o que voce precisa receber. Pode haver uma decisao interna a tomar: parar de se apresentar pequeno.

O conselho espiritual aparece em ${adviceCard.nome}: ${adviceCard.conselho} Na pratica, isso pede equilibrio entre paciencia e acao. Nao adianta mandar curriculo sem estrategia, mas tambem nao adianta esperar clareza perfeita para agir. Voce precisa de uma rotina de busca, contatos e ajustes.

A tendencia final vem por ${outcomeCard.nome}. Em trabalho, essa carta fala de escolha. Pode aparecer mais de um caminho, e nem sempre o mais brilhante sera o melhor. O ponto sera escolher onde existe crescimento, dignidade e possibilidade real de remuneracao melhor.

Camada emocional e psicologica
Seu signo, ${input.signo}, e seu numero de vida ${input.numeroVida} reforcam uma energia de responsabilidade, analise e profundidade. O risco e pensar demais, esperar demais ou duvidar do proprio valor. O caminho e transformar experiencia em posicionamento.

Conselho de Pierre
Minha orientacao para hoje: escreva que tipo de trabalho voce nao aceita mais. Minha orientacao para esta semana: atualize sua apresentacao profissional com foco em resultados, nao apenas cargos. Minha orientacao para evitar: nao entre em oportunidades que pedem muito de voce e pagam como se sua experiencia nao valesse nada.

Para continuar esta leitura
Se quiser, eu posso aprofundar esta mesma tiragem: o tipo de trabalho mais favoravel, o bloqueio que atrasa sua recolocacao, ou a atitude pratica mais urgente.`;
    }

    if (input.tema === "Dinheiro") {
      return `${input.nome}, vou tratar sua pergunta sobre dinheiro com honestidade. Dinheiro precisa de visao espiritual, mas tambem precisa de plano, prazo e acao concreta.

Resposta direta
Minha resposta e: ha possibilidade de melhora financeira, mas eu nao vou inventar um valor exato nem prometer riqueza. As cartas mostram movimento, mas tambem alertam que ganhar mais depende de mudar uma postura, uma escolha ou uma estrategia. O dinheiro aparece como consequencia de direcao, nao como sorte isolada.

O que as cartas mostram
Na situacao atual, ${mainCard.nome} fala de ${mainCard.significado_geral.toLowerCase()} Em dinheiro, isso mostra que existe uma roda girando: oportunidades podem aparecer, mas voce precisa estar preparado para reconhecer e aproveitar.

O obstaculo vem por ${obstacleCard.nome}. Isso indica que pode haver potencial, desejo de crescer e ate boas ideias, mas talvez falte transformar isso em oferta concreta, negociacao, rotina ou decisao. Dinheiro parado no desejo nao se materializa.

O conselho espiritual aparece em ${adviceCard.nome}: ${adviceCard.conselho} Aqui, a leitura pede coragem sem desespero. Voce precisa agir com firmeza, mas sem apostar tudo em uma unica promessa.

A tendencia final vem por ${outcomeCard.nome}. Esta carta pede cuidado: ela pode mostrar uma ruptura de ilusao financeira, uma despesa inesperada, ou a necessidade de abandonar um caminho instavel. Mas tambem pode libertar voce de uma forma antiga de lidar com dinheiro.

Camada emocional e psicologica
Seu signo, ${input.signo}, e seu numero de vida ${input.numeroVida} sugerem que seu crescimento financeiro depende de disciplina, especializacao e decisao consciente. Voce nao deve perseguir dinheiro apenas por ansiedade; deve construir uma rota.

Conselho de Pierre
Minha orientacao para hoje: defina o valor minimo que precisa entrar e separe em caminhos possiveis. Minha orientacao para esta semana: procure uma fonte principal e uma fonte complementar. Minha orientacao para evitar: promessas rapidas, risco sem calculo e acordos pouco claros.

Para continuar esta leitura
Se quiser, eu posso aprofundar esta mesma tiragem: de onde o dinheiro pode vir, qual bloqueio financeiro precisa cair, ou qual acao mais urgente fazer primeiro.`;
    }

    return `${input.nome}, vou abrir esta leitura com calma, porque sua pergunta sobre ${input.tema.toLowerCase()} pede mais do que uma resposta rapida.

Resposta direta
${mainCard.nome} mostra que existe um movimento real acontecendo, mas ele ainda precisa de consciencia para nao se transformar em impulso. A resposta nao e um sim absoluto nem um nao fechado: e um convite para agir com mais lucidez, observando sinais concretos e cuidando da sua postura emocional.

O que as cartas mostram
Na situacao atual, ${mainCard.nome} fala de ${mainCard.significado_geral.toLowerCase()} O obstaculo vem por ${obstacleCard.nome}, indicando que algo ainda cria tensao, repeticao ou falta de clareza. Esta combinacao pede que voce nao tente controlar tudo pela ansiedade.

O conselho espiritual aparece em ${adviceCard.nome}: ${adviceCard.conselho} Eu recomendo que voce proteja sua paz antes de buscar uma resposta externa. Quando a alma esta aflita, ela interpreta demora como rejeicao, silencio como castigo e duvida como destino.

A tendencia final vem por ${outcomeCard.nome}, mostrando que a situacao pode amadurecer se voce escolher presenca, dignidade e acao consciente. Seu signo, ${input.signo}, e seu numero de vida ${input.numeroVida} reforcam que este ciclo pede equilibrio entre intuicao e atitude pratica.

Conselho de Pierre
Hoje, nao aja para aliviar medo. Aja para honrar seu valor. Esta semana, observe fatos: palavras, atitudes, repeticoes e disponibilidade real. Evite insistir onde voce precisa se diminuir para ser aceito.

Para continuar esta leitura
Se quiser, posso aprofundar um ponto desta mesma tiragem: o sentimento envolvido, o bloqueio principal ou o proximo passo mais prudente.`;
  }

  return `${input.nome}, eu recebo sua pergunta sobre ${input.tema.toLowerCase()} com atenção. Antes de procurar uma resposta definitiva, quero te ajudar a reconhecer o que já se move em sua vida e o que ainda precisa de cuidado. O Tarô de Marselha fala por símbolos, não por promessas fechadas.

Minha primeira leitura começa com ${mainCard.nome}. Esta carta traz ${mainCard.significado_geral.toLowerCase()} Para a situação que você descreveu, eu vejo um convite para observar os fatos com mais calma. Talvez uma parte de você já perceba um caminho, enquanto outra parte teme as consequências de escolhê-lo. Esse conflito merece respeito; ele não precisa ser resolvido por impulso.

O conselho de ${adviceCard.nome} acrescenta uma direção: ${adviceCard.conselho} Eu sugiro que você transforme esse símbolo em uma pergunta prática: qual atitude pequena e honesta pode tomar hoje, sem se ferir e sem esperar que outra pessoa decida tudo por você? Repare no que se repete, no que traz serenidade e no que desperta ansiedade. Esses sinais dizem muito sobre seus limites e desejos.

Minha orientação inicial é escrever duas coisas: o que você sabe com certeza sobre a situação e o que está apenas imaginando. Depois, escolha uma conversa, um limite ou um passo simples que esteja sob seu controle. A clareza cresce quando emoção e realidade podem ser vistas juntas.

Esta leitura gratuita revela o primeiro sinal. Na consulta completa, eu posso relacionar as cinco cartas, aprofundar o obstáculo e a tendência, integrar seu momento pessoal e construir com você um próximo passo mais preciso. Se sentir que esta pergunta ainda pesa, podemos continuar dentro do aplicativo, com calma e sem promessas absolutas.`;
}

function fallbackChatReply(message: string, context?: string): ChatReplyResult {
  const lowerMessage = message.toLowerCase();
  const lowerContext = (context || "").toLowerCase();
  const isMoney = lowerMessage.includes("dinheiro") || lowerMessage.includes("ganhar") || lowerMessage.includes("quanto") || lowerContext.includes("dinheiro");
  const isWork = lowerMessage.includes("trabalho") || lowerMessage.includes("emprego") || lowerMessage.includes("area") || lowerContext.includes("trabalho");

  if (isMoney) {
    return {
      countsAsClarification: true,
      reply: `Eu entendo a sua pergunta. Quando voce pergunta "quanto dinheiro", minha resposta precisa ser honesta: eu nao vou inventar um valor exato, porque isso criaria uma certeza falsa. O que eu posso fazer, com seriedade, e ler a tendencia simbolica e transformar isso em orientacao pratica.

Pela energia da leitura, o dinheiro aparece ligado a movimento, escolha e ruptura de um padrao antigo. Isso significa que o ganho maior nao vem apenas de "esperar aparecer". Ele tende a vir quando voce aceita mudar a forma de procurar oportunidade, negociar melhor, sair de uma postura passiva e mirar trabalhos onde seu valor seja mais claro.

Se a pergunta e "vou ganhar muito dinheiro?", eu sinto possibilidade de melhora, mas nao como promessa. A melhora depende de tres atitudes: escolher melhor onde colocar sua energia, nao aceitar qualquer proposta por medo, e agir com constancia. Voce nao ganha mais apenas trabalhando mais; voce ganha mais quando posiciona melhor aquilo que sabe fazer.

O cuidado aqui e nao confundir desejo com plano. Ganhar bem pede uma rota: que tipo de trabalho, qual valor minimo, quais contatos, quais candidaturas, qual habilidade pode ser vendida agora. Sem isso, a energia fica dispersa.

Minha orientacao pratica: defina um valor-alvo realista para os proximos 30 dias, liste tres caminhos de entrada de dinheiro e escolha um deles para atacar todos os dias. Pode ser emprego fixo, prestacao de servico, venda, parceria ou retorno a contatos antigos. A espiritualidade ajuda, mas a acao consciente abre a porta.

Se voce quiser, eu posso aprofundar dentro desta mesma leitura sem abrir nova tiragem: voce quer que eu olhe mais para o tipo de trabalho que combina com esse momento, para o bloqueio que atrasa o dinheiro, ou para a atitude mais urgente desta semana?`,
    };
  }

  if (isWork) {
    return {
      countsAsClarification: true,
      reply: `Sim, eu sinto que a sua pergunta continua dentro da mesma leitura. Voce nao esta necessariamente abrindo uma nova tiragem; voce esta pedindo que eu detalhe melhor o caminho profissional indicado pelas cartas.

Minha resposta e esta: o tipo de trabalho mais favoravel para voce pode envolver maturidade, experiencia, analise, responsabilidade e capacidade de orientar ou resolver problemas. Eu olharia para situacoes em que voce usa discernimento, paciencia, tecnica ou leitura de contexto.

Existe um chamado para reposicionamento. Pode ser que voce ainda esteja preso a uma imagem antiga de si mesmo, a um medo de recomecar, ou a uma dificuldade de se apresentar com autoridade. Eu recomendo equilibrar pressa e estrategia: nao aceitar qualquer coisa, mas tambem nao esperar a oportunidade perfeita.

Para trabalho bem pago, eu olharia para areas em que voce possa vender confianca: gestao, atendimento consultivo, vendas de valor mais alto, operacoes, suporte especializado, treinamento, manutencao de processos, negociacao, servicos tecnicos ou uma funcao em que a experiencia pese mais do que juventude ou improviso.

Eu nao sinto que o caminho seja "qualquer emprego". Sinto que voce precisa procurar onde sua maturidade vira vantagem. Se voce entrar numa disputa de volume, com muita gente fazendo a mesma coisa por pouco, a energia enfraquece. Se voce se posicionar como alguem que resolve, organiza, aconselha, vende ou melhora processos, a leitura fica mais favoravel.

Minha orientacao pratica para agora: revise seu curriculo como se estivesse vendendo resultado, nao apenas historico. Troque frases genericas por provas concretas: o que voce resolveu, quanto melhorou, que responsabilidade carregou, que tipo de pessoa ou empresa voce ajudou.

Para eu te orientar melhor sem gastar uma nova tiragem: voce quer procurar emprego fixo, prestar servico por conta propria, vender algo, ou ainda esta aberto aos tres caminhos?`,
    };
  }

  return {
    countsAsClarification: false,
    reply: `Eu recebo o que voce escreveu como um aprofundamento da mesma leitura, nao como uma nova pergunta. Minha resposta aqui e para te ajudar a pensar melhor, sem consumir uma nova tiragem.

O ponto central e este: antes de buscar uma certeza externa, precisamos transformar a sua duvida em decisao possivel. Quando a pergunta fica muito aberta, a leitura mostra tendencias, mas a acao fica fraca. Quando voce me da um pouco mais de contexto, eu consigo ser mais preciso e mais util.

Pelo que ja foi aberto, existe um convite para agir com mais consciencia, sem pressa cega e sem paralisia. A leitura nao pede que voce espere um milagre; pede que voce organize energia, escolha melhor e observe fatos.

Minha orientacao pratica e simples: diga qual parte pesa mais agora. E medo de nao conseguir? Duvida sobre qual caminho escolher? Falta de dinheiro urgente? Uma decisao envolvendo alguem? A resposta muda conforme o ponto real.

Pode me responder com uma frase curta. Esse esclarecimento serve para eu te orientar melhor dentro da mesma consulta.`,
  };
}
