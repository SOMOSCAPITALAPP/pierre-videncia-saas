import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pierre Videncia — Tarot, Amor e Clareza Espiritual",
  description:
    "Leituras simbólicas com Tarô de Marselha, numerologia e astrologia para trazer clareza ao seu momento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
