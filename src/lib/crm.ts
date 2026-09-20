import "server-only";
import { firestore } from "./firestore";

export type FunnelEvent =
  | "lead_created" | "free_reading_started" | "free_reading_completed"
  | "offer_page_viewed" | "offer_clicked" | "pix_created" | "pix_paid"
  | "pix_abandoned" | "premium_chat_started" | "premium_chat_message"
  | "premium_chat_completed" | "upsell_clicked" | "whatsapp_clicked" | "email_sent";

export type Lead = {
  id: string; firstName: string; birthDate: string; email: string; whatsapp: string;
  theme: string; question: string; source: string; status: string;
  score: number; temperature: "cold" | "warm" | "hot" | "very_hot";
  createdAt: string; updatedAt: string; lastActionAt: string;
};

export type Payment = {
  id: string; leadId: string; paymentId: string; offerId: string;
  amount: number; status: string; provider: "mercado_pago";
  createdAt: string; approvedAt: string | null;
};

export type PremiumSession = {
  id: string; leadId: string; paymentId: string; offerId: string;
  firstName: string; birthDate: string; theme: string; currentQuestion: string;
  readings: Array<{ question: string; cards: string[]; answer: string; createdAt: string }>;
  clarifications: Array<{ message: string; answer: string; counted: boolean; createdAt: string }>;
  summary: string; emotionalContext: string; satisfactionState: string;
  remainingQuestions: number; remainingClarifications: number;
  expiresAt: string; status: "active" | "completed";
  lastMessageAt: string;
};

const weights: Partial<Record<FunnelEvent, number>> = {
  free_reading_completed: 10, offer_page_viewed: 8, offer_clicked: 12,
  pix_created: 25, pix_abandoned: 10, whatsapp_clicked: 8,
  premium_chat_started: 5, upsell_clicked: 12,
};

export function temperature(score: number): Lead["temperature"] {
  return score >= 65 ? "very_hot" : score >= 35 ? "hot" : score >= 15 ? "warm" : "cold";
}

export function initialScore(theme: string, question: string) {
  const urgent = /urgente|hoje|agora|preciso|sofr|medo|decid|separ|perd/i.test(question);
  return Math.min(30, (theme === "Amor" || theme === "Dinheiro" ? 10 : 5) + (urgent ? 12 : 0) + (question.length > 80 ? 5 : 0));
}

export async function saveCrmLead(input: Omit<Lead, "score" | "temperature" | "status" | "updatedAt" | "lastActionAt">) {
  const db = firestore();
  if (!db) return;
  const score = initialScore(input.theme, input.question);
  await db.collection("leads").doc(input.id).set({
    ...input, status: "new", score, temperature: temperature(score),
    updatedAt: input.createdAt, lastActionAt: input.createdAt,
  } satisfies Lead, { merge: true });
  await recordEvent(input.id, "lead_created", { source: input.source });
}

export async function ensureCheckoutLead(id: string, name: string, email: string) {
  const db = firestore();
  if (!db) return;
  const ref = db.collection("leads").doc(id);
  if ((await ref.get()).exists) return;
  const now = new Date().toISOString();
  await saveCrmLead({
    id, firstName: name.trim().split(/\s+/)[0] || "Consulente", birthDate: "",
    email, whatsapp: "", theme: "", question: "", source: "checkout", createdAt: now,
  });
}

export async function recordEvent(leadId: string, type: FunnelEvent, metadata: Record<string, string | number | boolean> = {}, sessionId?: string) {
  const db = firestore();
  if (!db || !leadId) return;
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.collection("events").doc(id).set({ id, leadId, sessionId: sessionId || null, type, metadata, createdAt: now });
  const leadRef = db.collection("leads").doc(leadId);
  const lead = await leadRef.get();
  if (!lead.exists) return;
  const previous = Number(lead.get("score") || 0);
  const score = Math.min(100, previous + (weights[type] || 0));
  await leadRef.set({ score, temperature: temperature(score), lastActionAt: now, updatedAt: now }, { merge: true });
}

export async function saveCrmPayment(payment: Payment) {
  const db = firestore();
  if (!db) return;
  const ref = db.collection("payments").doc(payment.paymentId);
  const previous = await ref.get();
  await ref.set({ ...payment, createdAt: previous.get("createdAt") || payment.createdAt }, { merge: true });
  if (payment.leadId) {
    if (!previous.exists || (payment.status === "approved" && previous.get("status") !== "approved")) {
      await recordEvent(payment.leadId, payment.status === "approved" ? "pix_paid" : "pix_created", { offerId: payment.offerId, amount: payment.amount });
    }
    if (payment.status === "approved") {
      await db.collection("leads").doc(payment.leadId).set({ status: "paid", updatedAt: new Date().toISOString() }, { merge: true });
    }
  }
}

export async function getCrmSession(paymentId: string): Promise<PremiumSession | null> {
  const db = firestore();
  if (!db) return null;
  const snapshot = await db.collection("sessions").doc(paymentId).get();
  return snapshot.exists ? snapshot.data() as PremiumSession : null;
}

export async function appendCrmReading(id: string, reading: PremiumSession["readings"][number], details: {
  theme: string; birthDate: string; firstName: string;
}): Promise<PremiumSession | null> {
  const db = firestore();
  if (!db) return null;
  const ref = db.collection("sessions").doc(id);
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) return null;
    const session = snapshot.data() as PremiumSession;
    if (session.status !== "active" || session.remainingQuestions <= 0 || Date.parse(session.expiresAt) <= Date.now()) return null;
    const updated: PremiumSession = {
      ...session, ...details, currentQuestion: reading.question,
      readings: [...session.readings, reading], summary: reading.answer.slice(0, 2500),
      remainingQuestions: session.remainingQuestions - 1, lastMessageAt: reading.createdAt,
    };
    transaction.set(ref, updated);
    return updated;
  });
}

export async function appendCrmClarification(id: string, item: PremiumSession["clarifications"][number], emotionalContext: string): Promise<PremiumSession | null> {
  const db = firestore();
  if (!db) return null;
  const ref = db.collection("sessions").doc(id);
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) return null;
    const session = snapshot.data() as PremiumSession;
    if (session.status !== "active" || (item.counted && session.remainingClarifications <= 0) || Date.parse(session.expiresAt) <= Date.now()) return null;
    const updated: PremiumSession = {
      ...session,
      clarifications: [...session.clarifications, item],
      remainingClarifications: session.remainingClarifications - (item.counted ? 1 : 0),
      emotionalContext: emotionalContext || session.emotionalContext,
      satisfactionState: /obrigad|me ajudou|estou satisfeit|entendi/i.test(item.message) ? "satisfied" : session.satisfactionState,
      summary: `${session.readings.at(-1)?.answer.slice(0, 1500) || ""}\nÚltimo esclarecimento: ${item.answer.slice(0, 900)}`,
      lastMessageAt: item.createdAt,
    };
    transaction.set(ref, updated);
    return updated;
  });
}

export async function getCrmDashboard() {
  const db = firestore();
  if (!db) return null;
  const [leads, payments, sessions, tasks] = await Promise.all([
    db.collection("leads").orderBy("createdAt", "desc").limit(300).get(),
    db.collection("payments").orderBy("createdAt", "desc").limit(300).get(),
    db.collection("sessions").orderBy("lastMessageAt", "desc").limit(300).get(),
    db.collection("agent_tasks").orderBy("createdAt", "desc").limit(100).get(),
  ]);
  return {
    leads: leads.docs.map((doc) => doc.data() as Lead),
    payments: payments.docs.map((doc) => doc.data() as Payment),
    sessions: sessions.docs.map((doc) => doc.data() as PremiumSession),
    tasks: tasks.docs.map((doc) => doc.data()),
  };
}

export async function createAgentTask(leadId: string, type: string, message: string, dueAt: string) {
  const db = firestore();
  if (!db) return;
  const id = `${leadId}-${type}-${dueAt.slice(0, 10)}`;
  await db.collection("agent_tasks").doc(id).set({
    id, leadId, type, message, dueAt, status: "pending",
    createdAt: new Date().toISOString(),
  }, { merge: true });
}
