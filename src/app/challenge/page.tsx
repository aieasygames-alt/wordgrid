import type { Metadata } from "next";
import ChallengeClient from "./ChallengeClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "WordGrid Challenge: Share and Beat the Same Grid",
  description:
    "Open a shared WordGrid board, compare target scores, challenge friends, and review the same grid with the Word Grid Solver after play.",
  alternates: { canonical: "/challenge" },
  openGraph: {
    title: "WordGrid Challenge: Share and Beat the Same Grid",
    description:
      "Open the shared board, beat the score, and review it with the solver after the run.",
    url: `${BASE_URL}/challenge`,
  },
};

export default function Page() {
  return <ChallengeClient />;
}
