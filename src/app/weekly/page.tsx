import type { Metadata } from "next";
import WeeklyClient from "./WeeklyClient";

export const metadata: Metadata = {
  title: "Weekly Word Grid Challenge — WordGrid",
  description: "Play this week's free themed WordGrid board, then review missed patterns and challenge a friend.",
  alternates: { canonical: "/weekly" },
};

export default function WeeklyPage() {
  return <WeeklyClient />;
}
