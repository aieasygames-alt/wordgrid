import type { Metadata } from "next";
import SolverLandingPage from "@/components/SolverLandingPage";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Word Finder — Find Words in Any Board",
  description:
    "Use this Boggle word finder to discover valid words in a letter grid, check scores, and learn the word paths you missed.",
  alternates: { canonical: "/boggle-word-finder" },
  openGraph: {
    title: "Boggle Word Finder — Find Words in Any Board",
    description:
      "Find words in any Boggle-style board and review score-friendly patterns after a round.",
    url: `${BASE_URL}/boggle-word-finder/`,
  },
};

export default function Page() {
  return (
    <SolverLandingPage
      eyebrow="Word finder"
      title="Boggle Word Finder"
      intro="The Boggle word finder helps you discover every valid word in a board after you play. It is built for learning: find the words, compare scores, and notice the paths your eyes skipped."
      primaryIntent="Players who want a word finder for Boggle-style boards, especially after finishing a timed game."
      useCases={[
        "Find all words hidden in a Boggle grid.",
        "Compare short anchors with longer extensions.",
        "Learn which words are worth practicing next.",
      ]}
      steps={[
        "Copy the board letters into the solver.",
        "Scan the top-scoring words first.",
        "Filter by length to study 3-, 4-, and 5-letter answers.",
        "Replay a fresh board and look for the same patterns earlier.",
      ]}
      related={[
        { href: "/solver", label: "Live word finder" },
        { href: "/words/3-letter-boggle-words", label: "3 letter words" },
        { href: "/words/5-letter-boggle-words", label: "5 letter words" },
        { href: "/guides/how-to-find-more-words", label: "Find more words" },
      ]}
    />
  );
}
