import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Grid vs Boggle: What's the Difference?",
  description:
    "Boggle was invented in 1972. Word grid games took the concept online. Here's how they compare — the rules, scoring, and what playing online actually changes.",
  alternates: { canonical: "/guides/word-grid-vs-boggle" },
  openGraph: {
    title: "Word Grid vs Boggle: What's the Difference?",
    description:
      "How online word grid games compare to classic Boggle — rules, scoring, platforms, and what's genuinely better online.",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Word Grid vs Boggle: What's the Difference?",
  description:
    "Comparing online word grid games to classic Boggle — rules, scoring, platforms, and gameplay differences.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-20",
  dateModified: "2026-06-20",
  mainEntityOfPage: "https://wordgrid.games/guides/word-grid-vs-boggle/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: "https://wordgrid.games/" },
    { "@type": "ListItem", position: 2, name: "Guides", item: "https://wordgrid.games/guides/" },
    { "@type": "ListItem", position: 3, name: "Word Grid vs Boggle" },
  ],
};

const keyPoints = [
  ["Grid size", "4×4 board", "4×4 board plus larger practice grids"],
  ["Timer", "3 minutes", "3, 5, or Zen"],
  ["Mode", "Physical board game", "Browser game"],
  ["Daily play", "No", "Yes"],
  ["Setup", "Shake and settle dice", "Instant"],
];

export default function WordGridVsBoggleGuide() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <header className="mb-8">
              <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
                <a href="/" className="hover:text-text">Home</a>
                <span>/</span>
                <a href="/guides/" className="hover:text-text">Guides</a>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                Word Grid vs Boggle: What&apos;s the Difference?
              </h1>
              <p className="text-text-muted">5 min read · Updated June 2026</p>
            </header>

            <section className="space-y-6 text-text max-w-3xl">
              <p className="leading-relaxed">
                Boggle has been around since 1972. If you played it as a kid, you
                probably remember the rattle of dice in a plastic dome and arguing over
                whether &ldquo;QATS&rdquo; is a real word.
              </p>
              <p className="leading-relaxed">
                Word grid games take the same core idea and put it in your browser.
                The DNA is identical, but enough details have changed that it is worth
                laying out the differences clearly.
              </p>
              <p className="leading-relaxed">
                If you already know the difference and just want to play, go straight
                to{" "}
                <a href="/play" className="text-primary hover:underline">
                  /play
                </a>
                . If you want the rules first, try{" "}
                <a href="/guides/boggle-rules-beginners" className="text-primary hover:underline">
                  Boggle Rules for Beginners
                </a>
                .
              </p>
            </section>

            <section className="mt-8 max-w-4xl">
              <h2 className="text-2xl font-semibold text-primary mb-3">
                The Quick Comparison
              </h2>
              <div className="overflow-hidden rounded-3xl border border-border bg-surface/50">
                <table className="w-full text-sm">
                  <thead className="bg-bg/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-text-muted">Feature</th>
                      <th className="text-left px-4 py-3 text-text-muted">Classic Boggle</th>
                      <th className="text-left px-4 py-3 text-text-muted">WordGrid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keyPoints.map(([feature, boggle, wg]) => (
                      <tr key={feature} className="border-t border-border/70">
                        <td className="px-4 py-3 font-medium">{feature}</td>
                        <td className="px-4 py-3 text-text-muted">{boggle}</td>
                        <td className="px-4 py-3 text-text-muted">{wg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-8 space-y-6 text-text max-w-3xl">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-3">What Hasn't Changed</h2>
                <ul className="space-y-2 ml-4">
                  <li>• Same adjacency rules, including diagonals.</li>
                  <li>• Same 3-letter minimum for valid words.</li>
                  <li>• Same Qu handling on a single tile.</li>
                  <li>• Same scoring principle: longer words are worth more.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-3">What&apos;s Different</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">No dice, no ambiguity</h3>
                    <p className="leading-relaxed text-text-muted">
                      Online grids remove the setup, the shake, and the arguments about
                      whether a tile is readable. The board is always crisp.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Daily boards</h3>
                    <p className="leading-relaxed text-text-muted">
                      WordGrid includes a shared daily board so everyone can compare
                      scores on the same letters.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Flexible pacing</h3>
                    <p className="leading-relaxed text-text-muted">
                      You can keep the classic 3-minute pace, slow down with 5 minutes,
                      or practice in Zen mode without a clock.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
                <h2 className="text-xl font-semibold mb-2">Best next pages</h2>
                <div className="flex flex-wrap gap-2 text-sm">
                  <a href="/guides/play-word-grid-online" className="px-3 py-1.5 rounded-full bg-surface hover:bg-surface-hover transition">
                    Play Word Grid Online
                  </a>
                  <a href="/guides/play-boggle-online-free" className="px-3 py-1.5 rounded-full bg-surface hover:bg-surface-hover transition">
                    Play Boggle Online Free
                  </a>
                  <a href="/guides/boggle-rules-beginners" className="px-3 py-1.5 rounded-full bg-surface hover:bg-surface-hover transition">
                    Boggle Rules for Beginners
                  </a>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6 shadow-xl shadow-black/10">
              <h2 className="text-2xl font-bold">Quick take</h2>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                If you already know classic Boggle, WordGrid is the same game with a
                cleaner interface, extra practice modes, and a daily board.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">Desktop tools</h2>
              <div className="mt-4 grid gap-2">
                <a href="/play" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Play now
                </a>
                <a href="/solver" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Open solver
                </a>
                <a href="/daily" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Daily board
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/50 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-text">What to read next</h2>
              <div className="mt-4 grid gap-2">
                <a href="/guides/how-to-find-more-words" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Find more words
                </a>
                <a href="/guides/word-grid-strategies" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Score higher
                </a>
                <a href="/guides/word-pattern-library" className="rounded-xl bg-bg/60 px-4 py-3 font-semibold hover:bg-surface-hover transition">
                  Pattern library
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
