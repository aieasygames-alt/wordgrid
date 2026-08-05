import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Word Grid vs Word Search vs Crossword: Key Differences",
  description:
    "Compare word grid games, word search puzzles, and crossword puzzles. Learn the rules, goals, and best free online option for each puzzle type before you play.",
  alternates: { canonical: "/guides/word-grid-vs-word-search" },
  keywords: [
    "word grid vs word search",
    "word grid vs crossword",
    "word grid game",
    "word search puzzle",
    "crossword puzzle",
    "online word puzzle",
  ],
  openGraph: {
    title: "Word Grid vs Word Search vs Crossword: Key Differences",
    description:
      "A simple comparison of word grid games, word search puzzles, and crosswords so you can pick the right online word puzzle.",
    url: `${BASE_URL}/guides/word-grid-vs-word-search/`,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Word Grid vs Word Search vs Crossword: Key Differences",
  description:
    "A comparison of word grid games, word search puzzles, and crossword puzzles, including rules, goals, and player intent.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-08-04",
  dateModified: "2026-08-05",
  mainEntityOfPage: `${BASE_URL}/guides/word-grid-vs-word-search/`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "WordGrid", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Word Grid vs Word Search" },
  ],
};

const comparison = [
  {
    type: "Word grid game",
    goal: "Find as many hidden words as possible by connecting adjacent letters.",
    input: "A square grid of letters, usually 4x4 or larger.",
    bestFor: "Fast pattern scanning, vocabulary practice, and score chasing.",
    play: "/play",
  },
  {
    type: "Word search puzzle",
    goal: "Find a fixed list of words hidden in a letter field.",
    input: "A large grid plus a word bank or clue list.",
    bestFor: "Relaxed visual scanning and themed vocabulary lists.",
    play: "",
  },
  {
    type: "Crossword puzzle",
    goal: "Fill answers into numbered boxes from written clues.",
    input: "A clue list and an interlocking answer grid.",
    bestFor: "Clue solving, trivia, definitions, and lateral thinking.",
    play: "",
  },
];

export default function WordGridVsWordSearchGuide() {
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
              <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
                <Link href="/" className="hover:text-text">WordGrid</Link>
                <span>/</span>
                <Link href="/guides/" className="hover:text-text">Guides</Link>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                Word Grid vs Word Search vs Crossword
              </h1>
              <p className="text-text-muted">6 min read &middot; Updated August 5, 2026</p>
            </header>

            <section className="space-y-5 text-text max-w-3xl">
              <p className="leading-relaxed">
                A <strong>word grid game</strong>, a word search puzzle, and a
                crossword all use letters in a grid, but they ask your brain to do
                different things. WordGrid is closest to Boggle: you connect
                adjacent letters and create words from the board itself.
              </p>
              <p className="leading-relaxed">
                A word search gives you the answers first and asks you to locate
                them. A crossword gives you clues and asks you to infer the answers.
                A word grid game gives you only letters, a timer, and the challenge
                of finding every valid word you can see.
              </p>
              <p className="leading-relaxed">
                If you want to play that style now, open{" "}
                <Link href="/play" className="text-primary hover:underline">
                  WordGrid online
                </Link>
                . If you are comparing rules, the sections below make the differences
                clear.
              </p>
            </section>

            <section className="mt-8 max-w-5xl">
              <h2 className="text-2xl font-semibold text-primary mb-3">
                Quick Comparison
              </h2>
              <div className="overflow-x-auto rounded-3xl border border-border bg-surface/50">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="bg-bg/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-text-muted">Puzzle type</th>
                      <th className="text-left px-4 py-3 text-text-muted">Goal</th>
                      <th className="text-left px-4 py-3 text-text-muted">What you start with</th>
                      <th className="text-left px-4 py-3 text-text-muted">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.type} className="border-t border-border/70 align-top">
                        <td className="px-4 py-3 font-semibold">{row.type}</td>
                        <td className="px-4 py-3 text-text-muted">{row.goal}</td>
                        <td className="px-4 py-3 text-text-muted">{row.input}</td>
                        <td className="px-4 py-3 text-text-muted">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-8 space-y-7 text-text max-w-3xl">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  What Makes a Word Grid Game Different?
                </h2>
                <p className="leading-relaxed text-text-muted">
                  In a word grid game, the board is the puzzle and the dictionary is
                  the judge. You choose a starting tile, move to adjacent tiles, and
                  build words without reusing the same tile in one word. The challenge
                  is not finding a prewritten answer list. It is discovering as many
                  valid words as possible before time runs out.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  When Should You Play Word Search Instead?
                </h2>
                <p className="leading-relaxed text-text-muted">
                  Choose a word search puzzle when you want a calmer task with a
                  known word bank. Word searches are especially good for themed lists,
                  classroom vocabulary, and slow visual scanning. They are less about
                  inventing answers from the board and more about locating answers that
                  are already listed.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  When Is a Crossword Better?
                </h2>
                <p className="leading-relaxed text-text-muted">
                  Crosswords are clue-first puzzles. They reward definitions,
                  references, wordplay, and crossing letters. If you enjoy solving
                  riddles and filling exact answers, crosswords are the better fit. If
                  you want quick letter-path scanning, a word grid game is faster to
                  start.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                <h2 className="text-xl font-semibold mb-2">Best Next Step</h2>
                <p className="text-sm text-text-muted leading-relaxed">
                  Start with the live game, then use the solver after a round to see
                  which words you missed.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <Link href="/play" className="px-3 py-1.5 rounded-full bg-primary/15 text-primary hover:bg-primary/20 transition">
                    Play WordGrid
                  </Link>
                  <Link href="/solver" className="px-3 py-1.5 rounded-full bg-surface hover:bg-surface-hover transition">
                    Word Grid Solver
                  </Link>
                  <Link href="/guides/word-grid-vs-boggle" className="px-3 py-1.5 rounded-full bg-surface hover:bg-surface-hover transition">
                    Word Grid vs Boggle
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
              <h2 className="text-2xl font-bold">Quick take</h2>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                WordGrid is a word grid game, not a traditional word search or
                crossword. You create words by connecting adjacent letters.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">Related pages</h2>
              <div className="mt-4 grid gap-2">
                <Link href="/play" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Play Word Grid Online
                </Link>
                <Link href="/guides/play-word-grid-online" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Play Word Grid Guide
                </Link>
                <Link href="/guides/boggle-rules-beginners" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Rules for Beginners
                </Link>
                <Link href="/solver" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Word Grid Solver
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
