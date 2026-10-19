import { NextResponse } from "next/server";
import { z } from "zod";
import { recordAnonymousEvent } from "@/lib/crm";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";

const eventSchema = z.object({
  leadId: z.string().uuid().optional(),
  sessionId: z.string().uuid().optional(),
  type: z.enum([
    "consultation_clicked",
    "free_reading_generated",
    "offer_page_viewed",
    "offer_clicked",
    "whatsapp_clicked",
    "share_clicked",
    "copy_link_clicked",
    "upsell_clicked",
    "premium_chat_started",
  ]),
  offerId: z.string().max(120).optional(),
  path: z.string().max(240).optional(),
  channel: z.string().max(80).optional(),
});

export async function POST(request: Request) {
  const limit = rateLimit(request, "events", 120, 10 * 60 * 1000);
  if (!limit.allowed) return tooManyRequests(limit.retryAfter);

  const parsed = eventSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Evento inválido." }, { status: 400 });

  const { leadId, sessionId, type, offerId, path, channel } = parsed.data;
  const metadata = Object.fromEntries(
    Object.entries({ offerId, path, channel }).filter(([, value]) => value !== undefined),
  ) as Record<string, string>;

  await recordAnonymousEvent(type, metadata, sessionId, leadId);
  return NextResponse.json({ ok: true });
}
