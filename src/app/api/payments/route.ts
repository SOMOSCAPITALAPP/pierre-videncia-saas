import { NextResponse } from "next/server";
import { z } from "zod";
import { appendSheetRow } from "@/lib/googleSheets";

const paymentSchema = z.object({
  userId: z.string().min(1),
  valor: z.string().min(1),
  tipo: z.string().min(1),
  status: z.enum(["pendente", "confirmado", "cancelado"]).default("pendente"),
});

export async function POST(request: Request) {
  try {
    const payload = paymentSchema.parse(await request.json());

    await appendSheetRow("pagamentos", [payload.userId, payload.valor, payload.tipo, payload.status]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Pagamento inválido." }, { status: 400 });
  }
}
