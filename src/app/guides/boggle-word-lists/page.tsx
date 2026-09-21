import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

export const metadata: Metadata = {
  title: "Boggle Word Lists - Current WordGrid Study Lists",
  description:
    "Browse current WordGrid word lists by length and pattern, including 3-letter anchors, Qu words, S endings, ING endings, and high-scoring targets.",
  alternates: { canonical: "/guides/boggle-word-lists" },
  keywords: [
    "boggle word lists",
    "boggle word list",
    "boggle words by letter",
    "boggle practice words",
    "word grid word list",
  ],
  openGraph: {
    title: "Boggle Word Lists - Current WordGrid Study Lists",
    description:
      "Study current WordGrid words by length, score, and reusable patterns before your next board.",
  },
};

const BASE_URL = "https://wordgrid.games";

const studyLists = [
  ["3-letter words", "/words/3-letter-boggle-words/", "1-point anchors that help you begin a scan."],
  ["4-letter words", "/words/4-letter-boggle-words/", "2-point extensions built from familiar short routes."],
  ["5-letter words", "/words/5-letter-boggle-words/", "4-point targets worth a deliberate second pass."],
  ["High-scoring words", "/words/high-scoring-boggle-words/", "Current 5- and 6-letter targets worth 4 or 6 points."],
  ["Words with Qu", "/words/words-with-qu/", "Practice the Qu tile and its common branches."],
  ["Words ending in S", "/words/words-ending-in-s/", "Spot plural and verb extensions when S is adjacent."],
  ["Words ending in ING", "/words/words-ending-in-ing/", "Study playable ING patterns from the current list."],
  ["Common practice words", "/words/common-boggle-words/", "Use a focused starting list for route-recognition drills."],
] as const;

const faqItems = [
  {
    question: "Are these Boggle word lists current?",
    answer:
      "Yes. The linked WordGrid lists are filtered against the same current dictionary used by the game. The current gameplay list contains 3- to 6-letter words.",
  },
  {
    question: "Which word length should I study first?",
    answer:
      "Begin with 3- and 4-letter words to build route recognition. Add 5- and 6-letter targets once you can see short anchors quickly; they are worth more under the current score table.",
  },
  {
    question: "Does learning a word list guarantee it will score?",
    answer:
      "No. A listed word must still be in the current dictionary and trace through adjacent, non-repeating tiles on the board you are playing.",
  },
  {
    question: "How should I use a word list after a board?",
    answer:
      "Use the solver after a finished board, identify a missed word family or pattern, then open the matching list and practice that pattern on a fresh board.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Word Lists: Current WordGrid Study Lists",
  description:
    "A practical index of current WordGrid word lists by length, score, and reusable pattern.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  mainEntityOfPage: `${BASE_URL}/guides/boggle-word-lists/`,
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

export default function BoggleWordListsGuide() {
  return (
    <main className="min-h-screen px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <GuideDesktopShell>
        <header className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
            <Link href="/" className="hover:text-text">WordGrid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="mb-2 text-4xl font-bold">Boggle word lists for current WordGrid play</h1>
          <p className="text-text-muted">Study 3-6 letter words and reusable patterns that match the current game dictionary.</p>
        </header>

        <GuideActionBar
          primary={{ href: "/words", label: "Browse all words", detail: "Open the current word-list hub." }}
          secondary={{ href: "/play", label: "Play a board", detail: "Try a pattern in Timed or Zen." }}
          tertiary={{ href: "/solver", label: "Review a board", detail: "Find missed routes after play." }}
          quaternary={{ href: "/guides/boggle-dictionary/", label: "Check a word", detail: "Verify dictionary membership." }}
        />

        <div className="max-w-3xl space-y-8 text-text">
          <section className="space-y-3 leading-relaxed">
            <p>
              These <strong>Boggle word lists</strong> are study paths, not a
              claim that every word is common on every board. Each linked list is
              filtered against the current WordGrid dictionary, which currently
              contains words from 3 through 6 letters.
            </p>
            <p>
              The best way to use a list is to learn one pattern, play a board,
              then use the <Link href="/solver" className="text-primary hover:underline">solver</Link> to
              review whether you missed similar routes. That turns vocabulary into
              a repeatable scanning habit.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Study by length or pattern</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {studyLists.map(([title, href, description]) => (
                <Link key={href} href={href} className="rounded-xl border border-border bg-surface/50 p-4 transition hover:bg-surface">
                  <h3 className="font-semibold text-primary">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface/50 p-5">
            <h2 className="mb-3 text-2xl font-semibold text-primary">Choose the right target</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Start with anchors</h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  Learn 3- and 4-letter words first. They make it easier to see
                  adjacent extensions and establish a reliable base score.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Then extend routes</h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  In the current 1/2/4/6 scoring table, clear 5- and 6-letter
                  routes are the highest-value targets. Check their path before
                  committing to a long scan.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about word lists</h2>
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
