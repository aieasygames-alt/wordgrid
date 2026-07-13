import type { Metadata } from "next";
import PlayClient from "./PlayClient";

export const metadata: Metadata = {
  title: "Play Word Grid Online Free — Instant Boggle-Style Game",
  description:
    "Play word grid online free instantly. No download, no sign-up. Connect letters in 4x4, 5x5, or 6x6 Boggle-style grids, with timed or Zen mode.",
  alternates: { canonical: "/play" },
  keywords: [
    "play boggle online free", "play boggle online", "boggle online free",
    "free boggle online", "play free boggle", "boggle game online",
    "word grid online", "word grid puzzle", "word grid game",
  ],
  openGraph: {
    title: "Play Word Grid Online Free — Instant Boggle-Style Game",
    description:
      "Play word grid online free in your browser. No download, no sign-up. Connect letters, find words, and beat the clock across multiple board sizes or practice in Zen mode.",
  },
};

export default function Page() {
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "WordGrid Online",
    url: "https://wordgrid.games/play/",
    gamePlatform: "Web browser",
    applicationCategory: "Game",
    genre: ["Word game", "Puzzle game"],
    playMode: ["SinglePlayer"],
    isAccessibleForFree: true,
    description:
      "Free browser-based word grid game with timed rounds, Zen practice, and 4x4, 5x5, or 6x6 boards.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
      />
      <PlayClient />
    </>
  );
}
