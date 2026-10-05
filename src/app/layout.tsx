import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { pierreFacebookUrl } from "@/lib/contactLinks";
import { SITE_URL } from "@/lib/seoContent";
import "./globals.css";

const title = "Pierre Videncia — Tarot, Amor e Clareza Espiritual";
const description =
  "Receba uma orientação espiritual com Tarô de Marselha, numerologia e astrologia para amor, dinheiro, família, saúde emocional e decisões importantes.";
const shareImage = "/pierre-videncia-share-v3.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Pierre Videncia",
  },
  description,
  applicationName: "Pierre Videncia",
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    title: "Pierre Videncia",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/pwa-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/pwa-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Pierre Videncia",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: shareImage,
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
    images: [shareImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Pierre Videncia",
              url: SITE_URL,
              inLanguage: "pt-BR",
              description,
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${SITE_URL}/sobre-pierre#pierre`,
              name: "Pierre Videncia",
              url: `${SITE_URL}/sobre-pierre`,
              image: `${SITE_URL}${shareImage}`,
              jobTitle: "Tarólogo e numerólogo",
              description:
                "Tarólogo francês vivendo no Brasil, dedicado ao Tarot de Marselha, à numerologia e à astrologia simbólica.",
              knowsLanguage: ["pt-BR", "fr-FR"],
              knowsAbout: ["Tarot de Marselha", "Numerologia", "Astrologia simbólica", "Inteligência emocional"],
              sameAs: [pierreFacebookUrl],
            },
          ]}
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
