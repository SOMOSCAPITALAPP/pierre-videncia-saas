"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Lock, Send, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "pierre";
  text: string;
};

export function ChatClient() {
  const [hasAccess, setHasAccess] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "pierre",
      text: "Bonsoir, querido consulente. Este é o espaço premium de orientação. Escreva sua dúvida com calma; Pierre ou sua equipe responderá com cuidado, sabedoria emocional e sem promessas absolutas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const canSend = input.trim().length > 1 && !loading;

  useEffect(() => {
    setHasAccess(sessionStorage.getItem("pierre-premium-chat") === "1");
    const stored = sessionStorage.getItem("pierre-reading");

    if (!stored) {
      return;
    }

    try {
      const reading = JSON.parse(stored) as {
        user?: { nome?: string; signo?: string; numeroVida?: number };
        resposta?: string;
        cartas?: Array<{ nome: string }>;
      };
      const cards = reading.cartas?.map((card) => card.nome).join(", ") || "";
      setContext(
        `Nome: ${reading.user?.nome || ""}\nSigno: ${reading.user?.signo || ""}\nNúmero de vida: ${
          reading.user?.numeroVida || ""
        }\nCartas: ${cards}\nLeitura inicial: ${reading.resposta || ""}`,
      );
    } catch {
      setContext("");
    }
  }, []);

  const helper = useMemo(() => {
    if (context) {
      return "Sua tiragem anterior será usada como contexto para manter o fio espiritual da consulta.";
    }

    return "Você pode conversar sobre amor, trabalho, perdão, ação consciente, amor-próprio e escolhas emocionais.";
  }, [context]);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSend || !hasAccess) {
      return;
    }

    const text = input.trim();
    setInput("");
    setLoading(true);
    setMessages((current) => [...current, { role: "user", text }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível responder agora.");
      }

      setMessages((current) => [...current, { role: "pierre", text: data.reply }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "pierre",
          text: error instanceof Error ? error.message : "Algo não respondeu como esperado. Tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
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
      <p className="mb-4 rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] p-3 text-xs leading-5 text-[#fff7df]/62">
        <Sparkles className="mr-2 inline h-4 w-4 text-[#d9aa4f]" />
        {helper}
      </p>
      <div className="grid max-h-[520px] gap-3 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-[8px] p-4 leading-7 ${
              message.role === "user" ? "ml-8 bg-[#d9aa4f] text-[#160b12]" : "mr-8 border border-[#d9aa4f]/25 bg-[#0d0712] text-[#fff7df]/78"
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading ? (
          <div className="mr-8 inline-flex items-center gap-2 rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] p-4 text-[#fff7df]/68">
            <Loader2 className="h-4 w-4 animate-spin" />
            Pierre está lendo os sinais...
          </div>
        ) : null}
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Escreva sua dúvida premium..."
          className="min-h-12 flex-1 rounded-full border border-[#d9aa4f]/25 bg-[#0d0712] px-5 outline-none focus:border-[#d9aa4f]"
        />
        <button
          disabled={!canSend}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d9aa4f] px-5 font-bold text-[#160b12] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
