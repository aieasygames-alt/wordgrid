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
      "How to play word grid free in your browser — what a word grid puzzle is, how it works, and where to play instantly with no download or sign-up.",
    category: "Beginner",
    readTime: "4 min read",
    date: "2026-06-27",
  },
  {
    href: "/guides/boggle-rules-beginners",
    title: "Rules of Boggle: A Complete Beginner's Guide",
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
      "Play Boggle online for free in your browser. No download, no sign-up, no ads. Classic 4×4 word grid game with 3-minute timer. Instant play.",
    category: "Beginner",
    readTime: "5 min read",
    date: "2026-06-28",
  },
  {
    href: "/guides/boggle-word-game",
    title: "Boggle Word Game — Rules, Scoring & Free Online Play",
    description:
      "Master the Boggle word game. Learn the rules, how scoring works, and play free online instantly. 4×4 grid, 3-minute rounds.",
    category: "Beginner",
    readTime: "6 min read",
    date: "2026-06-28",
  },
  {
    href: "/guides/boggle-game-online",
    title: "Boggle Game Online — Play Free, No Download",
    description:
      "Play the Boggle game online for free. No download, no sign-up. Classic 4×4 word puzzle in your browser with 3-minute rounds.",
    category: "Beginner",
    readTime: "5 min read",
    date: "2026-06-28",
  },
  {
    href: "/guides/boggle-online-free",
    title: "Boggle Online Free — Play Instantly, No Download",
    description:
      "Play Boggle online free in your browser. No download, no sign-up, no ads. Classic 4×4 word puzzle with 3-minute rounds.",
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
];

const CATEGORIES = ["Beginner", "Intermediate", "Advanced"];

export default function GuidesIndex() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <article className="max-w-2xl mx-auto">
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

        {CATEGORIES.map((cat) => (
          <section key={cat} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-text-muted">
              {cat}
            </h2>
            <div className="space-y-3">
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

        <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
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
              Play Now
            </Link>
            <Link
              href="/daily"
              className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
            >
              Daily Challenge
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
