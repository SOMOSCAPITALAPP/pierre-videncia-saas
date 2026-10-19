import type { Metadata } from "next";
import Link from "next/link";
import { Heart, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { pierreFacebookUrl, pierreWhatsappUrl } from "@/lib/contactLinks";
import { SITE_URL } from "@/lib/seoContent";

export const metadata: Metadata = {
  title: "Sobre Pierre Videncia, tarólogo francês no Brasil",
  description:
    "Conheça Pierre Videncia, sua abordagem com o Tarot de Marselha, numerologia, astrologia simbólica e orientação emocional em português do Brasil.",
  alternates: { canonical: "/sobre-pierre" },
  openGraph: {
    title: "Sobre Pierre Videncia, tarólogo francês no Brasil",
    description: "Uma abordagem humana, simbólica e responsável para compreender sentimentos e escolhas.",
    url: `${SITE_URL}/sobre-pierre`,
    type: "profile",
  },
};

const principles = [
  {
    title: "Clareza sem medo",
    text: "Eu não uso ameaça espiritual, urgência artificial ou promessa absoluta para conduzir uma consulta.",
    icon: ShieldCheck,
  },
  {
    title: "Escuta antes da resposta",
    text: "A pergunta, o contexto e a emoção da pessoa fazem parte da leitura. As cartas não são frases prontas.",
    icon: Heart,
  },
  {
    title: "Símbolo que encontra ação",
    text: "Toda orientação deve ajudar você a reconhecer um limite, uma conversa ou um próximo passo consciente.",
    icon: Sparkles,
  },
];

export default function AboutPierrePage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "Sobre Pierre Videncia",
          url: `${SITE_URL}/sobre-pierre`,
          inLanguage: "pt-BR",
          mainEntity: { "@id": `${SITE_URL}/sobre-pierre#pierre` },
          dateModified: "2026-10-05",
        }}
      />
      <Header />
      <section className="mx-auto w-full max-w-5xl px-5 py-10">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">quem conduz sua leitura</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">Pierre Videncia, tarólogo francês vivendo no Brasil</h1>
        <p className="font-ui mt-5 max-w-3xl text-lg leading-8 text-[#fff7df]/74">
          Eu uno o simbolismo do Tarot de Marselha a uma conversa em português do Brasil, acolhedora e direta. Minha intenção é ajudar você a sair da confusão, compreender o que sente e escolher com mais consciência.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <article className="mystic-border rounded-[8px] p-6">
            <h2 className="text-3xl font-semibold">Minha forma de trabalhar</h2>
            <div className="font-ui mt-5 grid gap-4 leading-8 text-[#fff7df]/74">
              <p>
                O Tarot de Marselha é o centro da consulta. Eu observo a posição das cartas, os símbolos que se repetem e a história formada pelo conjunto. Quando a data de nascimento está disponível, a numerologia e a astrologia simbólica acrescentam outra perspectiva sobre ciclos e tendências pessoais.
              </p>
              <p>
                A leitura não determina o futuro. Ela mostra forças, bloqueios e possibilidades presentes. Eu explico o que vejo, reconheço os limites da interpretação e procuro transformar o símbolo em uma orientação que faça sentido na vida real.
              </p>
              <p>
                Amor, afastamento, escolhas profissionais, dinheiro, família e saúde emocional podem ser acolhidos. Questões médicas, psicológicas, jurídicas e financeiras continuam exigindo profissionais qualificados.
              </p>
            </div>
          </article>
          <aside className="soft-panel rounded-[8px] p-6">
            <p className="font-ui text-xs font-bold uppercase tracking-[0.16em] text-[#d9aa4f]">em cada consulta</p>
            <ul className="font-ui mt-5 grid gap-4 text-sm leading-6 text-[#fff7df]/74">
              <li>⚜ Cartas visíveis e posições explicadas</li>
              <li>⚜ Atendimento em português do Brasil</li>
              <li>⚜ Respostas sem promessa de resultado garantido</li>
              <li>⚜ Espaço para esclarecer a mesma leitura</li>
              <li>⚜ Pagamento Pix e consulta dentro da aplicação</li>
            </ul>
          </aside>
        </div>

        <section className="mt-12" aria-labelledby="principios">
          <h2 id="principios" className="text-3xl font-semibold">Princípios de uma orientação responsável</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.title} className="mystic-border rounded-[8px] p-5">
                <principle.icon className="h-7 w-7 text-[#d9aa4f]" />
                <h3 className="mt-4 text-xl font-semibold">{principle.title}</h3>
                <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/70">{principle.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mystic-border mt-12 rounded-[8px] p-6">
          <h2 className="text-2xl font-semibold">Conheça minha abordagem antes de consultar</h2>
          <p className="font-ui mt-3 max-w-3xl leading-7 text-[#fff7df]/72">
            Os guias explicam como formular uma pergunta, interpretar tendências e reconhecer uma consulta ética. Se preferir, comece diretamente pela orientação grátis.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/guias" className="font-ui inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9aa4f]/35 px-6 font-bold text-[#fff7df]">
              Ler os guias
            </Link>
            <Link href="/consulta" className="font-ui inline-flex min-h-12 items-center justify-center rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12]">
              Fazer consulta grátis
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <a href={pierreFacebookUrl} target="_blank" rel="noreferrer" className="soft-panel font-ui inline-flex min-h-14 items-center justify-center gap-2 rounded-[8px] px-5 font-bold text-[#fff7df]">
            <Sparkles className="h-5 w-5 text-[#d9aa4f]" /> Facebook de Pierre
          </a>
          <a href={pierreWhatsappUrl} target="_blank" rel="noreferrer" className="soft-panel font-ui inline-flex min-h-14 items-center justify-center gap-2 rounded-[8px] px-5 font-bold text-[#fff7df]">
            <MessageCircle className="h-5 w-5 text-[#d9aa4f]" /> Falar com a equipe
          </a>
        </section>
      </section>
    </main>
  );
}
