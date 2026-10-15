import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, Search, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { guides, SITE_URL } from "@/lib/seoContent";

export const metadata: Metadata = {
  title: "Guias de tarô, amor e numerologia",
  description:
    "Guias da Clareza Tarô sobre tarô online, tarot do amor, perguntas para as cartas, Arcanos Maiores e numerologia, com Pierre Videncia.",
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guias de tarô, amor e numerologia | Clareza Tarô",
    description:
      "Conteúdo claro e responsável para compreender o Tarot de Marselha e preparar uma consulta espiritual.",
    url: `${SITE_URL}/guias`,
    type: "website",
  },
};

const priority = [
  "tarot-online-gratis",
  "tarot-de-marselha-gratis",
  "tarot-gratuito-whatsapp",
  "consulta-de-tarot-online",
  "tarot-do-amor",
  "tarot-amor-ele-volta",
  "tarot-ele-sente-minha-falta",
  "tarot-mensagem-do-ex",
  "tarot-casal-em-crise",
  "tarot-decisao-amorosa",
  "tiragem-tres-cartas-amor",
  "tarot-solteiros-amor-novo",
  "tarot-ansiedade-amorosa",
  "como-funciona-o-taro",
  "tarot-de-marselha",
  "significado-das-cartas-do-tarot-de-marselha",
  "perguntas-para-o-tarot",
  "tipos-de-tiragem-de-tarot",
  "tarot-sim-ou-nao",
  "tarot-para-reconciliacao",
  "tarot-trabalho-dinheiro",
  "numerologia-data-de-nascimento",
];
const orderedGuides = [...guides].sort((a, b) => priority.indexOf(a.slug) - priority.indexOf(b.slug));

const searchIntentClusters = [
  {
    title: "Quero consultar o tarô agora",
    intent: "tarô online grátis, tarot gratuito no WhatsApp, consulta de tarot online",
    text: "Comece pela leitura gratuita, confirme o canal oficial e use os guias para formular sua pergunta antes de aprofundar.",
    href: "/guias/tarot-gratuito-whatsapp",
  },
  {
    title: "Quero entender amor e reconciliação",
    intent: "tarot do amor ele volta, ele sente minha falta, mensagem para o ex",
    text: "Conteúdos para quem vive afastamento, silêncio, desejo de retorno, dúvida sobre contato ou crise no casal.",
    href: "/guias/tarot-amor-ele-volta",
  },
  {
    title: "Quero decidir com mais clareza",
    intent: "tarot decisão amorosa, casal em crise, ficar ou seguir em frente",
    text: "Guias para comparar caminhos, entender limites e transformar dúvida afetiva em uma decisão mais consciente.",
    href: "/guias/tarot-decisao-amorosa",
  },
  {
    title: "Quero aprender o Tarot de Marselha",
    intent: "Tarot de Marselha, significado das cartas, Arcanos Maiores",
    text: "Explicações sobre símbolos, tiragens e significados para ler as cartas com mais contexto.",
    href: "/guias/tarot-de-marselha",
  },
  {
    title: "Quero fazer uma pergunta melhor",
    intent: "perguntas para o tarot, tarot sim ou não, tipos de tiragem",
    text: "Modelos de pergunta e métodos simples para transformar ansiedade em uma orientação útil.",
    href: "/guias/perguntas-para-o-tarot",
  },
];

const authoritySignals = [
  "Conteúdo em português do Brasil, escrito para pessoas que pensam em consultar tarô online.",
  "Leituras apresentadas como orientação simbólica, sem promessas absolutas ou pressão emocional.",
  "Assinatura editorial de Pierre Videncia: tarólogo francês, numerologia e Tarot de Marselha.",
  "Estrutura clara para buscadores e assistentes: resposta direta, pontos-chave, seções, FAQ e links relacionados.",
];

export default function GuidesPage() {

  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Guias de tarot, amor e numerologia",
            description: metadata.description,
            url: `${SITE_URL}/guias`,
            inLanguage: "pt-BR",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: ["tarô online", "tarot do amor", "Tarot de Marselha", "numerologia", "consulta espiritual online"],
            hasPart: guides.map((guide) => ({
              "@type": "Article",
              headline: guide.title,
              url: `${SITE_URL}/guias/${guide.slug}`,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Guias prioritários da Clareza Tarô",
            itemListElement: orderedGuides.map((guide, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: guide.title,
              url: `${SITE_URL}/guias/${guide.slug}`,
            })),
          },
        ]}
      />
      <Header />
      <section className="mx-auto w-full max-w-6xl px-5 py-10">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">biblioteca clareza tarô</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">Guias de tarô online para consultar melhor antes de decidir</h1>
        <p className="font-ui mt-5 max-w-3xl text-lg leading-8 text-[#fff7df]/72">
          Respostas diretas para quem procura tarô online grátis, tarot do amor, Tarot de Marselha, perguntas para as cartas e numerologia. Leia no seu ritmo e use cada guia para preparar uma consulta mais consciente com Pierre Videncia.
        </p>

        <div className="mt-9 grid gap-4 md:grid-cols-5">
          {searchIntentClusters.map((cluster) => (
            <Link key={cluster.title} href={cluster.href} className="mystic-border rounded-[8px] p-5 transition hover:border-[#f2d48a]/60">
              <Search className="h-6 w-6 text-[#d9aa4f]" />
              <h2 className="mt-4 text-xl font-semibold leading-tight">{cluster.title}</h2>
              <p className="font-ui mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[#d9aa4f]/86">{cluster.intent}</p>
              <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/70">{cluster.text}</p>
            </Link>
          ))}
        </div>

        <div className="mystic-border mt-8 rounded-[8px] p-6">
          <h2 className="text-2xl font-semibold">Nossa estratégia editorial</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {authoritySignals.map((signal) => (
              <div key={signal} className="font-ui flex gap-3 rounded-[8px] border border-[#d9aa4f]/15 bg-[#0d0712]/65 p-4 text-sm leading-6 text-[#fff7df]/74">
                <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#d9aa4f]" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {orderedGuides.map((guide) => (
            <article key={guide.slug} className="mystic-border flex flex-col rounded-[8px] p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="font-ui inline-flex rounded-full border border-[#d9aa4f]/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#d9aa4f]">
                  {guide.eyebrow}
                </span>
                <span className="font-ui inline-flex items-center gap-1 text-xs text-[#fff7df]/52">
                  <Clock3 className="h-4 w-4" /> {guide.readingMinutes} min
                </span>
              </div>
              <BookOpen className="mt-6 h-7 w-7 text-[#d9aa4f]" />
              <h2 className="mt-4 text-2xl font-semibold leading-tight">{guide.shortTitle}</h2>
              <p className="font-ui mt-3 flex-1 text-sm leading-6 text-[#fff7df]/68">{guide.description}</p>
              <Link
                href={`/guias/${guide.slug}`}
                className="font-ui mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d9aa4f]/35 px-5 font-bold text-[#fff7df] hover:border-[#d9aa4f]"
              >
                Ler o guia
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mystic-border mt-10 rounded-[8px] p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="text-2xl font-semibold">Sua pergunta pede uma leitura pessoal?</h2>
            <p className="font-ui mt-3 max-w-2xl leading-7 text-[#fff7df]/68">
              Comece pela consulta grátis. Você informa o tema e recebe uma primeira orientação com cinco cartas.
            </p>
          </div>
          <Link href="/consulta" className="font-ui mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12] md:mt-0">
            Fazer consulta grátis
          </Link>
        </div>
      </section>
    </main>
  );
}
