import { BookOpen, Heart, Instagram, MessageCircle, MoonStar, ShieldCheck, Sparkles, Star, Wand2, Youtube } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import { TarotArcanaCard } from "@/components/TarotArcanaCard";
import { pierreFacebookUrl, pierreWhatsappUrl } from "@/lib/contactLinks";

const needs = [
  { title: "Amor e reconexão", text: "Quando o coração pede sinais, calma e uma leitura mais sensível." },
  { title: "Trabalho e dinheiro", text: "Para dúvidas sobre decisões, caminhos, oportunidades e bloqueios." },
  { title: "Família e espiritualidade", text: "Quando há peso emocional, silêncio ou necessidade de proteção interior." },
];

const steps = [
  { title: "Escolha o tema", text: "Amor, trabalho, dinheiro, família ou espiritualidade. Você começa pelo que mais pesa hoje.", icon: Wand2 },
  { title: "Deixe seu contato", text: "Nome, email e WhatsApp para identificar sua leitura e manter um canal humano de apoio.", icon: MoonStar },
  { title: "Receba a leitura", text: "Cinco arcanos, signo e número de vida criam uma primeira resposta simbólica.", icon: Sparkles },
];

const plans = [
  { name: "Consulta grátis", text: "Primeiro sinal" },
  { name: "Pergunta única", text: "R$19,90" },
  { name: "Tiragem do Amor", text: "R$39,90" },
  { name: "Tiragem Completa", text: "Mais escolhida" },
  { name: "Premium Mensal", text: "Acompanhamento" },
];

const frenchMysteries = [
  { title: "⚜ Origem francesa", text: "Pierre traz o imaginário de Marseille, Paris e dos salões espirituais franceses para uma linguagem brasileira." },
  { title: "Cartas visíveis", text: "A consulta mostra os arcanos sorteados e a posição de cada carta, para o ritual parecer concreto." },
  { title: "Orientação preciosa", text: "Cada resposta busca aumentar consciência emocional, amor-próprio, perdão e ação lúcida." },
];

const trustSignals = [
  "Tarólogo francês vivendo no Brasil",
  "Leituras simbólicas sem promessas absolutas",
  "Orientação premium com Pierre ou sua equipe",
  "Ferramentas de sabedoria emocional e desenvolvimento pessoal",
  "WhatsApp como canal humano de confiança e suporte",
];

const proofPrinciples = [
  "Depoimentos publicados somente com autorização",
  "Atendimento em português do Brasil com assinatura francesa",
  "Leituras sem promessas absolutas ou pressão emocional",
  "Espaço preparado para receber avaliações reais após cada consulta",
];

const clientReviews = [
  {
    name: "Chritiana",
    place: "São Paulo, Brasil",
    summary: "saiu satisfeita da consulta e validou a qualidade do acompanhamento espiritual de Pierre.",
  },
  {
    name: "Vincent",
    place: "Lyon, França",
    summary: "confirmou a seriedade da leitura e a sensação de clareza depois da orientação recebida.",
  },
  {
    name: "Maria",
    place: "Rio de Janeiro, Brasil",
    summary: "ficou plenamente satisfeita com a forma acolhedora e objetiva de Pierre conduzir a consulta.",
  },
  {
    name: "Sophie",
    place: "Paris, França",
    summary: "reconheceu a delicadeza, a escuta e o valor da orientação para organizar uma decisão importante.",
  },
];

const socialLinks = [
  { label: "Facebook", href: pierreFacebookUrl, icon: BookOpen },
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#", icon: Instagram },
  { label: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL || "#", icon: Sparkles },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "#", icon: Youtube },
  { label: "WhatsApp", href: pierreWhatsappUrl, icon: MessageCircle },
];

const faqs = [
  ["Preciso pagar para começar?", "Não. A consulta grátis entrega uma primeira orientação simbólica antes de qualquer oferta."],
  ["Vou receber pelo WhatsApp?", "Não. A consulta acontece dentro do chat da aplicação. WhatsApp serve apenas como canal humano de confiança e suporte."],
  ["Pierre promete resultados?", "Não. A leitura é espiritual e reflexiva, sem promessas absolutas ou garantias."],
  ["Como funciona o pagamento?", "Você escolhe a consulta, paga por Pix e a aplicação libera o chat quando o pagamento é confirmado."],
];

export default function Home() {
  return (
    <main>
      <Header />
      <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-6xl items-center px-5 pb-10 pt-4 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div>
          <p className="font-ui mb-4 inline-flex rounded-full border border-[#d9aa4f]/30 px-4 py-2 text-sm text-[#f7d990]">
            Pierre Videncia, tarólogo francês vivendo no Brasil
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#fff7df] md:text-7xl">
            Você está vivendo uma dúvida no amor, no trabalho ou no coração?
          </h1>
          <p className="font-ui mt-6 max-w-2xl text-lg leading-8 text-[#fff7df]/76">
            Receba uma primeira orientação espiritual com o olhar francês do Tarô de Marselha, numerologia e astrologia. Uma leitura acolhedora para trazer clareza ao seu momento, sem promessas absolutas.
          </p>
          <div className="mt-8 grid max-w-sm gap-3">
            <ButtonLink href="/consulta">Receber uma orientação agora</ButtonLink>
            <ButtonLink href="/ofertas" variant="dark">Escolher uma leitura</ButtonLink>
          </div>
        </div>

        <div className="mystic-border mt-10 rounded-[8px] p-5 md:mt-0">
          <div className="rounded-[8px] border border-[#d9aa4f]/25 bg-[#0c0611] p-5">
            <div className="grid grid-cols-3 gap-3">
              {["O Sol", "A Lua", "A Estrela", "O Mago", "A Força", "O Mundo"].map((card) => (
                <TarotArcanaCard key={card} nome={card} compact />
              ))}
            </div>
            <p className="font-ui mt-5 text-sm leading-6 text-[#fff7df]/70">
              Um espaço íntimo para quem busca clareza antes de tomar uma decisão emocional, afetiva ou espiritual.
            </p>
          </div>
        </div>
      </section>

      <Section title="Mistérios franceses" eyebrow="assinatura de pierre">
        <div className="grid gap-4 md:grid-cols-3">
          {frenchMysteries.map((item) => (
            <article key={item.title} className="mystic-border rounded-[8px] p-5">
              <h3 className="text-xl font-semibold text-[#f7d990]">{item.title}</h3>
              <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/72">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Qual dúvida pesa mais hoje?" eyebrow="comece pelo seu momento">
        <div className="grid gap-4 md:grid-cols-3">
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

      <Section title="Prova social e confiança" eyebrow="para se sentir seguro">
        <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
          <div className="mystic-border rounded-[8px] p-6">
            <h3 className="text-2xl font-semibold">O diferencial francês de Pierre</h3>
            <p className="font-ui mt-4 leading-7 text-[#fff7df]/74">
              Pierre se apresenta como um tarólogo francês vivendo no Brasil, unindo a tradição simbólica do Tarô de Marselha com uma linguagem brasileira, acolhedora e direta. A proposta é ajudar você a amadurecer emocionalmente e tomar decisões com mais consciência.
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
                Retornos reais encontrados nos arquivos de Pierre Videncia. Eles mostram a confiança de consulentes no Brasil e na França, sempre com leituras simbólicas, acolhedoras e sem promessas absolutas.
              </p>
              <div className="mt-4 grid gap-3">
                {clientReviews.map((item) => (
                  <figure key={`${item.name}-${item.place}`} className="rounded-[8px] border border-[#d9aa4f]/20 bg-[#0d0712]/72 p-4">
                    <div className="flex gap-1 text-[#d9aa4f]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="font-ui mt-3 text-sm leading-6 text-[#fff7df]/76">
                      {item.name}, de {item.place}, {item.summary}
                    </p>
                    <figcaption className="font-ui mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[#f7d990]">
                      Cliente satisfeito
                    </figcaption>
                  </figure>
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
              <h3 className="text-xl font-semibold">Redes sociais</h3>
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

      <Section title="Guia gratuito" eyebrow="tarô de marselha">
        <div className="mystic-border grid gap-5 rounded-[8px] p-6 md:grid-cols-[1fr_0.42fr] md:items-center">
          <div>
            <BookOpen className="h-8 w-8 text-[#d9aa4f]" />
            <h3 className="mt-4 text-2xl font-semibold">Baixe o PDF: Uma breve história do Tarô de Marselha</h3>
            <p className="font-ui mt-3 leading-7 text-[#fff7df]/72">
              Um material simples para explicar a origem simbólica do Tarô de Marselha, por que ele é associado à tradição francesa e como Pierre usa as cartas como linguagem de reflexão.
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

      <Section title="Consulta grátis" eyebrow="primeiro sinal">
        <div className="grid gap-6 md:grid-cols-[1fr_0.7fr]">
          <p className="font-ui text-lg leading-8 text-[#fff7df]/75">
            Comece por uma experiência guiada em poucos passos. Você escolhe o tema, deixa seus dados, faz sua pergunta e recebe uma leitura parcial com uma abertura real para seguir se fizer sentido.
          </p>
          <ButtonLink href="/consulta">Receber minha leitura grátis</ButtonLink>
        </div>
      </Section>

      <Section title="Leituras completas" eyebrow="aprofundamento">
        <div className="mystic-border rounded-[8px] p-6">
          <p className="font-ui leading-8 text-[#fff7df]/76">
            Para quem sente que existe algo mais profundo na resposta, Pierre abre uma leitura com orientação emocional, caminhos práticos e símbolos das cartas em cada posição.
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
            A consulta grátis abre o primeiro sinal. Para aprofundar, o atendimento premium libera uma orientação mais íntima com Pierre ou sua equipe, trabalhando inteligência emocional, amor-próprio, perdão, ação consciente e lei da atração sem promessas absolutas.
          </p>
          <div className="mt-5 max-w-sm">
            <ButtonLink href="/ofertas">Desbloquear orientação premium</ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
