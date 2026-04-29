import { Header } from "@/components/Header";
import { ChatClient } from "./ChatClient";

export default function ChatPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto w-full max-w-3xl px-5 py-8">
        <p className="font-ui text-sm font-semibold uppercase tracking-[0.18em] text-[#d9aa4f]">chat espiritual</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">Converse com Pierre dentro da aplicação</h1>
        <p className="font-ui mt-4 leading-7 text-[#fff7df]/72">
          Use este espaço para aprofundar sua dúvida com uma orientação simbólica. O WhatsApp fica reservado para leituras premium, comprovantes Pix e acompanhamento.
        </p>
        <ChatClient />
      </section>
    </main>
  );
}
