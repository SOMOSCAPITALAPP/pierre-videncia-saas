"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readingPositions } from "@/lib/tarotDeck";

type ReadingResult = {
  user: { id: string; nome: string; whatsapp?: string; signo?: string; numeroVida?: number };
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
      <div className="font-ui mt-4 grid gap-2 rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] p-4 text-sm text-[#fff7df]/72 md:grid-cols-3">
        <span>Tema aberto pelas cartas</span>
        <span>Signo: {reading.user.signo || "em leitura"}</span>
        <span>Número de vida: {reading.user.numeroVida || "em leitura"}</span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {reading.cartas.map((card, index) => (
          <article key={`${card.nome}-${index}`} className="mystic-border rounded-[8px] p-3">
            <div className="relative flex aspect-[3/5] flex-col justify-between rounded-[8px] border border-[#d9aa4f]/45 bg-[#17091f] p-3 text-center shadow-lg shadow-black/20">
              <span className="font-ui text-[10px] uppercase tracking-[0.16em] text-[#d9aa4f]">{readingPositions[index]}</span>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#d9aa4f]/35 bg-[#d9aa4f]/10 text-3xl text-[#d9aa4f]">
                {index + 1}
              </div>
              <h2 className="text-lg font-semibold leading-tight text-[#fff7df]">{card.nome}</h2>
            </div>
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
          A consulta grátis revela o primeiro sinal. A leitura completa aprofunda o obstáculo, o conselho e o resultado provável, sempre como orientação simbólica, sem promessas absolutas.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <Link href="/ofertas" className="font-ui inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12]">
            Desbloquear leitura completa
          </Link>
          <Link href="/ofertas" className="font-ui inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#d9aa4f]/40 px-6 font-bold text-[#fff7df]">
            Consultar Pierre e sua equipe
          </Link>
        </div>
        <p className="font-ui mt-4 text-xs leading-5 text-[#fff7df]/54">
          O WhatsApp fica reservado para leituras premium, envio de comprovante Pix e acompanhamento. Esta leitura é espiritual e simbólica, não substitui decisões profissionais, médicas, jurídicas ou financeiras.
        </p>
      </div>
    </section>
  );
}
