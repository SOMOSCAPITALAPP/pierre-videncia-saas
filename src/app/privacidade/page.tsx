import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a Clareza Tarô trata os dados usados na consulta online.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <main>
      <Header />
      <article className="font-ui mx-auto w-full max-w-3xl px-5 py-10 text-sm leading-7 text-[#fff7df]/76">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d9aa4f]">transparência</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-[#fff7df]">Política de privacidade</h1>
        <p className="mt-5">A Clareza Tarô usa os dados informados para identificar a consulta, gerar a leitura solicitada, manter a sessão premium e oferecer suporte quando um canal de contato é fornecido.</p>
        <h2 className="mt-8 font-serif text-2xl font-semibold text-[#fff7df]">Dados tratados</h2>
        <p className="mt-3">Podemos tratar nome, email, telefone, data de nascimento, tema e pergunta. Perguntas podem conter informações emocionais; por isso, evite compartilhar dados de terceiros ou informações que não sejam necessárias para sua consulta.</p>
        <h2 className="mt-8 font-serif text-2xl font-semibold text-[#fff7df]">Uso e armazenamento</h2>
        <p className="mt-3">Os dados são usados para operar o serviço, registrar o histórico da consulta, confirmar pagamentos e medir o funcionamento do funil. O acesso administrativo é restrito ao responsável pela operação. Não vendemos dados pessoais.</p>
        <h2 className="mt-8 font-serif text-2xl font-semibold text-[#fff7df]">Seus direitos</h2>
        <p className="mt-3">Você pode pedir acesso, correção ou exclusão dos seus dados pelo canal de suporte indicado no site. Solicitações podem exigir confirmação de identidade para evitar acesso indevido.</p>
        <h2 className="mt-8 font-serif text-2xl font-semibold text-[#fff7df]">Limites do serviço</h2>
        <p className="mt-3">A leitura é simbólica e reflexiva. Não substitui profissionais de saúde, direito, finanças ou psicologia. Não envie dados médicos, documentos, senhas ou informações financeiras.</p>
        <p className="mt-8 text-xs text-[#fff7df]/50">Última atualização: 15 de outubro de 2026.</p>
      </article>
    </main>
  );
}
