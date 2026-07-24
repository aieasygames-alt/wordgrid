import type { Metadata } from "next";
import Link from "next/link";
import { INDEXABLE_WORDS } from "@/lib/worddata";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "WordGrid Word List — Definitions, Scores & Game Words",
  description:
    "Browse common WordGrid words with meanings, word lengths, and scoring notes. Learn high-value words to spot faster in word grid and Boggle-style puzzles.",
  alternates: { canonical: "/words" },
  openGraph: {
    title: "WordGrid Word List — Definitions, Scores & Game Words",
    description:
      "A focused list of common WordGrid words with meanings, lengths, and game scoring notes.",
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
                &larr; WordGrid
              </Link>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                Word List
              </h1>
              <p className="mt-4 max-w-3xl text-text-muted leading-relaxed">
                Browse common words that appear in WordGrid puzzles. Each word page
                includes a definition, word length, score value, and related words
                to help you recognize patterns faster during a round.
              </p>
            </header>

            <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-8">
              <div className="bg-surface/50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-primary">
                  {INDEXABLE_WORDS.length}
                </div>
                <div className="text-xs text-text-muted uppercase">words</div>
              </div>
              <div className="bg-surface/50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-primary">3-5</div>
                <div className="text-xs text-text-muted uppercase">letters</div>
              </div>
              <div className="bg-surface/50 rounded-2xl p-4 col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold text-primary">1-4</div>
                <div className="text-xs text-text-muted uppercase">points</div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                Common WordGrid Words
              </h2>
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
                            {word.length} letters &middot; definition and game notes
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10 bg-surface/50 rounded-3xl p-5 sm:p-6">
              <h2 className="text-xl font-semibold mb-2">
                How to Use This List
              </h2>
              <p className="text-sm text-text-muted leading-relaxed mb-3">
                Short common words keep a game moving, but 5-letter words are where
                scoring starts to climb. Practice spotting endings, repeated letter
                pairs, and words that can be extended from a 3-letter base into a
                higher-value answer.
              </p>
              <Link href="/guides/how-to-find-more-words" className="text-sm text-primary hover:text-primary underline">
                Learn word-finding techniques
              </Link>
            </section>

            <nav className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-5 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play
              </Link>
              <Link
                href="/guides"
                className="px-5 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Read Guides
              </Link>
            </nav>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
              <h2 className="text-2xl font-bold">Browse smarter</h2>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                Use this list as a study sheet on desktop. Open one word page, then
                jump to related entries to see how a stem stretches across the list.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">Fast links</h2>
              <div className="mt-4 grid gap-2">
                <Link href="/play" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Start a game
                </Link>
                <Link href="/daily" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Open Daily
                </Link>
                <Link href="/solver" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Review a board
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">What this page covers</h2>
              <ul className="mt-4 space-y-3 text-sm text-text-muted leading-relaxed">
                <li>• Common game words grouped by first letter</li>
                <li>• Length-based scoring hints for faster scanning</li>
                <li>• Click-through detail pages for related terms</li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
