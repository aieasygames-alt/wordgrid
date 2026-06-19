import type { Metadata } from "next";
import PlayClient from "./PlayClient";

export const metadata: Metadata = {
  title: "Play Word Grid — Free Online Word Puzzle",
  description:
    "Play WordGrid now — a free online word search puzzle. Connect adjacent letters in a 4×4 grid to find words. No sign-up, play instantly in your browser.",
  alternates: { canonical: "/play" },
  openGraph: {
    title: "Play Word Grid — Free Online Word Puzzle",
    description:
      "Connect adjacent letters in a 4×4 grid to find hidden words. Play free, no sign-up.",
  },
};

export default function Page() {
  return <PlayClient />;
}
