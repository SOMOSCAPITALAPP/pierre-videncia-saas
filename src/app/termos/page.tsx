import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso das consultas e conteúdos da Clareza Tarô.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <main>
      <Header />
      <article className="font-ui mx-auto w-full max-w-3xl px-5 py-10 text-sm leading-7 text-[#fff7df]/76">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d9aa4f]">regras claras</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-[#fff7df]">Termos de uso</h1>
        <h2 className="mt-8 font-serif text-2xl font-semibold text-[#fff7df]">Natureza da consulta</h2>
        <p className="mt-3">A Clareza Tarô oferece orientação espiritual e simbólica com Tarot de Marselha, numerologia e astrologia. O conteúdo não representa promessa de resultado, diagnóstico ou aconselhamento profissional.</p>
        <h2 className="mt-8 font-serif text-2xl font-semibold text-[#fff7df]">Pagamento e acesso</h2>
        <p className="mt-3">Os planos são liberados após a confirmação do Pix. Cada oferta informa seu prazo e quantidade de tiragens. O Premium Mensal é um pagamento único pelo período informado e não se renova automaticamente.</p>
        <h2 className="mt-8 font-serif text-2xl font-semibold text-[#fff7df]">Uso responsável</h2>
        <p className="mt-3">Não use a leitura como única base para decisões médicas, psicológicas, jurídicas ou financeiras. Não utilize a aplicação para enviar conteúdo ilegal, ameaças, dados de terceiros ou informações que você não tenha autorização para compartilhar.</p>
        <h2 className="mt-8 font-serif text-2xl font-semibold text-[#fff7df]">Suporte</h2>
        <p className="mt-3">Se o pagamento for aprovado e o acesso não for liberado, procure o suporte pelo WhatsApp oficial indicado no site. Casos de reembolso ou falha técnica serão analisados individualmente conforme o serviço já utilizado e a legislação aplicável.</p>
        <p className="mt-8 text-xs text-[#fff7df]/50">Última atualização: 15 de outubro de 2026.</p>
      </article>
    </main>
  );
}
