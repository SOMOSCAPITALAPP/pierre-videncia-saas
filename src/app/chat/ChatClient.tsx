"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";

type Message = {
  role: "user" | "pierre";
  text: string;
};

export function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "pierre",
      text: "Bonsoir, querido consulente. Escreva sua dúvida com calma. Vou responder com uma orientação simbólica, sem promessas absolutas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const canSend = input.trim().length > 1 && !loading;

  useEffect(() => {
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
      return "Sua leitura anterior foi encontrada e será usada como contexto.";
    }

    return "Você também pode começar o chat sem leitura prévia.";
  }, [context]);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSend) {
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

  return (
    <div className="mystic-border font-ui mt-8 rounded-[8px] p-4">
      <p className="mb-4 rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] p-3 text-xs leading-5 text-[#fff7df]/62">
        {helper} Este chat usa o modelo mini configurado no servidor e não expõe chaves.
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
          placeholder="Escreva sua dúvida..."
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
