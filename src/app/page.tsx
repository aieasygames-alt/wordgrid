import type { Metadata } from "next";
import Link from "next/link";
import HomeClient from "./HomeClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "WordGrid — Free Online Boggle-Style Word Search Puzzle Game",
  description:
    "Play WordGrid, a free online Boggle-style word search puzzle. Connect adjacent letters in a 4×4 grid to find words. New daily challenge every day. No download, no sign-up required.",
  alternates: { canonical: "/" },
  keywords: [
    "boggle online", "boggle free", "boggle word game", "word game online",
    "word search puzzle", "daily word game", "word grid", "free boggle",
    "browser word game", "no download word game",
  ],
  openGraph: {
    title: "WordGrid — Free Online Boggle-Style Word Puzzle Game",
    description:
      "Play a free Boggle-style word search game right in your browser. Connect letters, find words, beat the clock. New daily challenge every day!",
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
    description: "Free online Boggle-style word search puzzle game",
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
          text: "WordGrid is a free online word puzzle game inspired by Boggle. You find words by connecting adjacent letters in a 4×4 grid. You have 3 minutes to find as many valid English words as possible. Play directly in your browser — no download or sign-up needed.",
        },
      },
      {
        "@type": "Question",
        name: "Is WordGrid like Boggle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! WordGrid uses the same classic Boggle rules: a 4×4 letter grid where you connect adjacent letters (horizontally, vertically, or diagonally) to form words. The difference is WordGrid is free, runs in your browser, and offers a new daily challenge every day.",
        },
      },
      {
        "@type": "Question",
        name: "Can I play Boggle online for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — WordGrid is a completely free Boggle-style word game you can play online right now. No download, no registration, no ads. Just visit wordgrid.games and start playing instantly.",
        },
      },
      {
        "@type": "Question",
        name: "How do I play WordGrid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Drag your finger or mouse across adjacent letters to spell words. Words must be at least 3 letters long. Each letter tile can only be used once per word. Release to submit.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Daily Challenge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every day, a new puzzle is generated. Everyone around the world gets the same grid, so you can compare your score with friends. Build your streak by playing every day!",
        },
      },
      {
        "@type": "Question",
        name: "How is WordGrid scored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Points scale with word length: 3-letter words are 1 point, 4-letter words are 2 points, 5-letter words are 4 points, 6-letter words are 6 points, and 7+ letter words are worth 8 or more. Longer words give exponentially higher scores.",
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
        {/* Interactive game section (client component) */}
        <HomeClient />

        {/* How to play */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-surface/50 rounded-xl p-5">
              <div className="text-primary text-2xl font-bold mb-2">1</div>
              <h3 className="font-semibold mb-1">Drag to Connect</h3>
              <p className="text-sm text-text-muted">
                Drag your finger or mouse across adjacent letters — up, down, or
                diagonal. Just like Boggle!
              </p>
            </div>
            <div className="bg-surface/50 rounded-xl p-5">
              <div className="text-primary text-2xl font-bold mb-2">2</div>
              <h3 className="font-semibold mb-1">Spell Valid Words</h3>
              <p className="text-sm text-text-muted">
                Words must be 3+ letters. Each letter tile can only be used once
                per word.
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
                WordGrid is a free online word puzzle game inspired by classic
                Boggle. You find words by connecting adjacent letters in a 4×4
                grid. You have 3 minutes to find as many valid English words as
                possible. It plays right in your browser — no download or sign-up
                needed.
              </p>
            </details>
            <details className="bg-surface/50 rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                Is WordGrid like Boggle?
              </summary>
              <p className="text-text-muted mt-2 text-sm leading-relaxed">
                Yes! WordGrid uses the same classic Boggle rules: a 4×4 letter
                grid where you connect adjacent letters (horizontally, vertically,
                or diagonally) to form words. The difference is WordGrid is
                completely free, runs in your browser, and offers a new daily
                challenge every day.
              </p>
            </details>
            <details className="bg-surface/50 rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                Can I play Boggle online for free?
              </summary>
              <p className="text-text-muted mt-2 text-sm leading-relaxed">
                Yes — WordGrid is a free Boggle-style word game you can play
                online right now. No download, no registration, no ads. Just visit
                wordgrid.games and start playing instantly.
              </p>
            </details>
            <details className="bg-surface/50 rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                What is the Daily Challenge?
              </summary>
              <p className="text-text-muted mt-2 text-sm leading-relaxed">
                Every day, a new puzzle is generated. Everyone around the world
                gets the exact same 4×4 grid. Come back daily to test your skills,
                build your streak, and compare your score with friends.
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
                Time management, scoring optimization, and word families to
                maximize your score every game.
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
