import { NextResponse } from "next/server";
import { z } from "zod";
import { getZodiacSign } from "@/lib/astrology";
import { calculateLifePathNumber } from "@/lib/numerology";
import { generateReading } from "@/lib/openai";
import { getCrossReading, readingPositions, shuffleDeck, tarotDeck } from "@/lib/tarotDeck";

const premiumReadingSchema = z.object({
  nome: z.string().trim().min(2).max(80),
  dataNascimento: z.string().trim().min(8).max(10),
  tema: z.enum(["Amor", "Trabalho", "Dinheiro", "Família", "Espiritual"]),
  pergunta: z.string().trim().min(6).max(900),
  numero: z.coerce.number().int().min(1).max(9),
  pessoaAlvoNome: z.string().trim().max(80).optional(),
  pessoaAlvoNascimento: z.string().trim().max(10).optional(),
});

function normalizeBrazilianDate(date: string) {
  const trimmed = date.trim();
  const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (!match) {
    return trimmed;
  }

  const [, day, month, year] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export async function POST(request: Request) {
  try {
    const payload = premiumReadingSchema.parse(await request.json());
    const dataNascimento = normalizeBrazilianDate(payload.dataNascimento);
    const signo = getZodiacSign(dataNascimento);
    const numeroVida = calculateLifePathNumber(dataNascimento);
    const shuffled = shuffleDeck(tarotDeck);
    const cartas = getCrossReading(shuffled, payload.numero);
    const pergunta =
      payload.tema === "Amor" && payload.pessoaAlvoNome
        ? `${payload.pergunta}\nPessoa ligada à relação: ${payload.pessoaAlvoNome}. Data de nascimento, se informada: ${
            payload.pessoaAlvoNascimento || "não informada"
          }.`
        : payload.pergunta;

    const resposta = await generateReading({
      nome: payload.nome,
      pergunta,
      tema: payload.tema,
      numero: payload.numero,
      cartas,
      signo,
      numeroVida,
      mode: "PREMIUM",
    });

    return NextResponse.json({
      cartas: cartas.map((card, index) => ({
        ...card,
        posicao: readingPositions[index],
      })),
      resposta,
      signo,
      numeroVida,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Pierre precisa de alguns dados para abrir a tiragem com precisão." }, { status: 400 });
  }
}
