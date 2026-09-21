import type { Metadata } from "next";
import WeeklyClient from "./WeeklyClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Weekly Word Grid Challenge - Shared 4x4 Board",
  description:
    "Play this week's shared 4x4 WordGrid board with a three-minute timer, then review missed patterns and share the same challenge.",
  alternates: { canonical: "/weekly" },
  openGraph: {
    title: "Weekly Word Grid Challenge - Shared 4x4 Board",
    description:
      "A fresh shared 4x4 WordGrid board each week, with a three-minute timed run and post-game review.",
    url: `${BASE_URL}/weekly`,
  },
};

export default function WeeklyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoGame",
        name: "WordGrid Weekly Challenge",
        url: `${BASE_URL}/weekly`,
        description:
          "A free weekly WordGrid challenge with a shared 4x4 board and a three-minute timed run.",
        applicationCategory: "Game",
        operatingSystem: "Web browser",
        isAccessibleForFree: true,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does everyone get the same weekly WordGrid board?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The weekly challenge uses one shared 4x4 board for the entire week.",
            },
          },
          {
            "@type": "Question",
            name: "How long is the weekly WordGrid challenge?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Each weekly challenge run uses a three-minute timer.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WeeklyClient />
    </>
  );
}
