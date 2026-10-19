import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Gem, Heart, MoonStar, ShieldCheck, Sparkles, Star, Wand2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { ShareApp } from "@/components/ShareApp";
import { TarotArcanaCard } from "@/components/TarotArcanaCard";
import { pierreFacebookUrl } from "@/lib/contactLinks";
import { guides, SITE_URL } from "@/lib/seoContent";

export const metadata: Metadata = {
  title: "Tarô online grátis para amor e decisões",
  description:
    "Faça uma consulta de tarô online grátis com cinco cartas. Leitura de Tarot de Marselha com Pierre Videncia para amor, trabalho, família e decisões.",
  alternates: { canonical: "/" },
};

const needs = [
  { title: "Amor e vínculos", text: "Para entender silêncio, afastamento, desejo, reconexão ou a coragem de seguir em paz." },
  { title: "Trabalho e dinheiro", text: "Quando escolhas, oportunidades, bloqueios ou mudanças pedem mais lucidez." },
  { title: "Família e caminhos", text: "Para momentos de conflito, peso emocional, decisões delicadas ou necessidade de proteção interior." },
  { title: "Saúde emocional", text: "Para organizar ansiedade, cansaço, ciclos repetidos e o que sua energia parece estar pedindo." },
];

const steps = [
  { title: "Escolha o tema", text: "Amor, trabalho, dinheiro, família, saúde emocional ou espiritualidade. Comece pelo ponto que mais pede clareza.", icon: Wand2 },
  { title: "Abra sua pergunta", text: "Você informa seus dados, escolhe um número e escreve a dúvida com sinceridade.", icon: MoonStar },
  { title: "Receba orientação", text: "As cartas, a numerologia e a astrologia revelam uma primeira leitura simbólica do momento.", icon: Sparkles },
];

const plans = [
  { name: "Consulta grátis", text: "Primeiro sinal" },
  { name: "Pergunta única", text: "Clareza direta" },
  { name: "Tiragem do Amor", text: "Vínculos e sentimentos" },
  { name: "Tiragem Completa", text: "Mais escolhida" },
  { name: "Premium Mensal", text: "Acompanhamento" },
];

const frenchMysteries = [
  { title: "Assinatura francesa", text: "Um imaginário de Marseille, Paris e salões espirituais em linguagem brasileira, íntima e clara." },
  { title: "Ritual visível", text: "Você vê os arcanos sorteados, as posições e a leitura simbólica como uma experiência concreta." },
  { title: "Elegância sem medo", text: "A consulta orienta sem promessas absolutas, sem pressão emocional e sem espetáculo vazio." },
];

const trustSignals = [
  "Tarólogo francês vivendo no Brasil",
  "Leituras simbólicas sem promessas absolutas",
  "Pagamento Pix com liberação automática do chat",
  "Orientação emocional, prática e espiritual",
  "WhatsApp apenas como canal humano de confiança",
];

const proofPrinciples = [
  "Depoimentos publicados somente com autorização",
  "Atendimento em português do Brasil com assinatura francesa",
  "Leituras sem promessas absolutas ou pressão emocional",
  "Espaço preparado para receber avaliações reais após cada consulta",
];

const socialLinks = [
  { label: "Facebook", href: pierreFacebookUrl, icon: BookOpen },
];

const featuredGuides = [
  "tarot-online-gratis",
  "tarot-gratuito-whatsapp",
  "tarot-do-amor",
  "tarot-amor-ele-volta",
].flatMap((slug) => {
  const guide = guides.find((item) => item.slug === slug);
  return guide ? [guide] : [];
});

const faqs = [
  ["Preciso pagar para começar?", "Não. A consulta grátis entrega uma primeira orientação simbólica antes de qualquer oferta."],
  ["A consulta acontece pelo WhatsApp?", "Não. A consulta acontece no chat da aplicação. WhatsApp serve apenas como canal humano de confiança e suporte."],
  ["Pierre promete resultados?", "Não. A leitura é espiritual e reflexiva, sem promessas absolutas ou garantias."],
  ["Posso perguntar sobre saúde?", "Você pode falar de saúde emocional e bem-estar interior. A leitura não substitui médico, psicólogo ou qualquer profissional de saúde."],
  ["Como funciona o pagamento?", "Você escolhe a consulta, paga por Pix e a aplicação libera o chat quando o pagamento é confirmado."],
];

export default function Home() {
  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Consulta de tarô online da Clareza Tarô",
            serviceType: "Consulta de tarô online e orientação espiritual",
            provider: { "@id": `${SITE_URL}/sobre-pierre#pierre` },
            brand: { "@id": `${SITE_URL}/#organization` },
            areaServed: { "@type": "Country", name: "Brasil" },
            availableLanguage: "pt-BR",
            url: `${SITE_URL}/consulta`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          },
        ]}
      />
      <Header />
      <section className="hero-atelier mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-6xl items-center px-5 pb-10 pt-4 md:grid-cols-[1.08fr_0.92fr] md:gap-12">
        <div className="relative z-10">
          <p className="font-ui mb-4 inline-flex rounded-full border border-[#d9aa4f]/30 bg-[#0b0710]/70 px-4 py-2 text-sm font-semibold text-[#f7d990] shadow-lg shadow-black/20">
            Tarô online brasileiro com alma francesa
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#fff7df] md:text-6xl md:leading-[1.08] 2xl:text-7xl 2xl:leading-tight">
            Clareza para amor, escolhas e sinais que insistem
          </h1>
          <p className="font-ui mt-6 max-w-2xl text-lg leading-8 text-[#fff7df]/76">
            Um gabinete digital de Tarô de Marselha, numerologia e astrologia simbólica. Você entra com uma dúvida real e recebe uma leitura acolhedora para organizar sentimentos, perceber padrões e decidir com mais presença.
          </p>
          <div className="mt-8 grid max-w-sm gap-3 sm:grid-cols-1">
            <ButtonLink href="/consulta">Receber uma orientação grátis</ButtonLink>
            <ButtonLink href="/ofertas" variant="dark">Ver consultas completas</ButtonLink>
          </div>
          <p className="font-ui mt-4 max-w-xl text-sm leading-6 text-[#fff7df]/58">
            Sem promessas absolutas. Sem pressão emocional. Apenas uma leitura para organizar sentimentos, escolhas e sinais do momento.
          </p>
          <div className="font-ui mt-7 grid max-w-2xl gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#fff7df]/58 sm:grid-cols-3">
            <span className="soft-panel rounded-[8px] px-4 py-3">Tarô de Marselha</span>
            <span className="soft-panel rounded-[8px] px-4 py-3">Amor e decisões</span>
            <span className="soft-panel rounded-[8px] px-4 py-3">Brasil em pt-BR</span>
          </div>
        </div>

        <div className="card-orbit mystic-border relative z-10 mt-10 rounded-[8px] p-5 md:mt-0">
          <div className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0b0710] p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="font-ui text-xs font-bold uppercase tracking-[0.2em] text-[#d9aa4f]">mesa de leitura</p>
                <p className="mt-1 text-xl font-semibold text-[#fff1c7]">Arcana em foco</p>
              </div>
              <Gem className="h-7 w-7 text-[#f2d48a]" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["O Sol", "A Lua", "A Estrela", "O Mago", "A Força", "O Mundo"].map((card) => (
                <TarotArcanaCard key={card} nome={card} compact />
              ))}
            </div>
            <div className="ornate-divider mt-5 text-sm">✦</div>
            <p className="font-ui mt-5 text-sm leading-6 text-[#fff7df]/70">Um espaço íntimo para compreender antes de agir, esperar ou insistir.</p>
          </div>
        </div>
      </section>

      <Section title="Mistérios franceses" eyebrow="assinatura de pierre">
        <div className="grid gap-4 md:grid-cols-3">
          {frenchMysteries.map((item) => (
            <article key={item.title} className="mystic-border rounded-[8px] p-5">
              <Sparkles className="mb-5 h-6 w-6 text-[#d9aa4f]" />
              <h3 className="text-xl font-semibold text-[#f7d990]">{item.title}</h3>
              <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/72">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Qual tema pede clareza hoje?" eyebrow="comece pelo seu momento">
        <div className="grid gap-4 md:grid-cols-4">
          {needs.map((need) => (
            <article key={need.title} className="mystic-border rounded-[8px] p-5">
              <h3 className="text-xl font-semibold">{need.title}</h3>
              <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/70">{need.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Como funciona" eyebrow="ritual simples">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="mystic-border rounded-[8px] p-5">
              <step.icon className="h-7 w-7 text-[#d9aa4f]" />
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/70">{step.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Confiança antes de decidir" eyebrow="prova social">
        <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
          <div className="mystic-border rounded-[8px] p-6">
            <h3 className="text-2xl font-semibold">O diferencial francês de Pierre</h3>
            <p className="font-ui mt-4 leading-7 text-[#fff7df]/74">
              Pierre une a tradição simbólica do Tarô de Marselha com uma escuta brasileira, calorosa e direta. A proposta é ajudar você a amadurecer emocionalmente, sair da confusão e olhar sua situação com mais dignidade.
            </p>
            <div className="font-ui mt-5 grid gap-2 text-sm text-[#fff7df]/70">
              {trustSignals.map((signal) => (
                <span key={signal} className="rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712] px-3 py-2">
                  {signal}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <article className="mystic-border rounded-[8px] p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">Avaliações de clientes</h3>
                <span className="font-ui rounded-full border border-[#d9aa4f]/25 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-[#d9aa4f]">
                  França + Brasil
                </span>
              </div>
              <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/72">
                A confiança vem de uma experiência clara: você conhece o método, vê as cartas e decide se deseja aprofundar antes de pagar.
              </p>
              <div className="mt-4 grid gap-3">
                {[
                  "Cartas e posições visíveis durante a leitura",
                  "Pagamento Pix com confirmação automática",
                  "Depoimentos publicados somente com autorização",
                ].map((item) => (
                  <div key={item} className="rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712]/72 p-4">
                    <p className="font-ui text-sm leading-6 text-[#fff7df]/76">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-2">
                {proofPrinciples.slice(1, 3).map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712]/72 p-3 text-sm text-[#fff7df]/76">
                    <Sparkles className="h-4 w-4 shrink-0 text-[#d9aa4f]" />
                    <span className="font-ui">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <ButtonLink href="/consulta" variant="dark">Viver minha primeira consulta</ButtonLink>
              </div>
            </article>
            <article className="mystic-border rounded-[8px] p-5">
              <h3 className="text-xl font-semibold">Facebook oficial</h3>
              <div className="font-ui mt-4 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href === "#" ? undefined : "_blank"}
                    rel={link.href === "#" ? undefined : "noreferrer"}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d9aa4f]/35 px-4 text-sm font-bold text-[#fff7df]"
                  >
                    <link.icon className="h-4 w-4 text-[#d9aa4f]" />
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          </div>
        </div>
      </Section>

      <Section title="Compartilhe a experiência" eyebrow="convite">
        <ShareApp />
      </Section>

      <Section title="Guia gratuito" eyebrow="tarô de marselha">
        <div className="mystic-border grid gap-5 rounded-[8px] p-6 md:grid-cols-[1fr_0.42fr] md:items-center">
          <div>
            <BookOpen className="h-8 w-8 text-[#d9aa4f]" />
            <h3 className="mt-4 text-2xl font-semibold">Baixe o PDF: Uma breve história do Tarô de Marselha</h3>
            <p className="font-ui mt-3 leading-7 text-[#fff7df]/72">
              Um material simples para conhecer a origem simbólica do Tarô de Marselha e entender por que as cartas ainda ajudam tantas pessoas a refletir antes de decidir.
            </p>
          </div>
          <a
            href="/tarot-marselha-pierre-videncia.pdf"
            className="font-ui inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12]"
          >
            Baixar PDF grátis
          </a>
        </div>
      </Section>

      <Section title="Guias para consultar com mais clareza" eyebrow="biblioteca clareza tarô">
        <div className="grid gap-4 md:grid-cols-2">
          {featuredGuides.map((guide) => (
            <article key={guide.slug} className="mystic-border rounded-[8px] p-5">
              <p className="font-ui text-xs font-bold uppercase tracking-[0.12em] text-[#d9aa4f]">{guide.eyebrow}</p>
              <h3 className="mt-3 text-xl font-semibold leading-tight">{guide.shortTitle}</h3>
              <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/68">{guide.description}</p>
              <Link href={`/guias/${guide.slug}`} className="font-ui mt-4 inline-flex min-h-11 items-center font-bold text-[#f7d990] underline underline-offset-4">
                Ler o guia completo
              </Link>
            </article>
          ))}
        </div>
        <Link href="/guias" className="font-ui mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9aa4f]/35 px-6 font-bold text-[#fff7df]">
          Ver todos os guias
        </Link>
      </Section>

      <Section title="Consulta grátis" eyebrow="primeiro sinal">
        <div className="grid gap-6 md:grid-cols-[1fr_0.7fr]">
          <p className="font-ui text-lg leading-8 text-[#fff7df]/75">
            Comece com uma experiência guiada. Você escolhe o tema, faz sua pergunta e recebe uma primeira leitura para entender se vale aprofundar.
          </p>
          <ButtonLink href="/consulta">Receber minha leitura grátis</ButtonLink>
        </div>
      </Section>

      <Section title="Leituras completas" eyebrow="aprofundamento">
        <div className="mystic-border rounded-[8px] p-6">
          <p className="font-ui leading-8 text-[#fff7df]/76">
            Quando a primeira resposta toca algo importante, a leitura completa aprofunda as cartas, organiza emoções e transforma a dúvida em próximos passos mais conscientes.
          </p>
        </div>
      </Section>

      <Section title="Planos" eyebrow="ofertas">
        <div className="grid gap-3 md:grid-cols-5">
          {plans.map((plan) => (
            <div key={plan.name} className="mystic-border rounded-[8px] p-4 text-center">
              <Star className="mx-auto h-5 w-5 text-[#d9aa4f]" />
              <p className="mt-3 text-sm font-semibold">{plan.name}</p>
              <p className="font-ui mt-2 text-xs text-[#fff7df]/62">{plan.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 max-w-sm">
          <ButtonLink href="/ofertas" variant="dark">
            Ver ofertas
          </ButtonLink>
        </div>
      </Section>

      <Section title="Espiritualidade com cuidado" eyebrow="confiança">
        <div className="mystic-border rounded-[8px] p-6">
          <ShieldCheck className="h-8 w-8 text-[#d9aa4f]" />
          <p className="font-ui mt-4 leading-7 text-[#fff7df]/76">
            Esta leitura é simbólica e espiritual. Ela pode ajudar você a refletir com mais clareza, mas não substitui decisões médicas, jurídicas, financeiras ou psicológicas.
          </p>
        </div>
      </Section>

      <Section title="FAQ" eyebrow="clareza">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <article key={question} className="mystic-border rounded-[8px] p-5">
              <h3 className="text-lg font-semibold">{question}</h3>
              <p className="font-ui mt-2 text-sm leading-6 text-[#fff7df]/72">{answer}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Orientação preciosa" eyebrow="premium">
        <div className="mystic-border rounded-[8px] p-6">
          <Heart className="h-8 w-8 text-[#d9aa4f]" />
          <p className="font-ui mt-4 leading-7 text-[#fff7df]/76">
            A consulta grátis abre o primeiro sinal. Para aprofundar, a consulta premium oferece uma orientação mais íntima com Pierre, trabalhando inteligência emocional, amor-próprio, perdão, presença e ação consciente.
          </p>
          <div className="mt-5 max-w-sm">
            <ButtonLink href="/ofertas">Desbloquear orientação premium</ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
