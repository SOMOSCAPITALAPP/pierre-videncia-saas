import Link from "next/link";
import { Header } from "@/components/Header";

const offers = [
  { tipo: "Pergunta única", valor: "9.90", label: "R$9,90", badge: "rápida", text: "Uma resposta direta para uma dúvida específica." },
  { tipo: "Tiragem do Amor", valor: "19.90", label: "R$19,90", badge: "amor", text: "Para dúvidas sobre conexão, retorno, silêncio e caminhos afetivos." },
  { tipo: "Tiragem Completa", valor: "39.90", label: "R$39,90", badge: "mais escolhida", text: "Cinco cartas aprofundadas com orientação emocional e prática." },
  { tipo: "Mapa Espiritual Completo", valor: "69.90", label: "R$69,90", badge: "premium", text: "Tarô, numerologia, astrologia e orientação com prioridade no WhatsApp." },
  { tipo: "Premium Mensal", valor: "49.90", label: "R$49,90", badge: "whatsapp premium", text: "Acompanhamento espiritual mensal com canal premium no WhatsApp." },
];

export default function OfertasPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-6xl px-5 py-8">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">leituras completas</p>
        <h1 className="mt-3 text-4xl font-semibold">Escolha o nível de clareza que você precisa agora</h1>
        <p className="font-ui mt-4 max-w-2xl leading-7 text-[#fff7df]/72">
          Comece pequeno se sua dúvida é simples, ou escolha uma leitura mais profunda quando o coração pede detalhes. O chat acontece dentro da aplicação; WhatsApp é reservado para premium e comprovante Pix.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {offers.map((offer) => (
            <article
              key={offer.tipo}
              className={`mystic-border flex rounded-[8px] p-5 md:min-h-80 md:flex-col ${
                offer.badge === "mais escolhida" ? "border-[#d9aa4f] bg-[#d9aa4f]/10" : ""
              }`}
            >
              <div>
                <p className="font-ui mb-3 inline-flex rounded-full border border-[#d9aa4f]/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#d9aa4f]">
                  {offer.badge}
                </p>
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
