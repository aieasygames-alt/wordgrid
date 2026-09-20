import type { Metadata } from "next";
import SolverLandingPage from "@/components/SolverLandingPage";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Word Grid Solver - Free Online Word Finder",
  description:
    "Solve a 4x4, 5x5, or 6x6 word grid online. Enter square grid letters, review valid words, and compare scores and missed routes.",
  alternates: { canonical: `${BASE_URL}/word-grid-solver/` },
  openGraph: {
    title: "Word Grid Solver - Free Online Word Finder",
    description:
      "Enter a 4x4, 5x5, or 6x6 word grid and review valid answers with scores and pattern review.",
    url: `${BASE_URL}/word-grid-solver/`,
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WordGrid Solver",
    url: `${BASE_URL}/word-grid-solver/`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SolverLandingPage
        eyebrow="Word grid solver"
        title="Word Grid Solver"
        intro="This word grid solver checks 4x4, 5x5, and 6x6 square letter boards against the current dictionary. Use it for Boggle-style puzzles, Daily review, or practice boards after you play."
        primaryIntent="Searchers who want a general word grid solver rather than a board-game-specific explanation."
        useCases={[
          "Review 4x4, 5x5, or 6x6 word grids.",
          "Compare long words and higher-scoring answers.",
          "Turn a finished board into a study session.",
        ]}
        steps={[
          "Choose the board size and fill every letter cell.",
          "Use Qu as one tile when the board has a Qu face.",
          "Run the solver and compare word lengths and scores.",
          "Open related word lists to practice patterns from your results.",
        ]}
        related={[
          { href: "/solver", label: "Open word grid solver" },
          { href: "/words/common-boggle-words", label: "Common Boggle words" },
          { href: "/words/words-ending-in-ing", label: "ING words" },
          { href: "/play", label: "Play word grid online" },
        ]}
        supportedBoards="4x4, 5x5, and 6x6 square boards"
      />
    </>
  );
}
