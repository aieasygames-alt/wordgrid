import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Play Word Grid Online Free — WordGrid Game",
  description:
    "Play WordGrid free online. Find words in Boggle-style grids with no download or sign-up, then review your score with Daily and Solver tools.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Play Word Grid Online Free — WordGrid Game",
    description:
      "A Word Grid platform for playing boards, solving puzzles, and learning word patterns.",
    url: BASE_URL,
    images: [
      {
        url: "/share-card-bg.png",
        width: 1200,
        height: 630,
        alt: "WordGrid tools platform",
      },
    ],
  },
};

export default function Home() {
  const modified = "2026-09-08";
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WordGrid",
    url: BASE_URL,
    description:
      "Play, solve, and learn with free Word Grid tools and guides.",
    potentialAction: {
      "@type": "PlayGameAction",
      target: `${BASE_URL}/play`,
    },
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WordGrid",
    url: BASE_URL,
    email: "hello@wordgrid.games",
    description: "A free browser-based word grid game and learning tool.",
  };
  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "WordGrid",
    url: BASE_URL,
    applicationCategory: "Game",
    gamePlatform: "Web browser",
    genre: ["Word game", "Puzzle game"],
    playMode: "SinglePlayer",
    isAccessibleForFree: true,
    description: "A free browser word grid game where players connect adjacent letters to form words.",
    dateModified: modified,
    publisher: { "@type": "Organization", name: "WordGrid", url: BASE_URL },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do you play WordGrid?", acceptedAnswer: { "@type": "Answer", text: "Connect adjacent letters horizontally, vertically, or diagonally to make words. Each tile can be used once per word. Submit words before the timer ends." } },
      { "@type": "Question", name: "Is WordGrid free to play?", acceptedAnswer: { "@type": "Answer", text: "Yes. WordGrid runs in a browser with no download or account required." } },
      { "@type": "Question", name: "What can I do after a round?", acceptedAnswer: { "@type": "Answer", text: "Review missed words, open the solver for the same board, share a challenge link, or play the Daily and Weekly boards." } },
    ],
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-7xl">
        <HomeClient />
        <section className="mx-auto mt-12 max-w-4xl border-t border-border pt-8 text-sm leading-relaxed text-text-muted">
          <h2 className="text-xl font-semibold text-text">What WordGrid is</h2>
          <p className="mt-3">WordGrid is a free adjacent-letter word puzzle for browsers. Draw a path through neighboring tiles to make words, score each valid find, and use the same board afterward to study patterns you missed.</p>
          <h2 className="mt-7 text-xl font-semibold text-text">How a round works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5"><li>Scan the 4 by 4 letter board for connected word paths.</li><li>Drag across adjacent tiles to submit each word before time expires.</li><li>Review your score, missed words, and the next practice focus after the round.</li></ol>
          <h2 className="mt-7 text-xl font-semibold text-text">Play, practice, and review</h2>
          <p className="mt-3">Use Daily for a shared board that changes each day, Weekly for a themed repeatable challenge, and the Solver after a round when you want to review possible words. WordGrid&apos;s learning guides explain scoring, common patterns, and responsible post-game review.</p>
          <p className="mt-5">For background on the classic Boggle format that inspired adjacent-letter word games, see <a className="font-semibold text-primary hover:underline" href="https://instructions.hasbro.com/api/download/C1009_en-us_boggle-classic-game.pdf" rel="noopener noreferrer">Hasbro&apos;s Boggle instructions</a>. This page was last updated on September 8, 2026.</p>
          <h2 className="mt-7 text-xl font-semibold text-text">Frequently asked questions</h2>
          <div className="mt-3 space-y-4"><div><h3 className="font-semibold text-text">Is WordGrid free?</h3><p className="mt-1">Yes. It is free to play in a browser and does not require an account.</p></div><div><h3 className="font-semibold text-text">Can I replay a board?</h3><p className="mt-1">Yes. Daily archive and challenge links preserve a board so it can be replayed and reviewed later.</p></div></div>
        </section>
      </div>
    </main>
  );
}
