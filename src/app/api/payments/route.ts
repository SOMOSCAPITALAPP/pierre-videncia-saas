import { NextResponse } from "next/server";
import { z } from "zod";
import { recordPixPaymentStatus } from "@/lib/payments";

const schema = z.object({
  password: z.string().min(1),
  paymentId: z.string().regex(/^\d+$/),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !process.env.ADMIN_PASSWORD || parsed.data.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  try {
    return NextResponse.json(await recordPixPaymentStatus(parsed.data.paymentId));
  } catch (error) {
    console.error("[payment sync failed]", error);
    return NextResponse.json({ error: "Não foi possível consultar o pagamento." }, { status: 502 });
  }
}
