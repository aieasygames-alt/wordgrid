import type { Metadata } from "next";
import DailyClient from "./DailyClient";

export const metadata: Metadata = {
  title: "Daily Word Challenge — Today's Word Grid Puzzle",
  description:
    "Play today's WordGrid Daily Challenge. Everyone gets the same 4×4 letter grid. Find as many words as you can in 3 minutes. New puzzle every day!",
  alternates: { canonical: "/daily" },
  openGraph: {
    title: "Daily Word Challenge — WordGrid",
    description:
      "Today's daily word grid puzzle. Same grid for everyone. New challenge every day!",
  },
};

export default function Page() {
  return <DailyClient />;
}
