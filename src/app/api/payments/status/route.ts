import { NextResponse } from "next/server";
import { z } from "zod";
import { getPixPaymentStatus } from "@/lib/payments";

const statusSchema = z.object({
  paymentId: z.string().trim().min(1),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const payload = statusSchema.parse({
      paymentId: searchParams.get("paymentId"),
    });
    const payment = await getPixPaymentStatus(payload.paymentId);

    return NextResponse.json(payment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "NÃ£o foi possÃ­vel verificar o pagamento." }, { status: 400 });
  }
}
