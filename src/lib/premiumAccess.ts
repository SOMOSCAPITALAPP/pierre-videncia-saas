import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { findOfferByTipo } from "./offers";
import { firestore } from "./firestore";
import { getCrmSession, type PremiumSession } from "./crm";

export type Access = { paymentId: string; leadId: string; offerId: string; startedAt: number };
export type Checkout = { paymentId: string; leadId: string; offerId: string };

function secret() {
  return process.env.PREMIUM_SESSION_SECRET || process.env.MERCADO_PAGO_ACCESS_TOKEN || "";
}

export function signToken(payload: Access | Checkout) {
  if (!secret()) throw new Error("Chave de sessão premium ausente.");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function readToken<T>(request: Request, name: string): T | null {
  const cookie = request.headers.get("cookie")?.split("; ").find((item) => item.startsWith(`${name}=`))?.slice(name.length + 1);
  if (!cookie || !secret()) return null;
  const [body, signature] = cookie.split(".");
  if (!body || !signature) return null;
  const expected = createHmac("sha256", secret()).update(body).digest();
  const actual = Buffer.from(signature, "base64url");
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
  try { return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T; }
  catch { return null; }
}

export function premiumAccess(request: Request): Access | null {
  const access = readToken<Access>(request, "pierre_premium");
  if (!access || !findOfferByTipo(access.offerId) || !access.paymentId || !access.leadId) return null;
  const offer = findOfferByTipo(access.offerId)!;
  if (!Number.isFinite(access.startedAt) || Date.now() >= access.startedAt + offer.durationMinutes * 60_000) return null;
  return access;
}

export async function ensurePremiumSession(access: Access): Promise<PremiumSession | null> {
  const db = firestore();
  if (!db) return null;
  const existing = await getCrmSession(access.paymentId);
  if (existing) return existing;
  const offer = findOfferByTipo(access.offerId)!;
  const lead = await db.collection("leads").doc(access.leadId).get();
  const previous = await db.collection("sessions").where("leadId", "==", access.leadId).limit(20).get();
  const last = previous.docs.map((item) => item.data() as PremiumSession).sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt))[0];
  const now = new Date().toISOString();
  const session: PremiumSession = {
    id: access.paymentId, leadId: access.leadId, paymentId: access.paymentId, offerId: access.offerId,
    firstName: String(lead.get("firstName") || last?.firstName || ""),
    birthDate: String(lead.get("birthDate") || last?.birthDate || ""),
    theme: String(lead.get("theme") || last?.theme || ""),
    currentQuestion: last?.currentQuestion || "", readings: last?.readings || [],
    clarifications: last?.clarifications || [], summary: last?.summary || "",
    emotionalContext: last?.emotionalContext || "", satisfactionState: "",
    remainingQuestions: offer.maxQuestions, remainingClarifications: offer.tipo === "Premium Mensal" ? 20 : offer.maxQuestions * 2,
    expiresAt: new Date(access.startedAt + offer.durationMinutes * 60_000).toISOString(),
    status: "active", lastMessageAt: now,
  };
  const ref = db.collection("sessions").doc(access.paymentId);
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (snapshot.exists) return snapshot.data() as PremiumSession;
    transaction.set(ref, session);
    return session;
  });
}
