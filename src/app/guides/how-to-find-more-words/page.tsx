import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "How to Find More Words in Word Grid Puzzles",
  description:
    "Find more WordGrid words with a practical six-step scan: explore every direction, test legal extensions, use Qu paths, and review missed routes.",
  alternates: { canonical: `${BASE_URL}/guides/how-to-find-more-words/` },
  openGraph: {
    title: "How to Find More Words in Word Grid Puzzles",
    description: "Six practical habits for finding more valid routes in WordGrid.",
    url: `${BASE_URL}/guides/how-to-find-more-words/`,
  },
};

const methods = [
  ["Scan one starting tile at a time", "Choose a starting tile and explore all of its neighbors before jumping to another part of the board. This makes turns and diagonals easier to notice."],
  ["Reuse a letter pattern, not a route", "Pairs like TH, EA, ER, and Qu are useful starting cues. Each word still needs a new adjacent route with no repeated tile."],
  ["Test a legal extension", "After CAT, look for CATS. After PLAY, look for PLAYS, PLAYED, PLAYER, or REPLAY only when the full route is available."],
  ["Inspect Qu branches", "A Qu tile supplies QU in one cell. Check nearby paths for QUIT, QUITE, QUICK, QUEST, QUOTE, QUIZ, and EQUAL."],
  ["Balance length and certainty", "A 5-letter word is worth 4 points and a 6-letter word is worth 6 points. Prioritize a clear longer route, then collect reliable 3- and 4-letter words."],
  ["Review one missed route", "Use the solver after play and choose one route you missed. Practicing a single shape is more useful than memorizing an unverified list."],
] as const;

const faqItems = [
  { question: "Do diagonal routes count?", answer: "Yes. A WordGrid word can move horizontally, vertically, or diagonally to an adjacent tile, without reusing a tile." },
  { question: "Should I submit short words or wait for long ones?", answer: "Do both. Take a clear 5- or 6-letter route when you see it, then use short valid words to build a dependable score." },
  { question: "How can I check whether a word counts?", answer: "The dictionary checker verifies whether it is in WordGrid's current list. The board still must provide a legal adjacent route." },
];

export default function HowToFindMoreWordsGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Find More Words in Word Grid Puzzles",
    description: metadata.description,
    url: `${BASE_URL}/guides/how-to-find-more-words/`,
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
            <h1 className="text-4xl font-bold">How to find more words in WordGrid</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">
              Finding more words is a repeatable route-scanning skill. The six habits below keep your search grounded
              in the current dictionary and the board rules rather than guesswork.
            </p>
          </header>

          <GuideActionBar
            primary={{ href: "/play", label: "Play a board", detail: "Try one habit immediately" }}
            secondary={{ href: "/solver", label: "Review routes", detail: "Spot paths you missed" }}
            tertiary={{ href: "/guides/boggle-dictionary", label: "Check a word", detail: "Confirm current entries" }}
            quaternary={{ href: "/guides/most-common-boggle-words", label: "Practice words", detail: "Study verified examples" }}
          />

          <div className="space-y-4 text-text">
            {methods.map(([title, detail], index) => (
              <section key={title} className="rounded-lg border border-border bg-surface/50 p-5">
                <p className="text-sm font-semibold text-primary">Method {index + 1}</p>
                <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
                <p className="mt-3 leading-relaxed text-text-muted">{detail}</p>
              </section>
            ))}

            <section className="mt-8 rounded-lg border border-border bg-surface/50 p-5">
              <h2 className="text-2xl font-semibold text-primary">Practice loop</h2>
              <p className="mt-3 leading-relaxed text-text-muted">
                Pick one method, play a fresh board, then use the solver to inspect missed legal paths. Carry only one
                newly noticed shape into the next round so it becomes automatic.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about finding more words</h2>
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
