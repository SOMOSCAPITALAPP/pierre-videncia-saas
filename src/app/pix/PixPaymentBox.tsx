"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Loader2, MessageCircle } from "lucide-react";
import { getOfferByTipo } from "@/lib/offers";

type PixPaymentBoxProps = {
  valor: string;
  tipo: string;
  pixKey: string;
  whatsappHref: string;
};

type PaymentState =
  | { status: "loading" }
  | { status: "manual" }
  | {
      status: "mercado_pago";
      paymentId: string;
      qrCode?: string;
      qrCodeBase64?: string;
      ticketUrl?: string;
    }
  | { status: "error"; message: string };

export function PixPaymentBox({ valor, tipo, pixKey, whatsappHref }: PixPaymentBoxProps) {
  const [payment, setPayment] = useState<PaymentState>({ status: "loading" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("pierre-reading");
    let user: { id?: string; nome?: string; email?: string } = {};

    if (stored) {
      try {
        const reading = JSON.parse(stored) as { user?: { id?: string; nome?: string; email?: string } };
        user = reading.user || {};
      } catch {
        user = {};
      }
    }

    if (!user.id) {
      setPayment({ status: "manual" });
      return;
    }

    fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, nome: user.nome, email: user.email, valor, tipo }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mode === "mercado_pago") {
          setPayment({
            status: "mercado_pago",
            paymentId: data.paymentId,
            qrCode: data.qrCode,
            qrCodeBase64: data.qrCodeBase64,
            ticketUrl: data.ticketUrl,
          });
          return;
        }

        setPayment({ status: "manual" });
      })
      .catch(() => setPayment({ status: "manual" }));
  }, [tipo, valor]);

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  function unlockPremiumChat() {
    const offer = getOfferByTipo(tipo);
    sessionStorage.setItem("pierre-premium-chat", "1");
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

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.16em] text-[#d9aa4f]">valor</p>
      <p className="mt-2 text-4xl font-bold text-[#fff7df]">R$ {valor.replace(".", ",")}</p>

      {payment.status === "loading" ? (
        <div className="mt-6 flex items-center gap-2 rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] p-4 text-[#fff7df]/72">
          <Loader2 className="h-5 w-5 animate-spin text-[#d9aa4f]" />
          Gerando conexão Pix...
        </div>
      ) : null}

      {payment.status === "mercado_pago" ? (
        <div className="mt-6 grid gap-4">
          <p className="text-sm uppercase tracking-[0.16em] text-[#d9aa4f]">Pix Mercado Pago</p>
          {payment.qrCodeBase64 ? (
            <img
              src={`data:image/png;base64,${payment.qrCodeBase64}`}
              alt="QR Code Pix Mercado Pago"
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
              {copied ? "Código copiado" : "Copiar Pix copia e cola"}
            </button>
          ) : null}
          <p className="text-xs leading-5 text-[#fff7df]/58">ID do pagamento: {payment.paymentId}</p>
        </div>
      ) : null}

      {payment.status === "manual" ? (
        <div className="mt-6">
          <p className="text-sm uppercase tracking-[0.16em] text-[#d9aa4f]">chave Pix manual</p>
          <p className="mt-2 break-all rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] p-4 text-lg">{pixKey}</p>
        </div>
      ) : null}

      <ol className="mt-6 grid gap-3 text-sm leading-6 text-[#fff7df]/74">
        <li>1. Pague pelo QR Code Mercado Pago ou pela chave Pix manual.</li>
        <li>2. Guarde o comprovante.</li>
        <li>3. Envie o comprovante pelo WhatsApp para confirmação e abra seu chat premium.</li>
      </ol>
      <a
        href={whatsappHref}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12]"
      >
        <MessageCircle className="h-5 w-5" />
        Enviar comprovante
      </a>
      <Link
        href="/chat"
        onClick={unlockPremiumChat}
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#d9aa4f]/40 px-6 font-bold text-[#fff7df]"
      >
        Já paguei, abrir chat premium
      </Link>
    </div>
  );
}
