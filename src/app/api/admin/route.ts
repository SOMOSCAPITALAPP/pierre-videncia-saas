import { NextResponse } from "next/server";
import { getAllAdminData } from "@/lib/googleSheets";
import { getLeads, hasSupabaseLeadsConfig } from "@/lib/supabaseLeads";

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }

  const [data, leads] = await Promise.all([getAllAdminData(), getLeads()]);

  return NextResponse.json({
    ...data,
    users: hasSupabaseLeadsConfig() ? leads.map((lead) => ({ ...lead, numero_vida: String(lead.numero_vida) })) : data.users,
    leadSource: hasSupabaseLeadsConfig() ? "supabase" : "google_sheets",
  });
}
