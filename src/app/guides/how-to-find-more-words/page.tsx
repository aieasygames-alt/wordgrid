import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Find More Words in Word Grid Puzzles",
  description:
    "Learn proven techniques to spot more words in word grid puzzles. Master prefix/suffix scanning, pattern recognition, and adjacency strategies.",
  alternates: { canonical: "/guides/how-to-find-more-words" },
  openGraph: {
    title: "How to Find More Words in Word Grid Puzzles",
    description:
      "Six proven techniques to spot more words — prefix scanning, plurals, Qu strategy, and more.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Find More Words in Word Grid Puzzles",
  description:
    "Six proven techniques to spot more words in word grid puzzles.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-19",
  dateModified: "2026-07-24",
  mainEntityOfPage: "https://wordgrid.games/guides/how-to-find-more-words/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: "https://wordgrid.games/" },
    { "@type": "ListItem", position: 2, name: "Guides", item: "https://wordgrid.games/guides/" },
    { "@type": "ListItem", position: 3, name: "How to Find More Words" },
  ],
};

export default function Guide1() {
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
      <article className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2">
            <a href="/" className="hover:text-text">Home</a>
            <span>/</span>
            <a href="/guides/" className="hover:text-text">Guides</a>
          </nav>
          <h1 className="text-4xl font-bold mt-4 mb-2">
            How to Find More Words in Word Grid Puzzles
          </h1>
          <p className="text-text-muted">6 min read &middot; Updated July 24, 2026</p>
        </header>

        <div className="prose prose-invert max-w-none space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              If you want to test these techniques immediately, jump into{" "}
              <Link href="/play" className="text-primary hover:underline">
                /play
              </Link>
              . If you want the word-frequency page that already earned clicks,
              read{" "}
              <Link href="/guides/most-common-boggle-words" className="text-primary hover:underline">
                Most Common Boggle Words
              </Link>
              .
            </p>
            <p className="leading-relaxed mt-3">
              Once you can spot more words reliably, the next step is{" "}
              <Link href="/guides/word-grid-strategies" className="text-primary hover:underline">
                Word Grid Strategies
              </Link>{" "}
              for scoring and{" "}
              <Link href="/guides/boggle-rules-beginners" className="text-primary hover:underline">
                the rules page
              </Link>{" "}
              if you want a reset.
            </p>
            <p className="leading-relaxed mt-3">
              For the full review loop, add the{" "}
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
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              1. Scan by Starting Letter
            </h2>
            <p className="leading-relaxed">
              Instead of randomly scanning the grid, pick one letter as your anchor
              and systematically explore all adjacent combinations. Start with rare
              letters like <strong>Q, Z, J, X</strong> — words containing these are
              often higher value and easier to spot because there are fewer of them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              2. Look for Common Prefixes and Suffixes
            </h2>
            <p className="leading-relaxed mb-3">Train yourself to recognize these patterns:</p>
            <ul className="space-y-1 ml-4">
              <li><strong>Prefixes:</strong> RE-, UN-, IN-, DIS-, OVER-, OUT-</li>
              <li><strong>Suffixes:</strong> -ING, -ED, -ER, -EST, -LY, -TION</li>
              <li><strong>Endings:</strong> -E, -S, -Y (can turn a 3-letter word into 4-5)</li>
            </ul>
            <p className="leading-relaxed mt-3">
              If you found &ldquo;PLAY&rdquo;, immediately check if PLAYING, PLAYED, PLAYS,
              or PLAYER are also on the board.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              3. The &ldquo;Qu&rdquo; Strategy
            </h2>
            <p className="leading-relaxed">
              The Qu tile counts as a single cell but produces two letters. Look for
              words that commonly pair with QU: QUIT, QUEST, QUIET, QUOTE, EQUATION.
              Since Qu is rare, these words are often missed by other players.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              4. Go for Length Over Quantity
            </h2>
            <p className="leading-relaxed">
              In WordGrid scoring, longer words are exponentially more valuable:
              a 5-letter word (4 pts) is worth as much as four 3-letter words.
              A 7-letter word (8 pts) beats eight 3-letter words. Once you spot a
              4-letter base, always check if you can extend it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              5. Plurals Are Free Points
            </h2>
            <p className="leading-relaxed">
              If you found a noun, check if an S is adjacent — that&apos;s an instant
              extra point for the plural form. CAT → CATS, DOG → DOGS, STAR → STARS.
              This is the single easiest way to boost your score.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              6. Diagonal Awareness
            </h2>
            <p className="leading-relaxed">
              Many players only scan horizontally and vertically. Remember: in
              WordGrid, diagonals count! Practice seeing 8 directions from each cell.
              Diagonal words are often the ones your opponents miss.
            </p>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Ready to Practice?
            </h2>
            <p className="text-text mb-4">
              Put these strategies to work in a real game.
            </p>
            <div className="flex gap-3">
              <a
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play
              </a>
              <a
                href="/daily"
                className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Daily
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Next Pages</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/guides/word-grid-strategies" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Word Grid Strategies</div>
                <p className="text-sm text-text-muted mt-1">
                  Learn how to convert these tips into points and better timing.
                </p>
              </Link>
              <Link href="/guides/most-common-boggle-words" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Most Common Boggle Words</div>
                <p className="text-sm text-text-muted mt-1">
                  Repeated patterns and high-frequency words to memorize visually.
                </p>
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link href="/guides/most-common-boggle-words/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Most Common Boggle Words &rarr;</div>
                <div className="text-sm text-text-muted">Use the high-frequency list to train faster recognition.</div>
              </Link>
              <a href="/guides/word-grid-strategies/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Word Grid Strategies: Score Higher Every Game &rarr;</div>
                <div className="text-sm text-text-muted">Scoring curve analysis, time management, and word families.</div>
              </a>
              <a href="/guides/boggle-rules-beginners/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Boggle Rules: A Complete Beginner&apos;s Guide &rarr;</div>
                <div className="text-sm text-text-muted">New to word grid games? Start here for the full rules breakdown.</div>
              </a>
              <a href="/play/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Play &rarr;</div>
                <div className="text-sm text-text-muted">Practice these techniques in a live round.</div>
              </a>
              <a href="/guides/" className="block text-sm text-text-dim hover:text-text">
                Browse all guides &rarr;
              </a>
            </div>
          </div>
        </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
              <h2 className="text-2xl font-bold">Find more words faster</h2>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                Keep the right-side rail visible on desktop so the six techniques and
                the practice links stay in one reading flow.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">Practice now</h2>
              <div className="mt-4 grid gap-2">
                <a href="/play/" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Play now
                </a>
                <a href="/daily/" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Daily board
                </a>
                <a href="/guides/word-grid-strategies/" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Score higher
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">Next reads</h2>
              <div className="mt-4 grid gap-2">
                <a href="/guides/most-common-boggle-words/" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Common words
                </a>
                <a href="/guides/boggle-rules-beginners/" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Rules refresher
                </a>
                <a href="/guides/word-grid-vs-boggle/" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Compare with Boggle
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
