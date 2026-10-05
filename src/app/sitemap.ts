import type { MetadataRoute } from "next";
import { guides, SITE_URL } from "@/lib/seoContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-10-05T00:00:00-03:00");
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: updatedAt, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/consulta`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/ofertas`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guias`, lastModified: updatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/sobre-pierre`, lastModified: updatedAt, changeFrequency: "monthly", priority: 0.7 },
  ];

  return [
    ...staticPages,
    ...guides.map((guide) => ({
      url: `${SITE_URL}/guias/${guide.slug}`,
      lastModified: new Date(`${guide.updatedAt}T00:00:00-03:00`),
      changeFrequency: "monthly" as const,
      priority: guide.showArcana ? 0.9 : 0.8,
    })),
  ];
}
