import type { Metadata } from "next";
import Link from "next/link";
import ChallengeClient from "./ChallengeClient";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Share a WordGrid Board - Play the Same Grid",
  description:
    "Share a WordGrid board with friends, play the same grid on any device, compare a shared target when included, and review missed words after the round.",
  alternates: { canonical: "/challenge" },
  openGraph: {
    title: "Share a WordGrid Board - Play the Same Grid",
    description:
      "Open a shared board, play the same grid, and review it with the solver after the run.",
    url: `${BASE_URL}/challenge`,
  },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "WordGrid Shared Board Challenge",
    url: `${BASE_URL}/challenge`,
    description:
      "A free browser word-grid challenge where players can open the same shared board and review it with a solver.",
    applicationCategory: "Game",
    operatingSystem: "Web browser",
    isAccessibleForFree: true,
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-7xl">
        <GuideActionBar
          primary={{ href: "/play", label: "Play a fresh board", detail: "Start a new WordGrid round." }}
          secondary={{ href: "/daily", label: "Use today&apos;s board", detail: "Everyone gets the same Daily grid." }}
          tertiary={{ href: "/solver", label: "Review a board", detail: "Find missed words after a challenge." }}
          quaternary={{ href: "/stats", label: "Check your stats", detail: "See local scores and streaks." }}
        />
        <ChallengeClient />
      </div>
    </main>
  );
}
