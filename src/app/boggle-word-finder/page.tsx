import type { Metadata } from "next";
import SolverLandingPage from "@/components/SolverLandingPage";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Word Finder - Review Valid Board Routes",
  description:
    "Use this Boggle word finder to review valid words in a square letter grid, compare current scores, and learn the routes you missed.",
  alternates: { canonical: `${BASE_URL}/boggle-word-finder/` },
  openGraph: {
    title: "Boggle Word Finder - Review Valid Board Routes",
    description:
      "Review valid words in a Boggle-style square board after a round.",
    url: `${BASE_URL}/boggle-word-finder/`,
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WordGrid Word Finder",
    url: `${BASE_URL}/boggle-word-finder/`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SolverLandingPage
        eyebrow="Word finder"
        title="Boggle Word Finder"
        intro="The Boggle word finder reviews valid words in a board after you play. Compare scores and notice the adjacent paths your eyes skipped."
        primaryIntent="Players who want a word finder for Boggle-style boards after finishing a round."
        useCases={[
          "Review valid words in a Boggle grid.",
          "Compare short anchors with longer extensions.",
          "Learn which routes are worth practicing next.",
        ]}
        steps={[
          "Copy the board letters into the solver.",
          "Scan the top-scoring words first.",
          "Filter by length to study 3-, 4-, 5-, and 6-letter answers.",
          "Replay a fresh board and look for the same patterns earlier.",
        ]}
        related={[
          { href: "/solver", label: "Live word finder" },
          { href: "/words/3-letter-boggle-words", label: "3 letter words" },
          { href: "/words/5-letter-boggle-words", label: "5 letter words" },
          { href: "/guides/how-to-find-more-words", label: "Find more words" },
        ]}
        supportedBoards="4x4, 5x5, and 6x6 square boards"
      />
    </>
  );
}
