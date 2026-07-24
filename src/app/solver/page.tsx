import type { Metadata } from "next";
import Link from "next/link";
import SolverClient from "./SolverClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Solver — Find All Words in Any Grid",
  description:
    "Paste any square letter grid into the free Boggle solver. Find every valid word, compare scores, and review missed patterns to improve your game.",
  alternates: { canonical: "/solver" },
  keywords: [
    "boggle solver",
    "word grid solver",
    "boggle word finder",
    "boggle helper",
    "find all words in boggle",
    "boggle grid solver",
    "word finder puzzle",
  ],
  openGraph: {
    title: "Boggle Solver — Find All Words in Any Grid",
    description:
      "Paste a square grid, solve it instantly, and review the highest-value words and missed patterns.",
    url: `${BASE_URL}/solver`,
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WordGrid Solver",
  url: `${BASE_URL}/solver/`,
  applicationCategory: "Game",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online solver for square word grid puzzles with scoring breakdown and pattern review.",
  dateModified: "2026-07-24",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I use the Boggle solver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter or paste a square letter grid, then click Solve. The solver finds every valid word, sorts them by score, and highlights the highest-value options first.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the solver after playing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The solver is best used after a game to review missed words, spot high-value patterns, and improve your next round.",
      },
    },
    {
      "@type": "Question",
      name: "Does the solver work on daily boards?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can load today's daily board or paste the grid from any round to see the full solution set and scoring breakdown.",
      },
    },
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <article className="mx-auto max-w-7xl">
        <header className="mb-8 sm:mb-10">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">
              WordGrid
            </Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-text">
              Guides
            </Link>
            <span>/</span>
            <span className="text-text">Solver</span>
          </nav>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-start">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Boggle Solver for Any Square Grid
              </h1>
              <p className="mt-4 text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
                Paste a board, hit solve, and get every valid word with score
                ranking, length filters, and quick pattern review. It is the
                fastest way to turn a finished game into a learning session.
              </p>
              <p className="mt-4 text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
                The cleanest workflow is:{" "}
                <Link href="/play" className="text-primary hover:underline">
                  play a round
                </Link>
                , review what counted in the{" "}
                <Link href="/guides/boggle-dictionary" className="text-primary hover:underline">
                  dictionary guide
                </Link>
                , compare the missed points in the{" "}
                <Link href="/guides/boggle-scoring-sheet" className="text-primary hover:underline">
                  scoring sheet
                </Link>
                , then come back here and solve the board.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold shadow-lg shadow-primary/20">
                  Play
                </Link>
                <Link href="/daily" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Daily
                </Link>
                <Link href="/stats" className="px-4 py-2 rounded-xl border border-border bg-transparent hover:bg-surface transition font-semibold text-text-muted hover:text-text">
                  Stats
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-2xl shadow-black/10">
              <div className="text-sm uppercase tracking-wide text-text-muted font-semibold">
                Why this page helps
              </div>
              <ul className="mt-3 space-y-3 text-sm text-text-muted leading-relaxed">
                <li>Find every word in any board after you play.</li>
                <li>Compare score density and high-value words at a glance.</li>
                <li>Use the daily board or any custom layout as input.</li>
              </ul>
              <div className="mt-4 rounded-2xl bg-bg/60 p-4 text-sm text-text-muted leading-relaxed">
                Open the solver after a round, not during it. That keeps the
                learning loop clear and makes the next play session more useful.
              </div>
            </div>
          </div>
        </header>

        <SolverClient />

        <section className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Best Way to Use the Solver</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-text-muted leading-relaxed">
              <li>Play first on `/play` or the Daily board so the review stays honest.</li>
              <li>Paste the finished grid or load today&apos;s board inside the solver.</li>
              <li>Check the highest-value words before reading the full list.</li>
              <li>Use the missing patterns as your next practice target.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold">Related Pages</h2>
            <div className="mt-4 grid gap-3">
              <Link href="/guides/boggle-rules-beginners" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                Boggle Rules for Beginners
              </Link>
              <Link href="/guides/boggle-scoring-sheet" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                Boggle Scoring Sheet
              </Link>
              <Link href="/guides/boggle-dictionary" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                Boggle Dictionary
              </Link>
              <Link href="/guides/boggle-solver" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                Solver Guide
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface/50 border border-border p-5">
            <h2 className="font-semibold text-primary">Solve faster</h2>
            <p className="text-sm text-text-muted mt-2 leading-relaxed">
              A solver helps you see the full board logic after the round,
              which makes the next game easier to scan.
            </p>
          </div>
          <div className="rounded-2xl bg-surface/50 border border-border p-5">
            <h2 className="font-semibold text-primary">Learn patterns</h2>
            <p className="text-sm text-text-muted mt-2 leading-relaxed">
              Use the output to spot prefixes, suffixes, Qu words, and long
              word paths you missed.
            </p>
          </div>
          <div className="rounded-2xl bg-surface/50 border border-border p-5">
            <h2 className="font-semibold text-primary">Practice smarter</h2>
            <p className="text-sm text-text-muted mt-2 leading-relaxed">
              Pair the solver with the daily challenge or a random board to
              build a sharper recognition habit.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
