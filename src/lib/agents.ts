import "server-only";
import { createAgentTask, getCrmDashboard, recordEvent, type Lead } from "./crm";
import { firestore } from "./firestore";
import { getPixPaymentStatus } from "./payments";

function offerFor(lead: Lead) {
  return lead.theme === "Amor" ? "Tiragem do Amor" : lead.temperature === "very_hot" ? "Tiragem Completa" : "Pergunta única";
}

export async function runDailyAgents() {
  const data = await getCrmDashboard();
  const db = firestore();
  if (!data || !db) throw new Error("Firestore não configurado.");
  const now = Date.now();
  const today = new Date().toISOString();
  const paidLeads = new Set(data.payments.filter((payment) => payment.status === "approved").map((payment) => payment.leadId));
  let tasks = 0;

  for (const payment of data.payments) {
    if (payment.status !== "pending" || now - Date.parse(payment.createdAt) < 60 * 60 * 1000) continue;
    try {
      const provider = await getPixPaymentStatus(payment.paymentId);
      if (provider.approved) { paidLeads.add(payment.leadId); continue; }
    } catch (error) {
      console.error("[payment agent status failed]", payment.paymentId, error);
      continue;
    }
    await db.collection("payments").doc(payment.paymentId).set({ status: "abandoned" }, { merge: true });
    await recordEvent(payment.leadId, "pix_abandoned", { offerId: payment.offerId });
    const lead = data.leads.find((item) => item.id === payment.leadId);
    if (lead && !paidLeads.has(lead.id)) {
      await createAgentTask(lead.id, "pix_followup", `Olá ${lead.firstName}, aqui é a equipe de Pierre Videncia. Seu Pix para ${payment.offerId} ficou pendente. Se quiser ajuda para concluir sua consulta dentro do app, podemos orientar você.`, today);
      tasks++;
    }
  }

  for (const lead of data.leads) {
    if (paidLeads.has(lead.id) || lead.temperature === "cold" || now - Date.parse(lead.lastActionAt) < 24 * 60 * 60 * 1000) continue;
    await createAgentTask(lead.id, "lead_followup", `Olá ${lead.firstName}, aqui é a equipe de Pierre Videncia. Vimos que você abriu uma leitura sobre ${lead.theme}. Se quiser, podemos orientar você a escolher ${offerFor(lead)} dentro do app.`, today);
    tasks++;
  }

  for (const session of data.sessions) {
    if (session.status !== "active" || Date.parse(session.expiresAt) > now) continue;
    await db.collection("sessions").doc(session.id).set({ status: "completed" }, { merge: true });
    await recordEvent(session.leadId, "premium_chat_completed", {}, session.id);
    await createAgentTask(session.leadId, "session_followup", `Olá ${session.firstName}, aqui é a equipe de Pierre Videncia. Obrigado por sua consulta. Se quiser retomar um ponto da leitura, você pode escolher uma nova sessão dentro do app.`, today);
    tasks++;
  }

  return { leads: data.leads.length, payments: data.payments.length, sessions: data.sessions.length, tasks };
}
