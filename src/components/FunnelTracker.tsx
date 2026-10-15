"use client";

import Link from "next/link";
import { useEffect } from "react";

type EventType =
  | "consultation_clicked"
  | "free_reading_generated"
  | "offer_page_viewed"
  | "offer_clicked"
  | "whatsapp_clicked"
  | "share_clicked"
  | "copy_link_clicked"
  | "upsell_clicked";

type EventMetadata = {
  offerId?: string;
  channel?: string;
};

function leadId() {
  try {
    const reading = JSON.parse(sessionStorage.getItem("pierre-reading") || "null") as { user?: { id?: string } } | null;
    return reading?.user?.id || "";
  } catch {
    return "";
  }
}

function sessionId() {
  try {
    const key = "clareza-session-id";
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const created = crypto.randomUUID();
    localStorage.setItem(key, created);
    return created;
  } catch {
    return "";
  }
}

export function trackFunnelEvent(type: EventType, metadata: EventMetadata = {}) {
  const id = leadId();
  const anonymousSessionId = sessionId();
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      leadId: id || undefined,
      sessionId: anonymousSessionId || undefined,
      type,
      path: window.location.pathname,
      ...metadata,
    }),
    keepalive: true,
  }).catch(() => undefined);
}

export function OfferPageTracker() {
  useEffect(() => trackFunnelEvent("offer_page_viewed"), []);
  return null;
}

export function TrackedInternalLink({ href, eventType, children, className, ariaLabel }: {
  href: string; eventType?: EventType; children: React.ReactNode; className: string; ariaLabel?: string;
}) {
  return <Link href={href} aria-label={ariaLabel} className={className} onClick={eventType ? () => trackFunnelEvent(eventType) : undefined}>{children}</Link>;
}

export function TrackedOfferLink({ href, offerId, children, className }: {
  href: string; offerId: string; children: React.ReactNode; className: string;
}) {
  return <Link href={href} className={className} onClick={() => trackFunnelEvent("offer_clicked", { offerId })}>{children}</Link>;
}

export function TrackedWhatsappLink({ href, children, className, ariaLabel }: {
  href: string; children: React.ReactNode; className: string; ariaLabel: string;
}) {
  return <a href={href} className={className} aria-label={ariaLabel} target="_blank" rel="noreferrer" onClick={() => trackFunnelEvent("whatsapp_clicked")}>{children}</a>;
}