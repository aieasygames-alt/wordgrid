import type { Metadata } from "next";
import DailyClient from "./DailyClient";

export const metadata: Metadata = {
  title: "Daily — Today's Word Grid Puzzle",
  description:
    "Play today's WordGrid Daily board. Everyone gets the same 4×4 letter grid. Find as many words as you can in 3 minutes. New puzzle every day!",
  alternates: { canonical: "/daily" },
  openGraph: {
    title: "Daily — WordGrid",
    description:
      "Today's daily word grid puzzle. Same grid for everyone. New puzzle every day!",
  },
};

export default function Page() {
  return <DailyClient />;
}
