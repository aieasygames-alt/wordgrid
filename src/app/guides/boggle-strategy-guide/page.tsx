import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Strategy Guide: Find More Valid WordGrid Words",
  description:
    "Use a practical WordGrid strategy: map the board, trace legal routes, extend valid words, and prioritize 3-6 letter scores without relying on guesses.",
  alternates: { canonical: `${BASE_URL}/guides/boggle-strategy-guide/` },
  keywords: ["boggle strategy guide", "word grid strategy", "boggle tips", "find more boggle words"],
  openGraph: {
    title: "Boggle Strategy Guide: Find More Valid WordGrid Words",
    description: "A practical, current-rules guide to mapping a WordGrid board and finding more valid routes.",
    url: `${BASE_URL}/guides/boggle-strategy-guide/`,
  },
};

const faqItems = [
  {
    question: "What is the most useful WordGrid strategy?",
    answer:
      "Use a repeatable scan: inspect the whole board, trace promising letter paths in every direction, then extend each valid word where adjacent tiles allow it.",
  },
  {
    question: "Should I look for long words first?",
    answer:
      "Look for 5- and 6-letter routes early when you spot a clear pattern, then return for reliable short words. WordGrid awards 4 points for 5 letters and 6 points for 6 letters.",
  },
  {
    question: "Can I reuse a tile in one word?",
    answer:
      "No. A route may move to an adjacent tile in any direction, but it cannot reuse a tile during the same word.",
  },
];

export default function BoggleStrategyGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Boggle Strategy Guide: Find More Valid WordGrid Words",
    description: metadata.description,
    url: `${BASE_URL}/guides/boggle-strategy-guide/`,
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
              <Link href="/" className="hover:text-text">Word Grid</Link>
              <span>/</span>
              <Link href="/guides/" className="hover:text-text">Guides</Link>
            </nav>
            <h1 className="text-4xl font-bold">Boggle strategy guide</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">
              A board is not a reading exercise. It is a route-finding problem: every submitted word must be in the
              current dictionary and trace through adjacent tiles without revisiting a tile.
            </p>
          </header>

          <GuideActionBar
            primary={{ href: "/play", label: "Play a board", detail: "Practice the scan on a live grid" }}
            secondary={{ href: "/solver", label: "Review a board", detail: "Compare your routes after play" }}
            tertiary={{ href: "/guides/boggle-dictionary", label: "Check a word", detail: "Confirm a dictionary entry" }}
            quaternary={{ href: "/guides/boggle-scoring-sheet", label: "See scoring", detail: "Use the current points table" }}
          />

          <div className="space-y-8 text-text">
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">1. Map before you commit</h2>
              <p className="leading-relaxed">
                Sweep rows, columns, and diagonals. Notice pairs such as TH, EA, and QU, then test whether the next
                tile continues a real word. Looking in every direction matters because a valid route can turn at any
                adjacent tile.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ["Start", "Pick a useful letter pair or a Qu tile."],
                  ["Trace", "Follow adjacent tiles and keep the route in view."],
                  ["Verify", "Submit only words that the board and dictionary support."],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-lg border border-border bg-surface/50 p-4">
                    <h3 className="font-semibold text-primary">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">2. Extend words while the route is fresh</h2>
              <p className="leading-relaxed">
                Once you find a valid base word, inspect the tiles next to either end. A nearby letter can create a
                second valid submission, but every extension needs its own legal route and dictionary check.
              </p>
              <div className="mt-4 rounded-lg border border-border bg-surface/50 p-5 text-sm leading-7">
                <p><strong>Example checks:</strong> CAT to CATS, DOG to DOGS, PLAY to PLAYS, PLAYED, PLAYER, or REPLAY.</p>
                <p className="mt-2 text-text-muted">These are examples to test only when the necessary adjacent tiles are present.</p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">3. Use the point table to choose your next search</h2>
              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  ["3 letters", "1 point"],
                  ["4 letters", "2 points"],
                  ["5 letters", "4 points"],
                  ["6 letters", "6 points"],
                ].map(([length, points]) => (
                  <div key={length} className="rounded-lg border border-border bg-surface/50 p-4">
                    <p className="text-sm text-text-muted">{length}</p>
                    <p className="mt-1 text-xl font-bold text-primary">{points}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 leading-relaxed">
                A clear 5- or 6-letter path is worth pausing for. When no long route is apparent, collect dependable
                3- and 4-letter words rather than forcing a pattern that the board cannot make.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">4. Build patterns from valid examples</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface/50 p-4">
                  <h3 className="font-semibold">Useful short routes</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">THE, AND, EAR, EAT, EAST, CARE, and EARN are good route-recognition drills.</p>
                </div>
                <div className="rounded-lg border border-border bg-surface/50 p-4">
                  <h3 className="font-semibold">Longer targets in this dictionary</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">ACTION, GARDEN, PLAYER, SQUARE, and UNIQUE illustrate the current 6-letter ceiling.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">5. Review missed routes after each board</h2>
              <p className="leading-relaxed">
                After a round, use the solver to see which valid paths you missed. Pick one recurring pattern to
                practice on the next board instead of trying to memorize a long list at once.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about WordGrid strategy</h2>
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
