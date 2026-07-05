import type { MetadataRoute } from "next";
import { INDEXABLE_WORDS } from "@/lib/worddata";

const BASE_URL = "https://wordgrid.games";
const SITE_UPDATED = new Date("2026-06-30");
const GUIDE_UPDATED = new Date("2026-06-29");
const WORDS_UPDATED = new Date("2026-07-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/play/`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/daily/`, lastModified: SITE_UPDATED, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/guides/`, lastModified: GUIDE_UPDATED, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/words/`, lastModified: WORDS_UPDATED, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/guides/how-to-find-more-words/`, lastModified: new Date("2026-06-19"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/word-grid-strategies/`, lastModified: new Date("2026-06-19"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-rules-beginners/`, lastModified: new Date("2026-06-20"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/word-grid-vs-boggle/`, lastModified: new Date("2026-06-20"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/play-word-grid-online/`, lastModified: new Date("2026-06-27"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/play-boggle-online-free/`, lastModified: new Date("2026-06-28"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-word-game/`, lastModified: new Date("2026-06-28"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-game-online/`, lastModified: new Date("2026-06-28"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-online-free/`, lastModified: new Date("2026-06-28"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/how-to-win-boggle/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-tips-tricks/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-strategy-guide/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-rules-printable/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-scoring-sheet/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-rules-for-kids/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-variants/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/advanced-boggle-strategies/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-word-lists/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/most-common-boggle-words/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-solver/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-generator/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides/boggle-dictionary/`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
  ];

  const wordPages: MetadataRoute.Sitemap = INDEXABLE_WORDS.map((w) => ({
    url: `${BASE_URL}/words/${w}/`,
    lastModified: WORDS_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...wordPages];
}
