"use client";

import Link from "next/link";
import { useState } from "react";
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

type ChatStep = "nome" | "birth" | "theme" | "targetName" | "targetBirth" | "question" | "number" | "reading" | "follow";

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

function readPremiumAccess(): PremiumAccess | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("pierre-premium-plan");

  if (!stored && sessionStorage.getItem("pierre-premium-chat") === "1") {
    const fallback = getOfferByTipo("Tiragem Completa");
    return {
      tipo: fallback.tipo,
      maxQuestions: fallback.maxQuestions,
      durationMinutes: fallback.durationMinutes,
      startedAt: Date.now(),
    };
  }

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
  return `pierre-premium-questions-${access.tipo}`;
}

function clarificationKey(access: PremiumAccess) {
  return `pierre-premium-clarifications-${access.tipo}`;
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

function getMinutesRemaining(access: PremiumAccess | null) {
  if (!access) return 0;
  const expiresAt = access.startedAt + access.durationMinutes * 60 * 1000;
  return Math.max(0, Math.ceil((expiresAt - Date.now()) / 60000));
}

export function ChatClient() {
  const [hasAccess, setHasAccess] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("pierre-premium-chat") === "1";
  });
  const [access] = useState<PremiumAccess | null>(() => readPremiumAccess());
  const [questionsUsed, setQuestionsUsed] = useState(() => readQuestionsUsed(readPremiumAccess()));
  const [clarificationsUsed, setClarificationsUsed] = useState(() => readClarificationsUsed(readPremiumAccess()));
  const [lastReadingContext, setLastReadingContext] = useState("");
  const [step, setStep] = useState<ChatStep>("nome");
  const [form, setForm] = useState<PremiumForm>(initialForm);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "pierre",
      text:
        "Bonsoir, querido consulente. Aqui é Pierre Videncia e sua equipe. Para uma orientação precisa, vou conduzir sua consulta passo a passo. Primeiro, qual é o seu nome?",
    },
  ]);

  const minutesRemaining = getMinutesRemaining(access);
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
      pierre("Para aprofundar, preciso de uma leitura aberta e de esclarecimentos disponíveis neste plano.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          context: `${lastReadingContext}\n\nPlano: ${access.tipo}. Este é um esclarecimento da mesma tiragem, não uma nova pergunta.`,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não consegui aprofundar este ponto agora.");
      }

      const nextUsed = clarificationsUsed + 1;
      setClarificationsUsed(nextUsed);
      sessionStorage.setItem(clarificationKey(access), String(nextUsed));
      pierre(data.reply);

      const remaining = Math.max(0, maxClarifications(access) - nextUsed);
      if (remaining > 0) {
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
      setStep("number");
      pierre("Para esta nova pergunta, escolha um número entre 1 e 9. Esse número guiará as posições da tiragem.");
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
      if (value.toLowerCase().includes("nova") || value.toLowerCase().includes("outra")) {
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
          Este espaço abre somente depois de uma consulta paga. A leitura gratuita mostra as cartas e o primeiro sinal; o chat premium aprofunda com Pierre ou sua equipe.
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
          Atendimento premium com Pierre ou sua equipe. Cada tiragem recebe cartas próprias; cada esclarecimento aprofunda a leitura já aberta.
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
            Pierre está consultando as cartas...
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
