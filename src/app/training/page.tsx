import type { Metadata } from "next";
import TrainingClient from "./TrainingClient";

export const metadata: Metadata = {
  title: "Word Grid Pattern Sprint - 30 Second Practice",
  description: "Practice Qu paths, prefixes, suffixes, long words, and quick scans with focused 30-second WordGrid training boards.",
  alternates: { canonical: "/training" },
};

export default function TrainingPage() {
  return <TrainingClient />;
}
