"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readingPositions } from "@/lib/tarotDeck";

type ReadingResult = {
  user: { id: string; nome: string };
  cartas: { nome: string; conselho: string }[];
  resposta: string;
};

export function ResultadoClient() {
  const [reading, setReading] = useState<ReadingResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("pierre-reading");
    if (stored) {
      try {
        setReading(JSON.parse(stored) as ReadingResult);
      } catch {
        setReading(null);
      }
    }
  }, []);

  if (!reading) {
    return (
      <section className="mx-auto w-full max-w-3xl px-5 py-12">
        <div className="mystic-border rounded-[8px] p-6 text-center">
          <h1 className="text-3xl font-semibold">Sua leitura ainda não foi aberta</h1>
          <Link href="/consulta" className="font-ui mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12]">
            Fazer consulta grátis
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-8">
      <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">resultado</p>
      <h1 className="mt-3 text-4xl font-semibold">Leitura de {reading.user.nome}</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {reading.cartas.map((card, index) => (
          <article key={`${card.nome}-${index}`} className="mystic-border rounded-[8px] p-4">
            <p className="font-ui text-xs uppercase tracking-[0.16em] text-[#d9aa4f]">{readingPositions[index]}</p>
            <h2 className="mt-3 text-xl font-semibold">{card.nome}</h2>
            <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/68">{card.conselho}</p>
          </article>
        ))}
      </div>

      <article className="mystic-border font-ui mt-6 whitespace-pre-line rounded-[8px] p-6 leading-8 text-[#fff7df]/80">
        {reading.resposta}
      </article>

      <div className="mystic-border mt-6 rounded-[8px] p-6">
        <h2 className="text-2xl font-semibold">Sinto que há algo mais profundo nesta leitura...</h2>
        <p className="font-ui mt-3 leading-7 text-[#fff7df]/72">
          A leitura completa aprofunda cada posição, revela caminhos emocionais e traz uma orientação prática para o seu momento.
        </p>
        <Link href="/ofertas" className="font-ui mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12] md:w-auto">
          Desbloquear leitura completa
        </Link>
      </div>
    </section>
  );
}
