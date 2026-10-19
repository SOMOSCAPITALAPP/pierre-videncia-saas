import { NextResponse } from "next/server";
import { getSheetRows, rowsToCsv } from "@/lib/googleSheets";
import { getConsultations, getLeads, getPayments, hasSupabaseLeadsConfig } from "@/lib/supabaseLeads";

const allowedSheets = ["users", "consultas", "pagamentos"] as const;

export async function POST(request: Request) {
  const { password, sheet } = (await request.json().catch(() => ({}))) as {
    password?: string;
    sheet?: string;
  };

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }

  if (!sheet || !allowedSheets.includes(sheet as (typeof allowedSheets)[number])) {
    return NextResponse.json({ error: "Aba inválida." }, { status: 400 });
  }

  const useSupabase = hasSupabaseLeadsConfig();
  const rows =
    sheet === "users" && useSupabase
      ? (await getLeads()).map((lead) => ({ ...lead, numero_vida: String(lead.numero_vida) }))
      : sheet === "consultas" && useSupabase
        ? (await getConsultations()).map((consultation) => ({ ...consultation, numero: String(consultation.numero) }))
        : sheet === "pagamentos" && useSupabase
          ? await getPayments()
          : await getSheetRows(sheet as (typeof allowedSheets)[number]);
  const csv = rowsToCsv(rows);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${sheet}.csv"`,
    },
  });
}
