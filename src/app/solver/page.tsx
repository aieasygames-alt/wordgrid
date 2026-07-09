import type { Metadata } from "next";
import Link from "next/link";
import SolverClient from "./SolverClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Solver — Find All Words in Any Grid",
  description:
    "Paste any 4x4 letter grid into the free Boggle solver. Find every valid word, compare scores, and review missed patterns to improve your game.",
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
      "Paste a 4x4 grid, solve it instantly, and review the highest-value words and missed patterns.",
    url: `${BASE_URL}/solver`,
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WordGrid Solver",
  applicationCategory: "Game",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online solver for 4x4 word grid puzzles with scoring breakdown and pattern review.",
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
        text: "Enter or paste a 4x4 letter grid, then click Solve. The solver finds every valid word, sorts them by score, and highlights the highest-value options first.",
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
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-[-6rem] top-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <article className="max-w-6xl mx-auto">
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
                Boggle Solver for Any 4x4 Grid
              </h1>
              <p className="mt-4 text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
                Paste a board, hit solve, and get every valid word with score
                ranking, length filters, and quick pattern review. It is the
                fastest way to turn a finished game into a learning session.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/play" className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover transition font-semibold">
                  Play a Round
                </Link>
                <Link href="/daily" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  Daily Challenge
                </Link>
                <Link href="/stats" className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-hover transition font-semibold">
                  My Stats
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
            </div>
          </div>
        </header>

        <SolverClient />

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
