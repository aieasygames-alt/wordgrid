import type { Metadata } from "next";
import DailyClient from "./DailyClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Daily Word Grid Puzzle — Today's Free Word Guessing Game",
  description:
    "Play today's free daily word guessing game. Connect letters in one shared 4x4 word grid puzzle with a 3-minute timer and streak tracking.",
  alternates: { canonical: "/daily" },
  keywords: [
    "daily word grid",
    "daily word puzzle",
    "daily word guessing game",
    "daily boggle",
    "daily boggle puzzle",
    "word grid daily",
    "free daily word game",
  ],
  openGraph: {
    title: "Daily Word Grid Puzzle — Today's Free Word Guessing Game",
    description:
      "Today's daily word guessing game. Same word grid for everyone, 3-minute timer, streak tracking, and a fresh board every day.",
  },
};

export default function Page() {
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "WordGrid Daily",
    url: `${BASE_URL}/daily/`,
    gamePlatform: "Web browser",
    applicationCategory: "Game",
    genre: ["Word game", "Puzzle game"],
    playMode: ["SinglePlayer"],
    isAccessibleForFree: true,
    description:
      "A free daily word guessing game with one shared Boggle-style 4x4 board, a 3-minute timer, streak tracking, and a new word grid puzzle every day.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    dateModified: "2026-08-22",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the WordGrid Daily puzzle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The WordGrid Daily puzzle is one shared Boggle-style 4x4 word grid each day. Everyone gets the same board and the same 3-minute timer, so scores are easy to compare.",
        },
      },
      {
        "@type": "Question",
        name: "Is the Daily word grid free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Daily word grid is free to play in your browser with no download or sign-up.",
        },
      },
      {
        "@type": "Question",
        name: "Can I review the Daily board after playing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. After you play, use the solver to review missed words, compare scores, and learn patterns for the next daily board.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DailyClient />
    </>
  );
}
