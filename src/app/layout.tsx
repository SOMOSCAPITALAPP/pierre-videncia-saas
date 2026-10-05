import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { pierreFacebookUrl } from "@/lib/contactLinks";
import { SITE_NAME, SITE_URL } from "@/lib/seoContent";
import "./globals.css";

const title = "Clareza Tarô — Tarô online com Pierre Videncia";
const description =
  "Tarô online para amor, trabalho, família e decisões. Receba uma leitura de Tarot de Marselha com Pierre Videncia, em português do Brasil.";
const shareImage = "/opengraph-image";
const pierreImage = "/pierre-videncia-share-v3.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
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
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "Clareza Tarô — tarô online com Pierre Videncia",
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
              "@id": `${SITE_URL}/#website`,
              name: SITE_NAME,
              alternateName: ["Clareza Tarot", "clarezatarot.com"],
              url: SITE_URL,
              inLanguage: "pt-BR",
              description,
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: SITE_NAME,
              alternateName: "Clareza Tarot",
              url: SITE_URL,
              description: "Plataforma brasileira de tarô online com conteúdos e consultas conduzidas por Pierre Videncia.",
              logo: `${SITE_URL}/pwa-icon-512.png`,
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${SITE_URL}/sobre-pierre#pierre`,
              name: "Pierre Videncia",
              url: `${SITE_URL}/sobre-pierre`,
              image: `${SITE_URL}${pierreImage}`,
              jobTitle: "Tarólogo e numerólogo",
              description:
                "Tarólogo francês vivendo no Brasil e especialista da Clareza Tarô, dedicado ao Tarot de Marselha, à numerologia e à astrologia simbólica.",
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
