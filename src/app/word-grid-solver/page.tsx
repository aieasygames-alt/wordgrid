import type { Metadata } from "next";
import SolverLandingPage from "@/components/SolverLandingPage";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Word Grid Solver — Free Online Word Finder",
  description:
    "Solve any word grid online free. Enter square grid letters, find every valid word, and review scores, long words, and missed patterns.",
  alternates: { canonical: "/word-grid-solver" },
  openGraph: {
    title: "Word Grid Solver — Free Online Word Finder",
    description:
      "Enter any square word grid and find all valid answers with scores and pattern review.",
    url: `${BASE_URL}/word-grid-solver/`,
  },
};

export default function Page() {
  return (
    <SolverLandingPage
      eyebrow="Word grid solver"
      title="Word Grid Solver"
      intro="This word grid solver checks any square letter board and returns every valid answer. Use it for Boggle-style puzzles, Daily review, or practice boards after you play."
      primaryIntent="Searchers who want a general word grid solver rather than a board-game-specific explanation."
      useCases={[
        "Solve 4x4, 5x5, or 6x6 word grids.",
        "Find long words and high-scoring answers quickly.",
        "Turn a finished board into a study session.",
      ]}
      steps={[
        "Choose the board size and fill every letter cell.",
        "Use Qu as one tile when the board has a Qu face.",
        "Run the solver and compare word lengths and scores.",
        "Open related word lists to memorize patterns that appear often.",
      ]}
      related={[
        { href: "/solver", label: "Open word grid solver" },
        { href: "/words/common-boggle-words", label: "Common Boggle words" },
        { href: "/words/words-ending-in-ing", label: "ING words" },
        { href: "/play", label: "Play word grid online" },
      ]}
    />
  );
}
