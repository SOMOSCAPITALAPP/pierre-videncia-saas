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

export type PixPaymentStatus = {
  status: string;
  approved: boolean;
};

function getAppBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const vercelUrl = process.env.VERCEL_URL;
  const baseUrl = configuredUrl || vercelProductionUrl || vercelUrl;

  if (!baseUrl) return "";

  return baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
}

function getPaymentNotificationUrl() {
  const baseUrl = getAppBaseUrl();

  if (!baseUrl) return undefined;

  return `${baseUrl}/api/payments/webhook?source_news=webhooks`;
}

export async function createPixPayment(input: CreatePixPaymentInput): Promise<PixPaymentResult> {
  const amount = Number(input.valor);
  const now = new Date().toISOString();

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Valor inválido.");
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  const notificationUrl = getPaymentNotificationUrl();

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
      external_reference: input.userId,
      notification_url: notificationUrl,
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

export async function getPixPaymentStatus(paymentId: string): Promise<PixPaymentStatus> {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("Mercado Pago nÃ£o configurado.");
  }

  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = (await response.json()) as {
    status?: string;
    transaction_amount?: number;
    external_reference?: string;
    description?: string;
    message?: string;
  };

  if (!response.ok) {
    console.error("[mercado pago status failed]", data);
    throw new Error("NÃ£o foi possÃ­vel verificar o pagamento.");
  }

  const status = data.status || "pending";

  return {
    status,
    approved: status === "approved",
  };
}

export async function recordPixPaymentStatus(paymentId: string) {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("Mercado Pago nao configurado.");
  }

  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = (await response.json()) as {
    status?: string;
    transaction_amount?: number;
    external_reference?: string;
    description?: string;
    date_approved?: string;
    date_created?: string;
  };

  if (!response.ok) {
    console.error("[mercado pago webhook fetch failed]", data);
    throw new Error("Nao foi possivel consultar o pagamento.");
  }

  const now = new Date().toISOString();
  const tipo = data.description?.replace("Pierre Videncia - ", "") || "Consulta premium";

  await appendSheetRow("pagamentos", [
    data.external_reference || "sem_user_id",
    String(data.transaction_amount || ""),
    tipo,
    `webhook_${data.status || "unknown"}`,
    paymentId,
    data.date_approved || data.date_created || now,
  ]);

  return {
    status: data.status || "unknown",
    approved: data.status === "approved",
  };
}
