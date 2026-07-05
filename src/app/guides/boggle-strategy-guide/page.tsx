import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boggle Strategy Guide — Complete Competitive Playbook",
  description:
    "Master Boggle with comprehensive competitive strategy. Learn advanced grid analysis, word optimization techniques, time management systems, and championship-level patterns from expert players.",
  alternates: { canonical: "/guides/boggle-strategy-guide" },
  keywords: [
    "boggle strategy guide", "competitive boggle strategy", "boggle playbook",
    "boggle master guide", "boggle championship strategy", "boggle competitive play",
    "boggle tactics", "boggle advanced strategy",
  ],
  openGraph: {
    title: "Boggle Strategy Guide — Complete Competitive Playbook",
    description:
      "Comprehensive Boggle strategy guide covering grid analysis, word optimization, time management, and championship-level competitive tactics.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Strategy Guide — Complete Competitive Playbook",
  description:
    "A comprehensive Boggle strategy guide covering competitive play, grid analysis techniques, word optimization strategies, and championship-level tactics.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-strategy-guide/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best strategy for Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best Boggle strategy combines systematic grid scanning, prioritizing 5+ letter words over 3-letter words, mastering common letter patterns (TH, HE, IN, ER, -TION, -NESS), always checking plurals and word extensions, and using the full 3 minutes. Competitive players focus on pattern recognition over vocabulary size and practice daily to build scanning speed.",
      },
    },
    {
      "@type": "Question",
      name: "How do you analyze a Boggle grid strategically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Strategic Boggle grid analysis: 1) Identify high-frequency anchor letters (S, R, T, N, E, A), 2) Map common letter clusters (TH, HE, IN, ER, AN), 3) Locate long word patterns (-TION, -NESS, -MENT, -ABLE), 4) Check diagonal connectivity, 5) Identify Qu placement and value, 6) Plan 5+ letter word routes before submitting 3-letter words.",
      },
    },
    {
      "@type": "Question",
      name: "What is the competitive Boggle scoring strategy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Competitive Boggle scoring strategy: Prioritize 5+ letter words because one 5-letter word (4 points) equals four 3-letter words (4 points total). Focus on -TION, -NESS, -MENT words which are long and common. Use word extensions to multiply finds (PLAY → PLAYED → PLAYER → PLAYING → PLAYERS). Check every word for plurals. Time allocation: first 30 seconds scanning, next 60 seconds hunting 5+ letter words, final 90 seconds on medium and short words.",
      },
    },
    {
      "@type": "Question",
      name: "How do Boggle champions approach the game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle champions approach the game with pattern recognition, not vocabulary recall. They think in letter clusters (TH, HE, IN, ER) and word structures (-TION, -NESS, -ING) rather than individual letters. They use systematic scanning patterns, prioritize length over quantity, always check extensions and plurals, and have practiced enough that common patterns are instant recognition. They also use the full 3 minutes while most beginners stop at 2:00.",
      },
    },
    {
      "@type": "Question",
      name: "What are advanced Boggle techniques?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Advanced Boggle techniques: 1) Multi-directional word extensions from base words, 2) Systematic diagonal and reverse scanning, 3) Time-phased approach (scan → long words → medium → short), 4) Pattern-based而非letter-based searching, 5) Anchor letter strategy focusing on S, R, T, N, E, A, 6) Recognition of rare but high-value combinations like QU, X, Z, 7) Memory of common word families and endings.",
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
    { "@type": "ListItem", position: 3, name: "Boggle Strategy Guide" },
  ],
};

export default function BoggleStrategyGuide() {
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
            Boggle Strategy Guide — Complete Competitive Playbook
          </h1>
          <p className="text-text-muted">10 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              This <strong>Boggle strategy guide</strong> transforms how you
              approach the game. Whether you're scoring 25 points and want to
              break 40, or hitting 50 and aiming for 60+, these are the exact
              techniques competitive players use.
            </p>
            <p className="leading-relaxed mt-3">
              Boggle isn't about vocabulary size. It's about <strong>pattern
              recognition</strong> and <strong>systematic execution</strong>.
              Champions don't think differently — they scan differently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              The Competitive Mindset
            </h2>
            <p className="leading-relaxed mb-3">
              Before diving into tactics, understand how champions think:
            </p>
            <div className="my-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-red-900/20 rounded-xl p-3 border border-red-800/30">
                <h3 className="font-semibold mb-2">❌ Beginner Mindset</h3>
                <ul className="space-y-1">
                  <li>Random letter searching</li>
                  <li>Grab 3-letter words first</li>
                  <li>Stop at 2:00</li>
                  <li>Think about vocabulary</li>
                  <li>Scan horizontally only</li>
                </ul>
              </div>
              <div className="bg-green-900/20 rounded-xl p-3 border border-green-800/30">
                <h3 className="font-semibold mb-2">✅ Champion Mindset</h3>
                <ul className="space-y-1">
                  <li>Pattern-based scanning</li>
                  <li>Hunt 5+ letter words first</li>
                  <li>Use full 3:00</li>
                  <li>Think in letter clusters</li>
                  <li>Systematic full-grid scan</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 1: Grid Analysis Phase (0:00-0:30)
            </h2>
            <p className="leading-relaxed">
              The first 30 seconds determine your entire game. Most beginners
              start submitting immediately. Champions map the grid first.
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Grid Mapping Checklist</h3>
              <ol className="space-y-2 list-decimal ml-4">
                <li>
                  <strong>Identify anchor letters:</strong> Locate S, R, T, N,
                  E, A positions. These build the most words.
                </li>
                <li>
                  <strong>Map common clusters:</strong> Find TH, HE, IN, ER, AN
                  combinations.
                </li>
                <li>
                  <strong>Scan for long patterns:</strong> Look for -TION, -NESS,
                  -MENT, -ABLE structures.
                </li>
                <li>
                  <strong>Check Qu placement:</strong> Qu is rare but valuable.
                  QUICK, QUEST, QUOTE, QUIZ.
                </li>
                <li>
                  <strong>Verify diagonal connectivity:</strong> 40% of players
                  miss diagonal words.
                </li>
              </ol>
            </div>
            <p className="leading-relaxed mt-3">
              Don't submit anything during this phase. Just build a mental map
              of the grid's opportunities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 2: Word Length Prioritization (0:30-1:30)
            </h2>
            <p className="leading-relaxed">
              This is where games are won or lost. The scoring system heavily
              rewards length:
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed">
                <strong>Scoring reality:</strong> One 5-letter word = 4 points.
                Four 3-letter words = 4 points. Same investment, same reward.
                But 5-letter words are often easier to spot once you train for
                patterns.
              </p>
            </div>
            <p className="leading-relaxed mt-3">
              <strong>Target these patterns:</strong>
            </p>
            <ul className="space-y-2 ml-4 mt-2 list-disc">
              <li>
                <strong>-TION words:</strong> ACTION, MOTION, NOTION, PROMOTION
              </li>
              <li>
                <strong>-NESS words:</strong> KINDNESS, DARKNESS, HAPPINESS
              </li>
              <li>
                <strong>-MENT words:</strong> MOMENT, PAYMENT, MOVEMENT
              </li>
              <li>
                <strong>-ABLE/-IBLE:</strong> PLAYABLE, READABLE, POSSIBLE
              </li>
              <li>
                <strong>PRE- words:</strong> PREDICT, PREVENT, PRESENT
              </li>
              <li>
                <strong>UN- words:</strong> UNTIL, UNLESS, UNABLE
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 3: Word Extension Multiplier (1:30-2:30)
            </h2>
            <p className="leading-relaxed">
              Every word you find is a goldmine for related words. This strategy
              alone can add 50% more words:
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Extension Chain Example</h3>
              <p className="text-sm leading-relaxed">
                <strong>Base word:</strong> PLAY<br />
                <strong>Check:</strong>
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>✓ PLAYS (plural)</li>
                <li>✓ PLAYED (past tense)</li>
                <li>✓ PLAYING (-ing form)</li>
                <li>✓ PLAYER (person form)</li>
                <li>✓ PLAYERS (plural of person form)</li>
                <li>✓ REPLAY (prefix addition)</li>
              </ul>
              <p className="text-xs text-text-muted mt-2">
                One base word generated 6 related words. If letters are
                reachable, that's 6 submissions for the price of 1 mental find.
              </p>
            </div>
            <p className="leading-relaxed mt-3">
              <strong>Extension checklist:</strong> S (plural), -ED (past),
              -ING (continuous), -ER/-OR (person), -EST (superlative), PRE-/RE-
              (prefixes).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 4: Systematic Scanning Patterns
            </h2>
            <p className="leading-relaxed">
              Random scanning = random results. Use this comprehensive pattern:
            </p>
            <ol className="space-y-2 ml-4 mt-3 list-decimal">
              <li>
                <strong>Horizontal sweep:</strong> Left to right, row by row.
                Then right to left back up.
              </li>
              <li>
                <strong>Vertical sweep:</strong> Top to bottom, column by
                column. Then bottom to top back up.
              </li>
              <li>
                <strong>Diagonal sweep:</strong> Top-left to bottom-right.
                Then top-right to bottom-left.
              </li>
              <li>
                <strong>Anchor expansion:</strong> Pick S, R, T, N, E, A. For
                each, scan all 8 directions for cluster connections.
              </li>
              <li>
                <strong>Reverse check:</strong> Look at your submitted words.
                Can any be extended? PLAY → PLAYED → PLAYING → PLAYER?
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 5: Pattern Recognition Training
            </h2>
            <p className="leading-relaxed">
              The difference between 35-point and 60-point players: pattern
              recognition speed. Train these patterns to instant recognition:
            </p>
            <div className="my-4 grid grid-cols-3 gap-3 text-xs">
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Consonant Clusters</h3>
                <ul className="space-y-1">
                  <li>STR, SPR, SCR, THR</li>
                  <li>BL, CL, FL, GL, PL, SL</li>
                  <li>BR, CR, DR, FR, GR, PR</li>
                  <li>CH, SH, TH, WH, PH</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Vowel Combinations</h3>
                <ul className="space-y-1">
                  <li>EA, EE, IE (team, see, lie)</li>
                  <li>OA, OO, OU (boat, moon, out)</li>
                  <li>AI, EI, IO (rain, rein, ion)</li>
                  <li>AU, EW, UI (cause, new, build)</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">High-Value Endings</h3>
                <ul className="space-y-1">
                  <li>-TION, -SION, -CIAN</li>
                  <li>-NESS, -MENT, -ITY</li>
                  <li>-ABLE, -IBLE, -FUL</li>
                  <li>-ANCE, -ENCE, -ANT</li>
                </ul>
              </div>
            </div>
            <p className="leading-relaxed mt-3">
              When these patterns appear, your brain should automatically
              generate candidate words. No conscious thought required. That's
              champion-level pattern recognition.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 6: Time Management System
            </h2>
            <p className="leading-relaxed mb-3">
              Optimize your 3 minutes like competitive players:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Time</th>
                  <th className="text-left py-2 text-text-muted">Focus</th>
                  <th className="text-left py-2 text-text-muted">Goal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["0:00-0:30", "Grid mapping", "Identify opportunities"],
                  ["0:30-1:30", "5+ letter words", "Maximum points"],
                  ["1:30-2:30", "Medium words + extensions", "Multiply finds"],
                  ["2:30-3:00", "3-letter words + final sweep", "Use remaining time"],
                ].map(([time, focus, goal]) => (
                  <tr key={time} className="border-b border-surface">
                    <td className="py-2">{time}</td>
                    <td className="py-2">{focus}</td>
                    <td className="py-2 text-xs">{goal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              Most beginners invert this — grabbing 3-letter words immediately,
              then hunting for longer words. That's backwards. High-value words
              first.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 7: The Rare Letter Advantage
            </h2>
            <p className="leading-relaxed">
              Some letters appear rarely but create high-value opportunities:
            </p>
            <div className="my-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Qu (Highest Value)</h3>
                <p className="text-xs leading-relaxed">
                  Always appears as QU on one tile. Worth hunting for: QUICK,
                  QUEST, QUOTE, QUIZ, QUITE, QUIT, EQUAL. If you see Qu,
                  prioritize finding words using it.
                </p>
              </div>
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">X, Z, J, K</h3>
                <p className="text-xs leading-relaxed">
                  Rare letters in specific contexts: EX-, -EX, AX, OX, XYLO.
                  Z: ZERO, ZONE, SIZE. J: JUST, JUMP, JOY. K: LIKE, MAKE,
                  TAKE.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Practice Plan: 30-Day Improvement
            </h2>
            <p className="leading-relaxed mb-3">
              Competitive improvement schedule:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Week</th>
                  <th className="text-left py-2 text-text-muted">Focus</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Week 1", "Systematic scanning patterns only"],
                  ["Week 2", "Pattern recognition (clusters, endings)"],
                  ["Week 3", "Word length prioritization"],
                  ["Week 4", "Full strategy integration + time management"],
                ].map(([week, focus]) => (
                  <tr key={week} className="border-b border-surface">
                    <td className="py-2">{week}</td>
                    <td className="py-2">{focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              Play Daily Challenge every day. Track your scores. You should see
              10-15 point improvement by Week 4 if you practice consistently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-surface/50 rounded-xl p-4" open>
                <summary className="font-semibold cursor-pointer">
                  What is the best strategy for Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Best Boggle strategy: Systematic grid scanning, prioritizing
                  5+ letter words over 3-letter words, mastering common letter
                  patterns (TH, HE, IN, ER, -TION, -NESS), always checking
                  plurals and extensions, using the full 3 minutes, and daily
                  practice to build pattern recognition speed.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do you analyze a Boggle grid strategically?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Strategic grid analysis: Identify high-frequency anchor letters
                  (S, R, T, N, E, A), map common letter clusters (TH, HE, IN,
                  ER), locate long word patterns (-TION, -NESS, -MENT), check
                  diagonal connectivity, identify Qu placement, and plan 5+
                  letter word routes before submitting.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What is the competitive Boggle scoring strategy?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Competitive scoring strategy: Prioritize 5+ letter words because
                  one 5-letter word equals four 3-letter words in points. Focus
                  on -TION, -NESS, -MENT words. Use word extensions to multiply
                  finds. Check every word for plurals. Time allocation: 30
                  seconds scanning, 60 seconds hunting long words, 90 seconds on
                  medium and short words.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do Boggle champions approach the game?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Boggle champions think in patterns, not vocabulary. They think
                  in letter clusters (TH, HE, IN, ER) and word structures
                  (-TION, -NESS, -ING) rather than individual letters. They use
                  systematic scanning, prioritize length over quantity, always
                  check extensions and plurals, and have practiced enough that
                  patterns are instant recognition.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Master These Strategies
            </h2>
            <p className="text-text mb-4">
              Pick one strategy and practice it for a week. Then add another.
              Consistent practice beats occasional intensity.
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
                  Proven strategies to consistently score higher.
                </div>
              </Link>
              <Link
                href="/guides/boggle-tips-tricks/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Tips and Tricks →
                </div>
                <div className="text-sm text-text-muted">
                  Quick techniques for finding more words instantly.
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
