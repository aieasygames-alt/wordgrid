import type { Metadata } from "next";
import OnlinePlayGuide from "@/components/OnlinePlayGuide";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Online Free Game - Play Now, No Download",
  description:
    "Play a free Boggle-style word grid in your browser. No download or sign-up. Choose Timed, Zen, or Daily play on 4x4, 5x5, and 6x6 boards.",
  alternates: { canonical: `${BASE_URL}/guides/boggle-online-free/` },
  keywords: ["boggle online free", "free boggle online", "boggle online no download", "play boggle online free"],
  openGraph: {
    title: "Boggle Online Free Game - Play Now, No Download",
    description: "Free browser-based Boggle-style play with Timed, Zen, and Daily modes.",
    url: `${BASE_URL}/guides/boggle-online-free/`,
  },
};

export default function BoggleOnlineFreeGuide() {
  return (
    <OnlinePlayGuide
      eyebrow="Free online Boggle"
      title="Boggle online free game"
      description="Play WordGrid in your browser with no download or sign-up. Start a fresh practice board, slow down in Zen, or take on today's shared Daily board."
      canonicalPath="/guides/boggle-online-free/"
    />
  );
}
