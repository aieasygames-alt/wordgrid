import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";
import BoggleWordChecker from "@/components/BoggleWordChecker";

export const metadata: Metadata = {
  title: "Boggle Dictionary and Word Checker - Valid Words",
  description:
    "Check whether a 3-6 letter word is in the current WordGrid dictionary, then review the path and score rules for a finished board.",
  alternates: { canonical: "/guides/boggle-dictionary" },
  keywords: [
    "boggle dictionary",
    "boggle word checker",
    "boggle valid words",
    "boggle word list",
    "word grid dictionary",
  ],
  openGraph: {
    title: "Boggle Dictionary and Word Checker - Valid Words",
    description:
      "Check the current WordGrid dictionary and learn what else a word needs to count on a board.",
  },
};

const BASE_URL = "https://wordgrid.games";

const faqItems = [
  {
    question: "How do I check if a WordGrid word is valid?",
    answer:
      "Use the checker on this page. A word must be in the current WordGrid list, contain 3 to 6 letters, and follow a legal adjacent path on the board without reusing a tile.",
  },
  {
    question: "How many words are in the WordGrid dictionary?",
    answer:
      "WordGrid currently validates against a built-in gameplay list of more than 55,000 words. It is a game-specific list, not a claim that every general-dictionary entry is playable.",
  },
  {
    question: "Does a checked word automatically score in a round?",
    answer:
      "No. A checker result only confirms dictionary membership. The word still needs a legal adjacent route in the exact board you are playing, and it must not reuse a tile.",
  },
  {
    question: "When should I use the word checker?",
    answer:
      "Use it after a Timed, Zen, or Daily board to settle a question and study vocabulary. For a full-board review, use the solver after you have finished playing.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Dictionary and Word Checker: Valid Words",
  description:
    "A current WordGrid dictionary checker with rules for valid paths, word length, and post-game review.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  mainEntityOfPage: `${BASE_URL}/guides/boggle-dictionary/`,
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "WordGrid", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Boggle Dictionary" },
  ],
};

export default function BoggleDictionaryGuide() {
  return (
    <main className="min-h-screen px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <GuideDesktopShell>
        <header className="mb-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-text-dim">
            <Link href="/" className="hover:text-text">WordGrid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="mb-2 text-4xl font-bold">Boggle dictionary and word checker</h1>
          <p className="text-text-muted">Check a word against the current WordGrid list, then verify its route on the board.</p>
        </header>

        <GuideActionBar
          primary={{ href: "/play", label: "Play a board", detail: "Start Timed or Zen practice." }}
          secondary={{ href: "/solver", label: "Review a board", detail: "Find missed routes after play." }}
          tertiary={{ href: "/words", label: "Browse words", detail: "Study current word lists." }}
          quaternary={{ href: "/guides/boggle-scoring-sheet/", label: "See scoring", detail: "Check the 1/2/4/6 point table." }}
        />

        <div className="max-w-3xl space-y-8 text-text">
          <section className="space-y-3 leading-relaxed">
            <p>
              This <strong>Boggle word checker</strong> uses the same built-in
              WordGrid word list that validates current rounds. It is useful for
              reviewing a finished board, learning a word you missed, or settling
              a casual post-game question.
            </p>
            <p>
              A check is only the first step. A WordGrid word must be in the list,
              have 3 to 6 letters, and trace through horizontally, vertically, or
              diagonally adjacent tiles without reusing a tile.
            </p>
          </section>

          <BoggleWordChecker />

          <section className="rounded-xl border border-border bg-surface/50 p-5">
            <h2 className="mb-3 text-2xl font-semibold text-primary">What makes a word count</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Required</h3>
                <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
                  <li>3 to 6 letters in the current WordGrid list.</li>
                  <li>A route through touching horizontal, vertical, or diagonal tiles.</li>
                  <li>No repeated tile in the same word.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Not enough on its own</h3>
                <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
                  <li>Appearing in a general-purpose dictionary.</li>
                  <li>Having the right length without a legal route.</li>
                  <li>Seeing the same letter twice when its tile cannot be reused.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">A useful post-game routine</h2>
            <ol className="ml-4 list-decimal space-y-3 leading-relaxed">
              <li>Finish your Timed, Zen, or Daily board before checking answers.</li>
              <li>Use this checker for a word you are unsure about.</li>
              <li>Open the <Link href="/solver" className="text-primary hover:underline">solver</Link> to inspect all valid routes from the full board.</li>
              <li>Study one current word family from the <Link href="/guides/boggle-word-lists/" className="text-primary hover:underline">word lists</Link> before your next board.</li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about the WordGrid dictionary</h2>
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
