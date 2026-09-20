import { NextResponse } from "next/server";
import { z } from "zod";
import { createPixPayment } from "@/lib/payments";
import { findOfferByTipo } from "@/lib/offers";
import { signToken } from "@/lib/premiumAccess";
import { ensureCheckoutLead } from "@/lib/crm";

const createPaymentSchema = z.object({
  userId: z.string().trim().min(1),
  nome: z.string().trim().max(80).optional(),
  email: z.string().trim().email().optional(),
  tipo: z.string().trim().min(1).max(120),
});

export async function POST(request: Request) {
  try {
    const payload = createPaymentSchema.parse(await request.json());
    const offer = findOfferByTipo(payload.tipo);
    if (!offer) return NextResponse.json({ error: "Consulta inválida." }, { status: 400 });
    await ensureCheckoutLead(payload.userId, payload.nome || "Consulente", payload.email || "").catch((error) => console.error("[checkout lead failed]", error));
    const payment = await createPixPayment({ ...payload, valor: offer.valor });

    const response = NextResponse.json(payment);
    if (payment.mode === "mercado_pago") response.cookies.set("pierre_checkout", signToken({ paymentId: payment.paymentId, leadId: payload.userId, offerId: offer.tipo }), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível iniciar o pagamento Pix." }, { status: 400 });
  }
}
