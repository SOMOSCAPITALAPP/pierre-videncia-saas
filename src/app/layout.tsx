import type { Metadata } from "next";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pierre-videncia-saas.vercel.app";
const title = "Pierre Videncia — Tarot, Amor e Clareza Espiritual";
const description =
  "Receba uma orientação espiritual com Tarô de Marselha, numerologia e astrologia. Uma leitura acolhedora para trazer clareza ao seu momento, sem promessas absolutas.";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: appUrl,
    siteName: "Pierre Videncia",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pierre Videncia — Tarot, Amor e Clareza Espiritual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
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
