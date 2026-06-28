import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Play Word Grid Online — Free, No Download | WordGrid",
  description:
    "Play word grid online for free, right in your browser. No download, no sign-up. A new 4×4 word grid puzzle every day — connect adjacent letters to find words in 3 minutes.",
  alternates: { canonical: "/guides/play-word-grid-online" },
  keywords: [
    "word grid online", "play word grid online", "word grid online free",
    "word grid game online", "free word grid online", "word grid puzzle online",
  ],
  openGraph: {
    title: "Play Word Grid Online — Free, No Download Needed",
    description:
      "Word grid is a free online word puzzle. Connect adjacent letters in a 4×4 grid to find words. Play instantly — no download, no sign-up.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Play Word Grid Online — Free, No Download",
  description:
    "A guide to playing word grid online for free — what it is, how it works, and where to play instantly in your browser.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-27",
  dateModified: "2026-06-27",
  mainEntityOfPage: `${BASE_URL}/guides/play-word-grid-online/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I play word grid online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordGrid lets you play word grid online for free, directly in your browser. There is no download, no sign-up, and no ads. Visit wordgrid.games and start playing instantly — either a random practice game or today's Daily Challenge.",
      },
    },
    {
      "@type": "Question",
      name: "What is a word grid puzzle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A word grid puzzle is a word search game played on a 4×4 grid of letters. You find words by connecting adjacent letters — horizontally, vertically, or diagonally — like in Boggle. Words must be at least 3 letters long and you cannot reuse the same tile twice in one word.",
      },
    },
    {
      "@type": "Question",
      name: "How is playing word grid online different from Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The rules are the same as classic Boggle — same 4×4 grid, same adjacency rules, same scoring. Playing word grid online just means you don't need to shake physical dice: the grid is generated instantly, you can play unlimited games, and there's a new Daily Challenge every day.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to download anything to play word grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. WordGrid runs entirely in your browser on desktop and mobile. There is no app to install and no account to create. Just open wordgrid.games and start playing.",
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
    { "@type": "ListItem", position: 3, name: "Play Word Grid Online" },
  ],
};

export default function PlayWordGridOnlineGuide() {
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
            <a href="/" className="hover:text-text">Home</a>
            <span>/</span>
            <a href="/guides/" className="hover:text-text">Guides</a>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Play Word Grid Online — Free, No Download
          </h1>
          <p className="text-text-muted">4 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              <strong>Word grid</strong> is a classic word search puzzle played on
              a 4×4 grid of letters — the same format as the board game Boggle.
              The good news: you don&apos;t need a physical set to play. You can
              play word grid online for free, right in your browser, with no
              download and no sign-up.
            </p>
            <p className="leading-relaxed mt-3">
              <Link href="/play" className="text-primary hover:underline">
                Play a word grid puzzle now →
              </Link>{" "}
              or read on to learn how it works.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Is a Word Grid Puzzle?
            </h2>
            <p className="leading-relaxed">
              A word grid puzzle gives you 16 letters arranged in 4 rows of 4.
              Your job is to find as many valid English words as possible by
              connecting adjacent letters — horizontally, vertically, or
              diagonally. Each word must be at least 3 letters long, and you
              can&apos;t use the same letter tile twice in one word. You have
              3 minutes.
            </p>
            <p className="leading-relaxed mt-3">
              Longer words are worth dramatically more. A 5-letter word is worth
              as much as four 3-letter words, so experienced players hunt for
              length.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How to Play Word Grid Online
            </h2>
            <ol className="space-y-3 ml-4 list-decimal">
              <li>
                <strong>Open the game.</strong> Go to{" "}
                <Link href="/play" className="text-primary hover:underline">
                  wordgrid.games/play
                </Link>{" "}
                for a random grid, or{" "}
                <Link href="/daily" className="text-primary hover:underline">
                  /daily
                </Link>{" "}
                for the Daily Challenge (same grid for everyone).
              </li>
              <li>
                <strong>Drag to connect letters.</strong> Click or tap a letter,
                then drag to adjacent letters to spell a word. The path can go
                in any direction.
              </li>
              <li>
                <strong>Release to submit.</strong> If the word is valid and at
                least 3 letters long, it&apos;s added to your list. If not, it&apos;s
                rejected silently.
              </li>
              <li>
                <strong>Find as many as you can in 3 minutes.</strong> Longer
                words score more — see the scoring table on the{" "}
                <Link href="/" className="text-primary hover:underline">
                  home page
                </Link>
                .
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Why Play Word Grid Online?
            </h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                <strong>No download, no sign-up.</strong> The game runs entirely
                in your browser. Just open the page and play.
              </li>
              <li>
                <strong>Free, unlimited games.</strong> Practice mode generates a
                fresh grid every time — there&apos;s no daily limit.
              </li>
              <li>
                <strong>Daily Challenge.</strong> One grid per day, the same for
                everyone worldwide, so you can compare scores with friends.
              </li>
              <li>
                <strong>Works on phone and desktop.</strong> Touch or mouse, both
                supported.
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
                  Can I play word grid online for free?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes. WordGrid is completely free — no ads, no download, no
                  account. Visit wordgrid.games and start playing instantly.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What is a word grid puzzle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  It&apos;s a word search game on a 4×4 grid of letters. You
                  connect adjacent letters to spell words. The rules are the same
                  as Boggle — see our{" "}
                  <Link href="/guides/boggle-rules-beginners/" className="text-primary hover:underline">
                    beginner&apos;s guide to the rules
                  </Link>
                  .
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Do I need to download anything?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  No. WordGrid runs entirely in your browser on desktop and
                  mobile.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Ready to Play?
            </h2>
            <p className="text-text mb-4">
              You&apos;ve read enough — go play a round. It takes 30 seconds to
              learn.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play Word Grid Now
              </Link>
              <Link
                href="/daily"
                className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Today&apos;s Daily Challenge
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link href="/guides/boggle-rules-beginners/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">
                  Rules of Boggle: A Complete Beginner&apos;s Guide →
                </div>
                <div className="text-sm text-text-muted">
                  Every rule explained simply — the grid, adjacency, scoring, and the Qu tile.
                </div>
              </Link>
              <Link href="/guides/word-grid-strategies/" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">
                  Word Grid Strategies: Score Higher Every Game →
                </div>
                <div className="text-sm text-text-muted">
                  Time management, scoring math, and word families to maximize your score.
                </div>
              </Link>
              <Link href="/guides/" className="block text-sm text-text-dim hover:text-text">
                Browse all guides →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
