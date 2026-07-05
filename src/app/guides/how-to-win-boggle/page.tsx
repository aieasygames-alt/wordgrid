import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Win at Boggle — Proven Strategies to Score Higher",
  description:
    "Learn how to win at Boggle with proven strategies from competitive players. Master word patterns, time management, grid scanning techniques, and scoring optimization to consistently beat opponents.",
  alternates: { canonical: "/guides/how-to-win-boggle" },
  keywords: [
    "how to win at boggle", "winning boggle strategies", "boggle winning tips",
    "how to get high score in boggle", "bobble champion strategies", "competitive boggle",
    "boggle scoring secrets", "how to beat friends at boggle",
  ],
  openGraph: {
    title: "How to Win at Boggle — Proven Strategies to Score Higher",
    description:
      "Master competitive Boggle with advanced strategies: word patterns, time management, grid scanning, and scoring optimization from experienced players.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Win at Boggle — Proven Strategies to Score Higher",
  description:
    "A comprehensive guide to winning at Boggle with advanced strategies, word patterns, time management techniques, and competitive tips from experienced players.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
  mainEntityOfPage: `${BASE_URL}/guides/how-to-win-boggle/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you win at Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To win at Boggle, focus on finding longer words (5+ letters) which score significantly more points than short words. Master common word patterns like -ING, -TION, -NESS, and prefixes like RE-, UN-, PRE-. Use systematic grid scanning rather than random searching, and prioritize quality over quantity — one 6-letter word beats six 3-letter words.",
      },
    },
    {
      "@type": "Question",
      name: "What is a winning score in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A winning Boggle score depends on the specific grid and player skill level, but generally: 25-35 points is beginner level, 35-50 is intermediate, 50+ is advanced, and 60+ is expert/champion level. In competitive play, scores of 70+ are possible on exceptional grids. For Daily Challenges, beating the average score puts you in the top half of players.",
      },
    },
    {
      "@type": "Question",
      name: "How do competitive Boggle players scan the grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Competitive players use systematic scanning patterns: horizontal row-by-row scanning, vertical column scanning, and diagonal pattern recognition. They look for common letter clusters like TH, HE, IN, ER, and word endings like -ED, -ING, -TION. Many start by finding the 'anchor letters' — S, R, T, N, E which appear most frequently in English words.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best Boggle strategies for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Best beginner Boggle strategies: 1) Hunt for 3-letter words first to build momentum, 2) Always check plurals (add S to words you find), 3) Look for common prefixes (RE-, UN-) and suffixes (-ING, -ED), 4) Don't ignore diagonal connections, 5) Practice recognizing high-value letter combinations like QU, TH, HE. Focus on speed over perfection initially.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my Boggle score quickly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To quickly improve your Boggle score: 1) Memorize the 50 most common Boggle words, 2) Learn common word patterns (consonant clusters, vowel combinations), 3) Practice daily challenges to build pattern recognition, 4) Focus on 5+ letter words which score disproportionately higher, 5) Use the full 3 minutes — many beginners stop searching too early.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Win at Boggle",
  description: "Step-by-step competitive strategies to achieve higher Boggle scores consistently.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Scan systematically",
      text: "Start with horizontal row-by-row scanning, then vertical columns, then diagonals. Look for common letter clusters: TH, HE, IN, ER, AN, RE. These appear in thousands of words.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Hunt for 5+ letter words",
      text: "Prioritize finding longer words. A single 5-letter word (4 points) beats four 3-letter words (4 points total). Look for word patterns like -TION, -NESS, -ING.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Use prefix and suffix knowledge",
      text: "When you find a word, mentally add common prefixes (RE-, UN-, PRE-) and suffixes (-ING, -ED, -ER, -EST) to generate related words from the same letters.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Check every word for plurals",
      text: "Whenever you find a noun, check if adding S creates a valid word. This doubles your word count with minimal effort.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Practice pattern recognition",
      text: "Play daily and learn to instantly recognize high-value letter combinations like QU, TH, HE, and common word structures. Build mental shortcuts.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "How to Win at Boggle" },
  ],
};

export default function HowToWinBoggleGuide() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
            How to Win at Boggle — Proven Strategies to Score Higher
          </h1>
          <p className="text-text-muted">8 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              Want to <strong>win at Boggle</strong> consistently? It's not just
              about having a big vocabulary. The best players combine pattern
              recognition, systematic grid scanning, and strategic time
              management to find 50% more words than average players.
            </p>
            <p className="leading-relaxed mt-3">
              This guide breaks down exactly how competitive players approach the
              game — the same techniques that separate 25-point scores from
              60+ point champions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Counts as Winning in Boggle?
            </h2>
            <p className="leading-relaxed mb-3">
              Score ranges by skill level:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Score Range</th>
                  <th className="text-left py-2 text-text-muted">Level</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["25-35 points", "Beginner"],
                  ["35-50 points", "Intermediate"],
                  ["50-60 points", "Advanced"],
                  ["60-70 points", "Expert"],
                  ["70+ points", "Champion"],
                ].map(([score, level]) => (
                  <tr key={score} className="border-b border-surface">
                    <td className="py-2">{score}</td>
                    <td className="py-2">{level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              In Daily Challenges, beating the average score typically puts you
              in the top 50% of players. The top 10% consistently score 55+.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 1: Hunt for Length, Not Quantity
            </h2>
            <p className="leading-relaxed">
              The biggest mistake beginners make: chasing every 3-letter word
              they can find. Here's why that's wrong:
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed">
                <strong>Scoring math:</strong> One 5-letter word = 4 points.
                Four 3-letter words = 4 points. Same time investment, same
                reward — but the 5-letter word is often easier to spot once you
                train your brain.
              </p>
            </div>
            <p className="leading-relaxed mt-3">
              <strong>Winning approach:</strong> Scan specifically for word
              patterns that indicate length:
            </p>
            <ul className="space-y-1 ml-4 mt-2 list-disc">
              <li><strong>-TION</strong> words (ACTION, MOTION, NOTION)</li>
              <li><strong>-NESS</strong> words (HAPPINESS, DARKNESS)</li>
              <li><strong>-ING</strong> words (PLAYING, THINKING)</li>
              <li><strong>PRE-</strong> words (PREDICT, PREVENT)</li>
              <li><strong>UN-</strong> words (UNTIL, UNLESS)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 2: Systematic Grid Scanning
            </h2>
            <p className="leading-relaxed">
              Random eye movement = missed words. Competitive players scan in
              patterns:
            </p>
            <ol className="space-y-2 ml-4 mt-3 list-decimal">
              <li>
                <strong>Horizontal rows.</strong> Left to right, right to left.
                Look for letter clusters.
              </li>
              <li>
                <strong>Vertical columns.</strong> Top to bottom, bottom to top.
                Vertical connections are easy to miss.
              </li>
              <li>
                <strong>Diagonal patterns.</strong> Most beginners ignore
                diagonals. Champions live there.
              </li>
              <li>
                <strong>Anchor letters.</strong> S, R, T, N, E, A appear in the
                most English words. Build around them.
              </li>
            </ol>
            <p className="leading-relaxed mt-3">
              Spend the first 30 seconds purely on scanning. Don't submit
              words yet. Just map the grid mentally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 3: Master Common Letter Clusters
            </h2>
            <p className="leading-relaxed mb-3">
              English is pattern-based. These letter combinations appear in
              thousands of words:
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Common Pairs</h3>
                <ul className="space-y-1">
                  <li>TH — THE, THIS, THAT</li>
                  <li>HE — HELD, HELLO, HELP</li>
                  <li>IN — INTO, TIME, FIND</li>
                  <li>ER — HERE, THERE, WERE</li>
                  <li>AN — AND, THAN, MANY</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">High-Value Combos</h3>
                <ul className="space-y-1">
                  <li>QU — QUICK, QUEST, QUOTE</li>
                  <li>TION — ACTION, MOTION</li>
                  <li>NESS — KINDNESS, SADNESS</li>
                  <li>ING — PLAYING, FINDING</li>
                  <li>PRE — PREDICT, PREVENT</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 4: The Plural Multiplier
            </h2>
            <p className="leading-relaxed">
              This is the easiest way to add 30-50% more words with minimal
              effort:
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4">
              <p className="text-sm leading-relaxed">
                <strong>The rule:</strong> Every time you find a noun, mentally
                add <strong>S</strong> and check if it's a valid word. CAT →
                CATS. DOG → DOGS. PLAYER → PLAYERS.
              </p>
              <p className="text-sm text-text-muted mt-2">
                If there's an S reachable from your word, you've just doubled
                your find with 1 second of extra effort.
              </p>
            </div>
            <p className="leading-relaxed">
              Advanced version: Also check -ED, -ER, -EST. PLAY → PLAYED →
              PLAYER. FAST → FASTER → FASTEST.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 5: Time Management for Maximum Score
            </h2>
            <p className="leading-relaxed mb-3">
              How to use your 3 minutes like a champion:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Time</th>
                  <th className="text-left py-2 text-text-muted">Focus</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["0-30 seconds", "Pure scanning. Map the grid. No submissions."],
                  ["30-90 seconds", "Submit 5+ letter words. Maximum points."],
                  ["90-150 seconds", "Medium words (4 letters). Plurals."],
                  ["150-180 seconds", "Quick 3-letter words. Final sweep."],
                ].map(([time, focus]) => (
                  <tr key={time} className="border-b border-surface">
                    <td className="py-2">{time}</td>
                    <td className="py-2">{focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              Most beginners do this backwards — they grab 3-letter words
              immediately, then spend the last minute hunting for longer words.
              Champions prioritize high-value words first.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Strategy 6: Practice Patterns, Not Just Words
            </h2>
            <p className="leading-relaxed">
              The difference between 35-point players and 60-point players:
              pattern recognition speed.
            </p>
            <p className="leading-relaxed mt-3">
              Instead of memorizing word lists, memorize <strong>structures</strong>:
            </p>
            <ul className="space-y-2 ml-4 mt-2 list-disc">
              <li>
                <strong>Consonant clusters:</strong> STR, SPR, SCR, THR, CHR,
                BL, CL, FL, GL, PL, SL
              </li>
              <li>
                <strong>Vowel combinations:</strong> EA, EE, IE, OA, OO, OU,
                AI, EI, IO
              </li>
              <li>
                <strong>Endings:</strong> -TION, -NESS, -MENT, -ANCE, -ENCE,
                -ABLE, -IBLE
              </li>
              <li>
                <strong>Prefixes:</strong> PRE-, PRO-, RE-, UN-, IN-, IM-, DIS-
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              When you see these patterns, your brain should instantly generate
              candidate words. That's how champions find 10+ words in the same
                time beginners find 5.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Quick Wins: Instant Score Improvements
            </h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                <strong>Always check diagonals.</strong> 40% of players miss
                diagonal words.
              </li>
              <li>
                <strong>Use the full 3 minutes.</strong> Most beginners stop at
                2:00. Keep searching.
              </li>
              <li>
                <strong>Look for QU first.</strong> It's rare but high-value.
                QUICK, QUEST, QUOTE, QUIZ.
              </li>
              <li>
                <strong>Check your own words for extensions.</strong> PLAY →
                PLAYER → PLAYED → PLAYING.
              </li>
              <li>
                <strong>Practice daily.</strong> Play the Daily Challenge every
                day. Pattern recognition compounds.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-surface/50 rounded-xl p-4" open>
                <summary className="font-semibold cursor-pointer">
                  How do you win at Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  To win at Boggle, focus on finding longer words (5+ letters)
                  which score significantly more points. Master common word
                  patterns like -ING, -TION, -NESS, and prefixes like RE-, UN-.
                  Use systematic grid scanning and prioritize quality over
                  quantity.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What is a winning score in Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  A winning Boggle score: 25-35 for beginners, 35-50
                  intermediate, 50+ advanced, 60+ expert, and 70+ champion
                  level. In Daily Challenges, beating the average puts you in
                  the top half of players.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How can I improve my Boggle score quickly?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  To quickly improve: 1) Memorize the 50 most common Boggle
                  words, 2) Learn common word patterns, 3) Practice daily
                  challenges, 4) Focus on 5+ letter words, 5) Use the full 3
                  minutes instead of stopping early.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What strategies do competitive Boggle players use?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Competitive players use systematic scanning patterns, look for
                  common letter clusters (TH, HE, IN, ER), prioritize longer
                  words over short ones, always check plurals and word
                  extensions, and practice pattern recognition daily.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Practice Winning Strategies
            </h2>
            <p className="text-text mb-4">
              The best way to improve: play daily. Pattern recognition builds
              over time. Start a Daily Challenge now.
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
                href="/guides/boggle-tips-tricks/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Tips and Tricks →
                </div>
                <div className="text-sm text-text-muted">
                  Practical techniques for spotting more words faster.
                </div>
              </Link>
              <Link
                href="/guides/word-grid-strategies/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Word Grid Strategies: Score Higher Every Game →
                </div>
                <div className="text-sm text-text-muted">
                  Advanced scoring strategy and time management breakdown.
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
