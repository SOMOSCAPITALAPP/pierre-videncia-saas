import { NextResponse } from "next/server";
import { z } from "zod";
import { getZodiacSign } from "@/lib/astrology";
import { calculateLifePathNumber } from "@/lib/numerology";
import { generateReading } from "@/lib/openai";
import { getCrossReading, readingPositions, shuffleDeck, tarotDeck } from "@/lib/tarotDeck";
import { ensurePremiumSession, premiumAccess } from "@/lib/premiumAccess";
import { appendCrmReading, recordEvent } from "@/lib/crm";

const premiumReadingSchema = z.object({
  nome: z.string().trim().min(2).max(80),
  dataNascimento: z.string().trim().min(8).max(40),
  tema: z.enum(["Amor", "Trabalho", "Dinheiro", "Família", "Saúde emocional", "Espiritual"]),
  pergunta: z.string().trim().min(6).max(900),
  numero: z.coerce.number().int().min(1).max(9),
  pessoaAlvoNome: z.string().trim().max(80).optional(),
  pessoaAlvoNascimento: z.string().trim().max(40).optional(),
});

function normalizeBrazilianDate(date: string) {
  const trimmed = date
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const slashMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (slashMatch) {
    const [, day, month, year] = slashMatch;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const monthNames: Record<string, string> = {
    janeiro: "01",
    fevereiro: "02",
    marco: "03",
    abril: "04",
    maio: "05",
    junho: "06",
    julho: "07",
    agosto: "08",
    setembro: "09",
    outubro: "10",
    novembro: "11",
    dezembro: "12",
  };
  const textMatch = trimmed.match(/^(\d{1,2})\s*(?:de\s*)?([a-z]+)\s*(?:de\s*)?(\d{4})$/);

  if (textMatch) {
    const [, day, monthName, year] = textMatch;
    const month = monthNames[monthName];
    if (month) {
      return `${year}-${month}-${day.padStart(2, "0")}`;
    }
  }

  return date.trim();
}

export async function POST(request: Request) {
  try {
    const access = premiumAccess(request);
    if (!access) return NextResponse.json({ error: "Confirme seu pagamento Pix para continuar." }, { status: 401 });
    const session = await ensurePremiumSession(access);
    if (session && (session.status !== "active" || session.remainingQuestions <= 0)) {
      return NextResponse.json({ error: "As tiragens desta consulta terminaram. Uma nova sessão pode continuar esta leitura." }, { status: 403 });
    }
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

    if (session) {
      const saved = await appendCrmReading(session.id, {
        question: pergunta, cards: cartas.map((card) => card.nome), answer: resposta, createdAt: new Date().toISOString(),
      }, { theme: payload.tema, birthDate: dataNascimento, firstName: payload.nome.trim().split(/\s+/)[0] });
      if (!saved) return NextResponse.json({ error: "As tiragens desta consulta terminaram." }, { status: 403 });
      await recordEvent(access.leadId, "premium_chat_message", { kind: "reading" }, session.id);
    }

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
