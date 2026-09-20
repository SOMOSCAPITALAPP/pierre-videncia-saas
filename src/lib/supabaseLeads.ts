export type LeadRow = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  tema: string;
  pergunta: string;
  tipo: string;
  signo: string;
  numero_vida: number;
  created_at: string;
};

export type ConsultationRow = {
  id?: string;
  user_id: string;
  pergunta: string;
  tema: string;
  numero: number;
  cartas: string;
  resposta: string;
  tipo: string;
  created_at: string;
};

export type PaymentRow = {
  id?: string;
  user_id: string;
  valor: string;
  tipo: string;
  status: string;
  payment_id: string;
  created_at: string;
  email?: string;
  nome?: string;
};

type SaveLeadInput = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  tema: string;
  pergunta: string;
  tipo: string;
  signo: string;
  numeroVida: number;
  createdAt: string;
};

type SaveConsultationInput = {
  userId: string;
  pergunta: string;
  tema: string;
  numero: number;
  cartas: string;
  resposta: string;
  tipo: string;
  createdAt: string;
};

type SavePaymentInput = {
  userId: string;
  valor: string;
  tipo: string;
  status: string;
  paymentId?: string;
  createdAt: string;
  email?: string;
  nome?: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const leadsTable = process.env.SUPABASE_LEADS_TABLE || "leads";
  const consultationsTable = process.env.SUPABASE_CONSULTATIONS_TABLE || "consultations";
  const paymentsTable = process.env.SUPABASE_PAYMENTS_TABLE || "payments";

  if (!url || !serviceRoleKey) return null;

  return { url, serviceRoleKey, leadsTable, consultationsTable, paymentsTable };
}

export function hasSupabaseLeadsConfig() {
  return Boolean(getSupabaseConfig());
}

export async function saveLead(input: SaveLeadInput) {
  const config = getSupabaseConfig();

  if (!config) {
    console.info("[supabase leads disabled]", input.id);
    return;
  }

  const response = await fetch(`${config.url}/rest/v1/${config.leadsTable}`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      id: input.id,
      nome: input.nome,
      email: input.email,
      whatsapp: input.whatsapp,
      tema: input.tema,
      pergunta: input.pergunta,
      tipo: input.tipo,
      signo: input.signo,
      numero_vida: input.numeroVida,
      created_at: input.createdAt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[supabase lead insert failed]", errorText);
  }
}

export async function getLeads() {
  const config = getSupabaseConfig();

  if (!config) return [];

  const response = await fetch(`${config.url}/rest/v1/${config.leadsTable}?select=*&order=created_at.desc`, {
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[supabase leads read failed]", errorText);
    return [];
  }

  return (await response.json()) as LeadRow[];
}

export async function saveConsultation(input: SaveConsultationInput) {
  const config = getSupabaseConfig();

  if (!config) {
    console.info("[supabase consultations disabled]", input.userId);
    return;
  }

  const response = await fetch(`${config.url}/rest/v1/${config.consultationsTable}`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: input.userId,
      pergunta: input.pergunta,
      tema: input.tema,
      numero: input.numero,
      cartas: input.cartas,
      resposta: input.resposta,
      tipo: input.tipo,
      created_at: input.createdAt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[supabase consultation insert failed]", errorText);
  }
}

export async function getConsultations() {
  const config = getSupabaseConfig();

  if (!config) return [];

  const response = await fetch(`${config.url}/rest/v1/${config.consultationsTable}?select=*&order=created_at.desc`, {
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[supabase consultations read failed]", errorText);
    return [];
  }

  return (await response.json()) as ConsultationRow[];
}

export async function savePayment(input: SavePaymentInput) {
  const config = getSupabaseConfig();
  const paymentId = input.paymentId || `manual-${input.userId}-${input.createdAt}`;

  if (!config) {
    console.info("[supabase payments disabled]", paymentId);
    return;
  }

  const response = await fetch(`${config.url}/rest/v1/${config.paymentsTable}?on_conflict=payment_id`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      user_id: input.userId,
      valor: input.valor,
      tipo: input.tipo,
      status: input.status,
      payment_id: paymentId,
      email: input.email || "",
      nome: input.nome || "",
      created_at: input.createdAt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[supabase payment insert failed]", errorText);
  }
}

export async function getPayments() {
  const config = getSupabaseConfig();

  if (!config) return [];

  const response = await fetch(`${config.url}/rest/v1/${config.paymentsTable}?select=*&order=created_at.desc`, {
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[supabase payments read failed]", errorText);
    return [];
  }

  return (await response.json()) as PaymentRow[];
}
