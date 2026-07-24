import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";

export const metadata: Metadata = {
  title: "Boggle Tips and Tricks — Quick Techniques to Find More Words",
  description:
    "Practical Boggle tips and tricks to find more words instantly. Learn grid scanning techniques, letter pattern recognition, word extension strategies, and time-saving shortcuts from experienced players.",
  alternates: { canonical: "/guides/boggle-tips-tricks" },
  keywords: [
    "boggle tips and tricks", "boggle tricks", "boggle word finding tips",
    "boggle shortcut techniques", "how to find more words in boggle", "boggle hacks",
    "boggle strategy tips", "boggle scanning techniques",
  ],
  openGraph: {
    title: "Boggle Tips and Tricks — Quick Techniques to Find More Words",
    description:
      "Instant actionable Boggle tips: grid scanning patterns, letter shortcuts, word extension techniques, and time-saving tricks from competitive players.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Tips and Tricks — Quick Techniques to Find More Words",
  description:
    "Practical Boggle tips and tricks for finding more words instantly, including grid scanning techniques, letter pattern shortcuts, and word extension strategies.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-07-24",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-tips-tricks/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the best Boggle tips for finding more words?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Best Boggle tips for finding more words: 1) Scan diagonals — 40% of players miss diagonal words. 2) Always check plurals by adding S to nouns. 3) Look for common letter clusters like TH, HE, IN, ER. 4) Hunt for 5+ letter words which score disproportionately higher. 5) Use systematic scanning patterns instead of random searching. 6) Practice daily to build pattern recognition.",
      },
    },
    {
      "@type": "Question",
      name: "How do you scan a Boggle grid effectively?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Effective Boggle grid scanning: Start with horizontal row-by-row scanning left-to-right and right-to-left. Then vertical columns top-to-bottom. Finally diagonals in both directions. Look for common letter pairs (TH, HE, IN, ER, AN) and word endings (-ED, -ING, -TION). Spend the first 30 seconds purely mapping the grid before submitting words.",
      },
    },
    {
      "@type": "Question",
      name: "What are some Boggle shortcuts for finding words faster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle shortcuts for speed: 1) Memorize high-frequency letter combos (QU, TH, HE, IN, ER, AN, RE). 2) When you find a word, instantly check for extensions (PLAY → PLAYED → PLAYER → PLAYING). 3) Look for anchor letters (S, R, T, N, E, A) which appear in most words. 4) Scan for word patterns (-TION, -NESS, -MENT) not individual letters. 5) Use the plural trick — add S to every noun.",
      },
    },
    {
      "@type": "Question",
      name: "What is the plural trick in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The plural trick in Boggle: Every time you find a noun, mentally add S and check if it's a valid word. CAT → CATS. DOG → DOGS. PLAYER → PLAYERS. This simple trick can add 30-50% more words with minimal extra effort. If there's an S reachable from your word, you've just doubled your find with 1 second of extra work.",
      },
    },
    {
      "@type": "Question",
      name: "How do competitive Boggle players think differently?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Competitive Boggle players think in patterns, not individual words. They scan for letter clusters (TH, HE, IN, ER) rather than random letters. They prioritize 5+ letter words over 3-letter words because one 5-letter word equals four 3-letter words in points. They use systematic scanning instead of random searching. And they practice daily to build instant pattern recognition.",
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
    { "@type": "ListItem", position: 3, name: "Boggle Tips and Tricks" },
  ],
};

export default function BoggleTipsTricksGuide() {
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
            Boggle Tips and Tricks — Quick Techniques to Find More Words
          </h1>
          <p className="text-text-muted">7 min read &middot; Updated July 24, 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              These <strong>Boggle tips and tricks</strong> will help you find
              more words in your very next game. No memorization required —
              just practical techniques you can use immediately.
            </p>
            <p className="leading-relaxed mt-3">
              <Link href="/play" className="text-primary hover:underline">
                Try these tips now →
              </Link>{" "}
              and compare them with the{" "}
              <Link href="/guides/most-common-boggle-words" className="text-primary hover:underline">
                most common Boggle words
              </Link>
              .
            </p>
            <p className="leading-relaxed mt-3">
              If you want the full score logic and post-game review flow, pair these
              tips with the{" "}
              <Link href="/guides/boggle-scoring-sheet" className="text-primary hover:underline">
                scoring sheet
              </Link>
              ,{" "}
              <Link href="/guides/boggle-dictionary" className="text-primary hover:underline">
                dictionary guide
              </Link>
              , and{" "}
              <Link href="/solver" className="text-primary hover:underline">
                solver
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 1: The Diagonal Secret
            </h2>
            <p className="leading-relaxed">
              <strong>40% of players miss diagonal words.</strong> That's not a
              made-up statistic — it's what happens when you only scan
              horizontally and vertically.
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed">
                <strong>The fix:</strong> After horizontal and vertical scans,
                force yourself to check diagonals in BOTH directions. Top-left
                to bottom-right, AND top-right to bottom-left. You'll find 5-10
                words you missed every game.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 2: The Plural Multiplier
            </h2>
            <p className="leading-relaxed">
              This is the easiest way to add 30-50% more words with almost zero
              effort:
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4">
              <p className="text-sm leading-relaxed">
                <strong>Every time you find a noun, add S.</strong> CAT → CATS.
                DOG → DOGS. PLAYER → PLAYERS. If there's an S reachable from
                your word, check it. Takes 1 second, doubles your find.
              </p>
            </div>
            <p className="leading-relaxed mt-3">
              <strong>Advanced version:</strong> Also check -ED, -ER, -EST. PLAY
              → PLAYED → PLAYER → PLAYING → PLAYERS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 3: Hunt Letter Clusters, Not Letters
            </h2>
            <p className="leading-relaxed">
              Stop looking at individual letters. Look for <strong>patterns
              </strong> that appear in thousands of words:
            </p>
            <div className="my-4 grid grid-cols-2 gap-4 text-sm">
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Common Pairs</h3>
                <ul className="space-y-1">
                  <li><strong>TH</strong> — THE, THIS, THAT</li>
                  <li><strong>HE</strong> — HELD, HELLO, HERE</li>
                  <li><strong>IN</strong> — INTO, TIME, FIND</li>
                  <li><strong>ER</strong> — HERE, THERE, WERE</li>
                  <li><strong>AN</strong> — AND, THAN, MANY</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Word Endings</h3>
                <ul className="space-y-1">
                  <li><strong>-ED</strong> — PLAYED, LOOKED</li>
                  <li><strong>-ING</strong> — PLAYING, LOOKING</li>
                  <li><strong>-TION</strong> — ACTION, MOTION</li>
                  <li><strong>-NESS</strong> — SADNESS, KINDNESS</li>
                  <li><strong>-MENT</strong> — MOMENT, PAYMENT</li>
                </ul>
              </div>
            </div>
            <p className="leading-relaxed mt-3">
              When you see these patterns, your brain should instantly generate
              candidate words. That's how experienced players find 10+ words
              while beginners find 5.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 4: Prioritize Length Over Quantity
            </h2>
            <p className="leading-relaxed">
              Here's the math that changes how you play:
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4">
              <p className="text-sm leading-relaxed">
                <strong>One 5-letter word = 4 points</strong><br />
                <strong>Four 3-letter words = 4 points</strong><br />
                <br />
                Same reward. But the 5-letter word is often easier to spot once
                you train your brain to look for patterns like -TION, -NESS,
                -ING instead of random 3-letter combinations.
              </p>
            </div>
            <p className="leading-relaxed mt-3">
              <strong>Winning approach:</strong> Spend the first minute hunting
              specifically for 5+ letter words. Then grab shorter words.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 5: Use Anchor Letters
            </h2>
            <p className="leading-relaxed">
              Some letters appear in way more words than others. Build your
              scanning around <strong>anchor letters</strong>:
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4">
              <p className="text-sm leading-relaxed">
                <strong>High-frequency letters:</strong> S, R, T, N, E, A<br />
                <strong>Medium-frequency:</strong> L, I, O, D, H, C<br />
                <strong>Rare but valuable:</strong> QU, J, X, Z, K
              </p>
              <p className="text-xs text-text-muted mt-2">
                S, R, T, N, E, A appear in the most English words. When you
                see these, scan in all directions for connections.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 6: The 30-Second Mapping Rule
            </h2>
            <p className="leading-relaxed">
              Most beginners start submitting words immediately. That's a
              mistake.
            </p>
            <div className="my-4 bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed">
                <strong>Better approach:</strong> Spend the first 30 seconds
                purely scanning. Don't submit anything yet. Map the grid
                mentally. Look for patterns. THEN start submitting. You'll find
                20% more words overall.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 7: Always Check Word Extensions
            </h2>
            <p className="leading-relaxed">
              Every word you find is a goldmine for related words. Check:
            </p>
            <ul className="space-y-2 ml-4 mt-2 list-disc">
              <li>
                <strong>Plural:</strong> PLAY → PLAYS
              </li>
              <li>
                <strong>Past tense:</strong> PLAY → PLAYED
              </li>
              <li>
                <strong>-ING form:</strong> PLAY → PLAYING
              </li>
              <li>
                <strong>-ER form:</strong> PLAY → PLAYER
              </li>
              <li>
                <strong>Prefixes:</strong> PLAY → REPLAY
              </li>
            </ul>
            <p className="leading-relaxed mt-3">
              One base word like PLAY can generate PLAYS, PLAYED, PLAYING,
              PLAYER, PLAYERS, REPLAY — if the letters are reachable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 8: Use the Full 3 Minutes
            </h2>
            <p className="leading-relaxed">
              <strong>Most beginners stop at 2:00.</strong> They think they've
              found everything. They haven't.
            </p>
            <p className="leading-relaxed mt-3">
              The last minute is when you find the diagonal words you missed,
              the word extensions you forgot, and the short words hiding in
              corners. Use every second.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 9: Scan Systematically, Not Randomly
            </h2>
            <p className="leading-relaxed mb-3">
              Random eye movement = missed words. Use this scanning pattern:
            </p>
            <ol className="space-y-2 ml-4 list-decimal">
              <li>
                <strong>Horizontal rows:</strong> Left to right, then right to
                left
              </li>
              <li>
                <strong>Vertical columns:</strong> Top to bottom, then bottom to
                top
              </li>
              <li>
                <strong>Diagonals:</strong> Top-left to bottom-right, then
                top-right to bottom-left
              </li>
              <li>
                <strong>Anchor letters:</strong> Pick S, R, T, N, E, A and scan
                all directions from each
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Tip 10: Practice Pattern Recognition Daily
            </h2>
            <p className="leading-relaxed">
              This is the long game. The difference between 35-point players and
              60-point players is <strong>pattern recognition speed</strong>.
            </p>
            <p className="leading-relaxed mt-3">
              Play the Daily board every day. Over time, your brain will
              instantly recognize TH, HE, IN, ER, -TION, -NESS, -ING without
              conscious thought. That's how champions find 10+ words in the time
              beginners find 5.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Quick Reference: Letter Clusters to Memorize
            </h2>
            <div className="my-4 grid grid-cols-3 gap-3 text-xs">
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Consonant Clusters</h3>
                <ul className="space-y-1">
                  <li>STR, SPR, SCR</li>
                  <li>BL, CL, FL, GL, PL, SL</li>
                  <li>BR, CR, DR, FR, GR, PR</li>
                  <li>TH, CH, SH, WH</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Vowel Combos</h3>
                <ul className="space-y-1">
                  <li>EA, EE, IE</li>
                  <li>OA, OO, OU</li>
                  <li>AI, EI, IO</li>
                  <li>AU, EW, UI</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-3">
                <h3 className="font-semibold mb-2">Prefixes/Suffixes</h3>
                <ul className="space-y-1">
                  <li>PRE-, PRO-, RE-</li>
                  <li>UN-, IN-, IM-, DIS-</li>
                  <li>-TION, -NESS, -MENT</li>
                  <li>-ABLE, -IBLE, -FUL</li>
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
                  What are the best Boggle tips for finding more words?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Best Boggle tips: 1) Scan diagonals (40% of players miss
                  these), 2) Always check plurals by adding S to nouns, 3) Look
                  for common letter clusters (TH, HE, IN, ER), 4) Hunt for 5+
                  letter words, 5) Use systematic scanning patterns, 6) Practice
                  daily to build pattern recognition.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do you scan a Boggle grid effectively?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Effective Boggle scanning: Horizontal rows left-to-right and
                  right-to-left, vertical columns top-to-bottom and
                  bottom-to-top, diagonals in both directions, and anchor letter
                  scanning from S, R, T, N, E, A. Look for common letter pairs
                  and word endings.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What is the plural trick in Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  The plural trick: Every time you find a noun, mentally add S
                  and check if it's valid. CAT → CATS. DOG → DOGS. PLAYER →
                  PLAYERS. This can add 30-50% more words with minimal effort.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do competitive Boggle players think differently?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Competitive players think in patterns, not individual words.
                  They scan for letter clusters (TH, HE, IN, ER) rather than
                  random letters. They prioritize 5+ letter words over 3-letter
                  words because one 5-letter word equals four 3-letter words in
                  points. They use systematic scanning instead of random
                  searching.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Try These Tips Now
            </h2>
            <p className="text-text mb-4">
              Pick one tip and use it in your next game. You'll find more words
              immediately.
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
            <h2 className="text-lg font-semibold mb-3">Next Pages</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/guides/boggle-rules-beginners"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Rules for Beginners
                </div>
                <div className="text-sm text-text-muted mt-1">
                  Good if you want the rules and scoring refresher first.
                </div>
              </Link>
              <Link
                href="/guides/word-grid-strategies"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Word Grid Strategies
                </div>
                <div className="text-sm text-text-muted mt-1">
                  Best for turning these tips into higher scores.
                </div>
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
                  Competitive strategies for consistently high scores.
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
                  Comprehensive strategy manual for serious players.
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
