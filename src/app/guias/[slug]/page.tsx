import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { TarotArcanaCard } from "@/components/TarotArcanaCard";
import { getGuide, guides, SITE_URL } from "@/lib/seoContent";
import { tarotDeck } from "@/lib/tarotDeck";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) return {};

  const canonical = `/guias/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}${canonical}`,
      type: "article",
      locale: "pt_BR",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: [`${SITE_URL}/sobre-pierre`],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: guide.shortTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const pageUrl = `${SITE_URL}/guias/${guide.slug}`;
  const relatedGuides = guide.relatedSlugs.map((relatedSlug) => getGuide(relatedSlug)).filter((item) => item !== undefined);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      inLanguage: "pt-BR",
      mainEntityOfPage: pageUrl,
      image: `${SITE_URL}/opengraph-image`,
      author: { "@id": `${SITE_URL}/sobre-pierre#pierre` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      about: guide.eyebrow,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Guias", item: `${SITE_URL}/guias` },
        { "@type": "ListItem", position: 3, name: guide.shortTitle, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main>
      <JsonLd data={jsonLd} />
      <Header />
      <article className="mx-auto w-full max-w-4xl px-5 py-10">
        <nav aria-label="Navegação estrutural" className="font-ui flex flex-wrap items-center gap-2 text-sm text-[#fff7df]/54">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/guias">Guias</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#f7d990]">{guide.shortTitle}</span>
        </nav>

        <header className="mt-8">
          <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">{guide.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">{guide.title}</h1>
          <p className="font-ui mt-5 text-lg leading-8 text-[#fff7df]/72">{guide.description}</p>
          <div className="font-ui mt-5 flex flex-wrap gap-4 text-sm text-[#fff7df]/54">
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Atualizado em 5 de outubro de 2026</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> {guide.readingMinutes} min de leitura</span>
            <Link href="/sobre-pierre" rel="author" className="text-[#f7d990] underline underline-offset-4">Por Pierre Videncia</Link>
          </div>
        </header>

        <section className="mystic-border mt-8 rounded-[8px] p-6" aria-labelledby="resposta-direta">
          <p className="font-ui text-xs font-bold uppercase tracking-[0.16em] text-[#d9aa4f]">resposta direta</p>
          <h2 id="resposta-direta" className="sr-only">Resposta direta</h2>
          <p className="font-ui mt-3 text-lg leading-8 text-[#fff7df]/82">{guide.directAnswer}</p>
        </section>

        <section className="mt-8" aria-labelledby="neste-guia">
          <h2 id="neste-guia" className="text-2xl font-semibold">O que você vai compreender</h2>
          <ul className="font-ui mt-4 grid gap-3 text-[#fff7df]/74 md:grid-cols-2">
            {guide.takeaways.map((takeaway) => (
              <li key={takeaway} className="soft-panel flex gap-3 rounded-[8px] p-4 leading-6">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#d9aa4f]" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 grid gap-10">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-3xl font-semibold leading-tight">{section.title}</h2>
              <div className="font-ui mt-4 grid gap-4 text-base leading-8 text-[#fff7df]/76">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets ? (
                <ul className="font-ui mt-5 grid gap-3 text-[#fff7df]/74">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 rounded-[8px] border border-[#d9aa4f]/15 bg-[#0d0712]/65 p-4 leading-6">
                      <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#d9aa4f]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.callout ? (
                <blockquote className="font-ui mt-5 border-l-2 border-[#d9aa4f] bg-[#d9aa4f]/8 px-5 py-4 text-lg leading-8 text-[#fff7df]/82">
                  {section.callout}
                </blockquote>
              ) : null}
            </section>
          ))}
        </div>

        {guide.showArcana ? (
          <section className="mt-12" aria-labelledby="arcanos-maiores">
            <h2 id="arcanos-maiores" className="text-3xl font-semibold">Os 22 Arcanos Maiores e seus significados</h2>
            <p className="font-ui mt-4 leading-8 text-[#fff7df]/72">
              Use estes significados como ponto de partida. Em uma consulta, a pergunta e as cartas vizinhas definem como cada símbolo participa da história.
            </p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tarotDeck.map((card, index) => (
                <article key={card.nome} className="mystic-border rounded-[8px] p-4">
                  <TarotArcanaCard nome={card.nome} />
                  <h3 className="mt-4 text-xl font-semibold">
                    {index === 0 ? card.nome : `${index}. ${card.nome}`}
                  </h3>
                  <dl className="font-ui mt-3 grid gap-3 text-sm leading-6 text-[#fff7df]/72">
                    <div><dt className="font-bold text-[#f7d990]">Significado geral</dt><dd>{card.significado_geral}</dd></div>
                    <div><dt className="font-bold text-[#f7d990]">No amor</dt><dd>{card.amor}</dd></div>
                    <div><dt className="font-bold text-[#f7d990]">No trabalho</dt><dd>{card.trabalho}</dd></div>
                    <div><dt className="font-bold text-[#f7d990]">Conselho</dt><dd>{card.conselho}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-12" aria-labelledby="perguntas-frequentes">
          <h2 id="perguntas-frequentes" className="text-3xl font-semibold">Perguntas frequentes</h2>
          <div className="mt-5 grid gap-4">
            {guide.faqs.map((faq) => (
              <article key={faq.question} className="mystic-border rounded-[8px] p-5">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p className="font-ui mt-3 leading-7 text-[#fff7df]/72">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mystic-border mt-12 rounded-[8px] p-6">
          <h2 className="text-2xl font-semibold">Quer aplicar esta orientação ao seu momento?</h2>
          <p className="font-ui mt-3 leading-7 text-[#fff7df]/72">
            Abra uma consulta grátis com cinco cartas. Depois, você decide com calma se deseja aprofundar a leitura.
          </p>
          <Link href="/consulta" className="font-ui mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12] sm:w-auto">
            Receber minha orientação grátis <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <aside className="mt-12" aria-labelledby="guias-relacionados">
          <h2 id="guias-relacionados" className="text-2xl font-semibold">Continue lendo</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {relatedGuides.map((related) => (
              <Link key={related.slug} href={`/guias/${related.slug}`} className="soft-panel rounded-[8px] p-5 hover:border-[#d9aa4f]/45">
                <span className="font-ui text-xs font-bold uppercase tracking-[0.12em] text-[#d9aa4f]">{related.eyebrow}</span>
                <span className="mt-3 block text-lg font-semibold leading-tight">{related.shortTitle}</span>
              </Link>
            ))}
          </div>
        </aside>
      </article>
    </main>
  );
}
