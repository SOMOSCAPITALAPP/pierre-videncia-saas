import Link from "next/link";
import { Facebook, MessageCircle } from "lucide-react";
import { pierreFacebookUrl, pierreWhatsappUrl } from "@/lib/contactLinks";
import { TrackedInternalLink, TrackedWhatsappLink } from "@/components/FunnelTracker";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
      <Link href="/" className="inline-flex min-h-12 items-center gap-3 text-[#f7d990]" aria-label="Clareza Tarô - página inicial">
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-monogram">CT</span>
        </span>
        <span className="leading-none">
          <span className="block text-xl font-semibold tracking-[0.08em] text-[#fff1c7]">Clareza Tarô</span>
          <span className="font-ui mt-1 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9aa4f]/82">com Pierre Videncia</span>
        </span>
      </Link>
      <nav className="font-ui flex flex-wrap items-center justify-end gap-2 text-sm text-[#fff7df]/74 sm:gap-3">
        <a
          href={pierreFacebookUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook oficial de Pierre Videncia"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9aa4f]/30 bg-[#0b0710]/70 text-[#f7d990] transition hover:border-[#f2d48a]/70 hover:text-[#fff1c7]"
        >
          <Facebook className="h-4 w-4" />
        </a>
        <TrackedWhatsappLink
          href={pierreWhatsappUrl}
          ariaLabel="Falar com a equipe de Pierre no WhatsApp"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9aa4f]/30 bg-[#0b0710]/70 text-[#f7d990] transition hover:border-[#f2d48a]/70 hover:text-[#fff1c7]"
        >
          <MessageCircle className="h-4 w-4" />
        </TrackedWhatsappLink>
        <TrackedInternalLink href="/ofertas" eventType="offer_clicked" className="inline-flex min-h-11 items-center px-1 transition hover:text-[#f7d990]">Ofertas</TrackedInternalLink>
        <TrackedInternalLink href="/consulta" eventType="consultation_clicked" className="luxury-button inline-flex min-h-11 items-center rounded-full bg-[#d9aa4f] px-4 font-semibold text-[#170b12]">
          Consulta grátis
        </TrackedInternalLink>
      </nav>
    </header>
  );
}
