import { Heart, MessageCircle, MoonStar, ShieldCheck, Sparkles, Star, Wand2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";

const needs = [
  { title: "Amor e reconexão", text: "Quando o coração pede sinais, calma e uma leitura mais sensível." },
  { title: "Trabalho e dinheiro", text: "Para dúvidas sobre decisões, caminhos, oportunidades e bloqueios." },
  { title: "Família e espiritualidade", text: "Quando há peso emocional, silêncio ou necessidade de proteção interior." },
];

const steps = [
  { title: "Escolha o tema", text: "Amor, trabalho, dinheiro, família ou espiritualidade. Você começa pelo que mais pesa hoje.", icon: Wand2 },
  { title: "Deixe seu contato", text: "Nome, email e WhatsApp para receber sua orientação e poder continuar a conversa.", icon: MoonStar },
  { title: "Receba a leitura", text: "Cinco arcanos, signo e número de vida criam uma primeira resposta simbólica.", icon: Sparkles },
];

const plans = [
  { name: "Consulta grátis", text: "Primeiro sinal" },
  { name: "Pergunta única", text: "R$9,90" },
  { name: "Tiragem do Amor", text: "R$19,90" },
  { name: "Tiragem Completa", text: "Mais escolhida" },
  { name: "Premium Mensal", text: "Acompanhamento" },
];

const faqs = [
  ["Preciso pagar para começar?", "Não. A consulta grátis entrega uma primeira orientação simbólica antes de qualquer oferta."],
  ["Vou receber pelo WhatsApp?", "Sim. Você pode deixar seu WhatsApp para continuar a leitura, tirar dúvidas e enviar comprovante Pix."],
  ["Pierre promete resultados?", "Não. A leitura é espiritual e reflexiva, sem promessas absolutas ou garantias."],
  ["Como funciona o pagamento?", "No MVP, o pagamento é manual por Pix e confirmação pelo WhatsApp."],
];

export default function Home() {
  const whatsapp = process.env.WHATSAPP_NUMBER || "";
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá Pierre, estou com uma dúvida e quero receber uma orientação espiritual")}`;

  return (
    <main>
      <Header />
      <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-6xl items-center px-5 pb-10 pt-4 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div>
          <p className="font-ui mb-4 inline-flex rounded-full border border-[#d9aa4f]/30 px-4 py-2 text-sm text-[#f7d990]">
            Tarólogo francês vivendo no Brasil
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#fff7df] md:text-7xl">
            Você está vivendo uma dúvida no amor, no trabalho ou no coração?
          </h1>
          <p className="font-ui mt-6 max-w-2xl text-lg leading-8 text-[#fff7df]/76">
            Receba uma primeira orientação espiritual com Tarô de Marselha, numerologia e astrologia. Uma leitura acolhedora para trazer clareza ao seu momento, sem promessas absolutas.
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
                <div key={card} className="flex aspect-[3/5] items-end rounded-[8px] border border-[#d9aa4f]/35 bg-[#1a0b21] p-3">
                  <span className="text-sm text-[#f7d990]">{card}</span>
                </div>
              ))}
            </div>
            <p className="font-ui mt-5 text-sm leading-6 text-[#fff7df]/70">
              Um espaço íntimo para quem busca clareza antes de tomar uma decisão emocional, afetiva ou espiritual.
            </p>
          </div>
        </div>
      </section>

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

      <Section title="Consulta grátis" eyebrow="primeiro sinal">
        <div className="grid gap-6 md:grid-cols-[1fr_0.7fr]">
          <p className="font-ui text-lg leading-8 text-[#fff7df]/75">
            Comece por uma experiência guiada em poucos passos. Você escolhe o tema, deixa email e WhatsApp, faz sua pergunta e recebe uma leitura parcial com uma abertura real para seguir se fizer sentido.
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

      <Section title="Fale com Pierre" eyebrow="WhatsApp">
        <div className="mystic-border rounded-[8px] p-6">
          <Heart className="h-8 w-8 text-[#d9aa4f]" />
          <p className="font-ui mt-4 leading-7 text-[#fff7df]/76">
            Se sua intuição pediu um próximo passo, envie uma mensagem e desbloqueie sua leitura completa.
          </p>
          <a
            href={whatsappHref}
            className="font-ui mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d9aa4f] px-6 font-bold text-[#160b12] md:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            Chamar no WhatsApp
          </a>
        </div>
      </Section>
    </main>
  );
}
