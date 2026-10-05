import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { guides, SITE_URL } from "@/lib/seoContent";

export const metadata: Metadata = {
  title: "Guias de tarot, amor e numerologia",
  description:
    "Guias de Pierre Videncia sobre consulta de tarot online, tarot do amor, perguntas para as cartas, Arcanos Maiores e numerologia.",
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guias de tarot, amor e numerologia | Pierre Videncia",
    description:
      "Conteúdo claro e responsável para compreender o Tarot de Marselha e preparar uma consulta espiritual.",
    url: `${SITE_URL}/guias`,
    type: "website",
  },
};

export default function GuidesPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Guias de tarot, amor e numerologia",
          description: metadata.description,
          url: `${SITE_URL}/guias`,
          inLanguage: "pt-BR",
          hasPart: guides.map((guide) => ({
            "@type": "Article",
            headline: guide.title,
            url: `${SITE_URL}/guias/${guide.slug}`,
          })),
        }}
      />
      <Header />
      <section className="mx-auto w-full max-w-6xl px-5 py-10">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">biblioteca de pierre</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">Guias para compreender as cartas antes de decidir</h1>
        <p className="font-ui mt-5 max-w-3xl text-lg leading-8 text-[#fff7df]/72">
          Respostas diretas, exemplos de perguntas e explicações sobre Tarot de Marselha, amor e numerologia. Leia no seu ritmo e use cada guia para preparar uma consulta mais consciente.
        </p>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {guides.map((guide) => (
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
