import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ResultadoClient } from "./ResultadoClient";

export const metadata: Metadata = {
  title: "Resultado da leitura",
  robots: { index: false, follow: false },
};

export default function ResultadoPage() {
  return (
    <main>
      <Header />
      <ResultadoClient />
    </main>
  );
}
