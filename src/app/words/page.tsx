import type { Metadata } from "next";
import Link from "next/link";
import { INDEXABLE_WORDS } from "@/lib/worddata";
import { WORD_LIST_PAGES } from "@/lib/word-lists";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Word Grid Word List — Search, Study, and Score",
  description:
    "Search curated Word Grid words, browse pattern-based word lists, and jump to high-value word pages.",
  alternates: { canonical: "/words" },
  openGraph: {
    title: "Word Grid Word List — Search, Study, and Score",
    description:
      "A searchable Word Grid word list with patterns, scores, and quick links to related study pages.",
    url: `${BASE_URL}/words`,
  },
};

function getPoints(length: number) {
  if (length === 3) return 1;
  if (length === 4) return 2;
  if (length === 5) return 4;
  if (length === 6) return 6;
  return 8;
}

const groupedWords = INDEXABLE_WORDS.reduce<Record<string, string[]>>((groups, word) => {
  const letter = word[0].toUpperCase();
  groups[letter] = groups[letter] || [];
  groups[letter].push(word);
  return groups;
}, {});

const lengthBuckets = [
  { label: "3 letters", href: "/words/3-letter-boggle-words/", count: INDEXABLE_WORDS.filter((word) => word.length === 3).length },
  { label: "4 letters", href: "/words/4-letter-boggle-words/", count: INDEXABLE_WORDS.filter((word) => word.length === 4).length },
  { label: "5 letters", href: "/words/5-letter-boggle-words/", count: INDEXABLE_WORDS.filter((word) => word.length === 5).length },
  { label: "Qu words", href: "/words/words-with-qu/", count: INDEXABLE_WORDS.filter((word) => word.includes("qu")).length },
];

export default function WordsIndex() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "WordGrid word list",
    itemListElement: INDEXABLE_WORDS.map((word, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BASE_URL}/words/${word}/`,
      name: word.toUpperCase(),
    })),
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <article className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <header className="mb-8">
              <Link href="/" className="text-sm text-text-dim hover:text-text">
                WordGrid
              </Link>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                Word List
              </h1>
              <p className="mt-4 max-w-3xl text-text-muted leading-relaxed">
                Search curated words, jump into pattern lists, and open individual
                word pages to study score value and recognition cues.
              </p>
            </header>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 mb-8">
              {[
                ["Curated words", `${INDEXABLE_WORDS.length}`],
                ["Pattern lists", `${WORD_LIST_PAGES.length}`],
                ["Fast study", "Search + jump"],
                ["Scoring", "1-8 pts"],
              ].map(([label, value]) => (
                <div key={label} className="bg-surface/50 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-text-muted uppercase">{label}</div>
                </div>
              ))}
            </section>

            <section className="mb-10 rounded-3xl border border-border bg-surface/40 p-5 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Quick study paths</h2>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {lengthBuckets.map((bucket) => (
                  <Link
                    key={bucket.href}
                    href={bucket.href}
                    className="rounded-2xl bg-bg/60 p-4 hover:bg-surface transition"
                  >
                    <div className="font-semibold text-primary">{bucket.label}</div>
                    <div className="mt-1 text-sm text-text-muted">{bucket.count} pages</div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Pattern Lists</h2>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {WORD_LIST_PAGES.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/words/${page.slug}/`}
                    className="block rounded-2xl border border-border bg-surface/50 p-4 transition hover:bg-surface"
                  >
                    <h3 className="font-semibold text-primary">{page.h1}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {page.description}
                    </p>
                    <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-text-dim">
                      {page.words.length} examples
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">Common Words</h2>
                  <p className="text-sm text-text-muted mt-1">
                    Open a word page to study length, score, and related patterns.
                  </p>
                </div>
                <Link href="/guides/boggle-dictionary" className="text-sm text-primary hover:underline">
                  Dictionary guide
                </Link>
              </div>
              <div className="space-y-8">
                {Object.entries(groupedWords).map(([letter, words]) => (
                  <div key={letter}>
                    <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
                      {letter}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {words.map((word) => (
                        <Link
                          key={word}
                          href={`/words/${word}/`}
                          className="block bg-surface/50 hover:bg-surface transition rounded-2xl p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-lg font-semibold">
                              {word.toUpperCase()}
                            </span>
                            <span className="text-xs text-primary font-semibold">
                              {getPoints(word.length)} pts
                            </span>
                          </div>
                          <p className="text-xs text-text-muted mt-1">
                            {word.length} letters · definition and game notes
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <nav className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-5 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play
              </Link>
              <Link
                href="/solver"
                className="px-5 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Solve
              </Link>
              <Link
                href="/guides"
                className="px-5 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Learn
              </Link>
            </nav>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
              <h2 className="text-2xl font-bold">Study smarter</h2>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                Use the list as a quick lookup table, then jump to the related
                word page or guide to study why the word matters in play.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">Fast links</h2>
              <div className="mt-4 grid gap-2">
                <Link href="/words/common-boggle-words/" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Common Boggle words
                </Link>
                <Link href="/words/words-with-qu/" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Words with Qu
                </Link>
                <Link href="/words/high-scoring-boggle-words/" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  High scoring words
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">What this page covers</h2>
              <ul className="mt-4 space-y-3 text-sm text-text-muted leading-relaxed">
                <li>Common game words grouped by first letter</li>
                <li>Pattern lists for faster scanning</li>
                <li>Click-through study pages for related terms</li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
