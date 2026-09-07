import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Play Word Grid Online Free — WordGrid Game",
  description:
    "Play WordGrid free online. Find words in Boggle-style grids with no download or sign-up, then review your score with Daily and Solver tools.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Play Word Grid Online Free — WordGrid Game",
    description:
      "A Word Grid platform for playing boards, solving puzzles, and learning word patterns.",
    url: BASE_URL,
    images: [
      {
        url: "/share-card-bg.png",
        width: 1200,
        height: 630,
        alt: "WordGrid tools platform",
      },
    ],
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WordGrid",
    url: BASE_URL,
    description:
      "Play, solve, and learn with free Word Grid tools and guides.",
    potentialAction: {
      "@type": "PlayGameAction",
      target: `${BASE_URL}/play`,
    },
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="mx-auto max-w-7xl">
        <HomeClient />
      </div>
    </main>
  );
}
