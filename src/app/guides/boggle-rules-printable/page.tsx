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
            <h1 className="text-4xl font-bold">Boggle rules printable reference</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">A concise current-rules sheet for WordGrid. Print this page or keep it open beside a board.</p>
          </header>

          <div className="print:hidden">
            <GuideActionBar
              primary={{ href: "/play", label: "Play a board", detail: "Use the rules in a live game" }}
              secondary={{ href: "/guides/boggle-dictionary", label: "Check a word", detail: "Confirm a current entry" }}
              tertiary={{ href: "/guides/boggle-scoring-sheet", label: "See scoring", detail: "Read the full points guide" }}
              quaternary={{ href: "/solver", label: "Review a board", detail: "Find routes after play" }}
            />
          </div>

          <article className="rounded-lg border border-border bg-surface/50 p-6 print:border-0 print:bg-white print:p-0">
            <h1 className="hidden text-3xl font-bold print:block">WordGrid Rules Reference</h1>
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
            </section>
          </article>
        </GuideDesktopShell>
      </main>
    </>
  );
}
