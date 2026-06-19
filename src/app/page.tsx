import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "WordGrid — Free Daily Word Search Puzzle Game",
  description:
    "Play WordGrid, a free online word search puzzle. Connect adjacent letters in a 4×4 grid to find words. New daily challenge every day. No sign-up required.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "WordGrid — Free Daily Word Search Puzzle Game",
    description:
      "Connect letters in a 4×4 grid to find hidden words. New daily challenge every day!",
    url: BASE_URL,
  },
};

export default function Home() {
  // JSON-LD: WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WordGrid",
    url: BASE_URL,
    description: "Free daily word search puzzle game",
    potentialAction: {
      "@type": "PlayGameAction",
      target: `${BASE_URL}/play`,
    },
  };

  // JSON-LD: FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is WordGrid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WordGrid is a free online word puzzle game where you find words by connecting adjacent letters in a 4×4 grid. You have 3 minutes to find as many valid English words as possible.",
        },
      },
      {
        "@type": "Question",
        name: "How do I play WordGrid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Drag your finger or mouse across adjacent letters to spell words. Words must be at least 3 letters long. Letters can be connected horizontally, vertically, or diagonally.",
        },
      },
      {
        "@type": "Question",
        name: "Is WordGrid free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, WordGrid is completely free. No sign-up, no download, no ads. Just visit wordgrid.games and start playing.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Daily Challenge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every day at UTC midnight, a new puzzle is generated. Everyone around the world gets the same grid, so you can compare your score with friends.",
        },
      },
      {
        "@type": "Question",
        name: "How is WordGrid scored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Points scale with word length: 3-letter words are 1 point, 4-letter words are 2 points, 5-letter words are 4 points, and longer words are worth even more. Longer words give exponentially higher scores.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            WordGrid — Free Daily Word Puzzle
          </h1>
          <p className="text-lg text-text-muted max-w-lg mx-auto mb-6">
            Connect adjacent letters in a 4×4 grid to find hidden words. Race against
            the clock in this addictive word search challenge.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/play"
              className="px-8 py-4 bg-primary hover:bg-primary-hover transition rounded-xl text-lg font-semibold active:scale-[0.98]"
            >
              Play Now — Free
            </Link>
            <Link
              href="/daily"
              className="px-8 py-4 bg-surface hover:bg-surface-hover transition rounded-xl text-lg font-semibold active:scale-[0.98]"
            >
              Daily Challenge
            </Link>
          </div>
        </section>

        {/* How to play */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-surface/50 rounded-xl p-5">
              <div className="text-primary text-2xl font-bold mb-2">1</div>
              <h3 className="font-semibold mb-1">Drag to Connect</h3>
              <p className="text-sm text-text-muted">
                Drag your finger or mouse across adjacent letters — up, down, or
                diagonal.
              </p>
            </div>
            <div className="bg-surface/50 rounded-xl p-5">
              <div className="text-primary text-2xl font-bold mb-2">2</div>
              <h3 className="font-semibold mb-1">Spell Valid Words</h3>
              <p className="text-sm text-text-muted">
                Words must be 3+ letters. Each letter can only be used once per word.
              </p>
            </div>
            <div className="bg-surface/50 rounded-xl p-5">
              <div className="text-primary text-2xl font-bold mb-2">3</div>
              <h3 className="font-semibold mb-1">Beat the Clock</h3>
              <p className="text-sm text-text-muted">
                You have 3 minutes. Longer words score exponentially more points.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Scoring</h2>
          <p className="text-text-muted mb-4">
            Longer words are worth dramatically more. Go for length over quantity:
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              ["3", "1 pt"], ["4", "2 pts"], ["5", "4 pts"],
              ["6", "6 pts"], ["7", "8 pts"], ["8+", "10+"],
            ].map(([len, pts]) => (
              <div key={len} className="bg-surface/50 rounded-lg p-3 text-center">
                <div className="text-text-dim text-xs uppercase">{len} letters</div>
                <div className="text-primary font-bold">{pts}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-surface/50 rounded-xl p-4" open>
              <summary className="font-semibold cursor-pointer">
                What is WordGrid?
              </summary>
              <p className="text-text-muted mt-2 text-sm leading-relaxed">
                WordGrid is a free online word puzzle game where you find words by
                connecting adjacent letters in a 4×4 grid. You have 3 minutes to find
                as many valid English words as possible. It is similar to Boggle but
                plays right in your browser — no download needed.
              </p>
            </details>
            <details className="bg-surface/50 rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                How do I play?
              </summary>
              <p className="text-text-muted mt-2 text-sm leading-relaxed">
                Drag your finger (on mobile) or click and drag (on desktop) across
                adjacent letters to spell words. Letters can be connected horizontally,
                vertically, or diagonally. Release to submit your word.
              </p>
            </details>
            <details className="bg-surface/50 rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                What is the Daily Challenge?
              </summary>
              <p className="text-text-muted mt-2 text-sm leading-relaxed">
                Every day at UTC midnight, a new puzzle is generated. Everyone around
                the world gets the exact same 4×4 grid. Come back daily to test your
                skills and compare your score with friends.
              </p>
            </details>
            <details className="bg-surface/50 rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                Do I need to create an account?
              </summary>
              <p className="text-text-muted mt-2 text-sm leading-relaxed">
                No. WordGrid is completely free with no sign-up, no login, and no ads.
                Just visit the site and start playing immediately.
              </p>
            </details>
          </div>
        </section>

        {/* Guides */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Word Game Strategies</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/guides/how-to-find-more-words"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-5"
            >
              <h3 className="font-semibold mb-1 text-primary">
                How to Find More Words →
              </h3>
              <p className="text-sm text-text-muted">
                6 proven techniques to spot more words — prefix scanning, plurals,
                Qu strategy, and more.
              </p>
            </Link>
            <Link
              href="/guides/word-grid-strategies"
              className="block bg-surface/50 hover:bg-surface transition rounded-xl p-5"
            >
              <h3 className="font-semibold mb-1 text-primary">
                Scoring Strategies →
              </h3>
              <p className="text-sm text-text-muted">
                Time management, scoring optimization, and word families to maximize
                your score every game.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-semibold mb-3">Ready to Play?</h2>
          <p className="text-text-muted mb-6">
            Free, no sign-up. Start finding words in seconds.
          </p>
          <Link
            href="/play"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-hover transition rounded-xl text-lg font-semibold active:scale-[0.98]"
          >
            Play WordGrid Now
          </Link>
        </section>
      </div>
    </main>
  );
}
