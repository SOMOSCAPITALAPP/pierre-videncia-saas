"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Lock, Send, Sparkles } from "lucide-react";
import { TarotArcanaCard } from "@/components/TarotArcanaCard";
import { getOfferByTipo } from "@/lib/offers";

type DrawnCard = {
  nome: string;
  posicao: string;
};

type Message = {
  role: "user" | "pierre";
  text: string;
  cards?: DrawnCard[];
};

type ChatStep = "nome" | "birth" | "theme" | "targetName" | "targetBirth" | "question" | "questionDetail" | "number" | "reading" | "follow";

type PremiumForm = {
  nome: string;
  dataNascimento: string;
  tema: "Amor" | "Trabalho" | "Dinheiro" | "Família" | "Saúde emocional" | "Espiritual";
  pessoaAlvoNome: string;
  pessoaAlvoNascimento: string;
  pergunta: string;
  numero: string;
};

type PremiumAccess = {
  tipo: string;
  maxQuestions: number;
  durationMinutes: number;
  startedAt: number;
  paymentId?: string;
};

type StoredReading = {
  user?: {
    nome?: string;
    dataNascimento?: string;
  };
};

type PremiumSession = {
  messages: Message[];
  lastReadingContext: string;
  step: ChatStep;
  form: PremiumForm;
  closingWarned: boolean;
  expiredClosed: boolean;
};

const initialForm: PremiumForm = {
  nome: "",
  dataNascimento: "",
  tema: "Amor",
  pessoaAlvoNome: "",
  pessoaAlvoNascimento: "",
  pergunta: "",
  numero: "",
};

const themeOptions = ["Amor", "Trabalho", "Dinheiro", "Família", "Saúde emocional", "Espiritual"] as const;

function getFirstName(nome: string) {
  return nome.trim().split(/\s+/)[0] || nome;
}

function readKnownUser() {
  if (typeof window === "undefined") return { nome: "", dataNascimento: "" };

  const stored = sessionStorage.getItem("pierre-reading");
  if (!stored) return { nome: "", dataNascimento: "" };

  try {
    const reading = JSON.parse(stored) as StoredReading;
    return {
      nome: reading.user?.nome || "",
      dataNascimento: reading.user?.dataNascimento || "",
    };
  } catch {
    return { nome: "", dataNascimento: "" };
  }
}

function readPremiumAccess(): PremiumAccess | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("pierre-premium-plan");

  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as PremiumAccess;
    if (!parsed.tipo || !parsed.maxQuestions || !parsed.durationMinutes || !parsed.startedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

function questionKey(access: PremiumAccess) {
  return `pierre-premium-questions-${access.tipo}-${access.paymentId || access.startedAt}`;
}

function clarificationKey(access: PremiumAccess) {
  return `pierre-premium-clarifications-${access.tipo}-${access.paymentId || access.startedAt}`;
}

function maxClarifications(access: PremiumAccess | null) {
  if (!access) return 0;
  if (access.tipo === "Premium Mensal") return 20;
  return access.maxQuestions * 2;
}

function readQuestionsUsed(access: PremiumAccess | null) {
  if (typeof window === "undefined" || !access) return 0;
  return Number(sessionStorage.getItem(questionKey(access)) || "0");
}

function readClarificationsUsed(access: PremiumAccess | null) {
  if (typeof window === "undefined" || !access) return 0;
  return Number(sessionStorage.getItem(clarificationKey(access)) || "0");
}

function sessionKey(access: PremiumAccess | null) {
  return `pierre-premium-session-${access?.paymentId || "active"}`;
}

function readPremiumSession(access: PremiumAccess | null): PremiumSession | null {
  if (typeof window === "undefined") return null;

  const stored = sessionStorage.getItem(sessionKey(access)) || sessionStorage.getItem("pierre-premium-session-active");
  if (!stored) return null;

  try {
    return JSON.parse(stored) as PremiumSession;
  } catch {
    return null;
  }
}

function savePremiumSession(access: PremiumAccess | null, session: PremiumSession) {
  if (typeof window === "undefined") return;

  const serialized = JSON.stringify(session);
  sessionStorage.setItem("pierre-premium-session-active", serialized);
  sessionStorage.setItem(sessionKey(access), serialized);
}

function humanDelay(minMs = 1800, maxMs = 4200) {
  const delay = minMs + Math.floor(Math.random() * (maxMs - minMs + 1));
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function wantsNewReading(value: string) {
  const normalized = normalizeText(value);
  return /^(nova|outra)\s+(pergunta|tiragem|consulta)\b/.test(normalized) || /^quero\s+(uma\s+)?(nova|outra)\s+(pergunta|tiragem|consulta)\b/.test(normalized);
}

function canSkipDetail(value: string) {
  return ["nao sei", "prefiro nao", "sem detalhes", "pode seguir"].includes(normalizeText(value).trim());
}

function isSatisfied(value: string) {
  const normalized = normalizeText(value).trim().replace(/[.!]+$/, "");
  if (/nao entendi|nao ajudou|nao estou satisfeit|mas |porem |ainda /i.test(normalized)) return false;
  return ["obrigado", "obrigada", "entendi", "me ajudou", "ajudou sim", "estou satisfeito", "estou satisfeita", "foi bom"].includes(normalized);
}

function shouldAskQuestionDetail(theme: PremiumForm["tema"], question: string) {
  const words = question.trim().split(/\s+/).filter(Boolean).length;
  const normalized = normalizeText(question);

  if (words >= 9) return false;
  if (theme === "Trabalho") return normalized.includes("trabalho") || normalized.includes("emprego") || normalized.includes("bem pago");
  if (theme === "Dinheiro") return normalized.includes("dinheiro") || normalized.includes("ganhar") || normalized.includes("quanto");
  if (theme === "Amor") return normalized.includes("amor") || normalized.includes("voltar") || normalized.includes("relacao");

  return words <= 6;
}

function getDetailQuestion(theme: PremiumForm["tema"]) {
  if (theme === "Trabalho") {
    return "Antes de abrir as cartas, me diga só uma coisa para eu responder melhor, sem gastar sua tiragem: você busca emprego fixo, trabalho por conta própria, vendas/serviços, ou ainda está aberto a qualquer caminho?";
  }

  if (theme === "Dinheiro") {
    return "Antes de abrir as cartas, preciso de um detalhe para orientar com mais precisão, sem gastar sua tiragem: esse dinheiro viria de emprego, negócio próprio, venda, dívida a receber ou você ainda não sabe?";
  }

  if (theme === "Amor") {
    return "Antes de abrir as cartas, me diga só um detalhe, sem gastar sua tiragem: essa pergunta fala de alguém que já existe na sua vida, de um retorno, ou de um novo amor?";
  }

  return "Antes de abrir as cartas, me dê um detalhe a mais sobre a situação. Isso não gasta sua tiragem; é só para eu responder com mais precisão.";
}

export function ChatClient() {
  const knownUser = readKnownUser();
  const firstName = knownUser.nome ? getFirstName(knownUser.nome) : "";
  const [hasAccess, setHasAccess] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("pierre-premium-chat") === "1";
  });
  const [access] = useState<PremiumAccess | null>(() => readPremiumAccess());
  const restoredSession = readPremiumSession(access);
  const [questionsUsed, setQuestionsUsed] = useState(() => readQuestionsUsed(readPremiumAccess()));
  const [clarificationsUsed, setClarificationsUsed] = useState(() => readClarificationsUsed(readPremiumAccess()));
  const [lastReadingContext, setLastReadingContext] = useState(() => restoredSession?.lastReadingContext || "");
  const [step, setStep] = useState<ChatStep>(() => restoredSession?.step || (knownUser.nome && knownUser.dataNascimento ? "theme" : knownUser.nome ? "birth" : "nome"));
  const [form, setForm] = useState<PremiumForm>(() => restoredSession?.form || {
    ...initialForm,
    nome: knownUser.nome,
    dataNascimento: knownUser.dataNascimento,
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Pierre está consultando as cartas...");
  const [messages, setMessages] = useState<Message[]>(() => restoredSession?.messages || [
    {
      role: "pierre",
      text:
        "Boa noite. Eu sou Pierre Videncia. Vou conduzir sua consulta com calma. Primeiro, qual é o seu nome?",
    },
  ]);
  const [closingWarned, setClosingWarned] = useState(() => restoredSession?.closingWarned || false);
  const [expiredClosed, setExpiredClosed] = useState(() => restoredSession?.expiredClosed || false);
  const [clock, setClock] = useState(() => Date.now());

  useEffect(() => {
    if (!knownUser.nome || restoredSession?.messages?.length) return;

    const timer = window.setTimeout(() => {
      setMessages([
      {
        role: "pierre",
        text: knownUser.dataNascimento
          ? `Boa noite, ${firstName}. Eu me lembro da sua energia e da sua data de nascimento. Vamos continuar com calma. Qual tema você quer abrir nesta consulta? Amor, Trabalho, Dinheiro, Família, Saúde emocional ou Espiritual.`
          : `Boa noite, ${firstName}. Eu me lembro de você. Para abrir a consulta com precisão, só preciso confirmar sua data de nascimento. Pode escrever no formato dia/mês/ano.`,
      },
      ]);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [firstName, knownUser.dataNascimento, knownUser.nome, restoredSession?.messages?.length]);

  useEffect(() => {
    const interval = window.setInterval(() => setClock(Date.now()), 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!access) return;
    fetch("/api/session", { cache: "no-store" }).then((response) => response.ok ? response.json() : null).then((data) => {
      if (!data?.session) return;
      const serverSession = data.session as {
        firstName: string; birthDate: string; remainingQuestions: number; remainingClarifications: number;
      };
      const offer = getOfferByTipo(access.tipo);
      setQuestionsUsed(Math.max(0, offer.maxQuestions - serverSession.remainingQuestions));
      setClarificationsUsed(Math.max(0, maxClarifications(access) - serverSession.remainingClarifications));
      setForm((current) => ({
        ...current, nome: current.nome || serverSession.firstName,
        dataNascimento: current.dataNascimento || serverSession.birthDate,
      }));
    }).catch(() => undefined);
  }, [access]);

  useEffect(() => {
    savePremiumSession(access, {
      messages,
      lastReadingContext,
      step,
      form,
      closingWarned,
      expiredClosed,
    });
  }, [access, closingWarned, expiredClosed, form, lastReadingContext, messages, step]);

  const minutesRemaining = access ? Math.max(0, Math.ceil((access.startedAt + access.durationMinutes * 60 * 1000 - clock) / 60000)) : 0;
  const accessExpired = Boolean(access && minutesRemaining <= 0);
  const questionsExhausted = Boolean(access && questionsUsed >= access.maxQuestions);
  const clarificationLimit = maxClarifications(access);
  const clarificationsRemaining = Math.max(0, clarificationLimit - clarificationsUsed);
  const canClarifyCurrentReading = Boolean(lastReadingContext && clarificationsRemaining > 0 && !accessExpired);
  const canSendMessage = !loading && !accessExpired && (!questionsExhausted || step === "follow");

  function pierre(text: string, cards?: DrawnCard[]) {
    setMessages((current) => [...current, { role: "pierre", text, cards }]);
  }

  function user(text: string) {
    setMessages((current) => [...current, { role: "user", text }]);
  }

  function closeConsultation(reason: "time" | "limits" | "satisfied") {
    if (reason === "satisfied") {
      pierre(
        "Eu fico feliz em sentir que minha leitura te ajudou. Para fecharmos bem esta consulta, guarde isto: volte ao ponto principal, escolha uma ação concreta e não use a ansiedade como guia. Se mais tarde você quiser continuar, eu consigo retomar a sessão a partir daqui.",
      );
      return;
    }

    if (reason === "time") {
      pierre(
        `${getFirstName(form.nome || knownUser.nome || "querido consulente")}, o tempo ritual desta consulta chegou ao fim. Eu não quero cortar este momento de forma brusca, então vou concluir com cuidado: a leitura que abrimos fica registrada nesta sessão, e se você decidir continuar pagando uma nova sessão, eu retomo exatamente deste ponto, sem começar do zero.`,
      );
      return;
    }

    pierre(
      `${getFirstName(form.nome || knownUser.nome || "querido consulente")}, chegamos ao limite de tiragens e aprofundamentos incluídos nesta consulta. Para respeitar a qualidade do atendimento, eu preciso concluir a sessão por agora. Se você quiser continuar, abra uma nova sessão; eu vou retomar esta conversa do ponto em que paramos, com a mesma leitura e o mesmo contexto.`,
    );
  }

  useEffect(() => {
    if (!access || closingWarned || expiredClosed || minutesRemaining > 5 || minutesRemaining <= 0) return;

    const timer = window.setTimeout(() => {
      setClosingWarned(true);
      pierre(
        `${getFirstName(form.nome || knownUser.nome || "querido consulente")}, nos restam cerca de 5 minutos nesta consulta. Eu não quero encerrar de repente. Se quiser, podemos usar este final para esclarecer o ponto mais importante ou para eu te deixar um resumo prático do que fazer depois desta leitura.`,
      );
    }, 0);

    return () => window.clearTimeout(timer);
  }, [access, closingWarned, expiredClosed, form.nome, knownUser.nome, minutesRemaining]);

  useEffect(() => {
    if (!access || minutesRemaining <= 0 || !expiredClosed) return;

    const timer = window.setTimeout(() => {
      setExpiredClosed(false);
      setClosingWarned(false);
      pierre(
        `${getFirstName(form.nome || knownUser.nome || "querido consulente")}, eu te reencontro. Vamos continuar exatamente de onde paramos, sem recomeçar do zero. Podemos seguir pela última leitura ou abrir uma nova tiragem se você pedir.`,
      );
    }, 0);

    return () => window.clearTimeout(timer);
  }, [access, expiredClosed, form.nome, knownUser.nome, minutesRemaining]);

  useEffect(() => {
    if (!access || expiredClosed || minutesRemaining > 0) return;

    const timer = window.setTimeout(() => {
      setExpiredClosed(true);
      pierre(
        `${getFirstName(form.nome || knownUser.nome || "querido consulente")}, o tempo ritual desta consulta chegou ao fim. Eu não quero cortar este momento de forma brusca, então vou concluir com cuidado: a leitura que abrimos fica registrada nesta sessão, e se você decidir continuar pagando uma nova sessão, eu retomo exatamente deste ponto, sem começar do zero.`,
      );
    }, 0);

    return () => window.clearTimeout(timer);
  }, [access, expiredClosed, form.nome, knownUser.nome, minutesRemaining]);

  function describeLimit() {
    if (!access) return "sua consulta premium";
    return `${access.tipo}: ${questionsUsed}/${access.maxQuestions} tiragens · ${clarificationsRemaining}/${clarificationLimit} esclarecimentos · ${minutesRemaining} min`;
  }

  function canOpenNewReading() {
    if (!access) {
      pierre("Não encontrei o plano desta consulta. Volte às ofertas e desbloqueie uma leitura para que eu conduza o ritual corretamente.");
      setHasAccess(false);
      return false;
    }

    if (accessExpired) {
      pierre("O tempo ritual desta consulta terminou. Para preservar a qualidade da orientação, recomendo desbloquear uma nova leitura quando quiser continuar.");
      return false;
    }

    if (questionsExhausted) {
      pierre(
        canClarifyCurrentReading
          ? `As tiragens incluídas neste plano foram concluídas. Ainda posso esclarecer ${clarificationsRemaining} ponto(s) da leitura já aberta, sem fazer uma nova tiragem.`
          : "As perguntas incluídas neste plano foram concluídas. Se uma nova dúvida nasceu agora, ela merece uma nova abertura de cartas com calma e intenção.",
      );
      return false;
    }

    return true;
  }

  function resetForNextQuestion() {
    if (!canOpenNewReading()) return;

    setForm((current) => ({
      ...initialForm,
      nome: current.nome,
      dataNascimento: current.dataNascimento,
    }));
    setStep("theme");
    pierre("Se desejar, podemos abrir uma nova pergunta. Escolha o tema: Amor, Trabalho, Dinheiro, Família, Saúde emocional ou Espiritual.");
  }

  async function clarifyCurrentReading(value: string) {
    if (!access || !canClarifyCurrentReading) {
      if (access && !canClarifyCurrentReading) {
        closeConsultation("limits");
        return;
      }
      pierre("Para aprofundar, preciso de uma leitura aberta e de esclarecimentos disponíveis neste plano.");
      return;
    }

    setLoading(true);
    setLoadingLabel("Pierre está lendo sua mensagem e escrevendo com cuidado...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          context: `${lastReadingContext}\n\nPlano: ${access.tipo}. Este é um esclarecimento da mesma tiragem, não uma nova pergunta.`,
        }),
      });
      const data = (await response.json()) as { reply?: string; countsAsClarification?: boolean; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Não consegui aprofundar este ponto agora.");
      }

      await humanDelay(2800, 5200);
      const shouldCount = data.countsAsClarification !== false;
      const nextUsed = shouldCount ? clarificationsUsed + 1 : clarificationsUsed;

      if (shouldCount) {
        setClarificationsUsed(nextUsed);
        sessionStorage.setItem(clarificationKey(access), String(nextUsed));
      }

      pierre(data.reply || "Sinto que preciso de um pouco mais de contexto para te orientar bem.");

      const remaining = Math.max(0, maxClarifications(access) - nextUsed);
      if (!shouldCount) {
        pierre(`Esta pergunta de precisão não consumiu seus esclarecimentos. Você ainda tem ${remaining} ponto(s) para aprofundar nesta leitura.`);
      } else if (remaining > 0) {
        pierre(`Ainda posso esclarecer ${remaining} ponto(s) desta leitura. Se quiser uma nova tiragem e seu plano permitir, escreva "nova pergunta".`);
      } else {
        pierre("Os esclarecimentos desta leitura foram concluídos. Para uma nova dúvida, escolha uma nova consulta quando sentir que é o momento.");
      }
    } catch (error) {
      pierre(error instanceof Error ? error.message : "A energia desta explicação não estabilizou. Tente escrever o ponto de outro modo.");
    } finally {
      setLoading(false);
    }
  }

  async function openReading(nextForm: PremiumForm) {
    if (!canOpenNewReading()) {
      setStep("follow");
      return;
    }

    setLoading(true);
    setLoadingLabel("Pierre está misturando as cartas e preparando a leitura...");
    pierre(
      `Perfeito. Vou misturar os 22 Arcanos Maiores do Tarô de Marselha e abrir a tiragem em cruz com o número ${nextForm.numero}. As posições serão: Situação atual, Obstáculo, Conselho, Evolução e Resultado.`,
    );

    try {
      const response = await fetch("/api/premium-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nextForm,
          numero: Number(nextForm.numero),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não consegui abrir a tiragem com esses dados.");
      }

      setLoadingLabel("Pierre está escrevendo sua leitura premium...");
      await humanDelay(5200, 9000);
      const cards = data.cartas
        .map((card: { nome: string; posicao: string }, index: number) => `${index + 1}. ${card.posicao}: ${card.nome}`)
        .join("\n");
      const readingContext = `Pergunta: ${nextForm.pergunta}
Tema: ${nextForm.tema}
Cartas abertas:
${cards}

Resposta principal:
${data.resposta}`;

      pierre(`As cartas abertas foram:\n${cards}\n\n${data.resposta}`, data.cartas);
      setLastReadingContext(readingContext);

      if (access) {
        const nextUsed = questionsUsed + 1;
        setQuestionsUsed(nextUsed);
        sessionStorage.setItem(questionKey(access), String(nextUsed));

        if (nextUsed >= access.maxQuestions) {
          pierre(
            `Sua pergunta principal foi respondida. Ainda posso esclarecer ${clarificationsRemaining} ponto(s) desta mesma leitura, sem abrir uma nova tiragem.\n\nVocê quer que eu aprofunde mais: o sentimento envolvido, o conselho das cartas ou o próximo passo mais prudente?`,
          );
        } else {
          pierre(
            `Você ainda tem ${access.maxQuestions - nextUsed} tiragem(ns) neste plano e ${clarificationsRemaining} esclarecimento(s) desta leitura. Se quiser uma nova tiragem, escreva "nova pergunta". Se quiser aprofundar esta resposta, me diga qual ponto tocou mais você.`,
          );
        }
      }
      setStep("follow");
    } catch (error) {
      pierre(error instanceof Error ? error.message : "A energia da consulta não estabilizou. Tente escrever novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = input.trim();
    if (!value || loading) return;

    setInput("");
    user(value);

    if (accessExpired) {
      canOpenNewReading();
      return;
    }

    if (step !== "follow" && questionsExhausted) {
      canOpenNewReading();
      return;
    }

    if (step === "nome") {
      setForm((current) => ({ ...current, nome: value }));
      setStep("birth");
      pierre(`Prazer, ${value}. Qual é a sua data de nascimento? Pode escrever no formato dia/mês/ano.`);
      return;
    }

    if (step === "birth") {
      setForm((current) => ({ ...current, dataNascimento: value }));
      setStep("theme");
      pierre("Obrigado. Agora me diga o tema da consulta: Amor, Trabalho, Dinheiro, Família, Saúde emocional ou Espiritual.");
      return;
    }

    if (step === "theme") {
      const normalized = themeOptions.find((theme) => theme.toLowerCase() === value.toLowerCase());
      if (!normalized) {
        pierre("Escolha um destes temas para eu conduzir corretamente: Amor, Trabalho, Dinheiro, Família, Saúde emocional ou Espiritual.");
        return;
      }
      setForm((current) => ({ ...current, tema: normalized }));
      if (normalized === "Amor") {
        setStep("targetName");
        pierre("Quando a pergunta é sobre amor, posso ser mais preciso. Qual é o nome da pessoa ligada a essa relação?");
        return;
      }
      setStep("question");
      pierre("Agora escreva sua pergunta com sinceridade. Quanto mais clara for a pergunta, mais objetiva será a leitura.");
      return;
    }

    if (step === "targetName") {
      setForm((current) => ({ ...current, pessoaAlvoNome: value }));
      setStep("targetBirth");
      pierre("Se você souber, qual é a data de nascimento dessa pessoa? Se não souber, escreva: não sei.");
      return;
    }

    if (step === "targetBirth") {
      setForm((current) => ({ ...current, pessoaAlvoNascimento: value.toLowerCase() === "não sei" ? "" : value }));
      setStep("question");
      pierre("Agora escreva sua pergunta sobre essa relação. Seja direto, mas deixe o coração aparecer.");
      return;
    }

    if (step === "question") {
      setForm((current) => ({ ...current, pergunta: value }));
      if (shouldAskQuestionDetail(form.tema, value)) {
        setStep("questionDetail");
        pierre(getDetailQuestion(form.tema));
        return;
      }
      setStep("number");
      pierre("Para esta nova pergunta, escolha um número entre 1 e 9. Esse número guiará as posições da tiragem.");
      return;
    }

    if (step === "questionDetail") {
      setForm((current) => ({
        ...current,
        pergunta: canSkipDetail(value) ? current.pergunta : `${current.pergunta}\nDetalhe informado pelo consulente: ${value}`,
      }));
      setStep("number");
      pierre("Perfeito, isso me ajuda a orientar melhor sem consumir nada a mais. Agora escolha um número entre 1 e 9 para guiar as posições da tiragem.");
      return;
    }

    if (step === "number") {
      const number = Number(value);
      if (!Number.isInteger(number) || number < 1 || number > 9) {
        pierre("Escolha apenas um número inteiro entre 1 e 9.");
        return;
      }
      const nextForm = { ...form, numero: String(number) };
      setForm(nextForm);
      setStep("reading");
      await openReading(nextForm);
      return;
    }

    if (step === "follow") {
      if (isSatisfied(value)) {
        closeConsultation("satisfied");
        return;
      }

      if (wantsNewReading(value)) {
        resetForNextQuestion();
        return;
      }

      if (canClarifyCurrentReading) {
        await clarifyCurrentReading(value);
        return;
      }

      pierre("Recebo sua mensagem. Para manter a consulta clara e preciosa, recomendo abrir uma nova tiragem quando quiser continuar.");
    }
  }

  if (!hasAccess) {
    return (
      <div className="mystic-border font-ui mt-8 rounded-[8px] p-6 text-center">
        <Lock className="mx-auto h-9 w-9 text-[#d9aa4f]" />
        <h2 className="mt-4 font-serif text-2xl font-semibold">Chat premium reservado</h2>
        <p className="mt-3 leading-7 text-[#fff7df]/72">
          Este espaço abre somente depois de uma consulta paga. A leitura gratuita mostra as cartas e o primeiro sinal; no chat premium, eu aprofundo sua leitura.
        </p>
        <Link href="/ofertas" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12] md:w-auto">
          Escolher minha consulta premium
        </Link>
      </div>
    );
  }

  return (
    <div className="mystic-border font-ui mt-8 rounded-[8px] p-4">
      <div className="mb-4 grid gap-2 rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] p-3 text-xs leading-5 text-[#fff7df]/62 md:grid-cols-[1fr_auto] md:items-center">
        <p>
          <Sparkles className="mr-2 inline h-4 w-4 text-[#d9aa4f]" />
          Consulta premium com Pierre. Cada tiragem recebe cartas próprias; cada esclarecimento aprofunda a leitura já aberta.
        </p>
        <p className="rounded-full border border-[#d9aa4f]/25 px-3 py-1 text-[#f7d990]">{describeLimit()}</p>
      </div>
      <div className="grid max-h-[560px] gap-3 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`whitespace-pre-line rounded-[8px] p-4 leading-7 ${
              message.role === "user" ? "ml-8 bg-[#d9aa4f] text-[#160b12]" : "mr-8 border border-[#d9aa4f]/25 bg-[#0d0712] text-[#fff7df]/78"
            }`}
          >
            {message.text}
            {message.cards?.length ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {message.cards.map((card) => (
                  <TarotArcanaCard key={`${card.posicao}-${card.nome}`} nome={card.nome} position={card.posicao} compact />
                ))}
              </div>
            ) : null}
          </div>
        ))}
        {loading ? (
          <div className="mr-8 inline-flex items-center gap-2 rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] p-4 text-[#fff7df]/68">
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingLabel}
          </div>
        ) : null}
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Responda a Pierre..."
          className="min-h-12 flex-1 rounded-full border border-[#d9aa4f]/25 bg-[#0d0712] px-5 outline-none focus:border-[#d9aa4f]"
        />
        <button
          disabled={!input.trim() || !canSendMessage}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d9aa4f] px-5 font-bold text-[#160b12] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
