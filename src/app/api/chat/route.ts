import { NextResponse } from "next/server";
import { z } from "zod";
import { generateChatReply } from "@/lib/openai";
import { ensurePremiumSession, premiumAccess } from "@/lib/premiumAccess";
import { appendCrmClarification, recordEvent } from "@/lib/crm";

const chatSchema = z.object({
  message: z.string().trim().min(2).max(900),
  context: z.string().trim().max(7000).optional(),
});

export async function POST(request: Request) {
  try {
    const access = premiumAccess(request);
    if (!access) return NextResponse.json({ error: "Confirme seu pagamento Pix para continuar." }, { status: 401 });
    const session = await ensurePremiumSession(access);
    if (session && (session.status !== "active" || session.remainingClarifications <= 0)) {
      return NextResponse.json({ error: "Os esclarecimentos desta consulta terminaram. Uma nova sessão pode continuar esta leitura." }, { status: 403 });
    }
    const payload = chatSchema.parse(await request.json());
    const context = session?.readings.at(-1)
      ? `Pergunta: ${session.currentQuestion}\nLeitura: ${session.readings.at(-1)?.answer}\nResumo: ${session.summary}`
      : payload.context;
    const result = await generateChatReply(payload.message, context);

    if (session) {
      const emotionalContext = /ansios|medo|trist|sofr|insegur|confus|preocup|alivi|feliz/i.test(payload.message) ? payload.message.slice(0, 500) : "";
      const saved = await appendCrmClarification(session.id, {
        message: payload.message, answer: result.reply, counted: result.countsAsClarification, createdAt: new Date().toISOString(),
      }, emotionalContext);
      if (!saved) return NextResponse.json({ error: "Os esclarecimentos desta consulta terminaram." }, { status: 403 });
      await recordEvent(access.leadId, "premium_chat_message", { kind: "clarification", counted: result.countsAsClarification }, session.id);
      return NextResponse.json({ ...result, remainingClarifications: saved.remainingClarifications });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Escreva sua pergunta com um pouco mais de detalhe." }, { status: 400 });
  }
}
