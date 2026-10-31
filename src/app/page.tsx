import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const BASE_URL = "https://wordgrid.games";

export const metadata: Metadata = {
  title: "Play Word Grid Online Free — Instant Boggle-Style Game",
  description:
    "Play a free Boggle-style word grid game instantly. No download or sign-up: choose a three-minute timed board or Zen practice, then review missed words.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Play Word Grid Online Free — WordGrid Game",
    description:
      "A free WordGrid game for timed or Zen practice, shared boards, solver review, and word-pattern learning.",
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
    playMode: ["SinglePlayer", "MultiPlayer"],
    isAccessibleForFree: true,
    description: "A free browser word grid game where players connect adjacent letters to form words.",
    dateModified: modified,
    publisher: { "@type": "Organization", name: "WordGrid", url: BASE_URL },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do you play WordGrid?", acceptedAnswer: { "@type": "Answer", text: "Connect adjacent letters horizontally, vertically, or diagonally to make words. Each tile can be used once per word. Timed rounds use a three-minute clock, while Zen practice has no timer." } },
      { "@type": "Question", name: "Is WordGrid free to play?", acceptedAnswer: { "@type": "Answer", text: "Yes. WordGrid runs in a browser with no download or account required." } },
      { "@type": "Question", name: "What can I do after a round?", acceptedAnswer: { "@type": "Answer", text: "Review missed words, open the solver for the same board, share a challenge link, or play the Daily and Weekly boards." } },
      { "@type": "Question", name: "Can I play WordGrid with friends?", acceptedAnswer: { "@type": "Answer", text: "Yes. Finish a round and share its challenge link so friends can play the same board. The link can include the completed score as a target." } },
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
        <section className="mx-auto mt-16 max-w-4xl rounded-3xl border border-border/70 bg-surface/30 p-6 sm:p-8 text-sm leading-relaxed text-text-muted backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-text-dim">WordGrid Codex & Guide</span>
          </div>

          <h2 className="text-xl font-bold text-text">What WordGrid is</h2>
          <p className="mt-2.5">
            WordGrid is a free adjacent-letter word puzzle designed for browsers. Draw paths through neighboring tiles (horizontally, vertically, and diagonally) to make words, score each valid find, and explore missed patterns after each round.
          </p>

          <h2 className="mt-7 text-xl font-bold text-text">How a round works</h2>
          <ol className="mt-2.5 list-decimal space-y-1.5 pl-5">
            <li>Scan the 4 by 4 letter board for connected word paths.</li>
            <li>Drag across adjacent tiles to submit each word before time expires.</li>
            <li>Review your score, missed words, and the next practice focus after the round.</li>
          </ol>

          <h2 className="mt-7 text-xl font-bold text-text">Play, practice, and review</h2>
          <p className="mt-2.5">
            Use <strong>Daily</strong> for a shared 4 by 4 board that changes each day, <strong>Complete</strong> for an untimed full-dictionary collection challenge, and the <strong>Solver</strong> after a round when you want to review possible words. WordGrid&apos;s learning guides explain scoring, common patterns, and responsible post-game review.
          </p>
          <p className="mt-4 text-xs">
            For background on the classic Boggle format that inspired adjacent-letter word games, see <a className="font-semibold text-primary hover:underline" href="https://instructions.hasbro.com/api/download/C1009_en-us_boggle-classic-game.pdf" rel="noopener noreferrer">Hasbro&apos;s Boggle instructions</a>. This page was last updated on September 8, 2026.
          </p>

          <h2 className="mt-8 text-xl font-bold text-text">Frequently asked questions</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/80 bg-surface/50 p-4">
              <h3 className="font-bold text-text">Is WordGrid free?</h3>
              <p className="mt-1 text-xs text-text-muted">Yes. It is completely free to play in any modern browser and does not require an account or download.</p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-surface/50 p-4">
              <h3 className="font-bold text-text">Can I replay a board?</h3>
              <p className="mt-1 text-xs text-text-muted">Yes. Daily archive and challenge links preserve a board so it can be replayed and reviewed later.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
