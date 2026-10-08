import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Rules Printable - WordGrid Reference Sheet",
  description:
    "A printable WordGrid rules reference: legal adjacent paths, current 3-6 letter dictionary range, Qu handling, and the 1/2/4/6 point table.",
  alternates: { canonical: `${BASE_URL}/guides/boggle-rules-printable/` },
  keywords: ["boggle rules printable", "boggle rules sheet", "boggle scoring sheet", "word grid rules"],
  openGraph: {
    title: "Boggle Rules Printable - WordGrid Reference Sheet",
    description: "Print-friendly WordGrid rules, scoring, and word-validity reference.",
    url: `${BASE_URL}/guides/boggle-rules-printable/`,
  },
};

const faqItems = [
  { question: "What makes this a printable reference rather than a full rules guide?", answer: "This page is designed to sit beside a board. It condenses setup, route checks, scoring, and end-of-round review into a single handout. Use the full rules guide for detailed explanations." },
  { question: "What makes a WordGrid word valid?", answer: "It must be at least 3 letters, be present in the current dictionary, and trace through adjacent tiles without reusing a tile." },
  { question: "How are WordGrid words scored?", answer: "3 letters score 1 point, 4 score 2, 5 score 4, and 6 score 6. The current word list has words through 6 letters." },
  { question: "How does a Qu tile work?", answer: "A Qu tile supplies QU as one tile. The rest of the word still needs a legal adjacent route." },
];

export default function BoggleRulesPrintableGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Boggle Rules Printable - WordGrid Reference Sheet",
    description: metadata.description,
    url: `${BASE_URL}/guides/boggle-rules-printable/`,
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
      <main className="min-h-screen px-4 py-8 print:bg-white print:text-black">
        <GuideDesktopShell>
          <header className="mb-8 print:hidden">
            <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
              <Link href="/" className="hover:text-text">WordGrid</Link>
              <span>/</span>
              <Link href="/guides/" className="hover:text-text">Guides</Link>
            </nav>
            <h1 className="text-4xl font-bold">Printable WordGrid game reference</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">A one-page setup, scoring, and review card for a WordGrid board. Print it for a family round, a classroom activity, or your own desk.</p>
          </header>

          <div className="print:hidden">
            <GuideActionBar
              primary={{ href: "/play/", label: "Play a board", detail: "Use the rules in a live game" }}
              secondary={{ href: "/guides/boggle-dictionary/", label: "Check a word", detail: "Confirm a current entry" }}
              tertiary={{ href: "/guides/boggle-scoring-sheet/", label: "See scoring", detail: "Read the full points guide" }}
              quaternary={{ href: "/solver/", label: "Review a board", detail: "Find routes after play" }}
            />
          </div>

          <article className="rounded-lg border border-border bg-surface/50 p-6 print:border-0 print:bg-white print:p-0">
            <h1 className="hidden text-3xl font-bold print:block">WordGrid Game Reference Card</h1>
            <section className="mt-6 grid gap-3 rounded-lg border border-border bg-bg/40 p-4 print:grid-cols-3 print:border-black print:bg-white">
              <div>
                <h2 className="font-semibold text-primary print:text-black">Before the board</h2>
                <p className="mt-1 text-sm leading-relaxed text-text-muted print:text-black">Choose Timed or Zen, agree on the board size, and give each player a place to record words.</p>
              </div>
              <div>
                <h2 className="font-semibold text-primary print:text-black">During the board</h2>
                <p className="mt-1 text-sm leading-relaxed text-text-muted print:text-black">Trace one continuous route at a time. Record the word first; settle questions after the round.</p>
              </div>
              <div>
                <h2 className="font-semibold text-primary print:text-black">After the board</h2>
                <p className="mt-1 text-sm leading-relaxed text-text-muted print:text-black">Check disputed words, total points, then review one missed pattern before the next game.</p>
              </div>
            </section>
            <section className="mt-6">
              <h2 className="text-2xl font-semibold text-primary print:text-black">How to form a word</h2>
              <ol className="mt-3 space-y-2 leading-relaxed text-text-muted print:text-black">
                <li>1. Start on any letter tile.</li>
                <li>2. Move to a touching tile horizontally, vertically, or diagonally.</li>
                <li>3. Do not reuse a tile in the same word.</li>
                <li>4. Submit words with at least 3 letters that are in the current WordGrid dictionary.</li>
                <li>5. A Qu tile supplies QU as one tile.</li>
              </ol>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-primary print:text-black">Current scoring table</h2>
              <table className="mt-3 w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border print:border-black">
                    <th className="py-2">Word length</th>
                    <th className="py-2">Points</th>
                    <th className="py-2">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["3 letters", "1", "CAT, THE, RUN"],
                    ["4 letters", "2", "PLAY, WORD, GAME"],
                    ["5 letters", "4", "BOARD, QUICK, SCORE"],
                    ["6 letters", "6", "GARDEN, PLAYER, SQUARE"],
                  ].map(([length, points, example]) => (
                    <tr key={length} className="border-b border-border print:border-black">
                      <td className="py-2 font-semibold">{length}</td>
                      <td className="py-2 text-primary print:text-black">{points}</td>
                      <td className="py-2 text-text-muted print:text-black">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-sm text-text-muted print:text-black">The current WordGrid word list contains words through 6 letters.</p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-primary print:text-black">Round checklist</h2>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2 print:grid-cols-2">
                <div className="rounded-lg border border-border p-4 print:border-black">
                  <h3 className="font-semibold">Player check</h3>
                  <ul className="mt-2 space-y-1 leading-relaxed text-text-muted print:text-black">
                    <li>□ I did not reuse a tile.</li>
                    <li>□ Each step touches the previous tile.</li>
                    <li>□ The word has at least 3 letters.</li>
                    <li>□ I recorded the word before checking it.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border p-4 print:border-black">
                  <h3 className="font-semibold">Host or group check</h3>
                  <ul className="mt-2 space-y-1 leading-relaxed text-text-muted print:text-black">
                    <li>□ Confirm the same board and mode for everyone.</li>
                    <li>□ Resolve uncertain words with the current dictionary.</li>
                    <li>□ Score only confirmed words.</li>
                    <li>□ Save one useful route to practice next time.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mt-8 grid gap-3 border-t border-border pt-6 print:grid-cols-3 print:border-black">
              <div>
                <h2 className="text-lg font-semibold text-primary print:text-black">Mode</h2>
                <p className="mt-2 border-b border-dashed border-border pb-2 text-sm text-text-muted print:border-black print:text-black">Timed / Zen / Daily</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary print:text-black">Board size</h2>
                <p className="mt-2 border-b border-dashed border-border pb-2 text-sm text-text-muted print:border-black print:text-black">4x4 / 5x5 / 6x6</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary print:text-black">Next pattern to practice</h2>
                <p className="mt-2 border-b border-dashed border-border pb-2 text-sm text-text-muted print:border-black print:text-black">________________</p>
              </div>
            </section>

            <section className="mt-8 print:hidden">
              <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about the rules</h2>
              <div className="divide-y divide-border rounded-lg border border-border">
                {faqItems.map((item) => (
                  <details key={item.question} className="p-5">
                    <summary className="cursor-pointer font-semibold">{item.question}</summary>
                    <p className="mt-3 leading-relaxed text-text-muted">{item.answer}</p>
                  </details>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                Need the full explanation of legal paths, the dictionary, or scoring? Read the{" "}
                <Link href="/guides/boggle-rules-beginners/" className="text-primary hover:underline">WordGrid rules guide</Link>.
              </p>
            </section>
          </article>
        </GuideDesktopShell>
      </main>
    </>
  );
}
