import { NextResponse } from "next/server";
import { getAllAdminData } from "@/lib/googleSheets";

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }

  const data = await getAllAdminData();
  return NextResponse.json(data);
}
