import type { Metadata } from "next";
import DailyClient from "./DailyClient";

export const metadata: Metadata = {
  title: "Daily Word Grid Puzzle - Play Today's Free 4x4 Board",
  description:
    "Play today's free WordGrid Daily puzzle. Everyone gets the same Boggle-style 4x4 board, a 3-minute timer, and a fresh challenge every day.",
  alternates: { canonical: "/daily" },
  openGraph: {
    title: "Daily Word Grid Puzzle - Play Today's Free 4x4 Board",
    description:
      "Today's daily word grid puzzle. Same grid for everyone. New puzzle every day!",
  },
};

export default function Page() {
  return <DailyClient />;
}
