import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

type OnlinePlayGuideProps = {
  eyebrow: string;
  title: string;
  description: string;
  canonicalPath: string;
};

const faqItems = [
  { question: "Can I play WordGrid for free?", answer: "Yes. WordGrid runs in a browser with no download or account required. You can open a new practice board or play the shared Daily board." },
  { question: "What modes and board sizes are available?", answer: "Play offers Timed and Zen practice, plus Daily play. You can use 4x4, 5x5, and 6x6 boards." },
  { question: "How do I make a valid word?", answer: "Connect adjacent letters horizontally, vertically, or diagonally. A word must be at least 3 letters, cannot reuse a tile, and must be in the current WordGrid dictionary." },
  { question: "How does WordGrid score words?", answer: "Current scoring is 1 point for 3 letters, 2 for 4 letters, 4 for 5 letters, and 6 for 6 letters." },
];

export default function OnlinePlayGuide({ eyebrow, title, description, canonicalPath }: OnlinePlayGuideProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}${canonicalPath}`,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen px-4 py-8">
        <GuideDesktopShell>
          <header className="mb-8">
            <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
              <Link href="/" className="hover:text-text">WordGrid</Link>
              <span>/</span>
              <Link href="/guides/" className="hover:text-text">Guides</Link>
            </nav>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
            <h1 className="mt-2 text-4xl font-bold">{title}</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">{description}</p>
          </header>

          <GuideActionBar
            primary={{ href: "/play", label: "Play now", detail: "Open a fresh board in your browser" }}
            secondary={{ href: "/daily", label: "Play Daily", detail: "Try today's shared board" }}
            tertiary={{ href: "/guides/boggle-rules-beginners", label: "Read the rules", detail: "Learn legal paths and scoring" }}
            quaternary={{ href: "/solver", label: "Review a board", detail: "Find missed routes after play" }}
          />

          <div className="space-y-8 text-text">
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">Start a board in three steps</h2>
              <ol className="space-y-3 rounded-lg border border-border bg-surface/50 p-5 leading-relaxed text-text-muted">
                <li>1. Open Play and choose Timed or Zen practice, then select a 4x4, 5x5, or 6x6 board.</li>
                <li>2. Drag through adjacent tiles to form dictionary words without reusing a tile.</li>
                <li>3. After the board, use the solver to review routes and practice one missed pattern next time.</li>
              </ol>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">Choose a mode that matches your goal</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Timed", "Use a clock when you want a faster scan."],
                  ["Zen", "Practice without a clock and trace routes carefully."],
                  ["Daily", "Play the shared board and compare your own results over time."],
                ].map(([mode, detail]) => (
                  <div key={mode} className="rounded-lg border border-border bg-surface/50 p-4">
                    <h3 className="font-semibold">{mode}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">Current WordGrid rules</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface/50 p-4">
                  <h3 className="font-semibold">Legal routes</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">Words use adjacent horizontal, vertical, or diagonal tiles. Every route must avoid reusing a tile.</p>
                </div>
                <div className="rounded-lg border border-border bg-surface/50 p-4">
                  <h3 className="font-semibold">Scoring</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">3 letters: 1 point. 4 letters: 2 points. 5 letters: 4 points. 6 letters: 6 points.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about playing online</h2>
              <div className="divide-y divide-border rounded-lg border border-border bg-surface/50">
                {faqItems.map((item) => (
                  <details key={item.question} className="p-5">
                    <summary className="cursor-pointer font-semibold">{item.question}</summary>
                    <p className="mt-3 leading-relaxed text-text-muted">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </GuideDesktopShell>
      </main>
    </>
  );
}
