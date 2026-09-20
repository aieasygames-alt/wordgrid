import type { Metadata } from "next";
import OnlinePlayGuide from "@/components/OnlinePlayGuide";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Boggle Game Online - Free WordGrid Play in Your Browser",
  description:
    "Play a free Boggle-style word grid online. Use Timed or Zen practice, choose 4x4, 5x5, or 6x6 boards, and review the Daily board.",
  alternates: { canonical: `${BASE_URL}/guides/boggle-game-online/` },
  keywords: ["boggle game online", "play boggle online", "online boggle game", "word grid game online"],
  openGraph: {
    title: "Boggle Game Online - Free WordGrid Play in Your Browser",
    description: "Play a Boggle-style word grid online with current WordGrid modes and rules.",
    url: `${BASE_URL}/guides/boggle-game-online/`,
  },
};

export default function BoggleGameOnlineGuide() {
  return (
    <OnlinePlayGuide
      eyebrow="Online word grid game"
      title="Boggle game online"
      description="WordGrid brings Boggle-style route finding to your browser. Choose the board size and mode that fit your practice, then review missed routes after the board."
      canonicalPath="/guides/boggle-game-online/"
    />
  );
}
