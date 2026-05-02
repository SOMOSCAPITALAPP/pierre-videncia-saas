import { Header } from "@/components/Header";
import { ConsultationForm } from "./ConsultationForm";

export default function ConsultaPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-3xl px-5 py-8">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">consulta grátis</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">Abra uma primeira clareza sobre o seu momento</h1>
        <p className="font-ui mt-4 leading-7 text-[#fff7df]/72">
          Responda poucos passos. Pierre fará uma leitura simbólica com cinco cartas, signo e número de vida. Você recebe um primeiro sinal e decide, com calma, se deseja aprofundar.
        </p>
        <ConsultationForm />
      </section>
    </main>
  );
}
