"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const themes = ["Amor", "Trabalho", "Dinheiro", "Família", "Espiritual"];

export function ConsultationForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/generate-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    <form onSubmit={onSubmit} className="mystic-border font-ui mt-8 grid gap-4 rounded-[8px] p-5">
      <label className="grid gap-2">
        <span>Nome</span>
        <input name="nome" required minLength={2} className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
      </label>
      <label className="grid gap-2">
        <span>Email</span>
        <input type="email" name="email" required className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
      </label>
      <label className="grid gap-2">
        <span>WhatsApp</span>
        <input name="whatsapp" required inputMode="tel" className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
      </label>
      <label className="grid gap-2">
        <span>Data de nascimento</span>
        <input type="date" name="dataNascimento" required className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
      </label>
      <label className="grid gap-2">
        <span>Pergunta</span>
        <textarea name="pergunta" required minLength={8} rows={5} className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
      </label>
      <label className="grid gap-2">
        <span>Tema</span>
        <select name="tema" required className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]">
          {themes.map((theme) => (
            <option key={theme}>{theme}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2">
        <span>Número entre 1 e 9</span>
        <input type="number" name="numero" required min={1} max={9} className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] px-4 py-3 outline-none focus:border-[#d9aa4f]" />
      </label>
      {error ? <p className="rounded-[8px] border border-red-400/40 bg-red-950/30 p-3 text-sm text-red-100">{error}</p> : null}
      <button
        disabled={loading}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {loading ? "Abrindo as cartas..." : "Fazer minha consulta grátis"}
      </button>
    </form>
  );
}
