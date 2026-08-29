import type { Metadata } from "next";
import SolverLandingPage from "@/components/SolverLandingPage";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Solver Online — Find All Words in a Grid",
  description:
    "Use the free Boggle solver online to find all valid words in any 4x4 word grid, compare scores, and review missed paths after play.",
  alternates: { canonical: "/boggle-solver" },
  openGraph: {
    title: "Boggle Solver Online — Find All Words in a Grid",
    description:
      "Solve any Boggle-style grid after a round and review every valid word by score and length.",
    url: `${BASE_URL}/boggle-solver/`,
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Boggle Solver Online",
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
        intro="Use this free Boggle solver after a round to find every valid word in a 4x4 grid. Paste the letters, solve the board, and study the highest-value paths you missed."
        primaryIntent="Players who searched for a Boggle solver and want a direct way to check all possible words."
        useCases={[
          "Review a finished 4x4 Boggle-style board.",
          "Sort answers by score, length, and pattern.",
          "Study missed words before the next timed game.",
        ]}
        steps={[
          "Play a board first so the review stays useful.",
          "Open the live solver and enter the letters row by row.",
          "Check high-scoring words before reading the full answer list.",
          "Practice the missed prefixes, suffixes, and Qu paths on a new board.",
        ]}
        related={[
          { href: "/solver", label: "Live solver" },
          { href: "/guides/boggle-solver", label: "Solver guide" },
          { href: "/guides/boggle-rules-beginners", label: "Boggle rules" },
          { href: "/words/high-scoring-boggle-words", label: "High scoring words" },
        ]}
      />
    </>
  );
}
