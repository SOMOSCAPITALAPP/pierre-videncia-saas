import { MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { PixIntentTracker } from "./PixIntentTracker";

type PixPageProps = {
  searchParams: Promise<{ valor?: string; tipo?: string }>;
};

export default async function PixPage({ searchParams }: PixPageProps) {
  const params = await searchParams;
  const valor = params.valor || "39.90";
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
          <PixIntentTracker valor={valor} tipo={tipo} />
          <p className="text-sm uppercase tracking-[0.16em] text-[#d9aa4f]">valor</p>
          <p className="mt-2 text-4xl font-bold text-[#fff7df]">R$ {valor.replace(".", ",")}</p>
          <p className="mt-6 text-sm uppercase tracking-[0.16em] text-[#d9aa4f]">chave Pix</p>
          <p className="mt-2 break-all rounded-[8px] border border-[#d9aa4f]/25 bg-[#0d0712] p-4 text-lg">{pixKey}</p>
          <ol className="mt-6 grid gap-3 text-sm leading-6 text-[#fff7df]/74">
            <li>1. Copie a chave Pix acima.</li>
            <li>2. Faça o pagamento no seu banco.</li>
            <li>3. Envie o comprovante pelo WhatsApp.</li>
          </ol>
          <a
            href={whatsappHref}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12]"
          >
            <MessageCircle className="h-5 w-5" />
            Enviar comprovante
          </a>
        </div>
      </section>
    </main>
  );
}
