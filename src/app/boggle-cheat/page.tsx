import type { Metadata } from "next";
import SolverLandingPage from "@/components/SolverLandingPage";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Cheat Sheet - Solver for After-Game Review",
  description:
    "Use this Boggle cheat sheet after a round to review valid words, missed high-score routes, Qu words, and common endings.",
  alternates: { canonical: `${BASE_URL}/boggle-cheat/` },
  openGraph: {
    title: "Boggle Cheat Sheet - Solver for After-Game Review",
    description:
      "Review a finished Boggle board with valid words, score values, and missed patterns.",
    url: `${BASE_URL}/boggle-cheat/`,
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WordGrid Boggle Review Tool",
    url: `${BASE_URL}/boggle-cheat/`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SolverLandingPage
        eyebrow="After-game review"
        title="Boggle Cheat Sheet"
        intro="This Boggle cheat sheet is designed for review after a round. Use the solver to inspect valid results, then study the score gaps, Qu routes, and suffix patterns you missed."
        primaryIntent="Searchers using cheat-style language who need a fair, useful after-game review workflow."
        useCases={[
          "Check a finished board without guessing manually.",
          "Learn high-value words and common endings.",
          "Build a repeatable study loop for future games.",
        ]}
        steps={[
          "Finish your round before opening the answer list.",
          "Enter the board into the solver and sort by score.",
          "Write down three missed patterns, not every missed word.",
          "Play another board and deliberately scan for those patterns.",
        ]}
        related={[
          { href: "/solver", label: "Boggle answer checker" },
          { href: "/words/words-with-qu", label: "Qu words" },
          { href: "/words/high-scoring-boggle-words", label: "High scoring words" },
          { href: "/guides/boggle-tips-tricks", label: "Tips and tricks" },
        ]}
        supportedBoards="4x4, 5x5, and 6x6 square boards"
      />
    </>
  );
}
