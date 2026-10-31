import type { Metadata } from "next";
import TrainingClient from "./TrainingClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Word Grid Pattern Sprint - 30 Second Practice",
  description: "Practice Qu paths, prefixes, suffixes, long words, and quick scans with focused 30-second WordGrid training boards.",
  alternates: { canonical: `${BASE_URL}/training/` },
};

export default function TrainingPage() {
  return <TrainingClient />;
}
