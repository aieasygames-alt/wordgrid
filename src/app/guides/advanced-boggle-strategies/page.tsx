import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Advanced Boggle Strategies: Better WordGrid Route Scanning",
  description:
    "Improve WordGrid route scanning with advanced but practical habits: map anchors, test extensions, use Qu paths, and review missed 3-6 letter words.",
  alternates: { canonical: `${BASE_URL}/guides/advanced-boggle-strategies/` },
  keywords: ["advanced boggle strategies", "boggle expert techniques", "word grid strategy", "boggle route scanning"],
  openGraph: {
    title: "Advanced Boggle Strategies: Better WordGrid Route Scanning",
    description: "Advanced route-scanning habits that follow current WordGrid rules and dictionary limits.",
    url: `${BASE_URL}/guides/advanced-boggle-strategies/`,
  },
};

const techniques = [
  ["Map anchors, then branch", "Start at dense letters and clear pairs such as TH, EA, ER, and QU. From one start, trace several possible adjacent paths before moving elsewhere."],
  ["Keep a route ledger", "When a path produces a word, remember its first and final tiles. Those endpoints are the fastest places to check for a legal extension."],
  ["Search both directions", "A route can turn, reverse direction, and move diagonally. After a row scan, re-check the same letters through diagonal neighbors."],
  ["Use Qu deliberately", "Treat Qu as one tile that supplies QU. Test nearby vowels and consonants for QUIT, QUITE, QUICK, QUEST, QUOTE, QUIZ, and EQUAL when the full path exists."],
  ["Choose clear length", "Current scoring is 1 point for 3 letters, 2 for 4, 4 for 5, and 6 for 6. A visible 5- or 6-letter route is worth focused attention, but only if it remains legal."],
  ["Turn review into a drill", "After a board, use the solver to find one missed route. Name the missed shape, not just the word, and deliberately look for that shape on your next board."],
] as const;

const faqItems = [
  { question: "What makes a WordGrid strategy advanced?", answer: "Advanced play is a consistent process: map promising starts, trace legal paths in all directions, test extensions, and use post-board review to improve one recurring weakness." },
  { question: "How do I prioritize higher-value words?", answer: "Look for clear 5- and 6-letter paths first when the board suggests them. They score 4 and 6 points respectively, while short valid words remain useful for a reliable base score." },
  { question: "Are long word patterns always valid?", answer: "No. A word must be in the current dictionary and must follow an adjacent, non-repeating route. Use the dictionary checker and solver to confirm uncertain examples." },
];

export default function AdvancedBoggleStrategiesGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Advanced Boggle Strategies: Better WordGrid Route Scanning",
    description: metadata.description,
    url: `${BASE_URL}/guides/advanced-boggle-strategies/`,
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
            <h1 className="text-4xl font-bold">Advanced Boggle strategies for WordGrid</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">
              Advanced strategy is less about forcing obscure words and more about finding every legal route the board
              offers. Use a repeatable scan, then make the solver review teach your next board.
            </p>
          </header>

          <GuideActionBar
            primary={{ href: "/play", label: "Practice a board", detail: "Apply one technique at a time" }}
            secondary={{ href: "/solver", label: "Review routes", detail: "Find a missed legal path" }}
            tertiary={{ href: "/guides/boggle-dictionary", label: "Check a word", detail: "Confirm current dictionary entries" }}
            quaternary={{ href: "/words/high-scoring-boggle-words", label: "Study 5-6 letters", detail: "Practice score-efficient targets" }}
          />

          <div className="space-y-4 text-text">
            {techniques.map(([title, detail], index) => (
              <section key={title} className="rounded-lg border border-border bg-surface/50 p-5">
                <p className="text-sm font-semibold text-primary">Technique {index + 1}</p>
                <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
                <p className="mt-3 leading-relaxed text-text-muted">{detail}</p>
              </section>
            ))}

            <section className="mt-8 rounded-lg border border-border bg-surface/50 p-5">
              <h2 className="text-2xl font-semibold text-primary">An advanced review loop</h2>
              <ol className="mt-4 space-y-3 leading-relaxed text-text-muted">
                <li>1. Play a board without an answer list.</li>
                <li>2. Open the solver and choose one missed route that you could plausibly have seen.</li>
                <li>3. Record its letter shape, such as a diagonal turn or Qu branch.</li>
                <li>4. On the next board, scan deliberately for that one shape before adding another habit.</li>
              </ol>
            </section>

            <section className="mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about advanced strategy</h2>
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
