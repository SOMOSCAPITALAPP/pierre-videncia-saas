import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { recordPixPaymentStatus } from "@/lib/payments";
import { rateLimit, tooManyRequests } from "@/lib/rateLimit";

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

function isValidMercadoPagoSignature(request: Request, paymentId: string) {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";

  const signature = request.headers.get("x-signature") || "";
  const requestId = request.headers.get("x-request-id") || "";
  const parts = Object.fromEntries(signature.split(",").map((part) => part.trim().split("=", 2))) as Record<string, string>;
  const ts = parts.ts;
  const received = parts.v1;
  if (!ts || !received || !requestId || !paymentId) return false;

  const age = Math.abs(Date.now() - Number(ts) * 1000);
  if (!Number.isFinite(age) || age > 5 * 60 * 1000) return false;

  const manifest = `id:${paymentId};request-id:${requestId};ts:${ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(received, "utf8");
  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: Request) {
  const limit = rateLimit(request, "payment-webhook", 60, 10 * 60 * 1000);
  if (!limit.allowed) return tooManyRequests(limit.retryAfter);

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

    if (!isValidMercadoPagoSignature(request, paymentId)) {
      return NextResponse.json({ error: "Webhook não autorizado." }, { status: 401 });
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
