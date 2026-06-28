import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules of Boggle: How to Play Boggle (Beginner's Guide) | WordGrid",
  description:
    "The complete rules of Boggle explained simply. Learn how to play Boggle — the 4×4 grid, how letters connect, what words count, and how scoring works. Free online examples.",
  alternates: { canonical: "/guides/boggle-rules-beginners" },
  keywords: [
    "rules of boggle", "boggle rules", "how to play boggle",
    "rules for playing boggle", "boggle rules for beginners",
    "boggle word game rules", "boggle game instructions",
  ],
  openGraph: {
    title: "Rules of Boggle: A Complete Beginner's Guide (with Examples)",
    description:
      "Learn the rules of Boggle from scratch — the 4×4 grid, letter adjacency, valid words, and scoring. Free interactive examples included.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Rules of Boggle: A Complete Beginner's Guide",
  description:
    "A complete walkthrough of the rules of Boggle for beginners, covering the grid, adjacency, word validity, and scoring.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-20",
  dateModified: "2026-06-27",
  mainEntityOfPage: "https://wordgrid.games/guides/boggle-rules-beginners/",
};

// FAQ schema targeting question-form long-tail queries seen in Search Console:
// "what are the rules of boggle?", "rules for playing boggle", etc.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the rules of Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The rules of Boggle are simple: 16 letters are arranged in a 4×4 grid. You have 3 minutes to find as many words as possible by connecting adjacent letters (horizontally, vertically, or diagonally). Words must be at least 3 letters long, you can't reuse the same tile twice in one word, and only valid English dictionary words count. Longer words score more points.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To play Boggle, drag your finger or mouse from one letter to an adjacent letter to spell a word. Letters must be neighbors (up, down, left, right, or diagonal). Release to submit. Each word must be 3+ letters and use each tile at most once. When the 3-minute timer runs out, your score is tallied up.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules for playing Boggle with the Qu tile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Boggle, Q almost always appears as 'Qu' on a single tile, because English words rarely use Q without a following U. The Qu tile takes up one cell but counts as two letters (Q and U) when you spell a word. You cannot split Q and U into separate tiles.",
      },
    },
    {
      "@type": "Question",
      name: "How long do you have in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard game of Boggle lasts 3 minutes. Online variants like WordGrid also offer 5-minute and untimed Zen modes, but the Daily Challenge always uses the classic 3-minute clock so every player has the same experience.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum word length in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum word length in Boggle is 3 letters. Two-letter words like 'AT' or 'GO' do not count, even though they are real English words. The shortest valid word you can submit is 3 letters.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Play Boggle / Word Grid",
  description: "Complete rules for playing a word grid puzzle game.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Look at the grid", text: "A 4×4 grid of 16 lettered dice is displayed. Each cell contains one letter (Qu counts as one cell)." },
    { "@type": "HowToStep", position: 2, name: "Connect adjacent letters", text: "Drag across letters that are next to each other — horizontally, vertically, or diagonally — to spell a word." },
    { "@type": "HowToStep", position: 3, name: "Follow the rules", text: "Words must be at least 3 letters long. Each letter tile can only be used once per word. You cannot reuse a tile in the same word." },
    { "@type": "HowToStep", position: 4, name: "Submit and score", text: "Release your finger or mouse to submit the word. If valid, you earn points based on word length. Longer words are worth more." },
    { "@type": "HowToStep", position: 5, name: "Beat the clock", text: "You have 3 minutes. Find as many valid words as possible before time runs out." },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://wordgrid.games/" },
    { "@type": "ListItem", position: 2, name: "Guides", item: "https://wordgrid.games/guides/" },
    { "@type": "ListItem", position: 3, name: "Boggle Rules for Beginners" },
  ],
};

// Example board for visual illustration
const EXAMPLE_BOARD = [
  ["T", "A", "P", "S"],
  ["R", "E", "I", "N"],
  ["G", "L", "D", "O"],
  ["Qu", "W", "H", "Y"],
];

export default function BoggleRulesGuide() {
  return (
    <main className="min-h-screen px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <a href="/" className="hover:text-text">Home</a>
            <span>/</span>
            <a href="/guides/" className="hover:text-text">Guides</a>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Rules of Boggle: A Complete Beginner&apos;s Guide
          </h1>
          <p className="text-text-muted">7 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          {/* Intro */}
          <section>
            <p className="leading-relaxed">
              Maybe you found an old Boggle set in a closet. Maybe a friend sent
              you a word game link and you have no idea what you&apos;re looking
              at. Either way, you&apos;re in the right place. This guide covers
              every rule you need to play Boggle, or any word grid game like it.
            </p>
            <p className="leading-relaxed mt-3">
              The good news? The rules are simpler than they look. You can learn
              them in about five minutes.
            </p>
          </section>

          {/* The Grid */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              The Setup: A 4×4 Grid
            </h2>
            <p className="leading-relaxed">
              Every game starts with a grid of 16 letters arranged in 4 rows
              and 4 columns. In the original board game version, these come from
              shaking 16 dice in a plastic dome. In online versions like
              WordGrid, the letters are generated by a seeded random algorithm —
              but the idea is the same.
            </p>
            <p className="leading-relaxed mt-3">
              Here&apos;s an example of what a grid might look like:
            </p>

            {/* Visual grid */}
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
              Notice the <strong>Qu</strong> tile in the bottom-left. In Boggle,
              Q almost always appears as &ldquo;Qu&rdquo; because English words
              almost never use Q without a U following it. It takes up a single
              cell but counts as two letters when spelling words.
            </p>
          </section>

          {/* How Letters Connect */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How Letters Connect
            </h2>
            <p className="leading-relaxed">
              This is the core mechanic, and it&apos;s the part that confuses
              people the most. To spell a word, you connect letters that are
              <strong> adjacent</strong> to each other. &ldquo;Adjacent&rdquo;
              means any of the 8 surrounding cells:
            </p>
            <ul className="space-y-1 ml-4 mt-3">
              <li>Left, right, up, down (the 4 direct neighbors)</li>
              <li>The 4 diagonals (top-left, top-right, bottom-left, bottom-right)</li>
            </ul>
            <p className="leading-relaxed mt-3">
              Think of it like a king in chess — it can move to any of the 8
              surrounding squares. You trace a path from letter to letter,
              spelling out a word as you go.
            </p>

            {/* Visual example path */}
            <div className="my-4 bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed">
                <strong>Example:</strong> Starting from the <strong>T</strong> in
                the top-left of the grid above, you could trace:
              </p>
              <ul className="space-y-1 ml-4 mt-2 text-sm font-mono">
                <li>T &rarr; A &rarr; P = &ldquo;TAP&rdquo;</li>
                <li>T &rarr; A &rarr; P &rarr; S = &ldquo;TAPS&rdquo;</li>
                <li>T &rarr; E &rarr; A &rarr; R = &ldquo;TEAR&rdquo;</li>
                <li>T &rarr; R &rarr; E &rarr; I &rarr; N = &ldquo;TREIN&rdquo; (not valid!)</li>
              </ul>
              <p className="text-sm text-text-muted mt-2">
                The path can zigzag in any direction. But each tile can only be
                used once per word.
              </p>
            </div>
          </section>

          {/* Word Validity */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Counts as a Valid Word?
            </h2>
            <p className="leading-relaxed mb-3">
              There are three rules:
            </p>
            <ol className="space-y-3 ml-4 list-decimal">
              <li>
                <strong>Minimum length of 3 letters.</strong> Two-letter words
                like &ldquo;AT&rdquo; or &ldquo;GO&rdquo; don&apos;t count,
                even though they&apos;re real words. The shortest acceptable
                word is 3 letters.
              </li>
              <li>
                <strong>Must be in the dictionary.</strong> Proper nouns
                (&ldquo;Paris&rdquo;, &ldquo;Google&rdquo;), abbreviations
                (&ldquo;TV&rdquo;, &ldquo;ASAP&rdquo;), and foreign words
                generally don&apos;t count. If it wouldn&apos;t be in a standard
                English dictionary, it&apos;s not valid.
              </li>
              <li>
                <strong>No repeating tiles.</strong> You can&apos;t use the same
                letter tile twice in one word. If there&apos;s only one
                &ldquo;T&rdquo; on the board, you can&apos;t spell
                &ldquo;TENT&rdquo; (you&apos;d need two T&apos;s in reachable
                positions).
              </li>
            </ol>
            <p className="leading-relaxed mt-3">
              One thing that trips people up: <em>the same word can&apos;t be
              submitted twice.</em> Once you&apos;ve found &ldquo;STAR&rdquo;,
              submitting it again earns nothing. But different forms of the same
              root — STAR, STARS, START — are all separate words and all valid.
            </p>
          </section>

          {/* Scoring */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How Scoring Works
            </h2>
            <p className="leading-relaxed mb-3">
              Points scale with word length, and longer words are worth
              dramatically more per letter. Here&apos;s the standard scoring
              table used in WordGrid (and most Boggle variants):
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Word Length</th>
                  <th className="text-left py-2 text-text-muted">Points</th>
                  <th className="text-left py-2 text-text-muted">Real Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [3, 1, "CAT, RUN, THE"],
                  [4, 2, "PLAY, STAR, WORD"],
                  [5, 4, "QUEST, TRAIN, BOARD"],
                  [6, 6, "PLAYER, GARDEN, ACTION"],
                  [7, 8, "PLAYING, STARTED"],
                  ["8+", "10+", "EQUATION, FORMATION"],
                ].map(([len, pts, example]) => (
                  <tr key={String(len)} className="border-b border-surface">
                    <td className="py-2">{len} letters</td>
                    <td className="py-2 text-primary font-semibold">{pts} pts</td>
                    <td className="py-2 text-text-dim text-xs">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              Notice the jump from 4 letters to 5: that&apos;s 2 points to 4
              points — double. A single 5-letter word is worth as much as four
              3-letter words. This is why experienced players stop chasing tiny
              words once they spot something longer.
            </p>
            <p className="leading-relaxed mt-3">
              For words of 8 letters or more, each additional letter adds 2 more
              points. These are rare but game-changing when you find them.
            </p>
          </section>

          {/* Time limit */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              The Clock
            </h2>
            <p className="leading-relaxed">
              Standard Boggle gives you 3 minutes. That&apos;s it. When the timer
              hits zero, the round is over and your final score is tallied.
            </p>
            <p className="leading-relaxed mt-3">
              In WordGrid, you can also choose a 5-minute mode or a no-timer
              &ldquo;Zen&rdquo; mode if you just want to relax and find words at
              your own pace. But if you&apos;re playing the Daily Challenge,
              everyone gets the same 3-minute clock.
            </p>
          </section>

          {/* Quick strategy tip */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              One Tip Before You Start
            </h2>
            <p className="leading-relaxed">
              Don&apos;t overthink it. A lot of beginners sit there staring at
              the grid trying to find the perfect 7-letter word. Meanwhile
              they&apos;re missing three easy 3-letter words right in front of
              them.
            </p>
            <p className="leading-relaxed mt-3">
              The best approach for your first few games: grab every short word
              you can see, then go back and look for longer ones. Speed beats
              perfection. You&apos;ll naturally start spotting longer words as
              you play more.
            </p>
            <p className="leading-relaxed mt-3">
              Once you&apos;re comfortable, check out our deeper strategy guides:
            </p>
            <ul className="space-y-1 ml-4 mt-2">
              <li>
                <a href="/guides/how-to-find-more-words/" className="text-primary hover:underline">
                  How to Find More Words
                </a>{" "}
                — six specific techniques for spotting words faster
              </li>
              <li>
                <a href="/guides/word-grid-strategies/" className="text-primary hover:underline">
                  Word Grid Strategies
                </a>{" "}
                — scoring math, time management, and word families
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Play Your First Game
            </h2>
            <p className="text-text mb-4">
              You know the rules now. The best way to learn is to just play a
              round — you&apos;ll pick it up in about 30 seconds.
            </p>
            <div className="flex gap-3">
              <a
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play a Free Game
              </a>
              <a
                href="/daily"
                className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Today&apos;s Challenge
              </a>
            </div>
          </div>

          {/* Related */}
          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <a href="/guides/how-to-find-more-words/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">How to Find More Words in Word Grid Puzzles &rarr;</div>
                <div className="text-sm text-text-muted">Ready to go beyond the basics? Six proven word-finding techniques.</div>
              </a>
              <a href="/guides/word-grid-vs-boggle/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Word Grid vs Boggle: What&apos;s the Difference? &rarr;</div>
                <div className="text-sm text-text-muted">How modern word grid games compare to the 1972 original.</div>
              </a>
              <a href="/guides/" className="block text-sm text-text-dim hover:text-text">
                Browse all guides &rarr;
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
