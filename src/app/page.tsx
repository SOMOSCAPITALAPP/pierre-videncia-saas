import { Heart, MessageCircle, MoonStar, Sparkles, Star, Wand2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";

const steps = [
  { title: "Você faz sua pergunta", text: "Conte seu momento com sinceridade e escolha um número entre 1 e 9.", icon: Wand2 },
  { title: "O Tarô abre um caminho", text: "Cinco arcanos revelam símbolos para situação, obstáculo, conselho, evolução e resultado.", icon: MoonStar },
  { title: "Recebe uma orientação", text: "A leitura une Tarô de Marselha, numerologia e astrologia com cuidado espiritual.", icon: Sparkles },
];

const plans = ["Pergunta única", "Tiragem do Amor", "Tiragem Completa", "Mapa Espiritual Completo", "Premium Mensal"];

const faqs = [
  ["A consulta grátis é completa?", "Ela traz uma primeira orientação simbólica. A leitura completa aprofunda cartas, caminhos e conselhos."],
  ["Pierre promete resultados?", "Não. A leitura é espiritual e reflexiva, sem promessas absolutas ou garantias."],
  ["Como funciona o pagamento?", "No MVP, o pagamento é manual por Pix e confirmação pelo WhatsApp."],
];

export default function Home() {
  const whatsapp = process.env.WHATSAPP_NUMBER || "";
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá Pierre, quero desbloquear minha leitura completa")}`;

  return (
    <main>
      <Header />
      <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-6xl items-center px-5 pb-10 pt-4 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div>
          <p className="font-ui mb-4 inline-flex rounded-full border border-[#d9aa4f]/30 px-4 py-2 text-sm text-[#f7d990]">
            Tarólogo francês vivendo no Brasil
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#fff7df] md:text-7xl">
            Receba uma orientação espiritual agora
          </h1>
          <p className="font-ui mt-6 max-w-2xl text-lg leading-8 text-[#fff7df]/76">
            Uma leitura simbólica com Tarô de Marselha, numerologia e astrologia para trazer clareza ao seu momento.
          </p>
          <div className="mt-8 max-w-sm">
            <ButtonLink href="/consulta">Fazer minha consulta grátis</ButtonLink>
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
              Um espaço íntimo para perguntas de amor, trabalho, dinheiro, família e espiritualidade.
            </p>
          </div>
        </div>
      </section>

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
            Comece com uma leitura parcial, criada a partir da sua pergunta, das cinco cartas do seu tiragem em cruz, do seu signo e do seu número de vida.
          </p>
          <ButtonLink href="/consulta">Fazer minha consulta grátis</ButtonLink>
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
            <div key={plan} className="mystic-border rounded-[8px] p-4 text-center">
              <Star className="mx-auto h-5 w-5 text-[#d9aa4f]" />
              <p className="mt-3 text-sm font-semibold">{plan}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 max-w-sm">
          <ButtonLink href="/ofertas" variant="dark">
            Ver ofertas
          </ButtonLink>
        </div>
      </Section>

      <Section title="FAQ" eyebrow="clareza">
        <div className="grid gap-4">
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
