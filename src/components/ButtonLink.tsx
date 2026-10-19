"use client";

import type { ReactNode } from "react";
import { TrackedInternalLink } from "@/components/FunnelTracker";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "dark";
};

export function ButtonLink({ href, children, variant = "gold" }: ButtonLinkProps) {
  const classes =
    variant === "gold"
      ? "luxury-button bg-[#d9aa4f] text-[#160b12] shadow-lg shadow-[#d9aa4f]/20 hover:bg-[#f2d48a]"
      : "border border-[#d9aa4f]/40 bg-[#0b0710]/80 text-[#fff7df] shadow-lg shadow-black/20 hover:border-[#f2d48a]/60";
  const eventType = href.startsWith("/consulta") ? "consultation_clicked" : href.startsWith("/ofertas") ? "offer_clicked" : "consultation_clicked";

  return (
    <TrackedInternalLink
      href={href}
      eventType={eventType}
      className={`font-ui inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-center font-bold transition ${classes}`}
    >
      {children}
    </TrackedInternalLink>
  );
}