import { Header } from "@/components/Header";
import { ConsultationForm } from "./ConsultationForm";

export default function ConsultaPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-3xl px-5 py-8">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">consulta grátis</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">Abra sua leitura espiritual</h1>
        <p className="font-ui mt-4 leading-7 text-[#fff7df]/72">
          Escreva sua pergunta com calma. Pierre fará uma primeira leitura simbólica com cinco cartas, signo e número de vida.
        </p>
        <ConsultationForm />
      </section>
    </main>
  );
}
