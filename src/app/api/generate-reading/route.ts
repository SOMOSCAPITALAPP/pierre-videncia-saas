import { NextResponse } from "next/server";
import { getZodiacSign } from "@/lib/astrology";
import { appendSheetRow } from "@/lib/googleSheets";
import { calculateLifePathNumber } from "@/lib/numerology";
import { generateReading } from "@/lib/openai";
import { saveConsultation, saveLead } from "@/lib/supabaseLeads";
import { getCrossReading, shuffleDeck, tarotDeck } from "@/lib/tarotDeck";
import { consultationSchema } from "@/lib/validation";
import { recordEvent, saveCrmLead } from "@/lib/crm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = consultationSchema.parse(body);
    const now = new Date().toISOString();
    const userId = crypto.randomUUID();
    await saveCrmLead({
      id: userId, firstName: payload.nome.trim().split(/\s+/)[0], birthDate: payload.dataNascimento,
      email: payload.email, whatsapp: payload.whatsapp, theme: payload.tema,
      question: payload.pergunta, source: "consulta", createdAt: now,
    }).then(() => recordEvent(userId, "free_reading_started", { theme: payload.tema })).catch((error) => console.error("[crm lead failed]", error));
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
      mode: "FREE",
    });
    const cartasText = cartas.map((card) => card.nome).join(" | ");
    await recordEvent(userId, "free_reading_completed", { theme: payload.tema }).catch((error) => console.error("[crm reading event failed]", error));

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
        cartasText,
        resposta,
        "FREE",
        now,
      ]),
      saveLead({
        id: userId,
        nome: payload.nome,
        email: payload.email,
        whatsapp: payload.whatsapp,
        tema: payload.tema,
        pergunta: payload.pergunta,
        tipo: "FREE",
        signo,
        numeroVida,
        createdAt: now,
      }),
      saveConsultation({
        userId,
        pergunta: payload.pergunta,
        tema: payload.tema,
        numero: payload.numero,
        cartas: cartasText,
        resposta,
        tipo: "FREE",
        createdAt: now,
      }),
    ]);

    return NextResponse.json({
      user: {
        id: userId,
        nome: payload.nome,
        email: payload.email,
        whatsapp: payload.whatsapp,
        dataNascimento: payload.dataNascimento,
        signo,
        numeroVida,
      },
      cartas,
      resposta,
      tipo: "FREE",
      createdAt: now,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Revise os dados e tente novamente." }, { status: 400 });
  }
}
