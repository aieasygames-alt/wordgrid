import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Most Common Boggle Words — Top 100 High-Frequency List | WordGrid",
  description:
    "Top 100 most common Boggle words found in gameplay. High-frequency word list with bonus combinations, letter patterns, and expert strategies for instant recognition.",
  alternates: { canonical: "/guides/most-common-boggle-words" },
  keywords: [
    "most common boggle words", "boggle high frequency words", "boggle common words",
    "boggle word frequency", "boggle vocabulary list", "boggle most used words",
    "boggle popular words", "boggle word patterns",
  ],
  openGraph: {
    title: "Most Common Boggle Words — Top 100 High-Frequency List",
    description:
      "Top 100 most common Boggle words found in gameplay with high-frequency patterns, bonus combinations, and expert strategies for instant word recognition.",
  },
};

const BASE_URL = "https://wordgrid.games";

// Top 100 most common Boggle words
const TOP_100_WORDS = [
  "THE", "AND", "THAT", "HAVE", "FOR", "NOT", "YOU", "THIS", "BUT", "FROM",
  "THEY", "WITH", "ARE", "WAS", "WERE", "WHAT", "WHEN", "MAKE", "TIME", "JUST",
  "KNOW", "TAKE", "YEAR", "GOOD", "SEE", "COME", "THINK", "LOOK", "WANT", "GIVE",
  "USE", "FIND", "TELL", "ASK", "WORK", "SEEM", "FEEL", "TRY", "LEAVE", "CALL",
  "SHOW", "PLAY", "RUN", "MOVE", "LIVE", "BELIEVE", "HOLD", "BRING", "HAPPEN", "WRITE",
  "SIT", "STAND", "LOSE", "PAY", "MEET", "INCLUDE", "CONTINUE", "SET", "CHANGE", "LEAD",
  "UNDERSTAND", "WATCH", "FOLLOW", "STOP", "CREATE", "SPEAK", "READ", "ALLOW", "ADD", "SPEND",
  "GROW", "OPEN", "WALK", "WIN", "OFFER", "REMEMBER", "LOVE", "CONSIDER", "APPEAR", "BUY",
  "WAIT", "SERVE", "DIE", "SEND", "EXPECT", "BUILD", "STAY", "FALL", "CUT", "REACH",
  "KILL", "REMAIN", "SUGGEST", "RAISE", "PASS", "SELL", "REQUIRE", "REPORT", "DECIDE", "PULL",
  "BREAK", "THANK", "RECEIVE", "JOIN", "CAUSE", "REPRESENT", "APPLY", "LEARN", "INCREASE", "COVER",
  "EXPLAIN", "DRAW", "SUPPORT", "RETURN", "COMPARE", "KNOWLEDGE", "PERHAPS", "FIGURE", "TEACH", "ENJOY",
  "TREAT", "CONTROL", "DESCRIBE", "PICK", "WISH",
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Most Common Boggle Words — Top 100 High-Frequency List",
  description:
    "Top 100 most common Boggle words with high-frequency patterns, bonus combinations, and expert strategies for instant word recognition and improved scoring.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
  mainEntityOfPage: `${BASE_URL}/guides/most-common-boggle-words/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the most common words in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common Boggle words are high-frequency English words: THE, AND, THAT, HAVE, FOR, NOT, YOU, THIS, BUT, FROM, THEY, WITH, ARE, WAS, WERE, WHAT, WHEN, MAKE, TIME, JUST, KNOW, TAKE, YEAR, GOOD, SEE, COME, THINK, LOOK, WANT, GIVE, USE. These appear regularly in grids and should be instantly recognizable for competitive play.",
      },
    },
    {
      "@type": "Question",
      name: "How many words are typically found in a Boggle game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Average Boggle game finds: 25-35 words for beginners, 35-50 words for intermediate players, 50-70 words for advanced players, and 70-100+ words for experts. The record for a single grid is 200+ words, but typical competitive games find 40-60 words depending on grid quality.",
      },
    },
    {
      "@type": "Question",
      name: "What are the highest scoring common words in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Highest scoring common Boggle words: UNDERSTAND (10 letters, 15 points), KNOWLEDGE (9 letters, 13 points), EXPERIENCE (10 letters, 15 points), DIFFERENT (9 letters, 13 points), IMPORTANT (9 letters, 13 points), COMMUNITY (9 letters, 13 points). Common 6-8 letter words: REMEMBER (8 pts), BELIEVE (7 pts), CONTROL (8 pts), CREATE (6 pts), SUPPORT (7 pts).",
      },
    },
    {
      "@type": "Question",
      name: "What letter combinations are most common in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most common Boggle letter combinations: TH (THE, THIS, THAT, WITH), HE (THEM, HELD, HERE), IN (INTO, TIME, FIND), ER (HERE, THERE, WERE), AN (AND, THAN, MANY), RE (HERE, THERE, MORE), ON (ON, INTO, ONLY), AT (THAT, WHAT), OR (FOR, OR), TI (TIME, INTO). These pairs appear in thousands of words.",
      },
    },
    {
      "@type": "Question",
      name: "How can I memorize common Boggle words?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Don't memorize — build pattern recognition. Practice Daily Challenges to see these words repeatedly. Focus on letter clusters (TH, HE, IN, ER) rather than individual words. Look for word endings (-TION, -NESS, -MENT). Play consistently and your brain will automatically recognize common patterns without memorization.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Most Common Boggle Words" },
  ],
};

export default function MostCommonBoggleWordsGuide() {
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
            <Link href="/" className="hover:text-text">Home</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Most Common Boggle Words — Top 100 High-Frequency List
          </h1>
          <p className="text-text-muted">10 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              These <strong>most common Boggle words</strong> appear regularly in
              game grids. Expert players recognize them instantly — not through
              memorization, but through pattern recognition built from thousands
              of games.
            </p>
            <p className="leading-relaxed mt-3">
              This isn't about memorizing a list. It's about understanding which
              words and patterns show up most often so your brain can spot them
              without conscious thought.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Top 20 Most Common Boggle Words
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <p className="text-sm text-text-dim mb-3">
                These appear in almost every game:
              </p>
              <div className="grid grid-cols-5 gap-3 text-sm">
                {TOP_100_WORDS.slice(0, 20).map((word, i) => (
                  <div key={word} className="text-center">
                    <div className="font-mono font-semibold">{word}</div>
                    <div className="text-xs text-text-dim">#{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Top 100 Complete List
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <p className="text-sm text-text-dim mb-3">
                Ranked by frequency of appearance in competitive play:
              </p>
              <div className="grid grid-cols-4 gap-2">
                {TOP_100_WORDS.map((word, i) => (
                  <span
                    key={word}
                    className={`px-2 py-1 text-sm font-mono rounded ${
                      i < 20
                        ? "bg-primary/20"
                        : i < 50
                        ? "bg-surface"
                        : "bg-surface/50"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              High-Scoring Common Words
            </h2>
            <p className="leading-relaxed mb-3">
              Common words that also score highly due to length:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">8-10 Point Words</h3>
                <ul className="space-y-1 text-sm">
                  <li>REMEMBER (8 letters, 11 points)</li>
                  <li>UNDERSTAND (10 letters, 15 points)</li>
                  <li>KNOWLEDGE (9 letters, 13 points)</li>
                  <li>EXPERIENCE (10 letters, 15 points)</li>
                  <li>DIFFERENT (9 letters, 13 points)</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">5-7 Point Words</h3>
                <ul className="space-y-1 text-sm">
                  <li>THINK (5 letters, 4 points)</li>
                  <li>BELIEVE (7 letters, 8 points)</li>
                  <li>CONTROL (7 letters, 8 points)</li>
                  <li>CREATE (6 letters, 6 points)</li>
                  <li>SUPPORT (7 letters, 8 points)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Letter Pair Analysis
            </h2>
            <p className="leading-relaxed mb-3">
              Common letter pairs that generate these words:
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Most Common Pairs</h3>
                <ul className="space-y-1">
                  <li><strong>TH</strong> — THE, THIS, THAT, WITH</li>
                  <li><strong>HE</strong> — THEM, HELD, HERE</li>
                  <li><strong>IN</strong> — INTO, TIME, FIND</li>
                  <li><strong>ER</strong> — HERE, THERE, WERE</li>
                  <li><strong>AN</strong> — AND, THAN, MANY</li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">High-Value Pairs</h3>
                <ul className="space-y-1">
                  <li><strong>RE</strong> — HERE, THERE, MORE</li>
                  <li><strong>ON</strong> — ON, INTO, ONLY</li>
                  <li><strong>AT</strong> — THAT, WHAT</li>
                  <li><strong>OR</strong> — FOR, OR</li>
                  <li><strong>TI</strong> — TIME, INTO</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Pattern Recognition Strategy
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed mb-3">
                <strong>Expert insight:</strong> Don't memorize these words.
                Instead, learn to recognize these patterns instantly:
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>TH cluster:</strong> When you see T next to H, your brain
                  should automatically generate THE, THIS, THAT, WITH, BOTH,
                  WITHOUT
                </li>
                <li>
                  <strong>Common endings:</strong> When you see -ER, instantly think
                  HERE, THERE, WERE, OTHER, ANOTHER, TOGETHER
                </li>
                <li>
                  <strong>ING words:</strong> PLAYING, THINKING, LOOKING,
                  WANTING, FEELING, BEING
                </li>
                <li>
                  <strong>Common starts:</strong> UNDERSTAND, KNOWLEDGE,
                  EXPERIENCE when you see U-N, K-N, E-X patterns
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Word Extension Practice
            </h2>
            <p className="leading-relaxed mb-3">
              From the top 100, these base words generate many extensions:
            </p>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">THINK → Family of Words</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {["THINK", "THINKS", "THINKING", "THOUGHT", "THINKER", "RETHINK"].map(
                    (word) => (
                      <span key={word} className="px-2 py-1 bg-surface rounded font-mono">
                        {word}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">PLAY → Family of Words</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {["PLAY", "PLAYS", "PLAYED", "PLAYING", "PLAYER", "PLAYERS", "REPLAY"].map(
                    (word) => (
                      <span key={word} className="px-2 py-1 bg-surface rounded font-mono">
                        {word}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">MAKE → Family of Words</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {["MAKE", "MAKES", "MADE", "MAKING", "MAKER", "REMAKE"].map(
                    (word) => (
                      <span key={word} className="px-2 py-1 bg-surface rounded font-mono">
                        {word}
                      </span>
                    )
                  )}
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
                  What are the most common words in Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Most common Boggle words: THE, AND, THAT, HAVE, FOR, NOT, YOU,
                  THIS, BUT, FROM, THEY, WITH, ARE, WAS, WERE, WHAT, WHEN, MAKE,
                  TIME, JUST, KNOW, TAKE, YEAR, GOOD, SEE, COME, THINK, LOOK,
                  WANT, GIVE, USE. These appear regularly in grids.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How many words are typically found in a Boggle game?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Average Boggle game finds: 25-35 for beginners, 35-50 for
                  intermediate, 50-70 for advanced, 70-100+ for experts.
                  Competitive games typically find 40-60 words.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What are the highest scoring common words?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Highest scoring common Boggle words: UNDERSTAND (15 pts),
                  KNOWLEDGE (13 pts), EXPERIENCE (15 pts), DIFFERENT (13 pts),
                  IMPORTANT (13 pts). Common 6-8 letter words: REMEMBER (11
                  pts), BELIEVE (8 pts), CONTROL (8 pts).
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What letter combinations are most common?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Most common Boggle letter combinations: TH (THE, THIS, THAT),
                  HE (THEM, HERE), IN (INTO, TIME), ER (HERE, THERE), AN (AND,
                  THAN), RE (HERE, THERE), ON (ON, INTO), AT (THAT, WHAT).
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Practice Recognizing These Words
            </h2>
            <p className="text-text mb-4">
              Don't memorize — play. Daily Challenges will help you recognize these
              patterns automatically. Consistent practice builds instant word
              recognition.
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
                href="/guides/boggle-word-lists/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Word Lists by Letter →
                </div>
                <div className="text-sm text-text-muted">
                  Complete reference organized by starting letter.
                </div>
              </Link>
              <Link
                href="/guides/advanced-boggle-strategies/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Advanced Boggle Strategies →
                </div>
                <div className="text-sm text-text-muted">
                  Expert-level techniques for competitive play.
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
