import type { Metadata } from "next";
import PlayClient from "./PlayClient";

export const metadata: Metadata = {
  title: "Play Word Grid Online Free — Boggle-Style Puzzle Game",
  description:
    "Play word grid online free right now. No download, no sign-up. Connect letters in a 4×4 grid to find words in this free Boggle-style puzzle game. New daily challenge every day.",
  alternates: { canonical: "/play" },
  keywords: [
    "play boggle online free", "play boggle online", "boggle online free",
    "free boggle online", "play free boggle", "boggle game online",
    "word grid online", "word grid puzzle", "word grid game",
  ],
  openGraph: {
    title: "Play Word Grid Online Free — Boggle-Style Puzzle Game",
    description:
      "Play word grid online free in your browser. No download, no sign-up. Connect letters, find words, and beat the clock.",
  },
};

export default function Page() {
  return <PlayClient />;
}
