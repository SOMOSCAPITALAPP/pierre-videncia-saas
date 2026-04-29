import { NextResponse } from "next/server";
import { z } from "zod";
import { generateChatReply } from "@/lib/openai";

const chatSchema = z.object({
  message: z.string().trim().min(2).max(900),
  context: z.string().trim().max(2500).optional(),
});

export async function POST(request: Request) {
  try {
    const payload = chatSchema.parse(await request.json());
    const reply = await generateChatReply(payload.message, payload.context);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Escreva sua pergunta com um pouco mais de detalhe." }, { status: 400 });
  }
}
