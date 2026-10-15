import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seoContent";

const privatePaths = ["/admin", "/api/", "/chat", "/pix", "/resultado"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: privatePaths },
      { userAgent: "ChatGPT-User", allow: "/", disallow: privatePaths },
      { userAgent: "GPTBot", allow: "/", disallow: privatePaths },
      { userAgent: "ClaudeBot", allow: "/", disallow: privatePaths },
      { userAgent: "PerplexityBot", allow: "/", disallow: privatePaths },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
