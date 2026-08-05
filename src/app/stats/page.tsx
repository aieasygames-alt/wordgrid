import type { Metadata } from "next";
import StatsClient from "./StatsClient";

export const metadata: Metadata = {
  title: "WordGrid Stats: Local Scores, Streaks & History",
  description:
    "See local WordGrid stats on this device: best scores, combo streaks, recent games, Daily board history, and progress over time.",
  alternates: { canonical: "/stats" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <StatsClient />;
}
