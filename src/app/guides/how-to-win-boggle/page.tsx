import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "How to Win at Boggle: A WordGrid Scoring Strategy",
  description:
    "Improve your WordGrid score with a repeatable Boggle-style routine: find legal routes, pursue clear 5-6 letter paths, collect short words, and review misses.",
  alternates: { canonical: `${BASE_URL}/guides/how-to-win-boggle/` },
  keywords: ["how to win at boggle", "boggle scoring strategy", "word grid score", "boggle winning tips"],
  openGraph: {
    title: "How to Win at Boggle: A WordGrid Scoring Strategy",
    description: "A practical score-building routine based on current WordGrid rules.",
    url: `${BASE_URL}/guides/how-to-win-boggle/`,
  },
};

const routines = [
  ["Find a clear route", "Start with visible clusters and trace every tile. A good-looking word is only useful when the route is adjacent, continuous, and non-repeating."],
  ["Take the available length", "A 5-letter word is worth 4 points and a 6-letter word is worth 6 points. Search for those routes when the board suggests them, without skipping easy shorter words."],
  ["Collect dependable short words", "3-letter words score 1 point and 4-letter words score 2. They are a practical fallback when a longer route does not resolve."],
  ["Test extensions", "From CAT, test CATS. From PLAY, test PLAYS, PLAYED, PLAYER, and REPLAY only where adjacent tiles make a legal path."],
  ["Check Qu deliberately", "Treat a Qu tile as QU and inspect nearby routes for QUIT, QUITE, QUICK, QUEST, QUOTE, QUIZ, or EQUAL."],
  ["Learn from missed routes", "Use the solver after a board. One missed route is a concrete pattern to look for next time."],
] as const;

const faqItems = [
  {
    question: "What score should I aim for in WordGrid?",
    answer:
      "There is no universal winning score because each board creates a different set of valid routes. Compare your own results over time and focus on finding one more valid route per board.",
  },
  {
    question: "Do longer words always matter more?",
    answer:
      "Longer words are worth more in the current rules, but a route must be legal and present in the dictionary. Take clear 5- and 6-letter opportunities, then collect reliable short words.",
  },
  {
    question: "How can I improve without memorizing unsupported words?",
    answer:
      "Practice with verified words, play a board, and review missed routes with the solver. The dictionary checker can confirm uncertain candidates before you build them into a habit.",
  },
];

export default function HowToWinBoggleGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Win at Boggle: A WordGrid Scoring Strategy",
    description: metadata.description,
    url: `${BASE_URL}/guides/how-to-win-boggle/`,
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
            <h1 className="text-4xl font-bold">How to win at Boggle-style WordGrid</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">
              Higher scores come from a calm, repeatable search process. Focus on valid board routes and the point
              table rather than a fixed score target or a memorized list of words the game may not accept.
            </p>
          </header>

          <GuideActionBar
            primary={{ href: "/play", label: "Practice now", detail: "Use the routine on a fresh board" }}
            secondary={{ href: "/guides/boggle-scoring-sheet", label: "Check scoring", detail: "See 3-6 letter points" }}
            tertiary={{ href: "/guides/boggle-dictionary", label: "Check a word", detail: "Confirm the current word list" }}
            quaternary={{ href: "/solver", label: "Review routes", detail: "Find valid words you missed" }}
          />

          <div className="space-y-4 text-text">
            {routines.map(([title, detail], index) => (
              <section key={title} className="rounded-lg border border-border bg-surface/50 p-5">
                <p className="text-sm font-semibold text-primary">Strategy {index + 1}</p>
                <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
                <p className="mt-3 leading-relaxed text-text-muted">{detail}</p>
              </section>
            ))}

            <section className="mt-8 rounded-lg border border-border bg-surface/50 p-5">
              <h2 className="text-2xl font-semibold text-primary">Current WordGrid scoring</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {[
                  ["3 letters", "1 point"],
                  ["4 letters", "2 points"],
                  ["5 letters", "4 points"],
                  ["6 letters", "6 points"],
                ].map(([length, points]) => (
                  <div key={length} className="rounded-lg border border-border p-4">
                    <p className="text-sm text-text-muted">{length}</p>
                    <p className="mt-1 text-xl font-bold text-primary">{points}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about scoring higher</h2>
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
