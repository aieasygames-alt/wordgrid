import type { Metadata } from "next";
import PlayClient from "./PlayClient";

export const metadata: Metadata = {
  title: "Play Boggle Online Free — Word Grid Puzzle Game",
  description:
    "Play free Boggle online right now. No download, no sign-up. Connect letters in a 4×4 grid to find words in this free online Boggle word game. New daily challenge every day.",
  alternates: { canonical: "/play" },
  keywords: [
    "play boggle online free", "play boggle online", "boggle online free",
    "free boggle online", "play free boggle", "boggle game online",
    "word grid puzzle", "word grid game",
  ],
  openGraph: {
    title: "Play Boggle Online Free — Word Grid Puzzle",
    description:
      "Play free Boggle online right in your browser. No download, no sign-up. Connect letters, find words, beat the clock.",
  },
};

export default function Page() {
  return <PlayClient />;
}
