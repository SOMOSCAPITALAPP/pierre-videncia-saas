import { Header } from "@/components/Header";
import { ResultadoClient } from "./ResultadoClient";

export default function ResultadoPage() {
  const whatsapp = process.env.WHATSAPP_NUMBER || "";

  return (
    <main>
      <Header />
      <ResultadoClient whatsappNumber={whatsapp} />
    </main>
  );
}
