import { appendSheetRow } from "./googleSheets";

export type CreatePixPaymentInput = {
  userId: string;
  nome?: string;
  email?: string;
  valor: string;
  tipo: string;
};

export type PixPaymentResult =
  | {
      mode: "mercado_pago";
      status: string;
      paymentId: string;
      qrCode?: string;
      qrCodeBase64?: string;
      ticketUrl?: string;
    }
  | {
      mode: "manual";
      status: "pendente";
    };

export async function createPixPayment(input: CreatePixPaymentInput): Promise<PixPaymentResult> {
  const amount = Number(input.valor);
  const now = new Date().toISOString();

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Valor inválido.");
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    await appendSheetRow("pagamentos", [input.userId, input.valor, input.tipo, "pendente_manual"]);
    return { mode: "manual", status: "pendente" };
  }

  const response = await fetch("https://api.mercadopago.com/v1/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      transaction_amount: amount,
      description: `Pierre Videncia - ${input.tipo}`,
      payment_method_id: "pix",
      payer: {
        email: input.email || "cliente@pierrevidencia.com",
        first_name: input.nome || "Consulente",
      },
    }),
  });

  const data = (await response.json()) as {
    id?: string | number;
    status?: string;
    point_of_interaction?: {
      transaction_data?: {
        qr_code?: string;
        qr_code_base64?: string;
        ticket_url?: string;
      };
    };
    message?: string;
  };

  if (!response.ok || !data.id) {
    console.error("[mercado pago pix failed]", data);
    await appendSheetRow("pagamentos", [input.userId, input.valor, input.tipo, "pendente_manual"]);
    return { mode: "manual", status: "pendente" };
  }

  await appendSheetRow("pagamentos", [
    input.userId,
    input.valor,
    input.tipo,
    `mercado_pago_${data.status || "pending"}`,
    String(data.id),
    now,
  ]);

  return {
    mode: "mercado_pago",
    status: data.status || "pending",
    paymentId: String(data.id),
    qrCode: data.point_of_interaction?.transaction_data?.qr_code,
    qrCodeBase64: data.point_of_interaction?.transaction_data?.qr_code_base64,
    ticketUrl: data.point_of_interaction?.transaction_data?.ticket_url,
  };
}
