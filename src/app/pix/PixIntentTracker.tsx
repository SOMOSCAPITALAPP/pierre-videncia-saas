"use client";

import { useEffect } from "react";

type PixIntentTrackerProps = {
  valor: string;
  tipo: string;
};

export function PixIntentTracker({ valor, tipo }: PixIntentTrackerProps) {
  useEffect(() => {
    const stored = sessionStorage.getItem("pierre-reading");

    if (!stored) {
      return;
    }

    let reading: { user?: { id?: string } };

    try {
      reading = JSON.parse(stored) as { user?: { id?: string } };
    } catch {
      return;
    }
    const userId = reading.user?.id;
    const intentKey = `pierre-payment-${userId}-${tipo}-${valor}`;

    if (!userId || sessionStorage.getItem(intentKey)) {
      return;
    }

    fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, valor, tipo, status: "pendente" }),
    }).then((response) => {
      if (response.ok) {
        sessionStorage.setItem(intentKey, "1");
      }
    });
  }, [tipo, valor]);

  return null;
}
