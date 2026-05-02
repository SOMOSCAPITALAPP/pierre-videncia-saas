import { NextResponse } from "next/server";
import { getZodiacSign } from "@/lib/astrology";
import { appendSheetRow } from "@/lib/googleSheets";
import { calculateLifePathNumber } from "@/lib/numerology";
import { generateReading } from "@/lib/openai";
import { saveLead } from "@/lib/supabaseLeads";
import { getCrossReading, shuffleDeck, tarotDeck } from "@/lib/tarotDeck";
import { consultationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = consultationSchema.parse(body);
    const now = new Date().toISOString();
    const userId = crypto.randomUUID();
    const signo = getZodiacSign(payload.dataNascimento);
    const numeroVida = calculateLifePathNumber(payload.dataNascimento);
    const shuffled = shuffleDeck(tarotDeck);
    const cartas = getCrossReading(shuffled, payload.numero);

    const resposta = await generateReading({
      nome: payload.nome,
      pergunta: payload.pergunta,
      tema: payload.tema,
      numero: payload.numero,
      cartas,
      signo,
      numeroVida,
      mode: payload.tipo,
    });

    await Promise.all([
      appendSheetRow("users", [
        userId,
        payload.nome,
        payload.email,
        payload.whatsapp,
        payload.dataNascimento,
        signo,
        numeroVida,
        "free",
        "novo_lead",
        now,
      ]),
      appendSheetRow("consultas", [
        userId,
        payload.pergunta,
        payload.tema,
        payload.numero,
        cartas.map((card) => card.nome).join(" | "),
        resposta,
        payload.tipo,
        now,
      ]),
      saveLead({
        id: userId,
        nome: payload.nome,
        email: payload.email,
        whatsapp: payload.whatsapp,
        tema: payload.tema,
        pergunta: payload.pergunta,
        tipo: payload.tipo,
        signo,
        numeroVida,
        createdAt: now,
      }),
    ]);

    return NextResponse.json({
      user: {
        id: userId,
        nome: payload.nome,
        email: payload.email,
        whatsapp: payload.whatsapp,
        signo,
        numeroVida,
      },
      cartas,
      resposta,
      tipo: payload.tipo,
      createdAt: now,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Revise os dados e tente novamente." }, { status: 400 });
  }
}
