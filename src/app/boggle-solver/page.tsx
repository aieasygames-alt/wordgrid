import type { Metadata } from "next";
import SolverLandingPage from "@/components/SolverLandingPage";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Solver Online - Review WordGrid Boards",
  description:
    "Use the free Boggle solver online to review valid words in 4x4, 5x5, or 6x6 WordGrid boards, compare scores, and study missed routes after play.",
  alternates: { canonical: `${BASE_URL}/boggle-solver/` },
  openGraph: {
    title: "Boggle Solver Online - Review WordGrid Boards",
    description:
      "Review a finished 4x4, 5x5, or 6x6 Boggle-style grid by score and length.",
    url: `${BASE_URL}/boggle-solver/`,
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WordGrid Boggle Solver",
    url: `${BASE_URL}/boggle-solver/`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SolverLandingPage
        eyebrow="Boggle solver"
        title="Boggle Solver Online"
        intro="Use this free Boggle solver after a round to review valid words in a 4x4, 5x5, or 6x6 grid. Enter the letters, solve the board, and study the highest-value paths you missed."
        primaryIntent="Players who searched for a Boggle solver and want a direct way to check all possible words."
        useCases={[
          "Review a finished 4x4, 5x5, or 6x6 Boggle-style board.",
          "Sort answers by score and length.",
          "Study missed words before the next timed game.",
        ]}
        steps={[
          "Play a board first so the review stays useful.",
          "Open the live solver and enter the letters row by row.",
          "Check high-scoring words before reading the full result list.",
          "Practice the missed prefixes, suffixes, and Qu paths on a new board.",
        ]}
        related={[
          { href: "/solver", label: "Live solver" },
          { href: "/guides/boggle-solver", label: "Solver guide" },
          { href: "/guides/boggle-rules-beginners", label: "Boggle rules" },
          { href: "/words/high-scoring-boggle-words", label: "High scoring words" },
        ]}
        supportedBoards="4x4, 5x5, and 6x6 square boards"
      />
    </>
  );
}
