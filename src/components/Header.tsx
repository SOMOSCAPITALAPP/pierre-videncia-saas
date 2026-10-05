import Link from "next/link";
import { Facebook, MessageCircle } from "lucide-react";
import { pierreFacebookUrl, pierreWhatsappUrl } from "@/lib/contactLinks";
import { TrackedWhatsappLink } from "@/components/FunnelTracker";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
      <Link href="/" className="inline-flex min-h-11 items-center text-lg font-semibold tracking-wide text-[#f7d990]">
        <span>
          Clareza Tarô
          <span className="font-ui ml-2 text-xs font-medium tracking-normal text-[#fff7df]/55">com Pierre</span>
        </span>
      </Link>
      <nav className="font-ui flex flex-wrap items-center justify-end gap-2 text-sm text-[#fff7df]/74 sm:gap-3">
        <a
          href={pierreFacebookUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook oficial de Pierre Videncia"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9aa4f]/30 text-[#f7d990]"
        >
          <Facebook className="h-4 w-4" />
        </a>
        <TrackedWhatsappLink
          href={pierreWhatsappUrl}
          ariaLabel="Falar com a equipe de Pierre no WhatsApp"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9aa4f]/30 text-[#f7d990]"
        >
          <MessageCircle className="h-4 w-4" />
        </TrackedWhatsappLink>
        <Link href="/ofertas" className="inline-flex min-h-11 items-center px-1">Ofertas</Link>
        <Link href="/consulta" className="inline-flex min-h-11 items-center rounded-full bg-[#d9aa4f] px-4 font-semibold text-[#170b12]">
          Consulta grátis
        </Link>
      </nav>
    </header>
  );
}
