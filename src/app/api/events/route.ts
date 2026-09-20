import { NextResponse } from "next/server";
import { z } from "zod";
import { recordEvent } from "@/lib/crm";

const eventSchema = z.object({
  leadId: z.string().uuid(),
  type: z.enum(["offer_page_viewed", "offer_clicked", "whatsapp_clicked", "upsell_clicked"]),
  offerId: z.string().max(120).optional(),
});

export async function POST(request: Request) {
  const parsed = eventSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Evento inválido." }, { status: 400 });
  await recordEvent(parsed.data.leadId, parsed.data.type, parsed.data.offerId ? { offerId: parsed.data.offerId } : {});
  return NextResponse.json({ ok: true });
}
