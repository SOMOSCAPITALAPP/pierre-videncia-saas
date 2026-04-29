"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2, Mail, MessageCircle } from "lucide-react";

const themes = ["Amor", "Trabalho", "Dinheiro", "Família", "Espiritual"];
const readingDepths = [
  { value: "FREE", title: "Orientação grátis", text: "Uma primeira resposta simbólica para clarear o momento." },
  { value: "BASIC", title: "Resposta mais completa", text: "Ideal para quem sente que precisa de mais contexto." },
  { value: "PREMIUM", title: "Leitura profunda", text: "Mais emocional, prática e espiritual." },
];

type FormState = {
  tema: string;
  tipo: string;
  nome: string;
  email: string;
  whatsapp: string;
  dataNascimento: string;
  pergunta: string;
  numero: string;
  preferenciaContato: string;
};

const initialForm: FormState = {
  tema: "Amor",
  tipo: "FREE",
  nome: "",
  email: "",
  whatsapp: "",
  dataNascimento: "",
  pergunta: "",
  numero: "7",
  preferenciaContato: "WhatsApp",
};

export function ConsultationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const progress = useMemo(() => `${Math.round(((step + 1) / 4) * 100)}%`, [step]);

  useEffect(() => {
    const tema = new URLSearchParams(window.location.search).get("tema");

    if (tema && themes.includes(tema)) {
      update("tema", tema);
    }
  }, []);

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function next() {
    setError("");

    if (step === 1 && (!form.nome || !form.email || !form.whatsapp)) {
      setError("Deixe seu nome, email e WhatsApp para continuar.");
      return;
    }

    if (step === 2 && (!form.dataNascimento || form.pergunta.trim().length < 8)) {
      setError("Informe sua data de nascimento e escreva sua pergunta com um pouco mais de detalhe.");
      return;
    }

    setStep((current) => Math.min(current + 1, 3));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível gerar sua leitura.");
      }

      sessionStorage.setItem("pierre-reading", JSON.stringify(data));
      router.push("/resultado");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Algo não respondeu como esperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mystic-border font-ui mt-8 rounded-[8px] p-5">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-[#fff7df]/66">
          <span>Etapa {step + 1} de 4</span>
          <span>{progress}</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-[#fff7df]/10">
          <div className="h-2 rounded-full bg-[#d9aa4f]" style={{ width: progress }} />
        </div>
      </div>

      {step === 0 ? (
        <div>
          <h2 className="font-serif text-2xl font-semibold">Qual área mais pesa no seu coração hoje?</h2>
          <div className="mt-5 grid gap-3">
            {themes.map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => update("tema", theme)}
                className={`min-h-14 rounded-[8px] border px-4 text-left font-semibold ${
                  form.tema === theme ? "border-[#d9aa4f] bg-[#d9aa4f] text-[#160b12]" : "border-[#d9aa4f]/25 bg-[#0d0712] text-[#fff7df]"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-4">
          <h2 className="font-serif text-2xl font-semibold">Para abrir sua leitura, deixe seu contato</h2>
          <p className="text-sm leading-6 text-[#fff7df]/68">
            Seu email e WhatsApp ajudam Pierre a entregar a orientação, enviar lembretes e continuar a conversa se você quiser desbloquear uma leitura completa.
          </p>
          <label className="grid gap-2">
            <span>Nome</span>
            <input value={form.nome} onChange={(event) => update("nome", event.target.value)} required minLength={2} className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
          </label>
          <label className="grid gap-2">
            <span>Email</span>
            <div className="flex items-center rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-3 focus-within:border-[#d9aa4f]">
              <Mail className="h-5 w-5 text-[#d9aa4f]" />
              <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required className="min-h-12 flex-1 bg-transparent px-3 outline-none" />
            </div>
          </label>
          <label className="grid gap-2">
            <span>WhatsApp</span>
            <div className="flex items-center rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-3 focus-within:border-[#d9aa4f]">
              <MessageCircle className="h-5 w-5 text-[#d9aa4f]" />
              <input value={form.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} required inputMode="tel" placeholder="DDD + número" className="min-h-12 flex-1 bg-transparent px-3 outline-none" />
            </div>
          </label>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-4">
          <h2 className="font-serif text-2xl font-semibold">Conte sua pergunta com calma</h2>
          <label className="grid gap-2">
            <span>Data de nascimento</span>
            <input type="date" value={form.dataNascimento} onChange={(event) => update("dataNascimento", event.target.value)} required className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
          </label>
          <label className="grid gap-2">
            <span>Sua pergunta</span>
            <textarea value={form.pergunta} onChange={(event) => update("pergunta", event.target.value)} required minLength={8} rows={5} placeholder="Ex: O que preciso entender sobre minha relação neste momento?" className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
          </label>
          <label className="grid gap-2">
            <span>Número entre 1 e 9</span>
            <input type="number" value={form.numero} onChange={(event) => update("numero", event.target.value)} required min={1} max={9} className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
          </label>
        </div>
      ) : null}

      {step === 3 ? (
        <div>
          <h2 className="font-serif text-2xl font-semibold">Escolha como quer começar</h2>
          <div className="mt-5 grid gap-3">
            {readingDepths.map((depth) => (
              <button
                key={depth.value}
                type="button"
                onClick={() => update("tipo", depth.value)}
                className={`rounded-[8px] border p-4 text-left ${
                  form.tipo === depth.value ? "border-[#d9aa4f] bg-[#d9aa4f] text-[#160b12]" : "border-[#d9aa4f]/25 bg-[#0d0712] text-[#fff7df]"
                }`}
              >
                <span className="block font-semibold">{depth.title}</span>
                <span className="mt-1 block text-sm opacity-75">{depth.text}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] p-3 text-xs leading-5 text-[#fff7df]/64">
            Esta leitura é simbólica e espiritual. Ela não substitui decisões médicas, jurídicas, financeiras ou psicológicas.
          </p>
        </div>
      ) : null}

      {error ? <p className="mt-5 rounded-[8px] border border-red-400/40 bg-red-950/30 p-3 text-sm text-red-100">{error}</p> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#d9aa4f]/35 px-6 font-bold text-[#fff7df]"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </button>
        ) : null}
        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12]"
          >
            Continuar
            <ArrowRight className="h-5 w-5" />
          </button>
        ) : (
          <button
            disabled={loading}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {loading ? "Abrindo as cartas..." : "Receber minha orientação"}
          </button>
        )}
      </div>
    </form>
  );
}
