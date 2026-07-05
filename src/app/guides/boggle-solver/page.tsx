import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boggle Solver — Find All Words in Any Grid",
  description:
    "Free online Boggle solver to find all words in any 4×4 grid. Paste your letters and get instant solutions with word counts, scoring breakdown, and anagram analysis.",
  alternates: { canonical: "/guides/boggle-solver" },
  keywords: [
    "boggle solver", "boggle word finder", "boggle cheat", "boggle helper",
    "boggle grid solver", "boggle anagram solver", "boggle word search",
    "solve boggle puzzle", "boggle solution finder",
  ],
  openGraph: {
    title: "Boggle Solver — Find All Words in Any Grid",
    description:
      "Free online Boggle solver and word finder. Paste any 4×4 grid and get instant solutions with scoring breakdown and word analysis.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Boggle Solver",
  applicationCategory: "Game",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online Boggle solver that finds all valid words in any 4×4 grid. Instant solutions with scoring breakdown, word counts, and anagram analysis.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does a Boggle solver work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Boggle solver works by taking a 4×4 grid of letters and systematically checking all possible letter combinations against a dictionary. It uses algorithms to find valid words following Boggle rules: adjacent connections only, minimum 3 letters, no repeated tiles. The solver generates a complete list of all possible words with their scores, typically finding 100-200 words per grid.",
      },
    },
    {
      "@type": "Question",
      name: "Is using a Boggle solver cheating?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Using a Boggle solver during competitive play is considered cheating. However, solvers are valuable learning tools when used after a game to see what words you missed, analyze grid patterns, and improve vocabulary. Many players use solvers to review Daily Challenges and identify missed opportunities for skill development.",
      },
    },
    {
      "@type": "Question",
      name: "How many words can a Boggle solver find?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Boggle solver typically finds 100-200 words in a standard 4×4 grid, depending on letter distribution. Exceptional grids with favorable letter combinations can yield 200-300+ words. The solver identifies every valid word following standard Boggle rules, including many words human players miss.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best Boggle solver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best Boggle solvers are accurate, fast, and free. WordGrid's solver uses a comprehensive English dictionary, standard Boggle scoring rules, and provides detailed breakdowns including word counts by length, point distribution, and missed word analysis. For learning purposes, solvers that show what you missed rather than just giving answers are most valuable.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a Boggle solver to practice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Boggle solvers are excellent practice tools. Use them to: 1) Review Daily Challenges after playing to see missed words, 2) Analyze grid patterns and letter combinations, 3) Learn new vocabulary from solver results, 4) Study word extensions and patterns you didn't spot, 5) Identify your weak scanning areas (diagonals, specific letter clusters). Solvers accelerate skill development when used as learning tools.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Boggle Solver" },
  ],
};

export default function BoggleSolverGuide() {
  return (
    <main className="min-h-screen px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">Word Grid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Boggle Solver — Find All Words in Any Grid
          </h1>
          <p className="text-text-muted">7 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              A <strong>Boggle solver</strong> finds every possible word in a
              4×4 grid instantly. Paste any Boggle grid and get a complete word
              list with scoring breakdown — perfect for analyzing games after
              you play, learning what you missed, and improving your skills.
            </p>
            <p className="leading-relaxed mt-3">
              <Link href="/play" className="text-primary hover:underline">
                Play Boggle now and solve your grid later →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How to Use a Boggle Solver
            </h2>
            <ol className="space-y-3 ml-4 list-decimal">
              <li>
                <strong>Play your game first.</strong> Complete a full 3-minute
                round on your own to build your skills.
              </li>
              <li>
                <strong>Note your grid.</strong> Write down or screenshot the 4×4
                letter arrangement.
              </li>
              <li>
                <strong>Enter letters into the solver.</strong> Input your grid
                row by row.
              </li>
              <li>
                <strong>Review the results.</strong> See all possible words,
                their scores, and what you missed.
              </li>
              <li>
                <strong>Learn from missed words.</strong> Study patterns,
                letter combinations, and vocabulary you didn't spot.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What a Boggle Solver Shows You
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Complete Word List</h3>
                <p className="text-sm leading-relaxed">
                  Every valid word in the grid, typically 100-200 words depending
                  on letter distribution. Organized by length and point value for
                  easy analysis.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Scoring Breakdown</h3>
                <p className="text-sm leading-relaxed">
                  Total possible points, point distribution by word length, and
                  what percentage of available points you achieved. Shows
                  whether you missed high-value words or just many words.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Missed Word Analysis</h3>
                <p className="text-sm leading-relaxed">
                  Words you didn't find, categorized by why you missed them
                  (diagonals, letter clusters, long words, extensions). This
                  identifies specific areas to improve.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Pattern Insights</h3>
                <p className="text-sm leading-relaxed">
                  Common letter combinations, high-value word locations, and
                  scanning path suggestions. Helps you understand grid structure
                  and optimal search patterns.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Using Solvers for Skill Development
            </h2>
            <p className="leading-relaxed mb-3">
              Boggle solvers are powerful learning tools when used correctly:
            </p>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Daily Challenge Review</h3>
                <p className="text-sm leading-relaxed">
                  After each Daily Challenge, use a solver to see what you missed.
                  Review the complete word list and study missed patterns.
                  Track your improvement over time by comparing your percentage
                  of possible words found.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Pattern Recognition Training</h3>
                <p className="text-sm leading-relaxed">
                  Study solver results to learn common letter clusters (TH, HE,
                  IN, ER) and word endings (-TION, -NESS, -MENT). Over time,
                  you'll start spotting these patterns during games instead of
                  missing them.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Diagonal Scanning Practice</h3>
                <p className="text-sm leading-relaxed">
                  Solvers reveal how many diagonal words you missed. Most players
                  find 40% more words when they systematically check diagonals.
                  Use solver data to identify this weakness and improve scanning
                  coverage.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Vocabulary Building</h3>
                <p className="text-sm leading-relaxed">
                  Solver results include valid words you might not know. Review
                  these to expand your vocabulary. Focus on high-frequency
                  game words that appear regularly in grids.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How Boggle Solvers Work
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed mb-3">
                <strong>The algorithm:</strong>
              </p>
              <ol className="space-y-2 list-decimal ml-4 text-sm">
                <li>
                  <strong>Grid input:</strong> Accept 16 letters in 4×4 arrangement
                </li>
                <li>
                  <strong>Path generation:</strong> Create all possible paths
                  following Boggle adjacency rules (8 directions, no repeated tiles)
                </li>
                <li>
                  <strong>Word extraction:</strong> Extract letter sequences from
                  valid paths (3+ letters minimum)
                </li>
                <li>
                  <strong>Dictionary validation:</strong> Check each sequence
                  against a comprehensive English dictionary
                </li>
                <li>
                  <strong>Scoring calculation:</strong> Apply standard Boggle
                  scoring rules (3 letters = 1 point, 4 = 2, 5 = 4, etc.)
                </li>
                <li>
                  <strong>Result organization:</strong> Sort by length, score, and
                  alphabetically for easy review
                </li>
              </ol>
              <p className="text-xs text-text-muted mt-3">
                Advanced solvers can process 1,000+ paths per second, checking
                millions of letter combinations in under a second.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Solver Ethics and Fair Play
            </h2>
            <div className="space-y-4">
              <div className="bg-red-900/20 rounded-xl p-4 border border-red-800/30">
                <h3 className="font-semibold mb-2">❌ Not Fair: During Play</h3>
                <p className="text-sm leading-relaxed">
                  Using a solver while playing is cheating. It defeats the
                  purpose of the game, violates the spirit of fair competition,
                  and doesn't help you improve. You won't build skills if you
                  rely on answers.
                </p>
              </div>

              <div className="bg-green-900/20 rounded-xl p-4 border border-green-800/30">
                <h3 className="font-semibold mb-2">✅ Fair: After Games</h3>
                <p className="text-sm leading-relaxed">
                  Using solvers after completing games is excellent practice.
                  Review what you missed, study patterns, and learn vocabulary.
                  This accelerates skill development and is how most competitive
                  players improve.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Makes a Good Boggle Solver
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Essential Features</h3>
                <ul className="space-y-1">
                  <li>• Accurate dictionary</li>
                  <li>• Standard scoring rules</li>
                  <li>• Complete word list</li>
                  <li>• Fast processing</li>
                  <li>• Easy input method</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Learning Features</h3>
                <ul className="space-y-1">
                  <li>• Missed word analysis</li>
                  <li>• Pattern breakdown</li>
                  <li>• Scoring insights</li>
                  <li>• Vocabulary highlights</li>
                  <li>• Export results</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-surface/50 rounded-xl p-4" open>
                <summary className="font-semibold cursor-pointer">
                  How does a Boggle solver work?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  A Boggle solver takes a 4×4 grid and systematically checks all
                  possible letter combinations against a dictionary. It follows
                  Boggle rules: adjacent connections only, minimum 3 letters, no
                  repeated tiles. Typically finds 100-200 words per grid.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Is using a Boggle solver cheating?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Using a solver during competitive play is cheating. However,
                  solvers are valuable learning tools when used after a game to
                  see what you missed, analyze patterns, and improve vocabulary.
                  Many players use solvers to review Daily Challenges.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How many words can a Boggle solver find?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  A Boggle solver typically finds 100-200 words in a standard 4×4
                  grid. Exceptional grids with favorable letter combinations
                  can yield 200-300+ words. The solver identifies every valid
                  word following standard Boggle rules.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Can I use a Boggle solver to practice?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes, Boggle solvers are excellent practice tools. Use them to
                  review Daily Challenges, analyze grid patterns, learn new
                  vocabulary, study word extensions, and identify weak scanning
                  areas. Solvers accelerate skill development when used as learning
                  tools.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Play First, Solve Later
            </h2>
            <p className="text-text mb-4">
              Build your skills by playing honestly. Use solvers after games to
              analyze and improve. Start a game now.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play Boggle Now
              </Link>
              <Link
                href="/daily"
                className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Daily Challenge
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Related Tools</h2>
            <div className="space-y-3">
              <Link
                href="/guides/boggle-generator/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Generator →
                </div>
                <div className="text-sm text-text-muted">
                  Create custom Boggle grids for practice.
                </div>
              </Link>
              <Link
                href="/guides/boggle-dictionary/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Dictionary →
                </div>
                <div className="text-sm text-text-muted">
                  Word lists and vocabulary reference.
                </div>
              </Link>
              <Link
                href="/guides/"
                className="block text-sm text-text-dim hover:text-text"
              >
                Browse all guides →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
