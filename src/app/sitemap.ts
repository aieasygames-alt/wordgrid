import type { MetadataRoute } from "next";
import { HIGH_VALUE_WORDS } from "@/lib/worddata";

const BASE_URL = "https://wordgrid.games";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/play/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/daily/`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/guides/how-to-find-more-words/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/word-grid-strategies/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const wordPages: MetadataRoute.Sitemap = HIGH_VALUE_WORDS.map((w) => ({
    url: `${BASE_URL}/words/${w}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...wordPages];
}
