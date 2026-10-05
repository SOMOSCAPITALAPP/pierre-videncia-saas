import Link from "next/link";
import { pierreWhatsappUrl } from "@/lib/contactLinks";

const footerLinks = [
  { href: "/guias", label: "Guias de tarô" },
  { href: "/guias/tarot-do-amor", label: "Tarô do amor" },
  { href: "/guias/consulta-de-tarot-online", label: "Consulta online" },
  { href: "/sobre-pierre", label: "Sobre Pierre" },
  { href: "/consulta", label: "Consulta grátis" },
  { href: "/ofertas", label: "Consultas completas" },
];

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[#d9aa4f]/15 bg-[#08050d]/72">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xl font-semibold text-[#f7d990]">Clareza Tarô</p>
          <p className="font-ui mt-3 max-w-md text-sm leading-6 text-[#fff7df]/64">
            Tarô online com Pierre Videncia: Tarô de Marselha, numerologia e astrologia simbólica para organizar sentimentos e escolhas.
          </p>
          <p className="font-ui mt-3 text-xs leading-5 text-[#fff7df]/48">
            Orientação espiritual e reflexiva. Não substitui atendimento médico, psicológico, jurídico ou financeiro.
          </p>
        </div>
        <div>
          <nav aria-label="Links do rodapé" className="font-ui grid gap-2 text-sm sm:grid-cols-2">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center text-[#fff7df]/72 hover:text-[#f7d990]">
                {link.label}
              </Link>
            ))}
            <a href={pierreWhatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-[#fff7df]/72 hover:text-[#f7d990]">
              Suporte pelo WhatsApp
            </a>
          </nav>
        </div>
      </div>
      <div className="font-ui border-t border-[#d9aa4f]/10 px-5 py-5 text-center text-xs text-[#fff7df]/42">
        © {new Date().getFullYear()} Clareza Tarô. Conteúdo em português do Brasil.
      </div>
    </footer>
  );
}
