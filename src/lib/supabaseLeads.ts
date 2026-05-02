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

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_LEADS_TABLE || "leads";

  if (!url || !serviceRoleKey) return null;

  return { url, serviceRoleKey, table };
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

  const response = await fetch(`${config.url}/rest/v1/${config.table}`, {
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

  const response = await fetch(`${config.url}/rest/v1/${config.table}?select=*&order=created_at.desc`, {
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
