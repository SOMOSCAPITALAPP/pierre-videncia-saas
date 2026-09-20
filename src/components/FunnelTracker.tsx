"use client";

import Link from "next/link";
import { useEffect } from "react";

type EventType = "offer_page_viewed" | "offer_clicked" | "whatsapp_clicked" | "upsell_clicked";

function leadId() {
  try {
    const reading = JSON.parse(sessionStorage.getItem("pierre-reading") || "null") as { user?: { id?: string } } | null;
    return reading?.user?.id || "";
  } catch {
    return "";
  }
}

export function trackFunnelEvent(type: EventType, offerId?: string) {
  const id = leadId();
  if (!id) return;
  void fetch("/api/events", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ leadId: id, type, offerId }),
    keepalive: true,
  }).catch(() => undefined);
}

export function OfferPageTracker() {
  useEffect(() => trackFunnelEvent("offer_page_viewed"), []);
  return null;
}

export function TrackedOfferLink({ href, offerId, children, className }: {
  href: string; offerId: string; children: React.ReactNode; className: string;
}) {
  return <Link href={href} className={className} onClick={() => trackFunnelEvent("offer_clicked", offerId)}>{children}</Link>;
}

export function TrackedWhatsappLink({ href, children, className, ariaLabel }: {
  href: string; children: React.ReactNode; className: string; ariaLabel: string;
}) {
  return <a href={href} className={className} aria-label={ariaLabel} target="_blank" rel="noreferrer" onClick={() => trackFunnelEvent("whatsapp_clicked")}>{children}</a>;
}
