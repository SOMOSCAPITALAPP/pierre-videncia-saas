import Link from "next/link";
import { Facebook, MessageCircle } from "lucide-react";
import { pierreFacebookUrl, pierreWhatsappUrl } from "@/lib/contactLinks";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
      <Link href="/" className="text-lg font-semibold tracking-wide text-[#f7d990]">
        Pierre Videncia
      </Link>
      <nav className="font-ui flex flex-wrap items-center justify-end gap-3 text-sm text-[#fff7df]/74">
        <a
          href={pierreFacebookUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook de Pierre Videncia"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9aa4f]/30 text-[#f7d990]"
        >
          <Facebook className="h-4 w-4" />
        </a>
        <a
          href={pierreWhatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp de Pierre Videncia"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9aa4f]/30 text-[#f7d990]"
        >
          <MessageCircle className="h-4 w-4" />
        </a>
        <Link href="/ofertas">Ofertas</Link>
        <Link href="/consulta" className="rounded-full bg-[#d9aa4f] px-4 py-2 font-semibold text-[#170b12]">
          Consulta grátis
        </Link>
      </nav>
    </header>
  );
}
