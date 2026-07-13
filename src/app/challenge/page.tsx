import type { Metadata } from "next";
import ChallengeClient from "./ChallengeClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Challenge — Share and Beat the Same Grid",
  description:
    "Open a shared WordGrid board, compare target scores, and jump into the same challenge or solver in one click.",
  alternates: { canonical: "/challenge" },
  openGraph: {
    title: "Challenge — WordGrid",
    description:
      "Open the shared board, beat the score, and review it with the solver after the run.",
    url: `${BASE_URL}/challenge`,
  },
};

export default function Page() {
  return <ChallengeClient />;
}
