import type { Metadata } from "next";
import StatsClient from "./StatsClient";

export const metadata: Metadata = {
  title: "WordGrid Stats — Your Local Progress",
  description:
    "See your WordGrid progress on this device: best scores, combo streaks, recent games, and daily challenge history.",
  alternates: { canonical: "/stats" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <StatsClient />;
}
