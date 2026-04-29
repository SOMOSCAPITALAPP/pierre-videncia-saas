import { NextResponse } from "next/server";
import { z } from "zod";
import { createPixPayment } from "@/lib/payments";

const createPaymentSchema = z.object({
  userId: z.string().trim().min(1),
  nome: z.string().trim().max(80).optional(),
  email: z.string().trim().email().optional(),
  valor: z.string().trim().min(1),
  tipo: z.string().trim().min(1).max(120),
});

export async function POST(request: Request) {
  try {
    const payload = createPaymentSchema.parse(await request.json());
    const payment = await createPixPayment(payload);

    return NextResponse.json(payment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível iniciar o pagamento Pix." }, { status: 400 });
  }
}
