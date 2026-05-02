import Link from "next/link";
import { Header } from "@/components/Header";
import { premiumOffers } from "@/lib/offers";

export default function OfertasPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-6xl px-5 py-8">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">leituras completas</p>
        <h1 className="mt-3 text-4xl font-semibold">Escolha a profundidade certa para o seu momento</h1>
        <p className="font-ui mt-4 max-w-2xl leading-7 text-[#fff7df]/72">
          Quando a dúvida fica girando na mente, uma leitura pode ajudar a separar emoção, medo e sinal verdadeiro. O pagamento é feito por Pix e a consulta acontece dentro do chat da aplicação.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {["⚜ Tradição francesa", "Tarô de Marselha", "Chat liberado após o Pix"].map((item) => (
            <div key={item} className="soft-panel rounded-[8px] px-4 py-3 text-center text-sm text-[#fff7df]/76">
              {item}
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {premiumOffers.map((offer) => (
            <article
              key={offer.tipo}
              className={`mystic-border relative flex overflow-hidden rounded-[8px] p-5 md:min-h-96 md:flex-col ${
                offer.badge === "mais escolhida" ? "border-[#d9aa4f] bg-[#d9aa4f]/10" : ""
              }`}
            >
              <div className="absolute right-4 top-4 text-2xl text-[#d9aa4f]/35">⚜</div>
              <div>
                <p className="font-ui mb-3 inline-flex rounded-full border border-[#d9aa4f]/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#d9aa4f]">
                  {offer.badge}
                </p>
                <h2 className="text-xl font-semibold">{offer.tipo}</h2>
                <p className="mt-4 text-3xl font-bold text-[#d9aa4f]">{offer.label}</p>
                <div className="font-ui mt-4 grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#fff7df]/72">
                  <span className="rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712]/70 px-3 py-2">{offer.questionsLabel}</span>
                  <span className="rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712]/70 px-3 py-2">{offer.durationLabel}</span>
                </div>
                <p className="font-ui mt-4 text-sm leading-6 text-[#fff7df]/70">{offer.text}</p>
                <p className="font-ui mt-4 text-xs leading-5 text-[#f7d990]/76">{offer.signature}</p>
              </div>
              <Link
                href={`/pix?valor=${offer.valor}&tipo=${encodeURIComponent(offer.tipo)}`}
                className="font-ui mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9aa4f] px-5 text-center font-bold text-[#160b12] md:mt-auto"
              >
                Escolher esta consulta
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
