import { NextResponse } from "next/server";
import { ensurePremiumSession, premiumAccess } from "@/lib/premiumAccess";
import { findOfferByTipo } from "@/lib/offers";
import { recordEvent } from "@/lib/crm";

export async function GET(request: Request) {
  const access = premiumAccess(request);
  if (!access) return NextResponse.json({ error: "Consulta premium indisponível." }, { status: 401 });
  const session = await ensurePremiumSession(access);
  if (session) await recordEvent(access.leadId, "premium_chat_started", {}, session.id);
  return NextResponse.json({ access, session, offer: findOfferByTipo(access.offerId) });
}
