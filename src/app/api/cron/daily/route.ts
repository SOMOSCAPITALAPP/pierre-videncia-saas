import { NextResponse } from "next/server";
import { runDailyAgents } from "@/lib/agents";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  try {
    return NextResponse.json({ ok: true, ...(await runDailyAgents()) });
  } catch (error) {
    console.error("[daily agents failed]", error);
    return NextResponse.json({ error: "Agentes indisponíveis." }, { status: 503 });
  }
}
