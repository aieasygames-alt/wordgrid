import type { Metadata } from "next";
import Link from "next/link";
import ChallengeClient from "./ChallengeClient";
import GuideActionBar from "@/components/GuideActionBar";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "WordGrid Challenge — Share and Beat the Same Grid",
  description:
    "Open a shared WordGrid board, compare scores, challenge friends, and review the grid with the solver after play.",
  alternates: { canonical: "/challenge" },
  openGraph: {
    title: "WordGrid Challenge — Share and Beat the Same Grid",
    description:
      "Open the shared board, beat the score, and review it with the solver after the run.",
    url: `${BASE_URL}/challenge`,
  },
};

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
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
