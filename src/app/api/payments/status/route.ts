import { NextResponse } from "next/server";
import { z } from "zod";
import { getPixPaymentStatus } from "@/lib/payments";
import { readToken, signToken, type Access, type Checkout } from "@/lib/premiumAccess";
import { findOfferByTipo } from "@/lib/offers";

const statusSchema = z.object({
  paymentId: z.string().trim().min(1),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const payload = statusSchema.parse({
      paymentId: searchParams.get("paymentId"),
    });
    const checkout = readToken<Checkout>(request, "pierre_checkout");
    if (!checkout || checkout.paymentId !== payload.paymentId) return NextResponse.json({ error: "Pagamento não pertence a esta sessão." }, { status: 403 });
    const payment = await getPixPaymentStatus(payload.paymentId);
    const offer = findOfferByTipo(checkout.offerId);
    const approved = Boolean(payment.approved && offer && payment.leadId === checkout.leadId && payment.offerId === offer.tipo && payment.amount === Number(offer.valor));
    const response = NextResponse.json({ status: payment.status, approved });
    const currentAccess = readToken<Access>(request, "pierre_premium");
    const startedAt = currentAccess?.paymentId === checkout.paymentId ? currentAccess.startedAt : Date.now();
    if (approved) response.cookies.set("pierre_premium", signToken({ ...checkout, startedAt }), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: offer!.durationMinutes * 60,
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Não foi possível verificar o pagamento." }, { status: 400 });
  }
}
