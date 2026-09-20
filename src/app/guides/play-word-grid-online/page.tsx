import type { Metadata } from "next";
import OnlinePlayGuide from "@/components/OnlinePlayGuide";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Play Word Grid Online Free - Start Instantly",
  description:
    "Play a word grid online free in your browser. Start a 4x4, 5x5, or 6x6 board with Timed, Zen, or Daily WordGrid play.",
  alternates: { canonical: `${BASE_URL}/guides/play-word-grid-online/` },
  keywords: ["word grid online", "play word grid online", "word grid online free", "word grid game online"],
  openGraph: {
    title: "Play Word Grid Online Free - Start Instantly",
    description: "A free browser word grid with current modes, board sizes, rules, and scoring.",
    url: `${BASE_URL}/guides/play-word-grid-online/`,
  },
};

export default function PlayWordGridOnlineGuide() {
  return (
    <OnlinePlayGuide
      eyebrow="Play word grid online"
      title="Play word grid online free"
      description="WordGrid is a browser-based word route puzzle. Connect adjacent letters, choose the board size and mode you want, then use review tools to improve your next board."
      canonicalPath="/guides/play-word-grid-online/"
    />
  );
}
