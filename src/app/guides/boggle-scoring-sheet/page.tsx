import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boggle Scoring Sheet — Points Table & Calculation Guide",
  description:
    "Complete Boggle scoring reference with points table, calculation examples, and scoring strategies. Learn how points work, why longer words score more, and optimize your gameplay.",
  alternates: { canonical: "/guides/boggle-scoring-sheet" },
  keywords: [
    "boggle scoring sheet", "boggle scoring table", "boggle points system",
    "how does boggle scoring work", "boggle point values", "boggle score calculation",
    "boggle scoring rules", "boggle point chart",
  ],
  openGraph: {
    title: "Boggle Scoring Sheet — Points Table & Calculation Guide",
    description:
      "Complete Boggle scoring guide with points table, calculation examples, and scoring strategies. Learn to optimize your score.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Scoring Sheet — Points Table & Calculation Guide",
  description:
    "A comprehensive Boggle scoring guide including points table, calculation examples, scoring strategies, and optimization techniques for maximizing your score.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-scoring-sheet/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Boggle scoring work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle scoring is based on word length: 3-letter words = 1 point, 4-letter words = 2 points, 5-letter words = 4 points, 6-letter words = 6 points, 7-letter words = 8 points, and 8+ letter words = 11+ points. The scoring system heavily rewards longer words — a single 5-letter word is worth as much as four 3-letter words.",
      },
    },
    {
      "@type": "Question",
      name: "What is the scoring chart for Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Boggle scoring chart by word length: 3 letters = 1 point, 4 letters = 2 points, 5 letters = 4 points, 6 letters = 6 points, 7 letters = 8 points, 8 letters = 11 points, 9 letters = 13 points, 10+ letters = 15+ points (2 additional points per extra letter beyond 8).",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate Boggle scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To calculate Boggle scores, add up points for each valid word found based on length. For example: if you find CAT (3 letters, 1 point), PLAY (4 letters, 2 points), and QUICK (5 letters, 4 points), your total is 1 + 2 + 4 = 7 points. Longer words disproportionately increase your total score.",
      },
    },
    {
      "@type": "Question",
      name: "What is a winning Boggle score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Winning Boggle scores by level: 25-35 points for beginners, 35-50 points for intermediate players, 50-60 points for advanced players, 60-70 points for experts, and 70+ points for champions. In Daily Challenges, beating the average score typically puts you in the top half of players.",
      },
    },
    {
      "@type": "Question",
      name: "Why do longer words score more in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Longer words score more in Boggle because they're harder to find and require more skill. The scoring system is designed to reward vocabulary depth and pattern recognition over speed. A 5-letter word (4 points) equals four 3-letter words (4 points total), encouraging players to hunt for length rather than quantity.",
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
    { "@type": "ListItem", position: 3, name: "Boggle Scoring Sheet" },
  ],
};

export default function BoggleScoringSheetGuide() {
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
            Boggle Scoring Sheet — Points Table & Calculation Guide
          </h1>
          <p className="text-text-muted">6 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              Understanding <strong>Boggle scoring</strong> is the difference
              between 25-point games and 60-point games. This guide shows
              exactly how points work, why longer words score more, and how to
              optimize your gameplay for maximum points.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Boggle Scoring Table (Official)
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <p className="text-sm text-text-dim mb-3">
                Points are awarded based on word length:
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-text-muted">
                      Word Length
                    </th>
                    <th className="text-left py-2 text-text-muted">Points</th>
                    <th className="text-left py-2 text-text-muted">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [3, 1, "CAT, THE, RUN"],
                    [4, 2, "PLAY, WORD, GAME"],
                    [5, 4, "SCORE, QUICK, BOARD"],
                    [6, 6, "PLAYER, GARDEN"],
                    [7, 8, "PLAYING, STARTED"],
                    [8, 11, "QUESTION, FORMATION"],
                    [9, 13, "EDUCATION"],
                    ["10+", "15+", "ELECTRICITY (+2 per extra letter)"],
                  ].map(([len, pts, example]) => (
                    <tr key={String(len)} className="border-b border-surface">
                      <td className="py-2 font-semibold">{len} letters</td>
                      <td className="py-2 text-primary font-semibold">{pts} pts</td>
                      <td className="py-2 text-xs text-text-dim">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How Scoring Works: The Math
            </h2>
            <p className="leading-relaxed mb-3">
              The scoring system heavily rewards length. Here's the breakdown:
            </p>
            <div className="bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed">
                <strong>The key insight:</strong> One 5-letter word = 4 points.
                Four 3-letter words = 4 points. Same time investment, same
                reward — but the 5-letter word is often easier to spot once you
                train your brain to look for patterns like -TION, -NESS, -ING.
              </p>
            </div>
            <p className="leading-relaxed mt-3">
              This is why competitive players <strong>prioritize length over
              quantity</strong>. Hunting for 5+ letter words is more efficient
              than chasing every 3-letter word you see.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Score Calculation Examples
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Example 1: Beginner Game</h3>
                <ul className="space-y-1 text-sm">
                  <li>CAT (3 letters) = 1 point</li>
                  <li>THE (3 letters) = 1 point</li>
                  <li>RUN (3 letters) = 1 point</li>
                  <li>PLAY (4 letters) = 2 points</li>
                  <li><strong>Total: 5 points</strong></li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Example 2: Intermediate Game</h3>
                <ul className="space-y-1 text-sm">
                  <li>PLAY (4 letters) = 2 points</li>
                  <li>BOARD (5 letters) = 4 points</li>
                  <li>PLAYER (6 letters) = 6 points</li>
                  <li>PLAYING (7 letters) = 8 points</li>
                  <li><strong>Total: 20 points</strong></li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Example 3: Advanced Game</h3>
                <ul className="space-y-1 text-sm">
                  <li>QUESTION (8 letters) = 11 points</li>
                  <li>FORMATION (8 letters) = 11 points</li>
                  <li>EDUCATION (9 letters) = 13 points</li>
                  <li>PLAYERS (7 letters) = 8 points</li>
                  <li>QUICK (5 letters) = 4 points</li>
                  <li><strong>Total: 47 points</strong></li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Winning Score Ranges by Level
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Score Range</th>
                  <th className="text-left py-2 text-text-muted">Level</th>
                  <th className="text-left py-2 text-text-muted">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["25-35 points", "Beginner", "Finding mostly 3-4 letter words"],
                  ["35-50 points", "Intermediate", "Mix of lengths, some 5-6 letter words"],
                  ["50-60 points", "Advanced", "Consistently finding 5+ letter words"],
                  ["60-70 points", "Expert", "Regular 6-8 letter words, strong patterns"],
                  ["70+ points", "Champion", "Exceptional 8+ letter words, mastery"],
                ].map(([score, level, description]) => (
                  <tr key={score} className="border-b border-surface">
                    <td className="py-2">{score}</td>
                    <td className="py-2">{level}</td>
                    <td className="py-2 text-xs text-text-dim">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Scoring Strategy: How to Maximize Points
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Strategy 1: Length Over Quantity</h3>
                <p className="text-sm leading-relaxed">
                  Spend your time hunting for 5+ letter words. One 5-letter word
                  (4 points) equals four 3-letter words (4 points total). It's
                  more efficient to find one long word than four short ones.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Strategy 2: Pattern Recognition</h3>
                <p className="text-sm leading-relaxed">
                  Look for high-value patterns: -TION, -NESS, -MENT, -ABLE.
                  These endings indicate longer words and significantly higher
                  points.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Strategy 3: Word Extensions</h3>
                <p className="text-sm leading-relaxed">
                  When you find a word, check for extensions. PLAY (4 letters, 2
                  points) → PLAYED (6 letters, 6 points) → PLAYING (7 letters, 8
                  points). One base word can generate multiple high-value words.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Strategy 4: Time Management</h3>
                <p className="text-sm leading-relaxed">
                  Spend the first 30 seconds scanning for long-word patterns.
                  Don't submit anything yet. Then prioritize 5+ letter words.
                  Leave 3-letter words for the final minute.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Quick Reference: Point Values
            </h2>
            <div className="grid grid-cols-4 gap-3 text-sm">
              {[
                [3, 1, "Baseline"],
                [4, 2, "2×"],
                [5, 4, "4×"],
                [6, 6, "6×"],
                [7, 8, "8×"],
                [8, 11, "11×"],
                [9, 13, "13×"],
                ["10+", "15+", "Jackpot"],
              ].map(([len, pts, mult]) => (
                <div key={String(len)} className="bg-surface/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-text-dim">{len} letters</div>
                  <div className="text-lg font-bold text-primary">{pts}</div>
                  <div className="text-xs text-text-dim">{mult}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Printable Scoring Sheet
            </h2>
            <p className="leading-relaxed mb-3">
              Use this simplified scoring sheet for quick reference during games:
            </p>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Word Length → Points</h3>
                  <ul className="space-y-1 font-mono text-xs">
                    <li>3 → 1</li>
                    <li>4 → 2</li>
                    <li>5 → 4</li>
                    <li>6 → 6</li>
                    <li>7 → 8</li>
                    <li>8 → 11</li>
                    <li>9 → 13</li>
                    <li>10+ → 15+</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Key Tips</h3>
                  <ul className="space-y-1 text-xs">
                    <li>• 5-letter word = 4× 3-letter</li>
                    <li>• Prioritize -TION, -NESS</li>
                    <li>• Check word extensions</li>
                    <li>• Use full 3 minutes</li>
                    <li>• Hunt for Qu tile</li>
                  </ul>
                </div>
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
                  How does Boggle scoring work?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Boggle scoring is based on word length: 3 letters = 1 point,
                  4 letters = 2 points, 5 letters = 4 points, 6 letters = 6
                  points, 7 letters = 8 points, 8+ letters = 11+ points.
                  Longer words are worth significantly more.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What is the scoring chart for Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Boggle scoring chart: 3 letters = 1 point, 4 = 2 points, 5 =
                  4 points, 6 = 6 points, 7 = 8 points, 8 = 11 points, 9 =
                  13 points, 10+ = 15+ points (2 additional points per extra
                  letter).
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do you calculate Boggle scores?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  To calculate Boggle scores, add points for each valid word
                  based on length. Example: CAT (1 point) + PLAY (2 points) +
                  QUICK (4 points) = 7 points total. Longer words
                  disproportionately increase your score.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What is a winning Boggle score?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Winning Boggle scores: 25-35 for beginners, 35-50
                  intermediate, 50-60 advanced, 60-70 expert, 70+ champion.
                  Beating the Daily Challenge average puts you in the top half.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Practice Your Scoring Strategy
            </h2>
            <p className="text-text mb-4">
              Apply these scoring strategies in real games. Prioritize length,
              hunt for patterns, and watch your scores improve.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Practice Now
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
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link
                href="/guides/how-to-win-boggle/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  How to Win at Boggle →
                </div>
                <div className="text-sm text-text-muted">
                  Proven strategies for consistently high scores.
                </div>
              </Link>
              <Link
                href="/guides/boggle-strategy-guide/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Strategy Guide →
                </div>
                <div className="text-sm text-text-muted">
                  Comprehensive competitive playbook.
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
