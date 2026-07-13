import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Word Grid Guides — Rules, Strategy & Tips",
  description:
    "Master word grid puzzles with our guides. Learn the rules of Boggle, how to play word grid online, scoring tips, word-finding techniques, and advanced strategy.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Word Grid Guides — Rules, Strategy & Tips",
    description:
      "Learn how to find more words, score higher, and master word grid puzzles with our complete strategy guide collection.",
  },
};

const GUIDES = [
  {
    href: "/guides/play-word-grid-online",
    title: "Play Word Grid Online — Free, No Download",
    description:
      "How to play word grid free in your browser — what a word grid puzzle is, how it works, and where to play instantly with standard or larger square grids.",
    category: "Beginner",
    readTime: "4 min read",
    date: "2026-06-27",
  },
  {
    href: "/guides/boggle-rules-beginners",
    title: "Boggle Rules for Beginners: How to Play Boggle",
    description:
      "Never played Boggle or a word grid game before? This guide walks you through every rule, step by step, with a real example board.",
    category: "Beginner",
    readTime: "7 min read",
    date: "2026-06-20",
  },
  {
    href: "/guides/how-to-find-more-words",
    title: "How to Find More Words in Word Grid Puzzles",
    description:
      "Six proven techniques to spot more words — prefix scanning, plurals, Qu strategy, diagonal awareness, and more.",
    category: "Beginner",
    readTime: "6 min read",
    date: "2026-06-19",
  },
  {
    href: "/guides/word-grid-vs-boggle",
    title: "Word Grid vs Boggle: What's the Difference?",
    description:
      "Boggle has been around since 1972. We break down how online word grid games compare — the rules, the scoring, and what's changed.",
    category: "Beginner",
    readTime: "5 min read",
    date: "2026-06-20",
  },
  {
    href: "/guides/word-grid-strategies",
    title: "Word Grid Strategies: Score Higher Every Game",
    description:
      "Advanced scoring strategy, time management breakdown, and word family patterns to maximize your score.",
    category: "Intermediate",
    readTime: "5 min read",
    date: "2026-06-19",
  },
  {
    href: "/guides/play-boggle-online-free",
    title: "Play Boggle Online Free — No Download, No Sign-Up",
    description:
      "Play Boggle online for free in your browser. No download, no sign-up, no ads. Classic Boggle plus larger practice grids, instant play.",
    category: "Beginner",
    readTime: "5 min read",
    date: "2026-06-28",
  },
  {
    href: "/guides/boggle-word-game",
    title: "Boggle Word Game — Rules, Scoring & Free Online Play",
    description:
      "Master the Boggle word game. Learn the rules, how scoring works, and play free online instantly on standard or larger grids.",
    category: "Beginner",
    readTime: "6 min read",
    date: "2026-06-28",
  },
  {
    href: "/guides/boggle-game-online",
    title: "Boggle Game Online — Play Free, No Download",
    description:
      "Play the Boggle game online for free. No download, no sign-up. Classic Boggle with standard and larger practice grids in your browser.",
    category: "Beginner",
    readTime: "5 min read",
    date: "2026-06-28",
  },
  {
    href: "/guides/boggle-online-free",
    title: "Boggle Online Free — Play Instantly, No Download",
    description:
      "Play Boggle online free in your browser. No download, no sign-up, no ads. Classic Boggle plus larger practice grids.",
    category: "Beginner",
    readTime: "4 min read",
    date: "2026-06-28",
  },
  {
    href: "/guides/how-to-win-boggle",
    title: "How to Win at Boggle — Proven Strategies to Score Higher",
    description:
      "Learn how to win at Boggle with proven strategies from competitive players. Master word patterns, time management, grid scanning, and scoring optimization.",
    category: "Intermediate",
    readTime: "8 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/boggle-tips-tricks",
    title: "Boggle Tips and Tricks — Quick Techniques to Find More Words",
    description:
      "Practical Boggle tips and tricks to find more words instantly. Learn grid scanning, letter patterns, word extensions, and time-saving shortcuts.",
    category: "Beginner",
    readTime: "6 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/boggle-strategy-guide",
    title: "Boggle Strategy Guide — Complete Competitive Playbook",
    description:
      "Master Boggle with comprehensive competitive strategy. Learn advanced grid analysis, word optimization, time management, and championship-level patterns.",
    category: "Advanced",
    readTime: "10 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/boggle-rules-printable",
    title: "Boggle Rules Printable — Free PDF Reference Sheet",
    description:
      "Printable Boggle rules reference sheet. Free PDF download with complete game rules, scoring table, word validity guidelines, and quick reference for players.",
    category: "Beginner",
    readTime: "5 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/boggle-scoring-sheet",
    title: "Boggle Scoring Sheet — Points Table & Calculation Guide",
    description:
      "Complete Boggle scoring reference with points table, calculation examples, and scoring strategies. Learn how points work and optimize your gameplay.",
    category: "Beginner",
    readTime: "6 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/boggle-rules-for-kids",
    title: "Boggle Rules for Kids — Simple Guide for Children",
    description:
      "Simple Boggle rules for kids and children. Easy-to-understand explanation with examples, tips for parents and teachers, and fun variations for young players.",
    category: "Beginner",
    readTime: "7 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/boggle-variants",
    title: "Boggle Variants — Fun Game Variations & Alternatives",
    description:
      "Explore fun Boggle variants and game variations. Big Boggle, Boggle Junior, themed games, solo challenges, and creative rule modifications for game nights.",
    category: "Intermediate",
    readTime: "8 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/advanced-boggle-strategies",
    title: "Advanced Boggle Strategies — Expert-Level Techniques",
    description:
      "Master advanced Boggle strategies from expert players. Learn grid mapping algorithms, word optimization techniques, competitive time management, and pattern recognition systems for 60+ scores.",
    category: "Advanced",
    readTime: "12 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/boggle-word-lists",
    title: "Boggle Word Lists by Letter — Complete Reference",
    description:
      "Complete Boggle word lists organized by letter. High-frequency words, common patterns, and letter-specific vocabulary to improve your word-finding speed and score.",
    category: "Intermediate",
    readTime: "15 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/most-common-boggle-words",
    title: "Most Common Boggle Words — Top 100 High-Frequency List",
    description:
      "Top 100 most common Boggle words found in gameplay. High-frequency word list with bonus combinations, letter patterns, and expert strategies for instant recognition.",
    category: "Intermediate",
    readTime: "10 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/word-pattern-library",
    title: "Word Grid Pattern Library — Prefixes, Suffixes & Qu",
    description:
      "A practical pattern library for scanning prefixes, suffixes, plurals, word families, and Qu before the board runs dry.",
    category: "Intermediate",
    readTime: "8 min read",
    date: "2026-07-09",
  },
  {
    href: "/guides/prefix-strategy",
    title: "Prefix Strategy for Word Grid — RE, UN, IN & PRE",
    description:
      "Learn how prefixes turn one stem into a family of related answers and make the board easier to scan.",
    category: "Intermediate",
    readTime: "5 min read",
    date: "2026-07-09",
  },
  {
    href: "/guides/suffix-strategy",
    title: "Suffix Strategy for Word Grid — ING, ED, ER & LY",
    description:
      "Use endings to extend base words, pick up cheap plural points, and raise your score efficiently.",
    category: "Intermediate",
    readTime: "5 min read",
    date: "2026-07-09",
  },
  {
    href: "/guides/qu-strategy",
    title: "Qu Strategy for Word Grid — Find Qu Words Faster",
    description:
      "A special-case guide for the Qu tile and the high-value words it unlocks.",
    category: "Intermediate",
    readTime: "4 min read",
    date: "2026-07-09",
  },
  {
    href: "/guides/boggle-solver",
    title: "Boggle Solver — Find All Words in Any Grid",
    description:
      "Free online Boggle solver to find all words in any square grid. Paste your letters and get instant solutions with word counts, scoring breakdown, and anagram analysis.",
    category: "Intermediate",
    readTime: "7 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/boggle-generator",
    title: "Boggle Generator — Create Custom Word Puzzles",
    description:
      "Free Boggle generator to create custom square word puzzles. Design personalized grids for practice, teaching, or game nights with adjustable difficulty and letter distribution.",
    category: "Intermediate",
    readTime: "6 min read",
    date: "2026-06-29",
  },
  {
    href: "/guides/boggle-dictionary",
    title: "Boggle Dictionary — Complete Word Lists & Vocabulary",
    description:
      "Complete Boggle dictionary with word lists, vocabulary references, and valid word guidelines. Lookup any word, explore high-frequency game vocabulary, and improve your word-finding skills.",
    category: "Intermediate",
    readTime: "8 min read",
    date: "2026-06-29",
  },
];

const CATEGORIES = ["Beginner", "Intermediate", "Advanced"];

export default function GuidesIndex() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "WordGrid guides and strategy pages",
    itemListElement: GUIDES.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://wordgrid.games${guide.href}/`,
      name: guide.title,
      description: guide.description,
    })),
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <article className="mx-auto max-w-7xl">
        <header className="mb-8">
          <Link href="/" className="text-sm text-text-dim hover:text-text">
            &larr; WordGrid
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">Guides</h1>
          <p className="text-text-muted">
            Everything you need to get better at word grid puzzles — from your
            first game to competitive-level strategy.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
            Best Matches for Searchers
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <Link
              href="/play"
              className="block bg-primary/10 hover:bg-primary/15 transition rounded-xl p-4 border border-primary/20"
            >
              <div className="font-semibold text-primary">Play Word Grid Online Free</div>
              <p className="text-sm text-text-muted mt-1">
                Jump straight into the game if you want the word grid online free
                experience.
              </p>
            </Link>
            <Link
              href="/guides/play-boggle-online-free"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
            >
              <div className="font-semibold text-primary">Play Boggle Online Free</div>
              <p className="text-sm text-text-muted mt-1">
                The fastest path for players searching for free Boggle online.
              </p>
            </Link>
            <Link
              href="/solver"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
            >
              <div className="font-semibold text-primary">Boggle Solver</div>
              <p className="text-sm text-text-muted mt-1">
                Paste a grid and find every valid word with score breakdowns.
              </p>
            </Link>
            <Link
              href="/guides/boggle-rules-beginners"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
            >
              <div className="font-semibold text-primary">Boggle Rules for Beginners</div>
              <p className="text-sm text-text-muted mt-1">
                Learn the core rules, scoring, and Qu tile behavior in a few minutes.
              </p>
            </Link>
            <Link
              href="/guides/most-common-boggle-words"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
            >
              <div className="font-semibold text-primary">Most Common Boggle Words</div>
              <p className="text-sm text-text-muted mt-1">
                High-frequency words and patterns that are already earning clicks.
              </p>
            </Link>
            <Link
              href="/guides/word-pattern-library"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
            >
              <div className="font-semibold text-primary">Word Grid Pattern Library</div>
              <p className="text-sm text-text-muted mt-1">
                Prefixes, suffixes, Qu, and word-family scans in one practical hub.
              </p>
            </Link>
            <Link
              href="/guides/boggle-word-lists"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
            >
              <div className="font-semibold text-primary">Boggle Word Lists</div>
              <p className="text-sm text-text-muted mt-1">
                Letter-by-letter vocabulary reference for players building recognition.
              </p>
            </Link>
            <Link
              href="/guides/boggle-dictionary"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
            >
              <div className="font-semibold text-primary">Boggle Dictionary</div>
              <p className="text-sm text-text-muted mt-1">
                Valid-word guidance and vocabulary lookup context for Boggle-style play.
              </p>
            </Link>
            <Link
              href="/guides/prefix-strategy"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
            >
              <div className="font-semibold text-primary">Prefix Strategy</div>
              <p className="text-sm text-text-muted mt-1">
                RE, UN, IN, and PRE turns one stem into a family.
              </p>
            </Link>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-text-muted">
            Vocabulary and Pattern Hub
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/guides/most-common-boggle-words"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-5"
            >
              <h3 className="font-semibold text-lg mb-1">Common words first</h3>
              <p className="text-sm text-text-muted">
                Learn the words and letter pairs that show up most often before
                going deeper.
              </p>
            </Link>
            <Link
              href="/guides/boggle-word-lists"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-5"
            >
              <h3 className="font-semibold text-lg mb-1">Browse by letter</h3>
              <p className="text-sm text-text-muted">
                Move from high-frequency words into a fuller letter-by-letter
                vocabulary reference.
              </p>
            </Link>
            <Link
              href="/play"
              className="block bg-primary/10 hover:bg-primary/15 transition rounded-xl p-5 border border-primary/20"
            >
              <h3 className="font-semibold text-lg mb-1 text-primary">Practice now</h3>
              <p className="text-sm text-text-muted">
                Test the patterns immediately on a fresh timed, Zen, or Daily board.
              </p>
            </Link>
          </div>
        </section>

        {CATEGORIES.map((cat) => (
          <section key={cat} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-text-muted">
              {cat}
            </h2>
            <div className="grid gap-3">
              {GUIDES.filter((g) => g.category === cat).map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="block bg-surface/50 hover:bg-surface transition rounded-xl p-5"
                >
                  <h3 className="font-semibold text-lg mb-1">{guide.title}</h3>
                  <p className="text-sm text-text-muted mb-2">
                    {guide.description}
                  </p>
                  <div className="flex gap-3 text-xs text-text-dim">
                    <span>{guide.readTime}</span>
                    <span>&middot;</span>
                    <time>{guide.date}</time>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-8 p-6 bg-indigo-900/30 rounded-3xl border border-indigo-800/50">
          <h2 className="text-xl font-semibold text-primary mb-2">
            Ready to Play?
          </h2>
          <p className="text-text mb-4">
            Reading is one thing. Playing is how you actually get better.
          </p>
          <div className="flex gap-3">
            <Link
              href="/play"
              className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
            >
              Play
            </Link>
            <Link
              href="/daily"
              className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
            >
              Daily
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
