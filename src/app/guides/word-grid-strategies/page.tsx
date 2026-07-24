import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Word Grid Strategies — Score Higher Every Game",
  description:
    "Advanced strategies for word grid and Boggle-style puzzles. Learn scoring optimization, time management, and word patterns to maximize your score.",
  alternates: { canonical: "/guides/word-grid-strategies" },
  openGraph: {
    title: "Word Grid Strategies — Score Higher Every Game",
    description:
      "Scoring curve analysis, time management, and word families to maximize your score.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Word Grid Strategies: Score Higher Every Game",
  description:
    "Advanced strategies for word grid puzzles: scoring optimization, time management, and word patterns.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-19",
  dateModified: "2026-07-24",
  mainEntityOfPage: "https://wordgrid.games/guides/word-grid-strategies/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: "https://wordgrid.games/" },
    { "@type": "ListItem", position: 2, name: "Guides", item: "https://wordgrid.games/guides/" },
    { "@type": "ListItem", position: 3, name: "Word Grid Strategies" },
  ],
};

export default function Guide2() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <header className="mb-8">
              <nav className="text-sm text-text-dim flex items-center gap-2">
                <a href="/" className="hover:text-text">Home</a>
                <span>/</span>
                <a href="/guides/" className="hover:text-text">Guides</a>
              </nav>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                Word Grid Strategies: Score Higher Every Game
              </h1>
              <p className="text-text-muted">5 min read &middot; Updated July 24, 2026</p>
            </header>

            <section className="space-y-6 text-text max-w-3xl">
              <p className="leading-relaxed">
                If you are building toward higher scores, the two best companion pages
                are{" "}
                <Link href="/guides/how-to-find-more-words" className="text-primary hover:underline">
                  How to Find More Words
                </Link>{" "}
                and{" "}
                <Link href="/guides/most-common-boggle-words" className="text-primary hover:underline">
                  Most Common Boggle Words
                </Link>
                . Use them together with the live game on{" "}
                <Link href="/play" className="text-primary hover:underline">
                  /play
                </Link>
                .
              </p>
              <p className="leading-relaxed">
                If you are still learning the rules, step back to{" "}
                <Link href="/guides/boggle-rules-beginners" className="text-primary hover:underline">
                  Boggle Rules for Beginners
                </Link>
                . If you want the browser-game wording, try{" "}
                <Link href="/guides/play-word-grid-online" className="text-primary hover:underline">
                  Play Word Grid Online
                </Link>
                .
              </p>
              <p className="leading-relaxed">
                To translate strategy into score gains, keep the{" "}
                <Link href="/guides/boggle-scoring-sheet" className="text-primary hover:underline">
                  scoring sheet
                </Link>
                ,{" "}
                <Link href="/guides/boggle-dictionary" className="text-primary hover:underline">
                  dictionary guide
                </Link>
                , and{" "}
                <Link href="/solver" className="text-primary hover:underline">
                  solver
                </Link>
                in the same review cycle.
              </p>
            </section>

            <section className="mt-8 max-w-4xl">
              <h2 className="text-2xl font-semibold text-primary mb-3">
                Understand the Scoring Curve
              </h2>
              <div className="overflow-hidden rounded-3xl border border-border bg-surface/50">
                <table className="w-full text-sm">
                  <thead className="bg-bg/50">
                    <tr>
                      <th className="text-left py-2 px-4 text-text-muted">Length</th>
                      <th className="text-left py-2 px-4 text-text-muted">Points</th>
                      <th className="text-left py-2 px-4 text-text-muted">Value per letter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [3, 1], [4, 2], [5, 4], [6, 6], [7, 8], [8, 11],
                    ].map(([len, pts]) => (
                      <tr key={len} className="border-t border-border/70">
                        <td className="py-2 px-4">{len} letters</td>
                        <td className="py-2 px-4 text-primary font-semibold">{pts} pts</td>
                        <td className="py-2 px-4 text-text-dim">{(pts / len).toFixed(1)} pts/letter</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="leading-relaxed mt-3 text-text-muted">
                Notice: 5-letter words give the best value per letter. Aim for the 5-6
                sweet spot rather than chasing rare 7+ words.
              </p>
            </section>

            <section className="mt-8 space-y-6 text-text max-w-3xl">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-3">Time Management</h2>
                <ul className="space-y-2 ml-4">
                  <li>
                    <strong>0:00–0:30</strong> — Quick scan: grab all obvious 3-4 letter
                    words you can see immediately.
                  </li>
                  <li>
                    <strong>0:30–2:00</strong> — Deep search: extend found words with
                    prefixes and suffixes.
                  </li>
                  <li>
                    <strong>2:00–3:00</strong> — Final sweep: check plurals, verb tenses,
                    and remaining board edges.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-3">Word Families</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {["RATE → RATES, RATED, RATING", "STAR → STARS, STARRED, START, STARE", "POINT → POINTS, POINTED, POINTER", "FORM → FORMS, FORMED, REFORM"].map((line) => (
                    <div key={line} className="rounded-2xl bg-surface/50 border border-border px-4 py-3 font-mono text-sm">
                      {line}
                    </div>
                  ))}
                </div>
                <p className="leading-relaxed mt-3 text-text-muted">
                  One root word can generate 3-5 additional valid words. This is how
                  top scorers find 25+ words per game.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-3">Know Your Vowels</h2>
                <p className="leading-relaxed text-text-muted">
                  Vowel placement determines what&apos;s possible. If you see two vowels
                  adjacent, look for words that use both. If vowels are spread out,
                  focus on consonant clusters around each one independently.
                </p>
              </div>
            </section>

            <div className="mt-8 p-6 bg-indigo-900/30 rounded-3xl border border-indigo-800/50 max-w-4xl">
              <h2 className="text-xl font-semibold text-primary mb-2">Start Practicing</h2>
              <p className="text-text mb-4">
                The daily challenge resets every 24 hours, so it is a perfect place to
                build a habit.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="/daily"
                  className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
                >
                  Daily board
                </a>
                <a
                  href="/guides/how-to-find-more-words"
                  className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
                >
                  More Tips
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6 max-w-4xl">
              <h2 className="text-lg font-semibold mb-3">Best Next Pages</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/guides/boggle-tips-tricks" className="block bg-surface/50 hover:bg-surface transition rounded-2xl p-4">
                  <div className="font-semibold text-primary">Boggle Tips and Tricks</div>
                  <p className="text-sm text-text-muted mt-1">
                    Quick tactical habits you can use inside a live round.
                  </p>
                </Link>
                <Link href="/guides/most-common-boggle-words" className="block bg-surface/50 hover:bg-surface transition rounded-2xl p-4">
                  <div className="font-semibold text-primary">Most Common Boggle Words</div>
                  <p className="text-sm text-text-muted mt-1">
                    Frequency list that supports the scoring strategy in this guide.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
              <h2 className="text-2xl font-bold">Strategy at a glance</h2>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                Use this desktop rail to keep the big picture in view while you read
                through scoring, time management, and pattern habits.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">Quick drills</h2>
              <div className="mt-4 grid gap-2">
                <a href="/play" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Practice Play
                </a>
                <a href="/daily" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Daily Challenge
                </a>
                <a href="/solver" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Review Solver
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">Related reading</h2>
              <div className="mt-4 grid gap-2">
                <Link href="/guides/how-to-find-more-words" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Find more words
                </Link>
                <Link href="/guides/word-pattern-library" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Pattern library
                </Link>
                <Link href="/guides/boggle-strategy-guide" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Competitive guide
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
