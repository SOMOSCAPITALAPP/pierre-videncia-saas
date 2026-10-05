export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://clarezatarot.com";
export const SITE_NAME = "Clareza Tarô";

export type GuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type Guide = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  directAnswer: string;
  takeaways: string[];
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedSlugs: string[];
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  showArcana?: boolean;
};

const publicationDate = "2026-10-05";

export const guides: Guide[] = [
  {
    slug: "consulta-de-tarot-online",
    title: "Consulta de tarô online: como funciona e como escolher uma leitura séria",
    shortTitle: "Consulta de tarô online",
    description:
      "Entenda como funciona uma consulta de tarot online, quais perguntas fazer e como reconhecer uma leitura ética, acolhedora e sem promessas absolutas.",
    eyebrow: "orientação espiritual online",
    directAnswer:
      "Uma consulta de tarot online é uma conversa orientada por uma pergunta real e pela leitura simbólica das cartas. Ela pode ajudar a organizar sentimentos, perceber padrões e comparar caminhos possíveis, mas não substitui decisões médicas, jurídicas, financeiras ou psicológicas.",
    takeaways: [
      "A pergunta e o contexto pessoal são mais importantes do que buscar uma previsão isolada.",
      "Uma leitura responsável apresenta tendências e escolhas, sem prometer resultados garantidos.",
      "O atendimento online pode ser profundo quando existe espaço para explicar, perguntar e refletir.",
      "Você deve terminar a consulta com mais clareza sobre o próximo passo, não com medo ou dependência.",
    ],
    sections: [
      {
        title: "O que acontece em uma consulta de tarot online?",
        paragraphs: [
          "A consulta começa com o tema que está pedindo atenção: amor, trabalho, dinheiro, família, saúde emocional ou uma escolha importante. Em seguida, você formula a dúvida com suas próprias palavras. Uma boa pergunta não precisa ser perfeita; ela precisa mostrar o que está acontecendo e o que você deseja compreender.",
          "As cartas do Tarot de Marselha são abertas em posições definidas. Cada posição observa uma parte da situação, como o momento atual, o obstáculo, o conselho, a evolução e o resultado provável. A leitura nasce da relação entre as cartas, a pergunta e o contexto informado por você.",
          "No atendimento de Pierre, a numerologia da data de nascimento e a astrologia simbólica podem complementar a interpretação. Esses elementos não determinam seu destino. Eles oferecem outras lentes para refletir sobre ciclos, necessidades emocionais e maneiras de agir com mais consciência.",
        ],
      },
      {
        title: "Que tipo de pergunta pode ser feita?",
        paragraphs: [
          "O tarot funciona melhor quando a pergunta permite compreender uma dinâmica. Em vez de pedir apenas uma confirmação, vale investigar o que aproxima ou afasta duas pessoas, qual comportamento mantém um conflito, quais sinais devem ser observados ou como se preparar para uma decisão.",
          "No amor, você pode perguntar sobre comunicação, reciprocidade, limites e possibilidades de reconexão. No trabalho, pode observar forças, riscos e competências que precisam ser desenvolvidas. Em questões familiares, a leitura pode ajudar a separar responsabilidade, culpa, afeto e proteção.",
        ],
        bullets: [
          "O que preciso compreender sobre esta relação antes de insistir ou me afastar?",
          "Qual atitude favorece uma conversa mais clara neste momento?",
          "Que padrão está bloqueando meu crescimento profissional?",
          "O que devo considerar antes de escolher entre estes dois caminhos?",
        ],
      },
      {
        title: "Como reconhecer uma leitura séria",
        paragraphs: [
          "Uma consulta responsável não usa medo para vender. Desconfie de quem afirma ter visto uma maldição, exige pagamentos sucessivos para remover um perigo ou promete retorno amoroso, riqueza e cura em prazo garantido. A espiritualidade não deve retirar sua liberdade de escolha.",
          "O profissional precisa explicar o que as cartas mostram, reconhecer os limites da leitura e deixar espaço para você decidir. Também deve tratar seus dados e sua história com discrição. Quando o assunto envolve saúde, leis, investimentos ou segurança, a orientação espiritual deve caminhar ao lado de profissionais qualificados.",
        ],
        callout:
          "Uma boa leitura acolhe a emoção, organiza a situação e devolve autonomia. Ela não cria urgência artificial nem transforma dúvida em dependência.",
      },
      {
        title: "Consulta online ou presencial: existe diferença?",
        paragraphs: [
          "A distância não impede a conversa nem a interpretação simbólica. No atendimento online, você pode escrever com calma, reler a orientação e permanecer em um ambiente conhecido. Isso costuma ajudar pessoas que ficam nervosas ao explicar um tema íntimo.",
          "O que determina a qualidade é a atenção dada ao contexto, a coerência da leitura e a possibilidade de aprofundar pontos importantes. Uma resposta automática e genérica será superficial em qualquer formato. Uma consulta cuidadosa conecta símbolos, emoções e escolhas concretas.",
        ],
      },
      {
        title: "Como se preparar para aproveitar melhor a consulta",
        paragraphs: [
          "Reserve alguns minutos sem interrupções. Escreva os fatos principais, o que você sente e qual decisão parece difícil. Se houver outra pessoa envolvida, concentre a pergunta na dinâmica e no que está ao seu alcance, em vez de tentar controlar pensamentos ou ações alheias.",
          "Durante a leitura, observe o que faz sentido e peça esclarecimentos quando necessário. Depois, anote uma atitude possível para os próximos dias. O valor da consulta aparece quando a reflexão encontra uma ação consciente.",
        ],
      },
    ],
    faqs: [
      {
        question: "A consulta de tarot online funciona mesmo à distância?",
        answer:
          "O formato online permite a mesma organização simbólica das cartas e uma conversa detalhada sobre a pergunta. A utilidade depende da qualidade da interpretação, do contexto compartilhado e da reflexão que a leitura provoca.",
      },
      {
        question: "Preciso contar toda a minha vida antes da leitura?",
        answer:
          "Não. Informe apenas o contexto necessário para que a pergunta seja compreendida. Você pode preservar detalhes íntimos que não sejam importantes para o tema.",
      },
      {
        question: "O tarot online prevê o futuro com certeza?",
        answer:
          "Não. As cartas apontam tendências, tensões e possibilidades a partir do momento atual. Suas escolhas e as escolhas de outras pessoas continuam modificando o caminho.",
      },
    ],
    relatedSlugs: ["perguntas-para-o-tarot", "tarot-sim-ou-nao", "tarot-do-amor"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 8,
  },
  {
    slug: "tarot-do-amor",
    title: "Tarô do amor: o que as cartas podem revelar sobre sentimentos e relacionamentos",
    shortTitle: "Tarô do amor",
    description:
      "Veja como o tarot do amor aborda sentimentos, afastamento, reconciliação e escolhas afetivas sem prometer resultados ou ignorar sua autonomia.",
    eyebrow: "amor e vínculos",
    directAnswer:
      "O tarot do amor ajuda a observar a dinâmica emocional de um vínculo: o que aproxima, o que bloqueia, quais padrões se repetem e que atitude pode trazer mais clareza. Ele não comprova pensamentos secretos nem garante reconciliação.",
    takeaways: [
      "As cartas mostram a dinâmica do momento, não uma sentença definitiva sobre a relação.",
      "Perguntas sobre reciprocidade, limites e comunicação produzem orientações mais úteis.",
      "Reconciliação depende de ações e escolhas das duas pessoas.",
      "A leitura deve fortalecer amor-próprio e capacidade de decidir.",
    ],
    sections: [
      {
        title: "Como funciona uma tiragem do amor",
        paragraphs: [
          "Uma tiragem amorosa pode observar você, a outra pessoa, o vínculo, o principal obstáculo e a tendência de evolução. As cartas não são lidas separadamente. Um arcano de aproximação ao lado de uma carta de silêncio, por exemplo, pede uma interpretação diferente daquela feita apenas com uma carta positiva.",
          "O contexto também muda o sentido. Uma pessoa em uma relação longa, alguém vivendo um afastamento recente e quem está começando a conhecer outra pessoa têm necessidades diferentes. Por isso, a pergunta deve informar em que ponto a história está.",
        ],
      },
      {
        title: "Sentimento, intenção e atitude são coisas diferentes",
        paragraphs: [
          "Alguém pode sentir carinho e ainda assim não estar pronto para assumir uma relação. Pode existir desejo sem disponibilidade emocional, ou saudade sem intenção de voltar. Uma leitura cuidadosa diferencia essas camadas para evitar que esperança e fato sejam confundidos.",
          "O ponto mais útil não é tentar invadir a mente da outra pessoa. É compreender o que a dinâmica revela, quais comportamentos são consistentes e que escolha protege sua dignidade emocional.",
        ],
        callout:
          "Observe sempre a diferença entre palavras, sentimentos percebidos e atitudes concretas. Relações seguras são construídas com reciprocidade visível.",
      },
      {
        title: "Tarot pode indicar reconciliação?",
        paragraphs: [
          "As cartas podem mostrar abertura para diálogo, saudade, resistência, repetição de conflito ou possibilidade de mudança. Isso ajuda a avaliar o cenário, mas não obriga ninguém a retornar. Uma reconciliação real precisa de vontade, conversa e transformação dos pontos que causaram a ruptura.",
          "Quando a pergunta é somente “ele vai voltar?”, a leitura pode ficar presa a uma espera passiva. Perguntas como “o que precisaria mudar para uma reconexão saudável?” e “qual limite devo preservar?” oferecem uma orientação mais madura.",
        ],
      },
      {
        title: "Perguntas úteis para uma leitura amorosa",
        paragraphs: [
          "Você pode chegar à consulta com uma pergunta principal e permitir que a leitura aprofunde o que aparecer. Evite reunir dez dúvidas diferentes na mesma frase. Escolha o ponto que hoje produz mais confusão.",
        ],
        bullets: [
          "O que esta relação está despertando em mim e por quê?",
          "Existe reciprocidade suficiente para continuar investindo?",
          "Qual conversa precisa acontecer antes de uma decisão?",
          "Que padrão afetivo estou repetindo nesta história?",
          "Como posso me abrir para um relacionamento mais saudável?",
        ],
      },
      {
        title: "Quando a melhor resposta é voltar para si",
        paragraphs: [
          "Nem toda leitura aponta para insistência. Às vezes, os arcanos mostram que a energia está concentrada em ansiedade, idealização ou medo de perder. Nesses momentos, o conselho pode ser recuperar rotina, limites e presença antes de procurar uma nova confirmação.",
          "O tarot pode acompanhar uma fase de autoconhecimento, mas não substitui apoio psicológico quando existe sofrimento persistente, abuso, dependência emocional ou risco. Procurar ajuda adequada também é uma escolha espiritual de cuidado.",
        ],
      },
    ],
    faqs: [
      {
        question: "O tarot consegue dizer se uma pessoa ainda me ama?",
        answer:
          "A leitura pode observar sinais de vínculo, afastamento e disponibilidade emocional, mas não prova pensamentos privados. O comportamento concreto da pessoa continua sendo uma informação essencial.",
      },
      {
        question: "As cartas garantem que meu relacionamento vai voltar?",
        answer:
          "Não. Elas podem indicar uma tendência de aproximação ou bloqueio. A reconciliação depende das escolhas, do diálogo e das mudanças feitas pelas pessoas envolvidas.",
      },
      {
        question: "Posso consultar o tarot várias vezes sobre a mesma pessoa?",
        answer:
          "Pode haver um aprofundamento quando surgem fatos novos ou uma dúvida diferente. Repetir a mesma pergunta em pouco tempo tende a aumentar a ansiedade e diminuir a clareza.",
      },
    ],
    relatedSlugs: ["perguntas-para-o-tarot", "consulta-de-tarot-online", "tarot-sim-ou-nao"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 8,
  },
  {
    slug: "perguntas-para-o-tarot",
    title: "Perguntas para o tarô: como formular dúvidas que trazem clareza",
    shortTitle: "Perguntas para o tarô",
    description:
      "Aprenda a formular perguntas para o tarot sobre amor, trabalho, dinheiro e decisões, com exemplos abertos que favorecem respostas úteis.",
    eyebrow: "prepare sua consulta",
    directAnswer:
      "As melhores perguntas para o tarot são claras, abertas e ligadas a uma situação real. Elas investigam o que você precisa compreender, quais opções existem e que atitude pode ser tomada, em vez de exigir uma certeza absoluta sobre o futuro.",
    takeaways: [
      "Escolha uma questão principal por tiragem.",
      "Inclua o contexto necessário sem escrever toda a história.",
      "Prefira “o que preciso compreender?” a “vai acontecer?”.",
      "Concentre a pergunta no que você pode observar ou transformar.",
    ],
    sections: [
      {
        title: "A estrutura de uma pergunta útil",
        paragraphs: [
          "Uma pergunta útil combina tema, situação e objetivo. Por exemplo: “Depois deste afastamento, o que preciso compreender sobre nossa comunicação antes de procurar essa pessoa?”. A frase mostra o momento, o foco e a decisão que precisa de clareza.",
          "Você não precisa usar palavras espirituais. Fale como falaria em uma conversa sincera. O tarólogo pode ajudar a ajustar a pergunta antes de abrir as cartas, especialmente quando emoções diferentes estão misturadas.",
        ],
      },
      {
        title: "Perguntas sobre amor e relacionamentos",
        paragraphs: [
          "No amor, é comum querer saber o que outra pessoa sente. Essa curiosidade é compreensível, mas a leitura se torna mais útil quando também observa reciprocidade, limites e caminhos possíveis.",
        ],
        bullets: [
          "O que está dificultando a comunicação entre nós?",
          "Que sinais mostram se existe reciprocidade neste vínculo?",
          "O que devo compreender antes de tentar uma reconciliação?",
          "Como posso proteger meu amor-próprio nesta situação?",
          "Que padrão afetivo preciso transformar para viver um amor mais saudável?",
        ],
      },
      {
        title: "Perguntas sobre trabalho, dinheiro e escolhas",
        paragraphs: [
          "As cartas podem apoiar a reflexão sobre oportunidades, talentos, conflitos e riscos emocionais. Elas não substituem planejamento financeiro, contrato, aconselhamento jurídico ou análise profissional.",
        ],
        bullets: [
          "Que habilidade preciso desenvolver para avançar profissionalmente?",
          "O que não estou percebendo sobre esta proposta de trabalho?",
          "Qual opção está mais alinhada com meus valores e minha realidade atual?",
          "Que hábito está dificultando minha organização financeira?",
          "Como posso me preparar para esta mudança sem agir por impulso?",
        ],
      },
      {
        title: "Perguntas que merecem ser reformuladas",
        paragraphs: [
          "Perguntas como “vou ficar rico?”, “ele vai voltar em sete dias?” ou “qual número vai ganhar?” pedem garantias que uma leitura responsável não oferece. Também podem colocar sua vida nas mãos de uma resposta externa.",
          "Transforme a certeza desejada em uma investigação. “Que escolhas podem melhorar minha estabilidade financeira?” ou “o que favorece uma conversa de reconciliação?” abrem espaço para uma orientação prática.",
        ],
        callout:
          "Se a pergunta começa pelo medo, tente acrescentar: “O que está ao meu alcance fazer com consciência?”. Isso devolve movimento à leitura.",
      },
      {
        title: "Como fazer uma pergunta de acompanhamento",
        paragraphs: [
          "Depois da primeira interpretação, peça esclarecimento sobre a carta, posição ou conselho que ficou confuso. Isso é diferente de trocar a pergunta até receber a resposta desejada.",
          "Uma boa pergunta de acompanhamento conecta a leitura à vida prática: “Como reconheço esse limite na conversa?” ou “qual seria um primeiro passo possível nesta semana?”. Assim, a consulta termina com direção.",
        ],
      },
    ],
    faqs: [
      {
        question: "Posso fazer mais de uma pergunta na mesma tiragem?",
        answer:
          "É melhor começar por uma questão principal. Dúvidas relacionadas podem ser aprofundadas depois, sem misturar temas que exigem leituras diferentes.",
      },
      {
        question: "Preciso informar o nome completo de outra pessoa?",
        answer:
          "Não necessariamente. Compartilhe apenas os dados que forem úteis e que você se sinta confortável em informar. O foco pode permanecer na dinâmica do vínculo.",
      },
      {
        question: "Existe pergunta proibida no tarot?",
        answer:
          "Temas médicos, jurídicos, financeiros e de segurança exigem profissionais especializados. O tarot pode acolher emoções ligadas a esses assuntos, mas não deve substituir diagnóstico ou orientação técnica.",
      },
    ],
    relatedSlugs: ["consulta-de-tarot-online", "tarot-do-amor", "tarot-sim-ou-nao"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 7,
  },
  {
    slug: "tarot-sim-ou-nao",
    title: "Tarô sim ou não: quando uma resposta direta ajuda e quando ela limita",
    shortTitle: "Tarô sim ou não",
    description:
      "Entenda como funciona o tarot sim ou não, por que as cartas mostram tendências e como transformar uma dúvida binária em orientação prática.",
    eyebrow: "respostas diretas com contexto",
    directAnswer:
      "O tarot sim ou não resume a tendência atual de uma situação, mas raramente uma vida inteira cabe em duas palavras. A resposta fica mais útil quando inclui o bloqueio, a condição e o conselho que acompanham essa tendência.",
    takeaways: [
      "“Sim” indica abertura no cenário atual, não garantia.",
      "“Não” pode significar bloqueio, momento inadequado ou necessidade de mudança.",
      "Perguntas com prazo e contexto são mais claras do que dúvidas muito amplas.",
      "Uma carta de conselho ajuda a transformar resposta em ação.",
    ],
    sections: [
      {
        title: "Como uma tiragem de sim ou não é interpretada",
        paragraphs: [
          "Algumas cartas mostram expansão, encontro ou movimento; outras indicam pausa, conflito ou fechamento. Ainda assim, o sentido depende da pergunta. O Eremita pode sugerir “não agora” para uma aproximação e, ao mesmo tempo, “sim” para um período de estudo e recolhimento.",
          "Por isso, Pierre observa a tendência principal e acrescenta o que favorece ou dificulta o caminho. A resposta direta ganha profundidade sem se transformar em uma promessa.",
        ],
      },
      {
        title: "Quando a pergunta binária funciona melhor",
        paragraphs: [
          "O formato ajuda quando existe uma decisão delimitada: iniciar uma conversa nesta semana, aceitar um convite específico ou retomar um projeto que já foi planejado. Quanto mais concreta a situação, mais fácil compreender a tendência.",
          "Questões que dependem de muitas pessoas, de longos períodos ou de fatores desconhecidos pedem uma tiragem mais ampla. “Minha vida amorosa vai dar certo?” mistura tempo, escolhas e relações diferentes.",
        ],
      },
      {
        title: "Como reformular uma pergunta de sim ou não",
        paragraphs: [
          "Se a resposta direta parece insuficiente, transforme a pergunta em três partes: qual é a tendência, qual é o obstáculo e qual atitude está ao seu alcance. Essa estrutura preserva objetividade e oferece contexto.",
        ],
        bullets: [
          "Em vez de “ele vai voltar?”, pergunte “há abertura para diálogo e o que precisa mudar?”.",
          "Em vez de “vou conseguir o emprego?”, pergunte “como está esta oportunidade e como posso me preparar?”.",
          "Em vez de “devo terminar?”, pergunte “o que ganho, perco e preciso considerar em cada caminho?”.",
        ],
      },
      {
        title: "Por que repetir a mesma pergunta confunde",
        paragraphs: [
          "Quando uma pessoa consulta várias vezes em busca de um “sim”, cada nova tiragem recebe um estado emocional mais ansioso. O problema deixa de ser a situação e passa a ser a necessidade de confirmação.",
          "Espere fatos novos ou use a primeira leitura para observar o que acontece. Se ainda houver dúvida, aprofunde o conselho e os limites em vez de pedir que as cartas anulem a resposta anterior.",
        ],
        callout:
          "O tarot deve ampliar sua capacidade de decidir. Se a consulta aumenta medo, urgência ou dependência, faça uma pausa e volte aos fatos.",
      },
    ],
    faqs: [
      {
        question: "Uma carta é suficiente para responder sim ou não?",
        answer:
          "Uma carta pode mostrar a tendência principal. Acrescentar uma carta de obstáculo e outra de conselho costuma produzir uma orientação mais segura e compreensível.",
      },
      {
        question: "O resultado do tarot sim ou não pode mudar?",
        answer:
          "Sim. A leitura descreve o cenário atual. Novas informações, escolhas e atitudes das pessoas envolvidas podem alterar a tendência.",
      },
      {
        question: "Posso perguntar sobre prazo?",
        answer:
          "Você pode delimitar um período para organizar a pergunta, mas o tarot não funciona como relógio ou garantia de data exata. Trate o prazo como referência simbólica.",
      },
    ],
    relatedSlugs: ["perguntas-para-o-tarot", "tarot-do-amor", "consulta-de-tarot-online"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 6,
  },
  {
    slug: "significado-das-cartas-do-tarot-de-marselha",
    title: "Significado das cartas do Tarô de Marselha: guia dos 22 Arcanos Maiores",
    shortTitle: "Significado das cartas",
    description:
      "Conheça o significado dos 22 Arcanos Maiores do Tarot de Marselha no amor, no trabalho e como conselho, com imagens e contexto de leitura.",
    eyebrow: "tarot de marselha",
    directAnswer:
      "Os 22 Arcanos Maiores representam movimentos humanos como início, escolha, estrutura, crise, esperança e realização. O significado de cada carta muda conforme a pergunta, sua posição na tiragem e as cartas que aparecem ao redor.",
    takeaways: [
      "Nenhuma carta é totalmente positiva ou negativa.",
      "A posição da carta mostra qual função ela exerce na leitura.",
      "O conjunto conta uma história mais precisa do que uma carta isolada.",
      "O mesmo arcano pode falar de amor, trabalho ou vida interior de formas diferentes.",
    ],
    sections: [
      {
        title: "Como ler os Arcanos Maiores",
        paragraphs: [
          "Os Arcanos Maiores apresentam personagens, gestos, objetos, cores e números. Esses elementos formam uma linguagem visual. O Mago diante da mesa fala de recursos e início; a Justiça com espada e balança lembra consequência, medida e decisão.",
          "Em uma tiragem, a posição organiza essa linguagem. A Torre como obstáculo pode mostrar uma estrutura frágil; como evolução, pode indicar a libertação de algo que já não se sustenta. A pergunta impede que a interpretação fique genérica.",
        ],
      },
      {
        title: "Cartas difíceis não são condenações",
        paragraphs: [
          "A Morte, o Diabo e a Torre costumam assustar quem começa a estudar tarot. No Tarot de Marselha, elas também falam de transformação, desejo, apego, revelação e ruptura de estruturas. O conselho nasce ao compreender o movimento pedido pela carta.",
          "Da mesma forma, cartas luminosas como o Sol e a Estrela não eliminam a necessidade de agir. Elas mostram recursos, abertura e clareza que precisam ser vividos na prática.",
        ],
        callout:
          "Leia a imagem, a posição e a pergunta antes de aplicar uma palavra pronta. O símbolo orienta; o contexto dá direção.",
      },
    ],
    faqs: [
      {
        question: "Quantas cartas existem no Tarot de Marselha?",
        answer:
          "O baralho completo tem 78 cartas: 22 Arcanos Maiores e 56 Arcanos Menores. Este guia concentra os 22 Maiores, usados para observar movimentos centrais de uma situação.",
      },
      {
        question: "Qual é a carta mais forte do tarot?",
        answer:
          "Não existe uma única carta mais forte em todos os contextos. A importância depende da pergunta, da posição e da relação com as outras cartas da tiragem.",
      },
      {
        question: "Uma carta negativa significa que algo ruim vai acontecer?",
        answer:
          "Não necessariamente. Cartas desafiadoras podem mostrar tensão, apego, pausa ou mudança necessária. Elas funcionam como sinais para observar e escolher com mais consciência.",
      },
    ],
    relatedSlugs: ["consulta-de-tarot-online", "tarot-sim-ou-nao", "perguntas-para-o-tarot"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 12,
    showArcana: true,
  },
  {
    slug: "numerologia-data-de-nascimento",
    title: "Numerologia da data de nascimento: como calcular o número de vida",
    shortTitle: "Numerologia da data de nascimento",
    description:
      "Aprenda a calcular o número de vida pela data de nascimento e veja como a numerologia pode complementar uma leitura de tarot de forma simbólica.",
    eyebrow: "numerologia simbólica",
    directAnswer:
      "O número de vida é calculado somando todos os algarismos da data de nascimento e reduzindo o total até chegar a um número de 1 a 9. Na abordagem usada por Pierre, 11 e 22 são preservados como números mestres.",
    takeaways: [
      "Some dia, mês e ano usando todos os algarismos.",
      "Reduza o resultado até 1 a 9, preservando 11 e 22.",
      "O número descreve tendências simbólicas, não uma personalidade fixa.",
      "Tarot e numerologia podem iluminar partes diferentes da mesma pergunta.",
    ],
    sections: [
      {
        title: "Como calcular passo a passo",
        paragraphs: [
          "Use a data 15/05/1990 como exemplo. Some 1 + 5 + 0 + 5 + 1 + 9 + 9 + 0. O total é 30. Depois, some 3 + 0. O número de vida é 3.",
          "Se o total final for 11 ou 22, ele pode ser mantido sem nova redução. Diferentes escolas de numerologia usam métodos próprios; o importante é aplicar a mesma regra com consistência e tratar o resultado como linguagem simbólica.",
        ],
      },
      {
        title: "Resumo dos números de 1 a 9",
        paragraphs: [
          "Cada número apresenta qualidades e desafios. Nenhum é melhor do que outro. A maturidade aparece quando a força principal encontra equilíbrio.",
        ],
        bullets: [
          "1: iniciativa, autonomia e o desafio de cooperar.",
          "2: sensibilidade, parceria e o desafio de estabelecer limites.",
          "3: expressão, criatividade e o desafio de manter foco.",
          "4: estrutura, constância e o desafio de aceitar mudanças.",
          "5: liberdade, movimento e o desafio de criar direção.",
          "6: cuidado, responsabilidade e o desafio de não controlar tudo.",
          "7: análise, espiritualidade e o desafio de compartilhar o mundo interior.",
          "8: realização, gestão e o desafio de equilibrar poder e afeto.",
          "9: compaixão, conclusão e o desafio de soltar ciclos encerrados.",
        ],
      },
      {
        title: "O significado simbólico de 11 e 22",
        paragraphs: [
          "O 11 costuma ser associado à intuição, inspiração e sensibilidade intensa. Seu desafio é transformar percepção em presença, sem viver apenas na ansiedade ou na idealização.",
          "O 22 é relacionado à capacidade de construir algo amplo e concreto. Seu desafio está em unir visão, disciplina e responsabilidade sem carregar sozinho um peso excessivo.",
        ],
      },
      {
        title: "Como a numerologia complementa o tarot",
        paragraphs: [
          "A numerologia oferece um eixo de personalidade e aprendizado; o tarot observa a situação atual e seus movimentos. Uma pessoa de número 3 vivendo uma carta de silêncio, por exemplo, pode refletir sobre como expressa o que sente e como lida com períodos de recolhimento.",
          "A combinação não deve encaixar você em uma definição rígida. Ela serve para formular perguntas melhores e reconhecer recursos que talvez estejam esquecidos.",
        ],
        callout:
          "Use o número como ponto de reflexão. Sua história, suas escolhas e o contexto de vida continuam sendo essenciais.",
      },
    ],
    faqs: [
      {
        question: "O número de vida pode mudar?",
        answer:
          "O cálculo baseado na data de nascimento permanece o mesmo. A forma de viver suas qualidades e desafios se transforma com experiência e escolhas.",
      },
      {
        question: "Devo reduzir os números 11 e 22?",
        answer:
          "Na abordagem usada neste site, 11 e 22 são preservados. Outras escolas podem reduzi-los para 2 e 4; por isso, confira qual método está sendo aplicado.",
      },
      {
        question: "Numerologia prevê acontecimentos?",
        answer:
          "Ela é usada aqui como ferramenta simbólica de autoconhecimento. Não oferece garantia de acontecimentos, datas ou resultados.",
      },
    ],
    relatedSlugs: ["consulta-de-tarot-online", "significado-das-cartas-do-tarot-de-marselha", "perguntas-para-o-tarot"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 7,
  },
  {
    slug: "tarot-online-gratis",
    title: "Tarô online grátis: como aproveitar a primeira leitura com consciência",
    shortTitle: "Tarô online grátis",
    description:
      "Entenda o que uma leitura de tarô online grátis pode oferecer, como formular sua pergunta e quando vale aprofundar a consulta com um tarólogo.",
    eyebrow: "tarô online grátis",
    directAnswer:
      "Uma leitura de tarô online grátis pode oferecer uma primeira visão sobre o momento, revelar um padrão e sugerir um próximo passo. Ela funciona melhor como porta de entrada para a reflexão, sem prometer prever todo o futuro ou resolver sozinha uma decisão importante.",
    takeaways: [
      "Comece por uma situação concreta e uma pergunta que dependa também das suas escolhas.",
      "Observe a relação entre as cartas em vez de procurar uma frase isolada.",
      "Use a leitura gratuita para avaliar clareza, respeito e coerência da interpretação.",
      "Aprofunde apenas quando sentir que novas perguntas realmente precisam de contexto.",
    ],
    sections: [
      {
        title: "O que esperar de um tarô grátis",
        paragraphs: [
          "Uma boa experiência gratuita apresenta o método, mostra as cartas escolhidas e entrega uma interpretação compreensível. Na Clareza Tarô, a primeira leitura usa cinco posições: situação atual, obstáculo, conselho, evolução e resultado provável. Esse formato permite observar movimento e contexto, em vez de reduzir uma história a uma única carta.",
          "O objetivo é ajudar você a nomear o que está acontecendo. A leitura pode apontar uma conversa evitada, um limite necessário, uma expectativa exagerada ou um recurso que ainda não foi utilizado. O valor está na qualidade da reflexão e na possibilidade de escolher com mais presença.",
        ],
      },
      {
        title: "Como fazer uma pergunta que gere uma resposta útil",
        paragraphs: [
          "Perguntas abertas costumam produzir orientações mais ricas. Em vez de perguntar somente se alguém vai voltar, experimente investigar o que favorece ou impede uma reconexão. Em vez de perguntar se deve trocar de emprego, observe quais riscos, capacidades e necessidades precisam entrar na decisão.",
        ],
        bullets: [
          "O que eu ainda não estou percebendo nesta situação?",
          "Qual atitude pode trazer mais clareza para esta relação?",
          "Que padrão preciso interromper antes de tomar minha decisão?",
          "O que favorece um próximo passo mais seguro e coerente?",
        ],
      },
      {
        title: "Como reconhecer uma leitura gratuita responsável",
        paragraphs: [
          "A gratuidade não justifica respostas vagas, ameaças ou pressão para comprar. Uma leitura responsável explica seus limites, não cria medo espiritual e não afirma que apenas um pagamento urgente poderá evitar um acontecimento negativo.",
          "Também deve ficar claro quem interpreta as cartas e como aprofundar a conversa. Pierre apresenta tendências e possibilidades com linguagem direta, preservando sua autonomia para aceitar, questionar ou deixar de lado uma interpretação.",
        ],
        callout:
          "Desconfie de urgência artificial, garantia de reconciliação, promessa de riqueza ou diagnóstico de saúde feito pelas cartas.",
      },
      {
        title: "Quando uma consulta completa pode fazer sentido",
        paragraphs: [
          "A leitura gratuita pode ser suficiente quando você deseja apenas organizar uma dúvida inicial. Uma consulta completa faz mais sentido quando existem pessoas, escolhas ou acontecimentos que precisam ser relacionados com cuidado, ou quando você quer esclarecer pontos da mesma tiragem.",
          "Antes de continuar, confira o formato, o preço e o que será entregue. A decisão de aprofundar deve nascer do valor percebido na primeira orientação, sem pressão emocional.",
        ],
      },
    ],
    faqs: [
      {
        question: "O tarô online grátis funciona?",
        answer:
          "Ele pode ser útil para reflexão quando a pergunta, as posições e a interpretação são apresentadas com clareza. Não oferece garantia sobre acontecimentos futuros.",
      },
      {
        question: "Preciso informar muitos dados pessoais?",
        answer:
          "Não. Para começar, basta o contexto necessário para compreender sua pergunta. Evite compartilhar senhas, documentos, dados bancários ou informações íntimas sem relação com a leitura.",
      },
      {
        question: "Posso fazer várias leituras sobre a mesma pergunta?",
        answer:
          "Repetir a mesma pergunta em sequência tende a aumentar a ansiedade. Prefira refletir sobre a primeira leitura e voltar quando houver um fato novo ou uma questão diferente.",
      },
    ],
    relatedSlugs: ["consulta-de-tarot-online", "perguntas-para-o-tarot", "tipos-de-tiragem-de-tarot"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 7,
  },
  {
    slug: "como-funciona-o-taro",
    title: "Como funciona o tarô: cartas, perguntas e interpretação",
    shortTitle: "Como funciona o tarô",
    description:
      "Veja como funciona uma leitura de tarô, o papel da pergunta, das posições e do tarólogo, além dos limites de uma orientação responsável.",
    eyebrow: "fundamentos do tarô",
    directAnswer:
      "O tarô funciona como uma linguagem simbólica. As cartas são distribuídas em posições ligadas à pergunta, e o tarólogo interpreta imagens, relações e contrastes para organizar tendências, conflitos e possibilidades presentes.",
    takeaways: [
      "A carta não é interpretada sozinha: pergunta, posição e combinações mudam seu sentido.",
      "O tarólogo traduz símbolos e conecta a leitura ao contexto apresentado.",
      "As cartas mostram tendências e possibilidades, sem retirar sua liberdade de escolha.",
      "Uma consulta séria diferencia orientação espiritual de aconselhamento profissional especializado.",
    ],
    sections: [
      {
        title: "O tarô como linguagem de símbolos",
        paragraphs: [
          "Cada carta reúne personagens, gestos, cores, números e direções. Esses elementos formam um repertório simbólico. O Eremita pode falar de prudência, busca interior ou lentidão; o Sol pode indicar clareza, vitalidade ou exposição. O significado adequado depende do lugar ocupado na tiragem e das cartas ao redor.",
          "Por isso, ler tarô não consiste em decorar frases. A interpretação nasce de uma estrutura: qual é a pergunta, o que cada posição investiga e que história aparece quando as cartas são observadas em conjunto.",
        ],
      },
      {
        title: "Por que a pergunta muda a leitura",
        paragraphs: [
          "A mesma carta pode responder de maneiras diferentes a uma dúvida amorosa e a uma escolha profissional. Quando a pergunta é clara, o tarólogo consegue distinguir sentimento, comportamento, risco, conselho e tendência.",
          "Perguntas que investigam o que você pode compreender ou fazer preservam sua autonomia. Perguntas que exigem certeza absoluta sobre pensamentos de terceiros ou datas exatas ultrapassam o que uma leitura simbólica pode oferecer com responsabilidade.",
        ],
      },
      {
        title: "O papel do tarólogo",
        paragraphs: [
          "O tarólogo escolhe ou explica o método, lê as combinações e transforma símbolos em uma resposta coerente. Ele também deve reconhecer quando não possui informação suficiente e evitar usar medo, autoridade ou dependência para convencer a pessoa.",
          "Na Clareza Tarô, Pierre conduz a leitura em português do Brasil e utiliza o Tarot de Marselha como eixo principal. Numerologia e astrologia simbólica podem complementar a análise quando ajudam a compreender ciclos e características da pergunta.",
        ],
      },
      {
        title: "O que o tarô pode e não pode fazer",
        paragraphs: [
          "O tarô pode favorecer autoconhecimento, ampliar perspectivas e ajudar a preparar uma conversa ou decisão. Ele não confirma diagnóstico médico, resultado jurídico, investimento seguro ou ação de outra pessoa como fato inevitável.",
          "A leitura mais útil termina com algo observável: um limite, uma pergunta, uma conversa, um prazo de reflexão ou um comportamento que merece atenção.",
        ],
        callout:
          "As cartas podem iluminar uma escolha. A responsabilidade pela decisão continua sendo sua.",
      },
    ],
    faqs: [
      {
        question: "É preciso acreditar no tarô para consultar?",
        answer:
          "Não. Você pode usar a leitura como exercício simbólico de reflexão, desde que compreenda o método e seus limites.",
      },
      {
        question: "As cartas preveem o futuro?",
        answer:
          "Elas podem representar tendências e desdobramentos prováveis dentro do contexto atual. Escolhas e acontecimentos posteriores podem modificar esse caminho.",
      },
      {
        question: "Quem escolhe as cartas no atendimento online?",
        answer:
          "Isso depende do método. Na consulta da Clareza Tarô, a pessoa participa da seleção e recebe as posições e cartas de forma visível.",
      },
    ],
    relatedSlugs: ["tarot-online-gratis", "perguntas-para-o-tarot", "significado-das-cartas-do-tarot-de-marselha"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 7,
  },
  {
    slug: "tarot-de-marselha",
    title: "Tarô de Marselha: estrutura, símbolos e leitura dos arcanos",
    shortTitle: "Tarô de Marselha",
    description:
      "Conheça a estrutura do Tarot de Marselha, a diferença entre Arcanos Maiores e Menores e como seus símbolos participam de uma leitura.",
    eyebrow: "tradição do tarot de marselha",
    directAnswer:
      "O Tarot de Marselha é um baralho tradicional de 78 cartas, dividido em 22 Arcanos Maiores e 56 Arcanos Menores. Sua leitura relaciona imagens, números, naipes, posições e a pergunta apresentada.",
    takeaways: [
      "Os 22 Arcanos Maiores representam movimentos e arquétipos marcantes da experiência humana.",
      "Os 56 Arcanos Menores aproximam a leitura de situações, ritmos e relações do cotidiano.",
      "Cores, olhares e direções ajudam a formar conexões entre as cartas.",
      "A tradição orienta a leitura, mas o contexto evita interpretações automáticas.",
    ],
    sections: [
      {
        title: "Como o baralho é organizado",
        paragraphs: [
          "Os Arcanos Maiores formam uma sequência de figuras como O Mago, A Imperatriz, O Enamorado, A Justiça, A Morte, O Sol e O Mundo. O Louco aparece sem número fixo em muitas edições. Essas cartas costumam destacar decisões, transformações e aprendizados centrais.",
          "Os Arcanos Menores são distribuídos em quatro naipes: Paus, Copas, Espadas e Ouros. Cada naipe inclui cartas numeradas e figuras da corte. Eles ajudam a observar ações, afetos, conflitos, recursos e aspectos concretos da vida.",
        ],
      },
      {
        title: "O que observar nas imagens",
        paragraphs: [
          "A leitura considera para onde os personagens olham, quais cartas parecem dialogar, que cores se repetem e onde existe movimento ou bloqueio. Uma figura voltada para outra pode sugerir encontro ou atenção; uma sequência de cartas estáticas pode pedir espera, estrutura ou revisão.",
          "Nenhum detalhe possui uma tradução única. O símbolo ganha função dentro da pergunta e da posição. Essa flexibilidade permite profundidade, mas exige coerência do intérprete.",
        ],
      },
      {
        title: "Arcanos Maiores ou baralho completo?",
        paragraphs: [
          "Uma leitura apenas com os Arcanos Maiores pode ser adequada para uma visão ampla, especialmente quando a consulta busca compreender o sentido de um ciclo ou uma decisão. O baralho completo acrescenta nuances do cotidiano e pode detalhar ritmos, relações e recursos.",
          "O número de cartas não determina sozinho a qualidade. Uma tiragem menor, bem explicada e conectada à pergunta, pode ser mais útil do que muitas cartas abertas sem estrutura.",
        ],
      },
      {
        title: "Como Pierre utiliza essa tradição",
        paragraphs: [
          "Pierre trabalha com a tradição simbólica francesa e apresenta as posições antes da interpretação. Na experiência gratuita, cinco Arcanos Maiores formam uma cruz para observar situação, obstáculo, conselho, evolução e resultado provável.",
          "A proposta da Clareza Tarô é tornar essa linguagem compreensível para o público brasileiro, mantendo o cuidado com os símbolos e evitando afirmações absolutas.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quantas cartas tem o Tarot de Marselha?",
        answer: "O baralho completo possui 78 cartas: 22 Arcanos Maiores e 56 Arcanos Menores.",
      },
      {
        question: "Tarot de Marselha é diferente do Rider-Waite?",
        answer:
          "Sim. Eles possuem tradições visuais e convenções próprias, especialmente nos Arcanos Menores. Muitas figuras centrais dos Arcanos Maiores, porém, dialogam entre si.",
      },
      {
        question: "É possível consultar usando somente os Arcanos Maiores?",
        answer:
          "Sim. Esse método favorece uma leitura dos movimentos principais da situação, desde que as posições e os limites da tiragem sejam explicados.",
      },
    ],
    relatedSlugs: ["significado-das-cartas-do-tarot-de-marselha", "tipos-de-tiragem-de-tarot", "como-funciona-o-taro"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 8,
  },
  {
    slug: "tipos-de-tiragem-de-tarot",
    title: "Tipos de tiragem de tarô: uma, três, cinco cartas e Cruz Celta",
    shortTitle: "Tipos de tiragem de tarô",
    description:
      "Compare tiragens de tarô com uma, três, cinco cartas e Cruz Celta para entender qual formato combina com sua pergunta e seu momento.",
    eyebrow: "métodos de tiragem",
    directAnswer:
      "O melhor tipo de tiragem depende da pergunta. Uma carta oferece foco; três cartas mostram uma sequência; cinco posições permitem analisar situação, obstáculo e evolução; a Cruz Celta serve para contextos mais amplos.",
    takeaways: [
      "Perguntas simples pedem métodos menores e mais objetivos.",
      "Mais cartas acrescentam relações, mas também exigem interpretação mais cuidadosa.",
      "Cada posição deve ter uma função definida antes da abertura.",
      "Uma tiragem pode orientar sem tentar responder todos os aspectos da vida ao mesmo tempo.",
    ],
    sections: [
      {
        title: "Tiragem de uma carta",
        paragraphs: [
          "Uma carta funciona bem como conselho, energia do dia ou ponto de atenção. Ela convida a aprofundar um símbolo, mas oferece pouco espaço para separar causa, obstáculo e consequência.",
          "Para evitar uma resposta genérica, defina o foco: o que observar em uma conversa, qual qualidade desenvolver ou que atitude evitar durante um período curto.",
        ],
      },
      {
        title: "Tiragem de três cartas",
        paragraphs: [
          "Três cartas podem representar passado, presente e tendência; situação, desafio e conselho; ou você, a outra pessoa e a dinâmica entre ambos. O método deve ser escolhido antes de virar as cartas.",
          "É um formato equilibrado para perguntas objetivas, pois cria relação entre os símbolos sem abrir informação demais.",
        ],
      },
      {
        title: "Tiragem de cinco cartas em cruz",
        paragraphs: [
          "A cruz de cinco cartas usada na Clareza Tarô observa situação atual, obstáculo, conselho, evolução e resultado provável. Ela ajuda a compreender onde existe tensão e como uma atitude pode influenciar o desenvolvimento da questão.",
          "O resultado não é uma sentença. Ele representa o caminho mais coerente com as forças mostradas no momento da leitura.",
        ],
      },
      {
        title: "Cruz Celta e leituras amplas",
        paragraphs: [
          "A Cruz Celta utiliza dez posições e pode explorar contexto, influências, expectativas, ambiente e tendência. É indicada quando a situação possui várias camadas e a pessoa dispõe de tempo para uma interpretação detalhada.",
          "Uma leitura ampla não precisa ser a primeira escolha. Começar com uma pergunta bem delimitada costuma facilitar a compreensão e reduzir contradições.",
        ],
        callout:
          "Escolha a menor tiragem capaz de responder sua pergunta com contexto suficiente.",
      },
    ],
    faqs: [
      {
        question: "Qual tiragem é melhor para o amor?",
        answer:
          "Três ou cinco cartas costumam ser suficientes para observar sentimentos, comunicação, obstáculo, conselho e tendência da relação.",
      },
      {
        question: "Mais cartas tornam a leitura mais precisa?",
        answer:
          "Não necessariamente. Mais cartas ampliam o contexto, mas também aumentam a complexidade. A clareza da pergunta e do método pesa mais.",
      },
      {
        question: "Posso escolher o tipo de tiragem?",
        answer:
          "Sim. O tarólogo também pode sugerir um formato depois de compreender sua pergunta e explicar o papel de cada posição.",
      },
    ],
    relatedSlugs: ["tarot-online-gratis", "consulta-de-tarot-online", "tarot-de-marselha"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 7,
  },
  {
    slug: "tarot-para-reconciliacao",
    title: "Tarô para reconciliação: perguntas úteis antes de tentar voltar",
    shortTitle: "Tarô para reconciliação",
    description:
      "Veja como usar o tarô para compreender afastamento, comunicação e possibilidade de reconciliação sem promessas sobre a decisão da outra pessoa.",
    eyebrow: "tarô do amor e reconciliação",
    directAnswer:
      "O tarô pode ajudar a compreender o que levou ao afastamento, quais padrões continuam ativos e que condições seriam necessárias para uma reconciliação saudável. Ele não pode garantir que outra pessoa voltará ou substituir uma conversa real.",
    takeaways: [
      "Reconciliação envolve vontade, limites e mudança de ambas as pessoas.",
      "As cartas podem mostrar padrões e tendências, sem controlar a decisão do outro.",
      "Perguntas sobre condições e atitudes são mais úteis do que buscar uma promessa de retorno.",
      "Segurança, respeito e reciprocidade devem vir antes da ansiedade de retomar a relação.",
    ],
    sections: [
      {
        title: "O que uma leitura pode observar",
        paragraphs: [
          "Uma tiragem pode explorar a origem do conflito, o estado da comunicação, o que ainda conecta o casal e quais comportamentos dificultam uma aproximação. Também pode ajudar você a distinguir saudade, culpa, carência e desejo real de reconstrução.",
          "A tendência indicada pelas cartas depende das atitudes atuais. Se nada muda, um padrão pode se repetir; se existe conversa, responsabilidade e limite, outro caminho pode se abrir.",
        ],
      },
      {
        title: "Perguntas melhores sobre reconciliação",
        paragraphs: [
          "Perguntar apenas se a pessoa voltará coloca toda a resposta fora do seu alcance. Perguntas mais completas mostram o que você pode compreender, observar e decidir.",
        ],
        bullets: [
          "O que provocou o afastamento e ainda não foi compreendido?",
          "Que condição seria necessária para uma reconciliação saudável?",
          "Como posso me posicionar sem abandonar meus limites?",
          "Que sinais mostram reciprocidade ou repetição do mesmo padrão?",
        ],
      },
      {
        title: "Quando insistir pode aumentar a dor",
        paragraphs: [
          "Se existe desrespeito, manipulação, violência ou recusa clara de contato, a prioridade não é descobrir como convencer a pessoa. A leitura deve apoiar proteção, rede de confiança e recuperação da autonomia.",
          "Também vale pausar quando consultas repetidas alimentam ansiedade. Nenhuma carta deve ser usada para justificar perseguição, invasão de privacidade ou pressão emocional.",
        ],
      },
      {
        title: "Reconstrução ou encerramento consciente",
        paragraphs: [
          "Às vezes, a maior clareza está em reconhecer que existe espaço para uma conversa. Em outras situações, a leitura ajuda a perceber que o ciclo precisa de encerramento, luto e reorganização pessoal.",
          "O objetivo não é obrigar a história a seguir um resultado desejado. É enxergar o vínculo com honestidade suficiente para escolher um próximo passo digno.",
        ],
        callout:
          "Uma reconciliação saudável precisa de reciprocidade. Nenhuma leitura substitui consentimento e diálogo.",
      },
    ],
    faqs: [
      {
        question: "O tarô pode dizer se meu ex vai voltar?",
        answer:
          "Pode apontar tendências de aproximação ou afastamento no contexto atual, mas não garantir a decisão futura de outra pessoa.",
      },
      {
        question: "Quantas cartas usar para uma pergunta de reconciliação?",
        answer:
          "Três a cinco posições costumam permitir observar vínculo, obstáculo, condição, conselho e tendência sem dispersar a leitura.",
      },
      {
        question: "Devo entrar em contato depois da leitura?",
        answer:
          "Considere o histórico, os limites expressos e a segurança emocional. As cartas podem apoiar a reflexão, mas a decisão precisa respeitar a realidade da relação.",
      },
    ],
    relatedSlugs: ["tarot-do-amor", "perguntas-para-o-tarot", "tarot-sim-ou-nao"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 8,
  },
  {
    slug: "tarot-trabalho-dinheiro",
    title: "Tarô para trabalho e dinheiro: como orientar decisões com responsabilidade",
    shortTitle: "Tarô para trabalho e dinheiro",
    description:
      "Use o tarô para refletir sobre carreira, oportunidades, bloqueios e organização financeira sem tratar as cartas como garantia de lucro.",
    eyebrow: "carreira e vida financeira",
    directAnswer:
      "O tarô pode ajudar a comparar caminhos profissionais, reconhecer competências, riscos e padrões na relação com dinheiro. Ele não garante lucro, emprego ou investimento e deve complementar informações concretas.",
    takeaways: [
      "Transforme dúvidas amplas em decisões que possam ser comparadas.",
      "Considere recursos, prazos e consequências além do simbolismo das cartas.",
      "Use a leitura para identificar padrões de medo, impulso ou desvalorização profissional.",
      "Decisões financeiras relevantes exigem dados e profissionais qualificados.",
    ],
    sections: [
      {
        title: "Perguntas úteis sobre carreira",
        paragraphs: [
          "Uma leitura profissional pode observar o que está estagnado, quais competências precisam aparecer e que ambiente combina com seus valores. Também ajuda a separar cansaço temporário de uma necessidade mais profunda de mudança.",
        ],
        bullets: [
          "O que devo avaliar antes de aceitar esta oportunidade?",
          "Que habilidade precisa ser fortalecida para minha próxima etapa?",
          "Qual padrão mantém minha vida profissional estagnada?",
          "Como posso me preparar para uma transição com menos risco?",
        ],
      },
      {
        title: "Comparar dois caminhos sem entregar a decisão às cartas",
        paragraphs: [
          "Quando existem duas opções, a tiragem pode observar forças, custos, riscos e aprendizados de cada uma. O resultado não escolhe por você; ele organiza fatores que talvez estejam misturados pela ansiedade.",
          "Complete a reflexão com salário, contrato, deslocamento, saúde, reserva financeira e possibilidade real de crescimento. Uma escolha coerente une símbolo e realidade.",
        ],
      },
      {
        title: "Dinheiro, medo e comportamento",
        paragraphs: [
          "Perguntas financeiras costumam carregar medo de falta, impulso ou necessidade de controle. As cartas podem ajudar a reconhecer como essas emoções influenciam gastos, negociações e disposição para pedir ajuda.",
          "Elas não devem indicar apostas, ativos específicos ou prometer prosperidade. Para crédito, investimento, imposto ou dívida, procure orientação financeira ou jurídica adequada.",
        ],
      },
      {
        title: "Transformar a leitura em plano de ação",
        paragraphs: [
          "Depois da consulta, registre uma ação pequena e verificável: atualizar currículo, revisar despesas, conversar com uma liderança, pesquisar uma formação ou definir um prazo para comparar propostas.",
          "O tarô ganha utilidade quando a reflexão produz critérios. A carta pode abrir uma pergunta; os próximos passos precisam caber na sua realidade.",
        ],
        callout:
          "Nunca arrisque dinheiro necessário para sua segurança com base apenas em uma leitura espiritual.",
      },
    ],
    faqs: [
      {
        question: "O tarô pode prever se vou conseguir um emprego?",
        answer:
          "Pode mostrar tendências, pontos fortes e obstáculos do momento, mas não garantir uma contratação ou substituir sua preparação.",
      },
      {
        question: "Posso perguntar sobre investimento?",
        answer:
          "Você pode refletir sobre comportamento, medo e critérios de decisão. A escolha de investimentos exige dados e orientação financeira qualificada.",
      },
      {
        question: "Qual tiragem usar para comparar propostas?",
        answer:
          "Uma tiragem com posições equivalentes para cada opção ajuda a comparar oportunidade, risco, aprendizado e impacto prático.",
      },
    ],
    relatedSlugs: ["perguntas-para-o-tarot", "tipos-de-tiragem-de-tarot", "consulta-de-tarot-online"],
    publishedAt: publicationDate,
    updatedAt: publicationDate,
    readingMinutes: 8,
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
