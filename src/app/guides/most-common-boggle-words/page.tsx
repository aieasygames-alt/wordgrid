import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Common WordGrid Words: Verified 3-6 Letter Practice List",
  description:
    "Practice common 3, 4, 5, and 6 letter words that are in the current WordGrid dictionary. Use the list to build fast scanning habits for your next board.",
  keywords: [
    "common boggle words",
    "boggle word list",
    "boggle practice words",
    "wordgrid dictionary",
  ],
  alternates: { canonical: `${BASE_URL}/guides/most-common-boggle-words/` },
  openGraph: {
    title: "Common WordGrid Words: Verified Practice List",
    description: "A practical 3-6 letter word list checked against the current WordGrid dictionary.",
    url: `${BASE_URL}/guides/most-common-boggle-words/`,
  },
};

const wordsByLength = {
  "3 letter words": [
    "AND",
    "ARE",
    "CAT",
    "DOG",
    "EAR",
    "EAT",
    "FOR",
    "FUN",
    "GET",
    "MAP",
    "NET",
    "RUN",
    "SEA",
    "SET",
    "THE",
    "TOP",
  ],
  "4 letter words": [
    "ABLE",
    "BANK",
    "BEAT",
    "BOAT",
    "BOOK",
    "CALL",
    "CARE",
    "COLD",
    "COME",
    "EARN",
    "EAST",
    "FIND",
    "FISH",
    "FORM",
    "GAME",
    "WORD",
  ],
  "5 letter words": [
    "ABOUT",
    "APPLE",
    "BEACH",
    "BLACK",
    "BOARD",
    "BRAIN",
    "BUILD",
    "CHAIN",
    "CLEAN",
    "CLOSE",
    "DAILY",
    "EARTH",
    "GREAT",
    "MONEY",
    "QUIET",
    "WATER",
  ],
  "6 letter words": ["ACTION", "GARDEN", "PLAYER", "SQUARE", "UNIQUE"],
} as const;

const faqItems = [
  {
    question: "Are these words valid in WordGrid?",
    answer:
      "Yes. Every example on this page is checked against the dictionary used by the current game. A word must still be traceable through adjacent tiles on the board.",
  },
  {
    question: "Why focus on short words first?",
    answer:
      "Short words are faster to recognize and are plentiful on most boards. They also make a reliable base score before you spend time looking for longer routes.",
  },
  {
    question: "How are words scored?",
    answer:
      "WordGrid gives 1 point for 3-letter words, 2 for 4-letter words, 4 for 5-letter words, and 6 for 6-letter words. See the scoring guide for the full rules.",
  },
];

export default function MostCommonBoggleWordsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Common WordGrid Words: Verified 3-6 Letter Practice List",
    description: metadata.description,
    url: `${BASE_URL}/guides/most-common-boggle-words/`,
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
      <GuideDesktopShell>
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">Practice list</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Common WordGrid words to practice
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            This is a focused practice list, not a claim about universal word frequency. Each example is in the
            current WordGrid dictionary, so you can learn patterns that work in the game you are playing.
          </p>

          <GuideActionBar
            primary={{ href: "/play", label: "Play a board", detail: "Put patterns into practice" }}
            secondary={{ href: "/solver", label: "Review a board", detail: "Find routes you missed" }}
            tertiary={{ href: "/guides/boggle-dictionary", label: "Check a word", detail: "Verify dictionary entries" }}
            quaternary={{ href: "/guides/boggle-scoring-sheet", label: "See points", detail: "Learn the score rules" }}
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            {[
              ["3 letters", "1 point"],
              ["4 letters", "2 points"],
              ["5 letters", "4 points"],
              ["6 letters", "6 points"],
            ].map(([length, score]) => (
              <div key={length} className="rounded-lg border border-slate-700 bg-slate-900/70 p-4">
                <p className="text-sm font-semibold text-slate-300">{length}</p>
                <p className="mt-1 text-2xl font-black text-amber-300">{score}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-8">
            {Object.entries(wordsByLength).map(([length, words]) => (
              <section key={length} aria-labelledby={length.replaceAll(" ", "-")}>
                <div className="flex items-baseline justify-between gap-4">
                  <h2 id={length.replaceAll(" ", "-")} className="text-2xl font-bold text-white">
                    {length}
                  </h2>
                  <span className="text-sm text-slate-400">Verified in the current dictionary</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {words.map((word) => (
                    <span
                      key={word}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-sm font-bold tracking-wide text-slate-100"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-lg border border-amber-400/30 bg-amber-400/10 p-6">
            <h2 className="text-2xl font-bold text-white">Use the list as a scanning drill</h2>
            <ol className="mt-4 space-y-3 text-slate-200">
              <li>1. Start a new board and find a few 3-letter routes without entering them.</li>
              <li>2. Expand each route into nearby 4- and 5-letter possibilities.</li>
              <li>3. Enter the words, then use the board review to spot the routes you missed.</li>
            </ol>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white">Questions about the word list</h2>
            <div className="mt-4 divide-y divide-slate-800 rounded-lg border border-slate-800 bg-slate-950/50">
              {faqItems.map((item) => (
                <details key={item.question} className="group p-5">
                  <summary className="cursor-pointer list-none font-semibold text-white">
                    {item.question}
                  </summary>
                  <p className="mt-3 leading-7 text-slate-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-amber-300" aria-label="Related guides">
            <Link href="/guides/boggle-dictionary" className="hover:text-amber-200">Dictionary checker</Link>
            <Link href="/guides/boggle-scoring-sheet" className="hover:text-amber-200">Scoring guide</Link>
            <Link href="/guides/word-pattern-library" className="hover:text-amber-200">Word patterns</Link>
            <Link href="/play" className="hover:text-amber-200">Play WordGrid</Link>
          </nav>
        </section>
      </GuideDesktopShell>
    </>
  );
}
