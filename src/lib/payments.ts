import { appendSheetRow } from "./googleSheets";
import { savePayment } from "./supabaseLeads";
import { saveCrmPayment } from "./crm";
import { findOfferByTipo } from "./offers";

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
  leadId: string;
  offerId: string;
  amount: number;
};

export type MercadoPagoAdminPayment = {
  user_id: string;
  valor: string;
  tipo: string;
  status: string;
  payment_id: string;
  created_at: string;
  email: string;
  nome: string;
};

function getAppBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL;
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const vercelUrl = process.env.VERCEL_URL;
  const baseUrl = process.env.VERCEL_ENV === "preview" ? vercelUrl || configuredUrl : configuredUrl || vercelProductionUrl || vercelUrl;

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
  const offer = findOfferByTipo(input.tipo);

  if (!offer || input.valor !== offer.valor || !Number.isFinite(amount) || amount <= 0) {
    throw new Error("Valor inválido.");
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  const notificationUrl = getPaymentNotificationUrl();

  if (!accessToken) {
    await Promise.all([
      appendSheetRow("pagamentos", [input.userId, input.valor, input.tipo, "pendente_manual"]),
      savePayment({
        userId: input.userId,
        valor: input.valor,
        tipo: input.tipo,
        status: "pendente_manual",
        createdAt: now,
        email: input.email,
        nome: input.nome,
      }),
    ]);
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
    await Promise.all([
      appendSheetRow("pagamentos", [input.userId, input.valor, input.tipo, "pendente_manual"]),
      savePayment({
        userId: input.userId,
        valor: input.valor,
        tipo: input.tipo,
        status: "pendente_manual",
        createdAt: now,
        email: input.email,
        nome: input.nome,
      }),
    ]);
    return { mode: "manual", status: "pendente" };
  }

  await Promise.all([
    appendSheetRow("pagamentos", [
      input.userId,
      input.valor,
      input.tipo,
      `mercado_pago_${data.status || "pending"}`,
      String(data.id),
      now,
    ]),
    savePayment({
      userId: input.userId,
      valor: input.valor,
      tipo: input.tipo,
      status: `mercado_pago_${data.status || "pending"}`,
      paymentId: String(data.id),
      createdAt: now,
      email: input.email,
      nome: input.nome,
    }),
    saveCrmPayment({
      id: String(data.id), leadId: input.userId, paymentId: String(data.id),
      offerId: offer.tipo, amount, status: data.status || "pending", provider: "mercado_pago",
      createdAt: now, approvedAt: null,
    }).catch((error) => console.error("[crm payment failed]", error)),
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
    throw new Error("Mercado Pago não configurado.");
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
    throw new Error("Não foi possível verificar o pagamento.");
  }

  const status = data.status || "pending";
  const offerId = data.description?.replace("Pierre Videncia - ", "") || "";
  if (status === "approved" && data.external_reference && findOfferByTipo(offerId)) {
    await saveCrmPayment({
      id: paymentId, leadId: data.external_reference, paymentId,
      offerId, amount: Number(data.transaction_amount || 0), status,
      provider: "mercado_pago", createdAt: new Date().toISOString(), approvedAt: new Date().toISOString(),
    }).catch((error) => console.error("[crm payment status failed]", error));
  }

  return {
    status,
    approved: status === "approved",
    leadId: data.external_reference || "",
    offerId,
    amount: Number(data.transaction_amount || 0),
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
  const offer = findOfferByTipo(tipo);

  await Promise.all([
    appendSheetRow("pagamentos", [
      data.external_reference || "sem_user_id",
      String(data.transaction_amount || ""),
      tipo,
      `webhook_${data.status || "unknown"}`,
      paymentId,
      data.date_approved || data.date_created || now,
    ]),
    savePayment({
      userId: data.external_reference || "sem_user_id",
      valor: String(data.transaction_amount || ""),
      tipo,
      status: `webhook_${data.status || "unknown"}`,
      paymentId,
      createdAt: data.date_approved || data.date_created || now,
    }),
    ...(offer && data.external_reference ? [saveCrmPayment({
      id: paymentId, leadId: data.external_reference, paymentId,
      offerId: offer.tipo, amount: Number(data.transaction_amount || 0),
      status: data.status || "unknown", provider: "mercado_pago",
      createdAt: data.date_created || now, approvedAt: data.status === "approved" ? data.date_approved || now : null,
    }).catch((error) => console.error("[crm webhook failed]", error))] : []),
  ]);

  return {
    status: data.status || "unknown",
    approved: data.status === "approved",
  };
}

export async function getRecentMercadoPagoPayments(limit = 50): Promise<MercadoPagoAdminPayment[]> {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return [];
  }

  const searchParams = new URLSearchParams({
    sort: "date_created",
    criteria: "desc",
    limit: String(limit),
  });

  const response = await fetch(`https://api.mercadopago.com/v1/payments/search?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = (await response.json()) as {
    results?: Array<{
      id?: string | number;
      status?: string;
      transaction_amount?: number;
      external_reference?: string;
      description?: string;
      date_created?: string;
      date_approved?: string;
      payer?: {
        email?: string;
        first_name?: string;
        last_name?: string;
      };
    }>;
    message?: string;
  };

  if (!response.ok) {
    console.error("[mercado pago admin search failed]", data);
    return [];
  }

  return (data.results || []).map((payment) => ({
    user_id: payment.external_reference || "",
    valor: String(payment.transaction_amount || ""),
    tipo: payment.description?.replace("Pierre Videncia - ", "") || "Consulta premium",
    status: `mercado_pago_${payment.status || "unknown"}`,
    payment_id: String(payment.id || ""),
    created_at: payment.date_approved || payment.date_created || "",
    email: payment.payer?.email || "",
    nome: [payment.payer?.first_name, payment.payer?.last_name].filter(Boolean).join(" "),
  }));
}
