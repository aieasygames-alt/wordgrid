import type { Metadata } from "next";
import PlayClient from "./PlayClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Play Word Grid Online Free — Timed Boggle Brain Game",
  description:
    "Play a timed Boggle-style brain game online free. Connect letters in 4x4, 5x5, or 6x6 word grids with no download or sign-up.",
  alternates: { canonical: "/play" },
  keywords: [
    "play boggle online free", "play boggle online", "boggle online free",
    "free boggle online", "play free boggle", "boggle game online",
    "word grid online", "word grid puzzle", "word grid game",
    "boggle timed game", "brain games word grid game",
  ],
  openGraph: {
    title: "Play Word Grid Online Free — Timed Boggle Brain Game",
    description:
      "Play a timed word grid brain game in your browser. No download, no sign-up. Connect letters, find words, and beat the clock.",
  },
};

export default function Page() {
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "WordGrid Online",
    url: `${BASE_URL}/play/`,
    gamePlatform: "Web browser",
    applicationCategory: "Game",
    genre: ["Word game", "Puzzle game"],
    playMode: ["SinglePlayer"],
    isAccessibleForFree: true,
    description:
      "Free browser-based word grid brain game with timed Boggle-style rounds, Zen practice, and 4x4, 5x5, or 6x6 boards.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    dateModified: "2026-07-24",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "WordGrid", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Play Word Grid Online Free" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I play Boggle online for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. WordGrid lets you play a free Boggle-style word grid game in your browser with no download, no sign-up, and no ads.",
        },
      },
      {
        "@type": "Question",
        name: "What board sizes can I play?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WordGrid supports classic 4x4 boards plus 5x5 and 6x6 practice boards. You can also switch between timed and Zen play.",
        },
      },
      {
        "@type": "Question",
        name: "Should I use the solver while playing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The best way to use the solver is after a round, when you want to review missed words and improve for the next board.",
        },
      },
    ],
  };

  const modeListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "WordGrid play modes",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Timed word grid",
        url: `${BASE_URL}/play/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Zen word grid",
        url: `${BASE_URL}/zen/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Daily word grid",
        url: `${BASE_URL}/daily/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Word grid solver",
        url: `${BASE_URL}/solver/`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Boggle timed game",
        url: `${BASE_URL}/boggle-timed-game/`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modeListSchema) }}
      />
      <PlayClient />
    </>
  );
}
