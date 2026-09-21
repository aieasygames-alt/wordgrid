import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Timed Game - Play Free Online",
  description:
    "Play a free timed Boggle-style WordGrid game online. Choose a 4x4, 5x5, or 6x6 board, then switch to Zen practice whenever you want an unhurried scan.",
  alternates: { canonical: `${BASE_URL}/boggle-timed-game/` },
  openGraph: {
    title: "Boggle Timed Game - Play Free Online",
    description:
      "Choose a board size, play with a clock, then review missed routes after the round.",
    url: `${BASE_URL}/boggle-timed-game/`,
  },
};

const faqItems = [
  {
    question: "How do I play a timed WordGrid game?",
    answer:
      "Open Play, choose Timed mode and a 4x4, 5x5, or 6x6 board. Drag through adjacent tiles to form dictionary words without reusing a tile.",
  },
  {
    question: "Can I practice without a timer?",
    answer:
      "Yes. Choose Zen mode on Play to trace routes without a clock, then use the same current dictionary and score table for practice.",
  },
  {
    question: "How are words scored in a timed game?",
    answer:
      "Current WordGrid scoring is 1 point for 3 letters, 2 for 4 letters, 4 for 5 letters, and 6 for 6 letters.",
  },
] as const;

export default function BoggleTimedGamePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "WordGrid Timed Game",
    url: `${BASE_URL}/boggle-timed-game/`,
    gamePlatform: "Web browser",
    applicationCategory: "Game",
    genre: ["Word game", "Brain game", "Puzzle game"],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="min-h-screen px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <GuideDesktopShell>
        <header className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
            <Link href="/" className="hover:text-text">WordGrid</Link>
            <span>/</span>
            <Link href="/play" className="hover:text-text">Play</Link>
          </nav>
          <h1 className="mb-2 text-4xl font-bold">Boggle timed game</h1>
          <p className="max-w-3xl text-text-muted">
            Choose Timed mode for a clock-driven WordGrid round, or move to Zen when you want to slow down and study each route.
          </p>
        </header>

        <GuideActionBar
          primary={{ href: "/play", label: "Start timed play", detail: "Choose a board size and mode." }}
          secondary={{ href: "/zen", label: "Open Zen", detail: "Practice without a clock." }}
          tertiary={{ href: "/daily", label: "Play Daily", detail: "Try today's shared board." }}
          quaternary={{ href: "/solver", label: "Review a board", detail: "Find routes after play." }}
        />

        <div className="max-w-3xl space-y-8 text-text">
          <section className="space-y-3 leading-relaxed">
            <p>
              A <strong>Boggle timed game</strong> is a quick way to test your
              route scanning under a clock. Select a 4x4, 5x5, or 6x6 board on
              Play, choose Timed mode, and connect adjacent horizontal, vertical,
              or diagonal tiles without reusing a tile.
            </p>
            <p>
              The most useful routine is to play first, then use the
              <Link href="/solver" className="text-primary hover:underline"> solver</Link>
              {" "}afterwards to inspect the valid routes you missed. That keeps
              the timed round honest while making every board a practice session.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Choose the pace that fits your goal</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Timed", "Use a clock for a fast scanning challenge."],
                ["Zen", "Trace routes carefully without a clock."],
                ["Daily", "Play the shared board and compare your own results over time."],
              ].map(([name, detail]) => (
                <div key={name} className="rounded-xl border border-border bg-surface/50 p-4">
                  <h3 className="font-semibold text-primary">{name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface/50 p-5">
            <h2 className="mb-3 text-2xl font-semibold text-primary">Current timed-game rules</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
                <li>Move through touching tiles in any direction, including diagonals.</li>
                <li>Submit words with at least 3 letters from the current dictionary.</li>
                <li>Do not reuse a tile in the same word.</li>
              </ul>
              <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
                <li>3 letters: 1 point.</li>
                <li>4 letters: 2 points.</li>
                <li>5 letters: 4 points. 6 letters: 6 points.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about timed play</h2>
            <div className="space-y-3">
              {faqItems.map(({ question, answer }) => (
                <details key={question} className="rounded-xl bg-surface/50 p-4 first:open">
                  <summary className="cursor-pointer font-semibold">{question}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </GuideDesktopShell>
    </main>
  );
}
