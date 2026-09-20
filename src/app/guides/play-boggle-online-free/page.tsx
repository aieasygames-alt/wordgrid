import type { Metadata } from "next";
import OnlinePlayGuide from "@/components/OnlinePlayGuide";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Play Boggle Online Free - No Download, No Sign-Up",
  description:
    "Play Boggle-style WordGrid online free with no download or account. Choose Timed, Zen, or Daily play and connect valid words on square boards.",
  alternates: { canonical: `${BASE_URL}/guides/play-boggle-online-free/` },
  keywords: ["play boggle online free", "free boggle online game", "boggle no download", "boggle no sign up"],
  openGraph: {
    title: "Play Boggle Online Free - No Download, No Sign-Up",
    description: "Start a free WordGrid board in your browser and learn the current route and scoring rules.",
    url: `${BASE_URL}/guides/play-boggle-online-free/`,
  },
};

export default function PlayBoggleOnlineFreeGuide() {
  return (
    <OnlinePlayGuide
      eyebrow="Play Boggle online"
      title="Play Boggle online free"
      description="Open a free WordGrid board in your browser. No download or account is required, and you can switch between timed practice, unlimited Zen, and Daily play."
      canonicalPath="/guides/play-boggle-online-free/"
    />
  );
}
