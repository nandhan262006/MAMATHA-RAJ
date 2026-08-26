import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Bytespider",
  "Amazonbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
      ...AI_CRAWLERS.map((crawler) => ({
        userAgent: crawler,
        allow: "/",
        disallow: ["/admin"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
