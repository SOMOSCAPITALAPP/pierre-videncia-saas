import { NextResponse } from "next/server";
import { getAllAdminData } from "@/lib/googleSheets";
import { getRecentMercadoPagoPayments } from "@/lib/payments";
import { getConsultations, getLeads, getPayments, hasSupabaseLeadsConfig } from "@/lib/supabaseLeads";
import { getCrmDashboard } from "@/lib/crm";

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }

  const [data, leads, consultations, supabasePayments, mercadoPagoPayments, crm] = await Promise.all([
    getAllAdminData(),
    getLeads(),
    getConsultations(),
    getPayments(),
    getRecentMercadoPagoPayments(),
    getCrmDashboard(),
  ]);
  const useSupabase = hasSupabaseLeadsConfig();
  const payments = useSupabase && supabasePayments.length ? supabasePayments : data.pagamentos.length ? data.pagamentos : mercadoPagoPayments;
  const hasCrmLeads = Boolean(crm?.leads.length);
  const hasCrmPayments = Boolean(crm?.payments.length);

  return NextResponse.json({
    ...data,
    users: hasCrmLeads && crm ? crm.leads.map((lead) => ({
      id: lead.id, nome: lead.firstName, email: lead.email, whatsapp: lead.whatsapp,
      tema: lead.theme, pergunta: lead.question, status: lead.status,
      temperatura: lead.temperature, score: String(lead.score), created_at: lead.createdAt,
    })) : useSupabase ? leads.map((lead) => ({ ...lead, numero_vida: String(lead.numero_vida) })) : data.users,
    consultas: useSupabase ? consultations.map((consultation) => ({ ...consultation, numero: String(consultation.numero) })) : data.consultas,
    pagamentos: hasCrmPayments && crm ? crm.payments.map((payment) => ({
      user_id: payment.leadId, valor: String(payment.amount), tipo: payment.offerId,
      status: payment.status, payment_id: payment.paymentId, created_at: payment.createdAt,
    })) : payments,
    crm,
    leadSource: hasCrmLeads ? "firestore" : useSupabase ? "supabase" : "google_sheets",
    paymentSource: hasCrmPayments ? "firestore" : useSupabase && supabasePayments.length ? "supabase" : data.pagamentos.length ? "google_sheets" : "mercado_pago",
  });
}
