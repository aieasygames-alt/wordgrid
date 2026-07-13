import type { Metadata } from "next";
import Link from "next/link";
import { GuideDesktopShell } from "@/components/GuideDesktopShell";

export const metadata: Metadata = {
  title: "Boggle Game Online — Free Play in Your Browser",
  description:
    "Play the Boggle game online for free. No download, no sign-up. Classic Boggle plus larger practice grids in your browser. 3-minute rounds, same rules as the original board game.",
  alternates: { canonical: "/guides/boggle-game-online" },
  keywords: [
    "boggle game online", "boggle online game", "boggle game online free",
    "play boggle game online", "boggle game no download", "boggle game free online",
    "boggle game browser", "online boggle game",
  ],
  openGraph: {
    title: "Boggle Game Online — Free Play in Your Browser",
    description:
      "Classic Boggle gameplay in your browser. Free online word puzzle with standard and larger practice grids, 3-minute timer. No download, no sign-up required.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Game Online — Play Free, No Download",
  description:
    "How to play the Boggle game online for free with no download or sign-up. Classic word puzzle gameplay in your browser.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-28",
  dateModified: "2026-06-28",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-game-online/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I play the Boggle game online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordGrid offers free online Boggle gameplay with no download or sign-up required. The game runs entirely in your browser on desktop and mobile with the classic board plus larger practice grids and a 3-minute timer.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free online Boggle game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordGrid is completely free — no ads, no paywalls, no premium tiers. You get unlimited practice games plus a daily challenge, all at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to download anything to play Boggle online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No download required. WordGrid runs directly in your web browser on desktop and mobile. No app installation, no software download, no account needed.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules of online Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Online Boggle uses the same rules as the classic game: connect adjacent letters (horizontally, vertically, or diagonally) to spell words, minimum 3 letters, no repeated tiles, valid English words only. You have 3 minutes to find as many words as possible.",
      },
    },
    {
      "@type": "Question",
      name: "How does online Boggle compare to the board game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The gameplay is identical on the classic board — same rules, same scoring. The difference is that online Boggle generates grids algorithmically instead of using physical dice, offers unlimited games, supports larger practice boards, and includes a Daily board where everyone gets the same grid.",
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
    { "@type": "ListItem", position: 3, name: "Boggle Game Online" },
  ],
};

export default function BoggleGameOnlineGuide() {
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
            Boggle Game Online — Play Free, No Download
          </h1>
          <p className="text-text-muted">5 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              The <strong>Boggle game online</strong> brings the classic 1972
              word puzzle to your browser. If you want the browser version,
              this page explains what changes and what stays the same. Same
              classic rules. Same 3-minute timer. Same word-finding challenge,
              with larger practice boards available too.
            </p>
            <p className="leading-relaxed mt-3">
              <Link href="/play" className="text-primary hover:underline">
                Play →
              </Link>
            </p>
            <p className="leading-relaxed mt-3">
              If you want the rules first, open{" "}
              <Link href="/guides/boggle-rules-beginners" className="text-primary hover:underline">
                Boggle Rules for Beginners
              </Link>{" "}
              or{" "}
              <Link href="/guides/boggle-online-free" className="text-primary hover:underline">
                Boggle Online Free
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Is the Boggle Game Online?
            </h2>
            <p className="leading-relaxed">
              Online Boggle is a browser-based version of the classic word game.
              You get a square grid of letters and 3 minutes on the clock. Your
              goal: find as many English words as possible by connecting
              adjacent letters horizontally, vertically, or diagonally. The
              classic board is 4×4, and larger practice boards are also available.
            </p>
            <p className="leading-relaxed mt-3">
              The rules match the original board game exactly. The only difference
              is that instead of shaking physical dice in a plastic dome, the
              grid is generated by an algorithm — and you can play unlimited
              games for free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How to Play Boggle Game Online
            </h2>
            <ol className="space-y-3 ml-4 list-decimal">
              <li>
                <strong>Open the game.</strong> Visit{" "}
                <Link href="/play" className="text-primary hover:underline">
                  wordgrid.games/play
                </Link>{" "}
                in any browser on desktop or mobile. No app store, no download.
              </li>
              <li>
                <strong>Click Start.</strong> The 3-minute timer begins
                immediately and a fresh grid appears.
              </li>
              <li>
                <strong>Connect letters to spell words.</strong> Click or tap a
                letter, then drag to adjacent letters. You can move in any of
                the 8 directions (like a king in chess).
              </li>
              <li>
                <strong>Release to submit.</strong> If the word is valid (3+
                letters, in the dictionary, no repeated tiles), you earn points.
              </li>
              <li>
                <strong>Find as many as possible before time runs out.</strong>{" "}
                Longer words score much more.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Online Boggle vs. The Board Game
            </h2>
            <p className="leading-relaxed mb-3">
              The gameplay is identical. Here's what's the same and what's
              different:
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Same</h3>
                <ul className="space-y-1">
                  <li>Standard board plus larger practice grids</li>
                  <li>3-minute timer</li>
                  <li>Same adjacency rules</li>
                  <li>Same scoring system</li>
                  <li>Qu tile works the same</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Different</h3>
                <ul className="space-y-1">
                  <li>No physical dice</li>
                  <li>Unlimited games</li>
                  <li>Daily board</li>
                  <li>Plays in browser</li>
                  <li>No sign-up required</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Related Pages
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/guides/boggle-online-free" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Boggle Online Free</div>
                <p className="text-sm text-text-muted mt-1">
                  Best for the no-download, no-sign-up search intent.
                </p>
              </Link>
              <Link href="/guides/boggle-rules-beginners" className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4">
                <div className="font-semibold text-primary">Boggle Rules for Beginners</div>
                <p className="text-sm text-text-muted mt-1">
                  Best for players who need the rule explanation first.
                </p>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Online Boggle Scoring
            </h2>
            <p className="leading-relaxed mb-3">
              Points scale with word length:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Length</th>
                  <th className="text-left py-2 text-text-muted">Points</th>
                  <th className="text-left py-2 text-text-muted">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [3, 1, "CAT, THE, RUN"],
                  [4, 2, "PLAY, WORD, GAME"],
                  [5, 4, "SCORE, BOARD, QUICK"],
                  [6, 6, "PLAYER, GARDEN"],
                  [7, 8, "PLAYING, STARTED"],
                  ["8+", "11+", "QUESTION, FORMATION"],
                ].map(([len, pts, example]) => (
                  <tr key={String(len)} className="border-b border-surface">
                    <td className="py-2">{len} letters</td>
                    <td className="py-2 text-primary font-semibold">{pts} pts</td>
                    <td className="py-2 text-xs text-text-dim">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Why Play Boggle Game Online?
            </h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                <strong>Completely free.</strong> No ads, no paywalls, no
                premium tiers. Unlimited games at no cost.
              </li>
              <li>
                <strong>No download.</strong> Runs in any modern browser. No app
                installation, no software download.
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
                <strong>Works everywhere.</strong> Desktop and mobile, touch or
                mouse.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Online Boggle Game Modes
            </h2>
            <ul className="space-y-3 ml-4 list-disc">
              <li>
                <strong>Practice Mode:</strong> Unlimited random grids. Perfect
                for warming up or improving your skills.
              </li>
              <li>
                <strong>Daily board:</strong> One grid per day, the same for
                everyone worldwide. Compete with friends or replay to beat your
                own best.
              </li>
              <li>
                <strong>Timed Rounds:</strong> Classic 3-minute clock, plus a
                5-minute option for a more relaxed pace.
              </li>
              <li>
                <strong>Zen Mode:</strong> No timer at all. Just search for
                words at your own pace.
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
                  Can I play the Boggle game online?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes. WordGrid offers free online Boggle with the same rules and
                  gameplay as the classic board game. No download or sign-up
                  required.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Is there a free online Boggle game?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes. WordGrid is completely free — no ads, no paywalls, no
                  premium tiers. Just open the site and play.
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
                  What's the difference between online and physical Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  The gameplay is identical. Online Boggle uses algorithmic
                  dice rolls instead of physical ones, offers unlimited games,
                  and includes a Daily board for score comparison.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Play Boggle Game Online Free
            </h2>
            <p className="text-text mb-4">
              Classic rules. 3-minute timer. Unlimited free games. No sign-up
              or download.
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
                  Direct browser-play intent with the same rules and timer.
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
                  Start a live round in the browser.
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
