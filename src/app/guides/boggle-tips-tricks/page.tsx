import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Tips and Tricks: Practical WordGrid Board Scans",
  description:
    "Use practical Boggle-style tips for WordGrid: scan diagonals, test nearby extensions, use Qu correctly, and review valid routes after a board.",
  alternates: { canonical: `${BASE_URL}/guides/boggle-tips-tricks/` },
  keywords: ["boggle tips and tricks", "boggle tips", "word grid tips", "find more boggle words"],
  openGraph: {
    title: "Boggle Tips and Tricks: Practical WordGrid Board Scans",
    description: "Current-rules tips for spotting and verifying more WordGrid routes.",
    url: `${BASE_URL}/guides/boggle-tips-tricks/`,
  },
};

const tips = [
  ["Scan diagonals", "A legal word can move diagonally as well as horizontally or vertically. Repeat your scan from each corner and edge."],
  ["Trace, do not assume", "Keep your finger or eyes on every tile in a route. Nearby letters are not enough if the path would skip a tile or reuse one."],
  ["Check both ends", "After finding a word such as CAT or PLAY, look for an adjacent letter at either end before abandoning the path."],
  ["Use Qu as one tile", "A Qu tile represents QU. Test words such as QUIT, QUITE, QUICK, QUEST, QUOTE, QUIZ, and EQUAL only when the entire route exists."],
  ["Keep short words moving", "Reliable 3- and 4-letter words create a base score while you look for clear 5- and 6-letter paths."],
  ["Use the dictionary checker", "When a word looks plausible but you are unsure, check it against the same list WordGrid uses."],
  ["Review every board", "The solver is most useful after a round: note a missed route, then look for that shape on your next board."],
] as const;

const faqItems = [
  { question: "Do diagonals count in WordGrid?", answer: "Yes. A word can move to any adjacent tile, including diagonally, as long as no tile is reused in that word." },
  { question: "What should I do after finding a base word?", answer: "Check adjacent tiles for a legal extension, then submit each valid word separately. The extension must also appear in the current dictionary." },
  { question: "How do I check a questionable word?", answer: "Use the WordGrid dictionary checker. It tests whether a word is present in the list used by the current game." },
];

export default function BoggleTipsTricksGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Boggle Tips and Tricks: Practical WordGrid Board Scans",
    description: metadata.description,
    url: `${BASE_URL}/guides/boggle-tips-tricks/`,
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
            <h1 className="text-4xl font-bold">Boggle tips and tricks for WordGrid</h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">
              The quickest gains come from reliable mechanics: explore every adjacent direction, validate the route,
              and use the game tools to turn missed words into your next practice target.
            </p>
          </header>

          <GuideActionBar
            primary={{ href: "/play", label: "Play a board", detail: "Try one scanning habit now" }}
            secondary={{ href: "/solver", label: "Review a board", detail: "See valid routes after play" }}
            tertiary={{ href: "/guides/boggle-dictionary", label: "Check a word", detail: "Use the game dictionary" }}
            quaternary={{ href: "/guides/most-common-boggle-words", label: "Practice words", detail: "Study verified examples" }}
          />

          <div className="space-y-4 text-text">
            {tips.map(([title, detail], index) => (
              <section key={title} className="rounded-lg border border-border bg-surface/50 p-5">
                <p className="text-sm font-semibold text-primary">Tip {index + 1}</p>
                <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
                <p className="mt-3 leading-relaxed text-text-muted">{detail}</p>
              </section>
            ))}

            <section className="mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-primary">A simple post-board routine</h2>
              <ol className="space-y-3 rounded-lg border border-border bg-surface/50 p-5 leading-relaxed">
                <li>1. Play one board using one tip, such as diagonal scanning.</li>
                <li>2. Open the solver and find one valid route you missed.</li>
                <li>3. Name the pattern in that route, then look for it on your next board.</li>
              </ol>
            </section>

            <section className="mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-primary">Questions about these tips</h2>
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
