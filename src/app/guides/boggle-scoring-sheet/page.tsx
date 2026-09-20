import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideImage from "@/components/GuideImage";

export const metadata: Metadata = {
  title: "Boggle Points & Scoring Chart — WordGrid Rules",
  description:
    "See WordGrid's Boggle-style points chart by word length, with scoring examples and a clear reference for every round.",
  alternates: { canonical: "/guides/boggle-scoring-sheet" },
  keywords: [
    "boggle scoring sheet", "boggle scoring table", "boggle points system",
    "how does boggle scoring work", "boggle point values", "boggle score calculation",
    "boggle scoring rules", "boggle point chart",
  ],
  openGraph: {
    title: "WordGrid Points & Scoring Chart",
    description:
      "Complete Boggle scoring guide with points table, calculation examples, and scoring strategies. Learn to optimize your score.",
    images: ["/images/seo/boggle-scoring-sheet.webp"],
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "WordGrid Points & Scoring Chart",
  description:
    "A comprehensive Boggle scoring guide including points table, calculation examples, scoring strategies, and optimization techniques for maximizing your score.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-08-05",
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
        text: "WordGrid scores words by length: 3 letters = 1 point, 4 letters = 2 points, 5 letters = 4 points, and 6 letters = 6 points. Longer words score more, so a 5-letter word is worth as much as four 3-letter words.",
      },
    },
    {
      "@type": "Question",
      name: "What is the scoring chart for Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The current WordGrid scoring chart is: 3 letters = 1 point, 4 letters = 2 points, 5 letters = 4 points, and 6 letters = 6 points. The current word list contains words through 6 letters.",
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
        text: "There is no universal winning WordGrid score. Board difficulty varies, so compare your score against the same Daily or shared challenge board.",
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

      <GuideDesktopShell>
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">Word Grid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Boggle Points & Scoring Chart
          </h1>
          <p className="text-text-muted">7 min read &middot; Updated July 2026</p>
        </header>

        <section className="mb-6 rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Link href="/play/" className="rounded-2xl bg-bg/60 p-4 hover:bg-bg/80 transition">
              <div className="font-semibold text-primary">Play now</div>
              <p className="mt-1 text-sm text-text-muted">Use the scoring sheet in a live round.</p>
            </Link>
            <Link href="/words/high-scoring-boggle-words/" className="rounded-2xl bg-bg/60 p-4 hover:bg-bg/80 transition">
              <div className="font-semibold text-primary">High scoring words</div>
              <p className="mt-1 text-sm text-text-muted">See what longer answers look like.</p>
            </Link>
            <Link href="/solver/" className="rounded-2xl bg-bg/60 p-4 hover:bg-bg/80 transition">
              <div className="font-semibold text-primary">Review solver</div>
              <p className="mt-1 text-sm text-text-muted">Check the board after play.</p>
            </Link>
            <Link href="/guides/word-grid-strategies/" className="rounded-2xl bg-bg/60 p-4 hover:bg-bg/80 transition">
              <div className="font-semibold text-primary">Strategy guide</div>
              <p className="mt-1 text-sm text-text-muted">Move from points to better decisions.</p>
            </Link>
          </div>
        </section>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              Understanding <strong>WordGrid scoring</strong> helps you decide
              when to extend a word instead of collecting another short one. This
              guide shows the current point system and how to use it in a round.
            </p>
            <p className="leading-relaxed mt-3">
              The short version: 3-letter words score 1 point, 4-letter words
              score 2, 5-letter words score 4, and longer answers pull your
              total up fast. Use the chart below as a quick Boggle points
              reference before you play.
            </p>
            <p className="leading-relaxed mt-3">
              If you are still learning the basics, start with{" "}
              <Link href="/guides/boggle-rules-beginners" className="text-primary hover:underline">
                Boggle rules for beginners
              </Link>
              . If you want to check missed words after a round, use the{" "}
              <Link href="/guides/boggle-solver" className="text-primary hover:underline">
                solver guide
              </Link>
              .
            </p>
            <p className="leading-relaxed mt-3">
              If you want the tactical side next, move to{" "}
              <Link href="/guides/how-to-win-boggle" className="text-primary hover:underline">
                how to win at Boggle
              </Link>{" "}
              or{" "}
              <Link href="/guides/word-grid-strategies" className="text-primary hover:underline">
                the WordGrid strategy guide
              </Link>
              .
            </p>
            <GuideImage
              src="/images/seo/boggle-scoring-sheet.webp"
              alt="Boggle scoring sheet showing points by word length"
              caption="Boggle scoring rewards longer words, so one strong 5-letter word can beat several short finds."
              priority
            />
          </section>

          <section className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Turn points into a plan
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Once scoring clicks, use the word list and pattern library to hunt
              longer paths first. That is where the score jumps live.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              WordGrid Points Table
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <p className="text-sm text-text-dim mb-3">
                WordGrid uses this Boggle-style scoring system. It rewards longer
                words more heavily than classic Boggle does:
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
            <p className="mt-3 text-xs leading-relaxed text-text-dim">
              The current WordGrid word list contains words through 6 letters.
            </p>
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
                  <li>GARDEN (6 letters) = 6 points</li>
                  <li><strong>Total: 18 points</strong></li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Example 3: Advanced Game</h3>
                <ul className="space-y-1 text-sm">
                  <li>GARDEN (6 letters) = 6 points</li>
                  <li>PLAYER (6 letters) = 6 points</li>
                  <li>QUICK (5 letters) = 4 points</li>
                  <li>PLAY (4 letters) = 2 points</li>
                  <li>CAT (3 letters) = 1 point</li>
                  <li><strong>Total: 19 points</strong></li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Compare Scores Fairly
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
                  ["Same board", "Useful comparison", "Compare your Daily or Challenge score with another player on the exact grid."],
                  ["Different boards", "Not comparable", "Letter layouts change the number and quality of available words."],
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
                  When you find a word, check nearby tiles for a playable ending.
                  A 4-letter word is worth 2 points, while a 5-letter extension is
                  worth 4. One base word can reveal multiple valid answers.
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
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Key Tips</h3>
                  <ul className="space-y-1 text-xs">
                    <li>• 5-letter word = 4× 3-letter</li>
                    <li>• Prioritize -TION, -NESS</li>
                    <li>• Check word extensions</li>
                    <li>• Use the full Timed round</li>
                    <li>• Hunt for Qu tile</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Rules, Scoring, and Review
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/guides/boggle-rules-beginners/" className="block rounded-xl bg-surface/50 p-4 hover:bg-surface transition">
                <div className="font-semibold text-primary">Start with the rules</div>
                <p className="mt-1 text-sm text-text-muted">
                  Confirm adjacency, minimum word length, and Qu behavior before optimizing score.
                </p>
              </Link>
              <Link href="/guides/boggle-dictionary/" className="block rounded-xl bg-surface/50 p-4 hover:bg-surface transition">
                <div className="font-semibold text-primary">Know what counts</div>
                <p className="mt-1 text-sm text-text-muted">
                  Use the dictionary guide to avoid wasting time on invalid words.
                </p>
              </Link>
              <Link href="/guides/boggle-solver/" className="block rounded-xl bg-surface/50 p-4 hover:bg-surface transition">
                <div className="font-semibold text-primary">Review with a solver</div>
                <p className="mt-1 text-sm text-text-muted">
                  Compare your score to the full board after the game and see where the points were hiding.
                </p>
              </Link>
              <Link href="/play" className="block rounded-xl border border-primary/20 bg-primary/10 p-4 hover:bg-primary/15 transition">
                <div className="font-semibold text-primary">Practice live</div>
                <p className="mt-1 text-sm text-text-muted">
                  Try a fresh board and apply the length-first scoring approach right away.
                </p>
              </Link>
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
                  WordGrid scores 3 letters at 1 point, 4 letters at 2, 5
                  letters at 4, and 6 letters at 6. Longer available answers
                  are worth more, so extensions are useful when the board allows them.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What is the scoring chart for Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  WordGrid scoring chart: 3 letters = 1 point, 4 = 2 points,
                  5 = 4 points, and 6 = 6 points. The current WordGrid word
                  list contains words through 6 letters.
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
                  Compare scores only on the same board. The Daily and shared
                  challenge boards give everyone the same grid, making score
                  comparisons meaningful.
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

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link
                href="/guides/boggle-rules-beginners/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Rules for Beginners →
                </div>
                <div className="text-sm text-text-muted">
                  Lock in the core rules before you optimize for points.
                </div>
              </Link>
              <Link
                href="/guides/boggle-rules-printable/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Rules Printable →
                </div>
                <div className="text-sm text-text-muted">
                  Keep the rules and scoring chart together as one reference.
                </div>
              </Link>
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
                href="/guides/boggle-solver/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Solver →
                </div>
                <div className="text-sm text-text-muted">
                  Review missed words and compare your score with the full board.
                </div>
              </Link>
              <Link
                href="/play"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Play →
                </div>
                <div className="text-sm text-text-muted">
                  Turn better scoring decisions into a live round.
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
      </GuideDesktopShell>
    </main>
  );
}
