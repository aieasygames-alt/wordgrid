import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boggle Rules Printable — Free PDF Reference Sheet | WordGrid",
  description:
    "Printable Boggle rules reference sheet. Free PDF download with complete game rules, scoring table, word validity guidelines, and quick reference for players of all levels.",
  alternates: { canonical: "/guides/boggle-rules-printable" },
  keywords: [
    "boggle rules printable", "boggle rules pdf", "boggle scoring sheet printable",
    "boggle rules reference", "boggle game rules printable", "boggle score sheet",
    "boggle rules summary", "printable boggle instructions",
  ],
  openGraph: {
    title: "Boggle Rules Printable — Free PDF Reference Sheet",
    description:
      "Download a printable Boggle rules reference with complete game rules, scoring table, and quick guidelines. Perfect for game nights and teaching new players.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Rules Printable — Free PDF Reference Sheet",
  description:
    "A comprehensive printable Boggle rules reference sheet including game rules, scoring table, word validity guidelines, and quick reference for teaching and playing.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-rules-printable/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I find printable Boggle rules?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can find printable Boggle rules on this page with a complete rules reference including scoring table, word validity guidelines, and game setup. The rules are formatted for easy printing and include all essential information for teaching new players or quick reference during games.",
      },
    },
    {
      "@type": "Question",
      name: "What are the official Boggle rules for scoring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Official Boggle scoring by word length: 3 letters = 1 point, 4 letters = 2 points, 5 letters = 4 points, 6 letters = 6 points, 7 letters = 8 points, and 8+ letters = 11 points. Longer words are worth significantly more to encourage finding complex words over many short ones.",
      },
    },
    {
      "@type": "Question",
      name: "How do you explain Boggle rules to beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Explain Boggle rules to beginners in 4 steps: 1) Connect adjacent letters (horizontally, vertically, or diagonally) to spell words, 2) Words must be at least 3 letters long, 3) You can't use the same tile twice in one word, 4) Only valid English dictionary words count (no proper nouns, abbreviations). Emphasize that longer words score more points.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a printable Boggle scoring sheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The scoring table on this page can be printed as a reference sheet showing points by word length: 3 letters = 1 point, 4 = 2 points, 5 = 4 points, 6 = 6 points, 7 = 8 points, 8+ = 11 points. This can be used for quick scoring reference during games.",
      },
    },
    {
      "@type": "Question",
      name: "What words are allowed in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle allows words that are at least 3 letters long, appear in standard English dictionaries, and are not proper nouns (names of people/places), abbreviations (TV, ASAP), or foreign words commonly used in English. Different dictionaries may vary slightly on specific words.",
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
    { "@type": "ListItem", position: 3, name: "Boggle Rules Printable" },
  ],
};

export default function BoggleRulesPrintableGuide() {
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
            Boggle Rules Printable — Free Reference Sheet
          </h1>
          <p className="text-text-muted">5 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              Need a <strong>printable Boggle rules</strong> reference? This page
              contains everything you need — complete rules, scoring table,
              word validity guidelines — formatted for easy printing. Perfect for
              game nights, teaching new players, or quick reference during
              gameplay.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Quick Rules Summary
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <ol className="space-y-2 list-decimal ml-4">
                <li>
                  <strong>Setup:</strong> 4×4 grid of 16 letters. 3-minute
                  timer.
                </li>
                <li>
                  <strong>Goal:</strong> Find as many words as possible by
                  connecting adjacent letters.
                </li>
                <li>
                  <strong>Connections:</strong> Letters must touch horizontally,
                  vertically, or diagonally.
                </li>
                <li>
                  <strong>Minimum length:</strong> 3 letters. No 2-letter words.
                </li>
                <li>
                  <strong>No repeats:</strong> Can't use the same tile twice in
                  one word.
                </li>
                <li>
                  <strong>Valid words only:</strong> Standard English words. No
                  proper nouns, abbreviations, or foreign words.
                </li>
                <li>
                  <strong>Scoring:</strong> Longer words = more points. See
                  scoring table below.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Scoring Table (Printable Reference)
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <p className="text-sm text-text-dim mb-3">
                Print this table for quick scoring reference:
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
                      <td className="py-2 font-semibold">{len} letters</td>
                      <td className="py-2 text-primary">{pts} pts</td>
                      <td className="py-2 text-xs text-text-dim">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-text-muted mt-3">
                <strong>Key insight:</strong> One 5-letter word = four 3-letter
                words. Prioritize length.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Word Validity Guidelines
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">✅ Allowed</h3>
                  <ul className="space-y-1">
                    <li>Words 3+ letters long</li>
                    <li>Standard English words</li>
                    <li>Plurals (CATS, DOGS)</li>
                    <li>Past tense (PLAYED, RAN)</li>
                    <li>-ING forms (PLAYING)</li>
                    <li>Compound words (FOOTBALL)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">❌ Not Allowed</h3>
                  <ul className="space-y-1">
                    <li>2-letter words (AT, GO)</li>
                    <li>Proper nouns (PARIS, GOOGLE)</li>
                    <li>Abbreviations (TV, ASAP)</li>
                    <li>Foreign words (usually)</li>
                    <li>Words requiring apostrophes</li>
                    <li>Hyphenated words (usually)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              The Qu Tile Rule
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed">
                <strong>Qu appears on a single tile.</strong> In Boggle, Q almost
                always appears as <strong>Qu</strong> because English words rarely
                use Q without U. The Qu tile:
              </p>
              <ul className="space-y-1 ml-4 mt-2 text-sm">
                <li>• Occupies one cell on the grid</li>
                <li>• Counts as two letters (Q and U) when spelling</li>
                <li>• Makes words like QUICK, QUEST, QUOTE possible</li>
                <li>• Cannot be split into separate tiles</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Teaching Boggle to New Players
            </h2>
            <p className="leading-relaxed mb-3">
              Use this simplified explanation for beginners:
            </p>
            <div className="bg-surface/50 rounded-xl p-4">
              <ol className="space-y-2 list-decimal ml-4 text-sm">
                <li>
                  <strong>Look at the grid.</strong> 16 letters in 4 rows of 4.
                </li>
                <li>
                  <strong>Connect touching letters.</strong> Up, down, sideways,
                  or diagonal — like a king in chess.
                </li>
                <li>
                  <strong>Spell words.</strong> Each word must be 3+ letters
                  long.
                </li>
                <li>
                  <strong>No repeating tiles.</strong> Can't use the same letter
                  twice in one word.
                </li>
                <li>
                  <strong>3 minutes on the clock.</strong> Find as many words as
                  you can.
                </li>
                <li>
                  <strong>Longer = more points.</strong> 5-letter words are worth
                  four 3-letter words.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Printable Tips
            </h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                <strong>Print the scoring table</strong> and keep it with your
                game set for quick reference.
              </li>
              <li>
                <strong>Laminate the rules sheet</strong> for durability during
                game nights.
              </li>
              <li>
                <strong>Share with new players</strong> before starting to avoid
                confusion mid-game.
              </li>
              <li>
                <strong>Use for teaching kids</strong> — the visual layout helps
                young players understand.
              </li>
              <li>
                <strong>Reference for disputes</strong> — settle scoring
                questions quickly.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Complete Rules Breakdown
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Game Setup</h3>
                <ul className="space-y-1 text-sm">
                  <li>• 16 lettered dice in a 4×4 grid</li>
                  <li>• 3-minute timer (standard)</li>
                  <li>• Paper and pencil for scorekeeping</li>
                  <li>• 2+ players (or solo practice)</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Letter Connection Rules</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Horizontal connections (left/right)</li>
                  <li>• Vertical connections (up/down)</li>
                  <li>• Diagonal connections (all 4 directions)</li>
                  <li>• Letters must be adjacent (touching)</li>
                  <li>• Each tile used once per word maximum</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Word Submission Rules</h3>
                <ul className="space-y-1 text-sm">
                  <li>• 3-letter minimum length</li>
                  <li>• No proper nouns (names, places)</li>
                  <li>• No abbreviations (TV, ASAP)</li>
                  <li>• No foreign words (generally)</li>
                  <li>• Same word can't be submitted twice</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Winning the Game</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Highest total score wins</li>
                  <li>• Most words is not the goal</li>
                  <li>• Long words beat many short words</li>
                  <li>• Speed matters — use all 3 minutes</li>
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
                  Where can I find printable Boggle rules?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  This page contains a complete printable Boggle rules reference
                  including scoring table, word validity guidelines, and game
                  setup. The rules are formatted for easy printing and include
                  all essential information for teaching new players.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What are the official Boggle rules for scoring?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Official Boggle scoring: 3 letters = 1 point, 4 letters = 2
                  points, 5 letters = 4 points, 6 letters = 6 points, 7 letters
                  = 8 points, 8+ letters = 11 points. Longer words are worth
                  significantly more.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How do you explain Boggle rules to beginners?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Explain Boggle in 4 steps: 1) Connect touching letters to spell
                  words, 2) Words must be 3+ letters, 3) Can't reuse tiles, 4)
                  Only valid English words count. Emphasize that longer words
                  score more.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Is there a printable Boggle scoring sheet?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes. The scoring table on this page can be printed as a quick
                  reference: 3 letters = 1 point, 4 = 2 points, 5 = 4 points, 6
                  = 6 points, 7 = 8 points, 8+ = 11 points.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Practice These Rules
            </h2>
            <p className="text-text mb-4">
              The best way to learn the rules is to play. Practice online with
              the same rules as classic Boggle.
            </p>
            <div className="flex gap-3 flex-wrap">
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
                  Comprehensive rules explanation with visual examples.
                </div>
              </Link>
              <Link
                href="/guides/boggle-scoring-sheet/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Scoring Sheet →
                </div>
                <div className="text-sm text-text-muted">
                  Detailed scoring reference and calculation guide.
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
