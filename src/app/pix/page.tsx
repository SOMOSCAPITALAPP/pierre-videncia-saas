import { Header } from "@/components/Header";
import { PixPaymentBox } from "./PixPaymentBox";
import { getOfferByTipo } from "@/lib/offers";

type PixPageProps = {
  searchParams: Promise<{ valor?: string; tipo?: string }>;
};

export default async function PixPage({ searchParams }: PixPageProps) {
  const params = await searchParams;
  const offer = getOfferByTipo(params.tipo || "Tiragem Completa");
  const valor = offer.valor;
  const tipo = offer.tipo;

  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-2xl px-5 py-8">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">pagamento Pix</p>
        <h1 className="mt-3 text-4xl font-semibold">{tipo}</h1>
        <p className="font-ui mt-4 leading-7 text-[#fff7df]/72">
          Pague com Pix e aguarde alguns instantes. Assim que o pagamento for confirmado, sua consulta abre automaticamente no chat.
        </p>
        <div className="mystic-border font-ui mt-8 rounded-[8px] p-6">
          <PixPaymentBox valor={valor} tipo={tipo} />
        </div>
      </section>
    </main>
  );
}
