import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Timed Game — Play a Free 3-Minute Word Grid",
  description:
    "Play a free Boggle timed game online. Find words in a 4x4 grid before the 3-minute clock runs out, or switch to Zen practice.",
  alternates: { canonical: "/boggle-timed-game" },
  openGraph: {
    title: "Boggle Timed Game — Play a Free 3-Minute Word Grid",
    description:
      "Start a free timed Boggle-style word grid game with no download or sign-up.",
    url: `${BASE_URL}/boggle-timed-game/`,
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Boggle Timed Game",
    url: `${BASE_URL}/boggle-timed-game/`,
    gamePlatform: "Web browser",
    applicationCategory: "Game",
    genre: ["Word game", "Brain game", "Puzzle game"],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="mx-auto max-w-7xl">
        <header className="mb-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
              <Link href="/" className="hover:text-text">WordGrid</Link>
              <span>/</span>
              <Link href="/play" className="hover:text-text">Play</Link>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Boggle Timed Game
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
              Play a free 3-minute Boggle-style word grid online. Connect
              adjacent letters, find as many valid words as you can, and use
              longer paths to push your score higher before the clock ends.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/play" className="rounded-xl bg-primary px-5 py-3 font-semibold shadow-lg shadow-primary/20 transition hover:bg-primary-hover">
                Start timed game
              </Link>
              <Link href="/zen" className="rounded-xl bg-surface px-5 py-3 font-semibold transition hover:bg-surface-hover">
                Zen practice
              </Link>
              <Link href="/daily" className="rounded-xl border border-border px-5 py-3 font-semibold text-text-muted transition hover:bg-surface hover:text-text">
                Daily puzzle
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-surface/50 p-5 shadow-xl shadow-black/10 sm:p-6">
            <h2 className="text-xl font-semibold">Timed rules</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
              <li>Use adjacent letters horizontally, vertically, or diagonally.</li>
              <li>Words must be at least 3 letters long.</li>
              <li>Each tile can be used once per word.</li>
              <li>Longer words score much more than short words.</li>
            </ul>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface/50 p-5">
            <h2 className="font-semibold text-primary">Fast brain game</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              The timer pushes you to recognize patterns quickly instead of
              overthinking every path.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface/50 p-5">
            <h2 className="font-semibold text-primary">Classic 4x4 board</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Start with the standard board, then move to larger practice grids
              when you want a slower scan.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface/50 p-5">
            <h2 className="font-semibold text-primary">Review after play</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Use the solver after the round to see missed words and train the
              next timed attempt.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
