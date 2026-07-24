import type { MetadataRoute } from "next";
import { getDailyArchiveDates } from "@/lib/daily-archive";
import { INDEXABLE_WORDS } from "@/lib/worddata";

const BASE_URL = "https://wordgrid.games";
const SITE_UPDATED = new Date("2026-07-24");
const GUIDE_UPDATED = new Date("2026-07-24");
const WORDS_UPDATED = new Date("2026-07-24");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/play/`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/zen/`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.82 },
    { url: `${BASE_URL}/daily/`, lastModified: SITE_UPDATED, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/challenge/`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.72 },
    { url: `${BASE_URL}/daily/archive/`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/solver/`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/guides/`, lastModified: GUIDE_UPDATED, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/words/`, lastModified: WORDS_UPDATED, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/guides/word-pattern-library/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.84 },
    { url: `${BASE_URL}/guides/prefix-strategy/`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.78 },
    { url: `${BASE_URL}/guides/suffix-strategy/`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.78 },
    { url: `${BASE_URL}/guides/qu-strategy/`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.78 },
    { url: `${BASE_URL}/guides/how-to-find-more-words/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/word-grid-strategies/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-rules-beginners/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/word-grid-vs-boggle/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/play-word-grid-online/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/play-boggle-online-free/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-word-game/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-game-online/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-online-free/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/how-to-win-boggle/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-tips-tricks/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-strategy-guide/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-rules-printable/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-scoring-sheet/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-rules-for-kids/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-variants/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/advanced-boggle-strategies/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-word-lists/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.84 },
    { url: `${BASE_URL}/guides/most-common-boggle-words/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.86 },
    { url: `${BASE_URL}/guides/boggle-solver/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-generator/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-dictionary/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.83 },
  ];

  const wordPages: MetadataRoute.Sitemap = INDEXABLE_WORDS.map((w) => ({
    url: `${BASE_URL}/words/${w}/`,
    lastModified: WORDS_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const archivePages: MetadataRoute.Sitemap = getDailyArchiveDates().map((date) => ({
    url: `${BASE_URL}/daily/archive/${date}/`,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly",
    priority: 0.72,
  }));

  return [...staticPages, ...archivePages, ...wordPages];
}
