"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Copy, Loader2 } from "lucide-react";
import { getOfferByTipo } from "@/lib/offers";

type PixPaymentBoxProps = {
  valor: string;
  tipo: string;
};

type PaymentState =
  | { status: "loading" }
  | {
      status: "mercado_pago";
      paymentId: string;
      paymentStatus: string;
      qrCode?: string;
      qrCodeBase64?: string;
    }
  | { status: "approved"; paymentId: string }
  | { status: "error"; message: string };

function getCheckoutUser() {
  const storedReading = sessionStorage.getItem("pierre-reading");

  if (storedReading) {
    try {
      const reading = JSON.parse(storedReading) as { user?: { id?: string; nome?: string; email?: string } };
      if (reading.user?.id) return reading.user;
    } catch {
      // A leitura gratuita nao e obrigatoria para comprar uma consulta.
    }
  }

  const storedUser = sessionStorage.getItem("pierre-checkout-user");

  if (storedUser) {
    try {
      return JSON.parse(storedUser) as { id: string; nome?: string; email?: string };
    } catch {
      sessionStorage.removeItem("pierre-checkout-user");
    }
  }

  const user = {
    id: `direct-${Date.now()}-${crypto.randomUUID()}`,
    nome: "Consulente",
    email: `cliente-${Date.now()}@pierrevidencia.com`,
  };

  sessionStorage.setItem("pierre-checkout-user", JSON.stringify(user));
  return user;
}

export function PixPaymentBox({ valor, tipo }: PixPaymentBoxProps) {
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentState>({ status: "loading" });
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);

  function unlockPremiumChat(paymentId: string) {
    const offer = getOfferByTipo(tipo);
    sessionStorage.setItem("pierre-premium-chat", "1");
    sessionStorage.setItem("pierre-premium-payment-id", paymentId);
    sessionStorage.setItem(
      "pierre-premium-plan",
      JSON.stringify({
        tipo: offer.tipo,
        maxQuestions: offer.maxQuestions,
        durationMinutes: offer.durationMinutes,
        startedAt: Date.now(),
      }),
    );
    sessionStorage.setItem(`pierre-premium-questions-${offer.tipo}`, "0");
  }

  async function checkPayment(paymentId: string, redirect = false) {
    setChecking(true);

    try {
      const response = await fetch(`/api/payments/status?paymentId=${encodeURIComponent(paymentId)}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as { status?: string; approved?: boolean; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Nao foi possivel verificar o pagamento.");
      }

      if (data.approved) {
        unlockPremiumChat(paymentId);
        setPayment({ status: "approved", paymentId });
        router.replace("/chat");
        return;
      }

      setPayment((current) =>
        current.status === "mercado_pago"
          ? {
              ...current,
              paymentStatus: data.status || current.paymentStatus,
            }
          : current,
      );

      if (redirect) {
        setPayment((current) =>
          current.status === "mercado_pago"
            ? {
                ...current,
                paymentStatus: data.status || "pending",
              }
            : current,
        );
      }
    } catch (error) {
      setPayment({
        status: "error",
        message: error instanceof Error ? error.message : "Nao foi possivel verificar o pagamento.",
      });
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    const user = getCheckoutUser();

    fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, nome: user.nome, email: user.email, valor, tipo }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mode === "mercado_pago" && data.paymentId) {
          setPayment({
            status: "mercado_pago",
            paymentId: data.paymentId,
            paymentStatus: data.status || "pending",
            qrCode: data.qrCode,
            qrCodeBase64: data.qrCodeBase64,
          });
          return;
        }

        setPayment({
          status: "error",
          message: "O pagamento automatico esta temporariamente indisponivel. Tente novamente em instantes.",
        });
      })
      .catch(() =>
        setPayment({
          status: "error",
          message: "O pagamento automatico esta temporariamente indisponivel. Tente novamente em instantes.",
        }),
      );
  }, [tipo, valor]);

  useEffect(() => {
    if (payment.status !== "mercado_pago") return;

    const interval = window.setInterval(() => {
      void checkPayment(payment.paymentId);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [payment]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.16em] text-[#d9aa4f]">valor</p>
      <p className="mt-2 text-4xl font-bold text-[#fff7df]">R$ {valor.replace(".", ",")}</p>

      {payment.status === "loading" ? (
        <div className="mt-6 flex items-center gap-2 rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] p-4 text-[#fff7df]/72">
          <Loader2 className="h-5 w-5 animate-spin text-[#d9aa4f]" />
          Gerando seu Pix seguro...
        </div>
      ) : null}

      {payment.status === "mercado_pago" ? (
        <div className="mt-6 grid gap-4">
          <p className="text-sm uppercase tracking-[0.16em] text-[#d9aa4f]">Pix seguro</p>
          {payment.qrCodeBase64 ? (
            <img
              src={`data:image/png;base64,${payment.qrCodeBase64}`}
              alt="QR Code Pix"
              className="mx-auto h-56 w-56 rounded-[8px] bg-white p-3"
            />
          ) : null}
          {payment.qrCode ? (
            <button
              type="button"
              onClick={() => copy(payment.qrCode || "")}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#d9aa4f]/35 px-6 font-bold text-[#fff7df]"
            >
              <Copy className="h-5 w-5" />
              {copied ? "Codigo copiado" : "Copiar Pix copia e cola"}
            </button>
          ) : null}
          <div className="rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] p-4 text-sm leading-6 text-[#fff7df]/70">
            <p>Status: {payment.paymentStatus === "approved" ? "confirmado" : "aguardando confirmacao"}</p>
            <p className="text-xs text-[#fff7df]/52">ID do pagamento: {payment.paymentId}</p>
          </div>
          <button
            type="button"
            onClick={() => checkPayment(payment.paymentId, true)}
            disabled={checking}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {checking ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />}
            Verificar pagamento
          </button>
        </div>
      ) : null}

      {payment.status === "approved" ? (
        <div className="mt-6 flex items-center gap-2 rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] p-4 text-[#fff7df]/72">
          <CheckCircle2 className="h-5 w-5 text-[#d9aa4f]" />
          Pagamento confirmado. Abrindo sua consulta...
        </div>
      ) : null}

      {payment.status === "error" ? (
        <div className="mt-6 flex items-start gap-3 rounded-[8px] border border-red-300/25 bg-red-950/20 p-4 text-sm leading-6 text-[#fff7df]/78">
          <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-[#d9aa4f]" />
          <p>{payment.message}</p>
        </div>
      ) : null}

      <ol className="mt-6 grid gap-3 text-sm leading-6 text-[#fff7df]/74">
        <li>1. Pague pelo QR Code ou pelo Pix copia e cola.</li>
        <li>2. Aguarde a confirmacao automatica do pagamento.</li>
        <li>3. Quando for confirmado, o chat da consulta abre sozinho.</li>
      </ol>
    </div>
  );
}
