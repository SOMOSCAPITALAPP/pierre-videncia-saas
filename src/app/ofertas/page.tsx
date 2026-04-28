import Link from "next/link";
import { Header } from "@/components/Header";

const offers = [
  { tipo: "Pergunta única", valor: "9.90", label: "R$9,90", text: "Uma resposta direta para uma dúvida específica." },
  { tipo: "Tiragem do Amor", valor: "19.90", label: "R$19,90", text: "Leitura afetiva para conexão, retorno, dúvidas e caminhos." },
  { tipo: "Tiragem Completa", valor: "39.90", label: "R$39,90", text: "Cinco cartas aprofundadas com orientação prática." },
  { tipo: "Mapa Espiritual Completo", valor: "69.90", label: "R$69,90", text: "Tarô, numerologia e astrologia em uma visão mais ampla." },
  { tipo: "Premium Mensal", valor: "49.90", label: "R$49,90", text: "Acompanhamento espiritual mensal com leituras recorrentes." },
];

export default function OfertasPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-6xl px-5 py-8">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">leituras completas</p>
        <h1 className="mt-3 text-4xl font-semibold">Escolha sua orientação</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {offers.map((offer) => (
            <article key={offer.tipo} className="mystic-border flex rounded-[8px] p-5 md:min-h-72 md:flex-col">
              <div>
                <h2 className="text-xl font-semibold">{offer.tipo}</h2>
                <p className="mt-4 text-3xl font-bold text-[#d9aa4f]">{offer.label}</p>
                <p className="font-ui mt-4 text-sm leading-6 text-[#fff7df]/70">{offer.text}</p>
              </div>
              <Link
                href={`/pix?valor=${offer.valor}&tipo=${encodeURIComponent(offer.tipo)}`}
                className="font-ui mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9aa4f] px-5 text-center font-bold text-[#160b12] md:mt-auto"
              >
                Desbloquear
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
