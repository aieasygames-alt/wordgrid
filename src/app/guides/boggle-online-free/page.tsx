import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";

export const metadata: Metadata = {
  title: "Boggle Online Free — Play Instantly, No Download",
  description:
    "Play Boggle online free in your browser. No download, no sign-up, no ads. Classic Boggle plus larger practice grids with 3-minute rounds. Instant play on desktop and mobile.",
  alternates: { canonical: "/guides/boggle-online-free" },
  keywords: [
    "boggle online free", "boggle online free game", "free boggle online",
    "boggle online no download", "play boggle online for free",
    "boggle online free no sign up", "boggle free online game",
  ],
  openGraph: {
    title: "Boggle Online Free — Play Instantly, No Download Required",
    description:
      "Classic Boggle gameplay, free in your browser. Standard and larger practice grids, 3-minute timer. No download, no sign-up, no ads.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Online Free — Play Instantly, No Download",
  description:
    "How to play Boggle online for free with no download or sign-up. Classic word puzzle in your browser.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-28",
  dateModified: "2026-06-28",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-online-free/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I play Boggle online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordGrid offers free online Boggle gameplay with no download, no sign-up, and no ads. Just visit wordgrid.games in any browser and start playing instantly. The game runs entirely in your browser on desktop and mobile.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free Boggle game online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordGrid is a completely free online Boggle game. Unlimited practice games plus a daily challenge — all free with no ads, no paywalls, and no premium tiers.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to download anything to play Boggle online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No download required. WordGrid runs directly in your web browser — no app installation, no software download, no account creation. Just open the site and play.",
      },
    },
    {
      "@type": "Question",
      name: "Can I play Boggle online without signing up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordGrid requires no sign-up, no email, no password, and no account. You can start playing immediately without creating any kind of account.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play Boggle online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To play Boggle online, visit wordgrid.games and click Play. A square grid of letters appears. Click and drag across adjacent letters (horizontally, vertically, or diagonally) to spell words. Each word must be 3+ letters, and you can't reuse the same tile. Find as many words as possible in 3 minutes. The classic board is 4×4, and larger practice boards are also available.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Boggle Online Free" },
  ],
};

export default function BoggleOnlineFreeGuide() {
  return (
    <main className="min-h-screen px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <GuideDesktopShell>
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">Word Grid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Boggle Online Free — Play Instantly, No Download
          </h1>
          <p className="text-text-muted">4 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              If you searched <strong>Boggle online free</strong>, this is the
              direct answer: you can play right now, in your browser, with no
              download, no sign-up, no credit card, and no ads.
            </p>
            <p className="leading-relaxed mt-3">
              <Link href="/play" className="text-primary hover:underline">
                Play →
              </Link>{" "}
              or switch to{" "}
              <Link href="/guides/boggle-game-online" className="text-primary hover:underline">
                the game-online guide
              </Link>
              .
            </p>
            <p className="leading-relaxed mt-3">
              If you want the rules refresher first, read{" "}
              <Link href="/guides/boggle-rules-beginners" className="text-primary hover:underline">
                Boggle Rules for Beginners
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Is Boggle Online Free?
            </h2>
            <p className="leading-relaxed">
              Free online Boggle is a browser-based version of the classic 1972
              word game. You get a square grid of letters and 3 minutes to find
              as many words as possible by connecting adjacent letters —
              horizontally, vertically, or diagonally. The classic board is
              4×4, and larger practice boards are also available.
            </p>
            <p className="leading-relaxed mt-3">
              The rules are identical to the original board game. The only
              difference is that instead of shaking physical dice, the grid is
              generated algorithmically — and you can play unlimited games for
              free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How to Play Boggle Online Free
            </h2>
            <ol className="space-y-3 ml-4 list-decimal">
              <li>
                <strong>Open the game.</strong> Go to{" "}
                <Link href="/play" className="text-primary hover:underline">
                  wordgrid.games/play
                </Link>{" "}
                in any browser. No app store, no installation.
              </li>
              <li>
                <strong>Click Start.</strong> The 3-minute timer begins
                immediately and a fresh grid appears.
              </li>
              <li>
                <strong>Connect letters to spell words.</strong> Click or tap a
                letter, then drag to adjacent letters in any of the 8 directions.
              </li>
              <li>
                <strong>Release to submit.</strong> If the word is valid (3+
                letters, dictionary word, no repeated tiles), you earn points.
              </li>
              <li>
                <strong>Find as many as possible before time runs out.</strong>{" "}
                Longer words score much more.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Why Play Boggle Online Free Here?
            </h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                <strong>100% free.</strong> No ads, no paywalls, no premium
                tiers. Unlimited games at no cost.
              </li>
              <li>
                <strong>No download.</strong> Runs in any browser on desktop and
                mobile. No app installation.
              </li>
              <li>
                <strong>No sign-up.</strong> No account, no email, no password.
                Just open and play.
              </li>
              <li>
                <strong>Daily board.</strong> Same grid for everyone each
                day. Compare scores with friends.
              </li>
              <li>
                <strong>Practice mode.</strong> Unlimited random grids for solo
                play.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Best Next Step
            </h2>
            <p className="leading-relaxed">
              If you want to start a game immediately, jump to{" "}
              <Link href="/play" className="text-primary hover:underline">
                /play
              </Link>
              . If you want a page that compares the browser game with the
              original board game, read{" "}
              <Link href="/guides/boggle-game-online" className="text-primary hover:underline">
                Boggle Game Online
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Boggle Online Free Scoring
            </h2>
            <p className="leading-relaxed mb-3">
              Points are awarded based on word length:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Length</th>
                  <th className="text-left py-2 text-text-muted">Points</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["3 letters", "1"],
                  ["4 letters", "2"],
                  ["5 letters", "4"],
                  ["6 letters", "6"],
                  ["7 letters", "8"],
                  ["8+ letters", "11+"],
                ].map(([len, pts]) => (
                  <tr key={len} className="border-b border-surface">
                    <td className="py-2">{len}</td>
                    <td className="py-2 text-primary font-semibold">{pts} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              Notice the jump at 5 letters — that's where the real points are.
              Experienced players focus on finding 5+ letter words rather than
              chasing every short word.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Game Modes
            </h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                <strong>Practice Mode:</strong> Unlimited random grids. Perfect
                for warming up.
              </li>
              <li>
                <strong>Daily board:</strong> One grid per day for everyone.
                Compare scores with friends.
              </li>
              <li>
                <strong>Timed Rounds:</strong> Classic 3-minute clock plus a
                5-minute option.
              </li>
              <li>
                <strong>Zen Mode:</strong> No timer. Search for words at your own
                pace.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-surface/50 rounded-xl p-4" open>
                <summary className="font-semibold cursor-pointer">
                  Can I play Boggle online for free?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes. WordGrid is completely free — no ads, no download, no
                  sign-up. Just visit wordgrid.games and start playing.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Is there a free Boggle game online?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes. WordGrid is a free online Boggle game with unlimited
                  practice games and a daily challenge.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Do I need to download anything?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  No. WordGrid runs entirely in your browser on desktop and
                  mobile. No app installation required.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Can I play without signing up?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes. No account, no email, no password. You can start playing
                  immediately.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Is there a time limit?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Standard games are 3 minutes. Practice mode also offers
                  5-minute and untimed Zen modes.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Play Boggle Online Free Now
            </h2>
            <p className="text-text mb-4">
              No sign-up. No download. Classic Boggle gameplay, 3-minute timer,
              unlimited free games.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play
              </Link>
              <Link
                href="/daily"
                className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Daily
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link
                href="/guides/play-word-grid-online/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Play →
                </div>
                <div className="text-sm text-text-muted">
                  Better for users searching the browser-game phrasing.
                </div>
              </Link>
              <Link
                href="/guides/boggle-rules-beginners/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Rules of Boggle: A Complete Beginner's Guide →
                </div>
                <div className="text-sm text-text-muted">
                  Every rule explained with visual examples.
                </div>
              </Link>
              <Link
                href="/guides/word-grid-strategies/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Word Grid Strategies: Score Higher Every Game →
                </div>
                <div className="text-sm text-text-muted">
                  Advanced scoring strategy and word-finding techniques.
                </div>
              </Link>
              <Link
                href="/play"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Play →
                </div>
                <div className="text-sm text-text-muted">
                  Jump straight into a game.
                </div>
              </Link>
              <Link
                href="/guides/"
                className="block text-sm text-text-dim hover:text-text"
              >
                Browse all guides →
              </Link>
            </div>
          </div>
        </div>
      </GuideDesktopShell>
    </main>
  );
}
