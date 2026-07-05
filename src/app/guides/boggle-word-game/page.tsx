import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boggle Word Game — Rules, Scoring & Free Online Play",
  description:
    "Master the Boggle word game. Learn the rules, how scoring works, and play free online instantly. 4×4 grid, 3-minute rounds, connect adjacent letters to find words.",
  alternates: { canonical: "/guides/boggle-word-game" },
  keywords: [
    "boggle word game", "boggle word game rules", "boggle word game online",
    "boggle word game scoring", "how to play boggle word game", "boggle word game instructions",
    "boggle word game strategy", "boggle word game tips",
  ],
  openGraph: {
    title: "Boggle Word Game — Rules, Scoring & Free Online Play",
    description:
      "Complete guide to the Boggle word game — rules, scoring table, and where to play free online. Learn word-finding strategies and improve your score.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Word Game — Rules, Scoring & Free Online Play",
  description:
    "A complete guide to the Boggle word game including rules, scoring system, and free online gameplay options.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-28",
  dateModified: "2026-06-28",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-word-game/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Boggle word game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle is a classic word game played on a 4×4 grid of 16 lettered dice. Players have 3 minutes to find as many words as possible by connecting adjacent letters horizontally, vertically, or diagonally. Words must be at least 3 letters long, and each tile can only be used once per word. Longer words score more points.",
      },
    },
    {
      "@type": "Question",
      name: "How do you score in the Boggle word game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle scoring is based on word length: 3-letter words = 1 point, 4-letter = 2 points, 5-letter = 4 points, 6-letter = 6 points, 7-letter = 8 points, and 8+ letters = 11+ points. The scoring system heavily rewards longer words — a single 5-letter word is worth as much as four 3-letter words.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules of the Boggle word game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The core rules are: 1) Connect adjacent letters (including diagonals) to spell words, 2) Each word must be at least 3 letters long, 3) You cannot reuse the same tile twice in one word, 4) Only valid English dictionary words count (no proper nouns, abbreviations, or foreign words), 5) You have 3 minutes to find as many words as possible.",
      },
    },
    {
      "@type": "Question",
      name: "Can I play the Boggle word game online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordGrid offers free online Boggle gameplay with no download or sign-up required. Visit wordgrid.games to play the classic word game in your browser on desktop or mobile.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Qu tile in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Boggle, the letter Q almost always appears as 'Qu' on a single tile because English words rarely use Q without U. The Qu tile occupies one cell but counts as two letters (Q and U) when spelling a word. You cannot separate Q and U onto different tiles.",
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
    { "@type": "ListItem", position: 3, name: "Boggle Word Game" },
  ],
};

// Example board for illustration
const EXAMPLE_BOARD = [
  ["S", "T", "A", "R"],
  ["L", "O", "G", "I"],
  ["W", "E", "N", "D"],
  ["Qu", "H", "K", "M"],
];

export default function BoggleWordGameGuide() {
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
            Boggle Word Game — Rules, Scoring &amp; Free Online Play
          </h1>
          <p className="text-text-muted">6 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              The <strong>Boggle word game</strong> is a classic that has
              challenged word lovers since 1972. A 4×4 grid of letters. Three
              minutes on the clock. Your job: find as many words as possible by
              connecting adjacent letters. Simple rules, deep strategy.
            </p>
            <p className="leading-relaxed mt-3">
              <Link href="/play" className="text-primary hover:underline">
                Play the Boggle word game free online →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Is the Boggle Word Game?
            </h2>
            <p className="leading-relaxed">
              Boggle is a word search game played on a grid of 16 lettered dice
              arranged in 4 rows and 4 columns. Players race against a 3-minute
              timer to find words by connecting adjacent letters in any of the 8
              directions (horizontal, vertical, or diagonal).
            </p>
            <p className="leading-relaxed mt-3">
              The game tests your vocabulary, pattern recognition, and speed.
              Longer words score dramatically more points, so experienced players
              focus on finding 5+ letter words rather than chasing every short
              word they see.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How the Boggle Word Game Works
            </h2>
            <p className="leading-relaxed mb-3">
              Here's an example of what a Boggle grid looks like:
            </p>

            <div className="my-4 inline-block bg-surface/50 rounded-xl p-4">
              <div className="grid grid-cols-4 gap-2">
                {EXAMPLE_BOARD.flat().map((letter, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 flex items-center justify-center bg-surface rounded-lg font-bold text-lg border border-border"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            <p className="leading-relaxed">
              From this grid, you could find words like:
            </p>
            <ul className="space-y-1 ml-4 mt-2">
              <li>STAR (top row, left to right)</li>
              <li>LOG (second row, left to right)</li>
              <li>DEN (third row, left to right)</li>
              <li>QUEST (starts at Qu, snakes through the grid)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Boggle Word Game Rules
            </h2>
            <ol className="space-y-3 ml-4 list-decimal">
              <li>
                <strong>Connect adjacent letters.</strong> Each letter must be
                next to the previous one — horizontally, vertically, or
                diagonally. Think of it like a king moving in chess.
              </li>
              <li>
                <strong>Minimum 3 letters.</strong> Two-letter words like
                &ldquo;AT&rdquo; or &ldquo;GO&rdquo; don't count, even though
                they're real words.
              </li>
              <li>
                <strong>No repeating tiles.</strong> You can't use the same
                letter tile twice in one word. If there's only one
                &ldquo;E&rdquo; in reachable position, you can't spell
                &ldquo;ELEVEN&rdquo;.
              </li>
              <li>
                <strong>Valid English words only.</strong> No proper nouns
                (&ldquo;Paris&rdquo;), abbreviations (&ldquo;TV&rdquo;), or
                foreign words generally used in English.
              </li>
              <li>
                <strong>3-minute timer.</strong> When time runs out, the round
                is over and your final score is tallied.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Boggle Word Game Scoring
            </h2>
            <p className="leading-relaxed mb-3">
              The scoring system is designed to reward longer words heavily:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">
                    Word Length
                  </th>
                  <th className="text-left py-2 text-text-muted">Points</th>
                  <th className="text-left py-2 text-text-muted">Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [3, 1, "Baseline"],
                  [4, 2, "2× baseline"],
                  [5, 4, "4× baseline"],
                  [6, 6, "6× baseline"],
                  [7, 8, "8× baseline"],
                  ["8+", "11+", "Jackpot"],
                ].map(([len, pts, value]) => (
                  <tr key={String(len)} className="border-b border-surface">
                    <td className="py-2">{len} letters</td>
                    <td className="py-2 text-primary font-semibold">{pts} pts</td>
                    <td className="py-2 text-xs text-text-dim">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              <strong>The key insight:</strong> A single 5-letter word is worth
              as much as four 3-letter words. This is why competitive players
              prioritize finding longer words over grabbing every short word in
              sight.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              The Special Qu Tile
            </h2>
            <p className="leading-relaxed">
              In Boggle, the letter Q appears as <strong>Qu</strong> on a single
              tile. This is because English words almost never use Q without a
              following U. The Qu tile:
            </p>
            <ul className="space-y-1 ml-4 mt-2 list-disc">
              <li>Occupies one cell on the grid</li>
              <li>Counts as two letters (Q and U) when spelling</li>
              <li>Makes words like &ldquo;QUEST&rdquo; and &ldquo;QUICK&rdquo;
              possible</li>
              <li>Cannot be split — Q and U must stay together</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Play the Boggle Word Game Online Free
            </h2>
            <p className="leading-relaxed">
              You don't need the physical board game to play. WordGrid offers
              free online Boggle gameplay with:
            </p>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                <strong>No download.</strong> Runs in your browser on desktop
                and mobile.
              </li>
              <li>
                <strong>No sign-up.</strong> No account, no email, no password.
              </li>
              <li>
                <strong>Daily Challenge.</strong> Same grid for everyone each
                day — compare scores with friends.
              </li>
              <li>
                <strong>Practice mode.</strong> Unlimited random grids to
                improve your skills.
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              <Link href="/play" className="text-primary hover:underline">
                Play Boggle online free now →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tips for Scoring Higher
            </h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                <strong>Hunt for prefixes.</strong> If you see &ldquo;RE&rdquo;
                or &ldquo;UN&rdquo;, look for words that start with those
                patterns.
              </li>
              <li>
                <strong>Check for plurals.</strong> If you find &ldquo;CAT&rdquo;,
                check if &ldquo;CATS&rdquo; is reachable.
              </li>
              <li>
                <strong>Scan diagonally.</strong> Most beginners only check
                horizontal and vertical connections. Diagonal paths hide lots of
                words.
              </li>
              <li>
                <strong>Prioritize length.</strong> A 5-letter word is worth
                four 3-letter words. Spend time hunting for longer words before
                grabbing every short one.
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
                  What is the Boggle word game?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Boggle is a classic word game played on a 4×4 grid of
                  letters. Players have 3 minutes to find words by connecting
                  adjacent letters horizontally, vertically, or diagonally.
                  Words must be 3+ letters, and longer words score more.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do you score in Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Boggle scoring by word length: 3 letters = 1 point, 4 = 2
                  points, 5 = 4 points, 6 = 6 points, 7 = 8 points, 8+ = 11+
                  points. Longer words are worth significantly more.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Can I play Boggle online for free?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes. WordGrid offers free online Boggle gameplay with no
                  download or sign-up. Just visit wordgrid.games and start
                  playing.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What words are allowed in Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Valid words are at least 3 letters long, appear in a standard
                  English dictionary, and are not proper nouns, abbreviations,
                  or foreign words. Different game dictionaries may vary slightly.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Play Boggle Word Game Online Free
            </h2>
            <p className="text-text mb-4">
              No download. No sign-up. Classic Boggle rules, 3-minute timer,
              unlimited free games.
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
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link
                href="/guides/boggle-rules-beginners/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Rules of Boggle: A Complete Beginner's Guide →
                </div>
                <div className="text-sm text-text-muted">
                  Every rule explained with visual examples and the Qu tile
                  breakdown.
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
                  Advanced scoring strategy, time management, and word families.
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
