import Link from "next/link";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <Link href="/" className="text-lg font-semibold tracking-wide text-[#f7d990]">
        Pierre Videncia
      </Link>
      <nav className="font-ui flex items-center gap-4 text-sm text-[#fff7df]/74">
        <Link href="/chat">Chat</Link>
        <Link href="/ofertas">Ofertas</Link>
        <Link href="/consulta" className="rounded-full bg-[#d9aa4f] px-4 py-2 font-semibold text-[#170b12]">
          Consulta grátis
        </Link>
      </nav>
    </header>
  );
}
