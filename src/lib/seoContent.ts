export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://pierre-videncia-saas.vercel.app";

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
    title: "Consulta de tarot online: como funciona e como escolher uma leitura séria",
    shortTitle: "Consulta de tarot online",
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
    title: "Tarot do amor: o que as cartas podem revelar sobre sentimentos e relacionamentos",
    shortTitle: "Tarot do amor",
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
    title: "Perguntas para o tarot: como formular dúvidas que trazem clareza",
    shortTitle: "Perguntas para o tarot",
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
    title: "Tarot sim ou não: quando uma resposta direta ajuda e quando ela limita",
    shortTitle: "Tarot sim ou não",
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
    title: "Significado das cartas do Tarot de Marselha: guia dos 22 Arcanos Maiores",
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
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
