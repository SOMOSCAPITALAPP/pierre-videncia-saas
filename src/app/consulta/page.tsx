import { Header } from "@/components/Header";
import { ConsultationForm } from "./ConsultationForm";

export default function ConsultaPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-3xl px-5 py-8">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">consulta grátis</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">Vamos entender o que está pesando no seu coração</h1>
        <p className="font-ui mt-4 leading-7 text-[#fff7df]/72">
          Responda poucos passos. Pierre fará uma primeira leitura simbólica com cinco cartas, signo e número de vida. Você escolhe se quer seguir apenas com a orientação grátis ou aprofundar depois.
        </p>
        <ConsultationForm />
      </section>
    </main>
  );
}
