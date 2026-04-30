import { NextResponse } from "next/server";
import { recordPixPaymentStatus } from "@/lib/payments";

type MercadoPagoWebhookBody = {
  type?: string;
  topic?: string;
  action?: string;
  data?: {
    id?: string | number;
  };
  id?: string | number;
};

function getPaymentId(request: Request, body: MercadoPagoWebhookBody) {
  const url = new URL(request.url);
  const queryId = url.searchParams.get("data.id") || url.searchParams.get("id");
  const bodyId = body.data?.id || body.id;

  return String(queryId || bodyId || "");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as MercadoPagoWebhookBody;
    const paymentId = getPaymentId(request, body);
    const topic = body.type || body.topic || new URL(request.url).searchParams.get("topic");

    if (topic && topic !== "payment") {
      return NextResponse.json({ ok: true, ignored: topic });
    }

    if (!paymentId) {
      return NextResponse.json({ ok: true, ignored: "missing_payment_id" });
    }

    const payment = await recordPixPaymentStatus(paymentId);

    return NextResponse.json({ ok: true, paymentId, status: payment.status, approved: payment.approved });
  } catch (error) {
    console.error("[mercado pago webhook failed]", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({
    ok: true,
    endpoint: new URL(request.url).pathname,
  });
}
