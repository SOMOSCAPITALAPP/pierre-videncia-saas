import { Header } from "@/components/Header";
import { PixPaymentBox } from "./PixPaymentBox";

type PixPageProps = {
  searchParams: Promise<{ valor?: string; tipo?: string }>;
};

export default async function PixPage({ searchParams }: PixPageProps) {
  const params = await searchParams;
  const valor = params.valor || "79.90";
  const tipo = params.tipo || "Tiragem Completa";
  const pixKey = process.env.PIX_KEY || "Configure PIX_KEY no Vercel";
  const whatsapp = process.env.WHATSAPP_NUMBER || "";
  const message = `Olá Pierre, quero desbloquear minha leitura completa. Fiz o Pix de R$ ${valor.replace(".", ",")} para ${tipo}.`;
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-2xl px-5 py-8">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">pagamento Pix</p>
        <h1 className="mt-3 text-4xl font-semibold">{tipo}</h1>
        <div className="mystic-border font-ui mt-8 rounded-[8px] p-6">
          <PixPaymentBox valor={valor} tipo={tipo} pixKey={pixKey} whatsappHref={whatsappHref} />
        </div>
      </section>
    </main>
  );
}
