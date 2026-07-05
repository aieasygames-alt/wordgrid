import type { Metadata } from "next";

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
  dateModified: "2026-06-20",
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
    <main className="min-h-screen px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2">
            <a href="/" className="hover:text-text">Home</a>
            <span>/</span>
            <a href="/guides/" className="hover:text-text">Guides</a>
          </nav>
          <h1 className="text-4xl font-bold mt-4 mb-2">
            Word Grid Strategies: Score Higher Every Game
          </h1>
          <p className="text-text-muted">5 min read</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Understand the Scoring Curve
            </h2>
            <p className="leading-relaxed mb-3">
              WordGrid rewards length exponentially. Here&apos;s the breakdown:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Length</th>
                  <th className="text-left py-2 text-text-muted">Points</th>
                  <th className="text-left py-2 text-text-muted">Value per letter</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [3, 1], [4, 2], [5, 4], [6, 6], [7, 8], [8, 10],
                ].map(([len, pts]) => (
                  <tr key={len} className="border-b border-surface">
                    <td className="py-2">{len} letters</td>
                    <td className="py-2 text-primary font-semibold">{pts} pts</td>
                    <td className="py-2 text-text-dim">
                      {(pts / len).toFixed(1)} pts/letter
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              Notice: 5-letter words give the best value per letter (0.8). Aim for
              the 5-6 sweet spot rather than chasing rare 7+ words.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Time Management
            </h2>
            <p className="leading-relaxed mb-3">
              With 3 minutes on the clock, divide your time strategically:
            </p>
            <ul className="space-y-2 ml-4">
              <li>
                <strong>0:00–0:30</strong> — Quick scan: grab all obvious 3-4 letter
                words you can see immediately. Build momentum.
              </li>
              <li>
                <strong>0:30–2:00</strong> — Deep search: extend found words with
                prefixes/suffixes, hunt for 5+ letter words around rare letters.
              </li>
              <li>
                <strong>2:00–3:00</strong> — Final sweep: check plurals, verb tenses,
                and any remaining unexplored areas of the board.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Word Families
            </h2>
            <p className="leading-relaxed mb-3">
              When you find a word, think about its entire word family:
            </p>
            <div className="bg-surface/50 rounded-lg p-4 space-y-2 font-mono text-sm">
              <div>RATE → RATES, RATED, RATING</div>
              <div>STAR → STARS, STARRED, START, STARE</div>
              <div>POINT → POINTS, POINTED, POINTER</div>
              <div>FORM → FORMS, FORMED, REFORM</div>
            </div>
            <p className="leading-relaxed mt-3">
              One root word can generate 3-5 additional valid words. This is how top
              scorers find 25+ words per game.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Know Your Vowels
            </h2>
            <p className="leading-relaxed">
              Vowel placement determines what&apos;s possible. If you see two vowels
              adjacent, look for words that use both (RAIN, ROAD, TEAM). If vowels are
              spread out, focus on consonant clusters around each one independently.
            </p>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Start Practicing
            </h2>
            <p className="text-text mb-4">
              The daily challenge resets every 24 hours — perfect for building a habit.
            </p>
            <div className="flex gap-3">
              <a
                href="/daily"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Today&apos;s Challenge
              </a>
              <a
                href="/guides/how-to-find-more-words"
                className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                More Tips
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <a href="/guides/how-to-find-more-words/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">How to Find More Words in Word Grid Puzzles &rarr;</div>
                <div className="text-sm text-text-muted">Six techniques to spot more words on every board.</div>
              </a>
              <a href="/guides/word-grid-vs-boggle/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Word Grid vs Boggle: What&apos;s the Difference? &rarr;</div>
                <div className="text-sm text-text-muted">How online word grid games compare to classic Boggle.</div>
              </a>
              <a href="/guides/" className="block text-sm text-text-dim hover:text-text">
                Browse all guides &rarr;
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
