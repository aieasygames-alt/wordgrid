import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Play Boggle Online Free — No Download, No Sign-Up",
  description:
    "Play Boggle online free in your browser. No download, no sign-up, no ads. Classic 4×4 word grid game with 3-minute timer. Instant play on desktop and mobile.",
  alternates: { canonical: "/guides/play-boggle-online-free" },
  keywords: [
    "play boggle free online game", "play boggle online free", "boggle online free game",
    "free boggle online", "play boggle online no download", "boggle online no sign up",
    "play boggle free", "boggle game online free",
  ],
  openGraph: {
    title: "Play Boggle Online Free — No Download, No Sign-Up Required",
    description:
      "Classic Boggle gameplay, free in your browser. 4×4 word grid, 3-minute rounds, no account needed. Play instantly on phone or desktop.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Play Boggle Online Free — No Download, No Sign-Up",
  description:
    "How to play Boggle online for free with no download or sign-up required. Classic 4×4 word grid gameplay in your browser.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-28",
  dateModified: "2026-06-28",
  mainEntityOfPage: `${BASE_URL}/guides/play-boggle-online-free/`,
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
        text: "Yes. WordGrid offers free online Boggle gameplay with no download, no sign-up, and no ads. Just visit wordgrid.games and start playing instantly. The game runs entirely in your browser on desktop and mobile.",
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
      name: "Is there a free Boggle game online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordGrid is a completely free online word grid game based on classic Boggle rules. Unlimited practice games plus a daily challenge — all free with no ads or paywalls.",
      },
    },
    {
      "@type": "Question",
      name: "How do you play Boggle online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To play Boggle online, open wordgrid.games and click Play. You'll see a 4×4 grid of letters. Click and drag across adjacent letters (horizontally, vertically, or diagonally) to spell words. Each word must be 3+ letters, and you can't reuse the same tile. Find as many words as possible in 3 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I play Boggle online with friends?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordGrid offers a Daily Challenge where everyone gets the same grid each day. You can compare scores with friends to see who found the most words. There's also a practice mode for unlimited solo games.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Play Boggle Online Free",
  description: "Step-by-step instructions for playing free online Boggle/word grid games.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the game in your browser",
      text: "Visit wordgrid.games/play for a random practice game, or wordgrid.games/daily for the Daily Challenge. No app or download needed — it runs in any modern browser.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Start the timer",
      text: "Click Start to begin the 3-minute countdown. The clock starts immediately, so be ready to search.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Connect adjacent letters",
      text: "Click or tap a letter, then drag to neighboring letters (up, down, left, right, or diagonal) to spell a word.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Release to submit",
      text: "Release your mouse or finger to submit the word. If it's valid and 3+ letters, you earn points based on length.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Find as many words as possible",
      text: "Keep finding words until the 3-minute timer ends. Longer words (5+ letters) score significantly more points.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Word Grid", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Play Boggle Online Free" },
  ],
};

export default function PlayBoggleOnlineFreeGuide() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">Word Grid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Play Boggle Online Free — No Download, No Sign-Up
          </h1>
          <p className="text-text-muted">5 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              <strong>You can play Boggle online for free right now.</strong> No
              download, no sign-up, no credit card, no ads. Just open your browser
              and start playing. The classic 4×4 word grid game you remember —
              same rules, same 3-minute timer, same word-finding excitement.
            </p>
            <p className="leading-relaxed mt-3">
              <Link href="/play" className="text-primary hover:underline">
                Play free Boggle now →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Is Online Boggle?
            </h2>
            <p className="leading-relaxed">
              Online Boggle (also called a word grid game) gives you a 4×4 grid
              of 16 letters. Your goal: find as many English words as possible
              by connecting adjacent letters — horizontally, vertically, or
              diagonally. Words must be at least 3 letters long, and you can't
              reuse the same tile twice in one word.
            </p>
            <p className="leading-relaxed mt-3">
              You have 3 minutes. Longer words score dramatically more points
              (a 5-letter word is worth as much as four 3-letter words). When
              time runs out, your final score is displayed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How to Play Boggle Online Free (Step by Step)
            </h2>
            <ol className="space-y-3 ml-4 list-decimal">
              <li>
                <strong>Open the game.</strong> Go to{" "}
                <Link href="/play" className="text-primary hover:underline">
                  wordgrid.games/play
                </Link>{" "}
                — no app store, no installation. It runs in any browser.
              </li>
              <li>
                <strong>Click Start.</strong> The 3-minute timer begins
                immediately. A 4×4 grid of letters appears.
              </li>
              <li>
                <strong>Connect letters to spell words.</strong> Click or tap a
                letter, then drag to adjacent letters. You can move in any of
                the 8 directions (like a chess king).
              </li>
              <li>
                <strong>Release to submit.</strong> If the word is valid (3+
                letters, in the dictionary, no repeated tiles), you earn
                points based on word length.
              </li>
              <li>
                <strong>Keep going until time runs out.</strong> Find as many
                words as you can in 3 minutes. Longer words are worth much more.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Why Play Boggle Online Free Here?
            </h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li>
                <strong>Truly free.</strong> No ads, no paywalls, no premium
                tiers. Unlimited games at no cost.
              </li>
              <li>
                <strong>No download.</strong> Runs entirely in your browser on
                desktop and mobile. No app installation.
              </li>
              <li>
                <strong>No sign-up.</strong> No account, no email, no password.
                Just open and play.
              </li>
              <li>
                <strong>Daily Challenge.</strong> Everyone gets the same grid
                each day. Compare scores with friends.
              </li>
              <li>
                <strong>Practice mode.</strong> Unlimited random grids for
                solo practice.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Boggle Scoring (Free Online Version)
            </h2>
            <p className="leading-relaxed mb-3">
              The scoring system rewards longer words heavily:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Word Length</th>
                  <th className="text-left py-2 text-text-muted">Points</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["3 letters", "1 point"],
                  ["4 letters", "2 points"],
                  ["5 letters", "4 points"],
                  ["6 letters", "6 points"],
                  ["7 letters", "8 points"],
                  ["8+ letters", "10+ points"],
                ].map(([len, pts]) => (
                  <tr key={len} className="border-b border-surface">
                    <td className="py-2">{len}</td>
                    <td className="py-2 text-primary font-semibold">{pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="leading-relaxed mt-3">
              Notice the jump at 5 letters — that's where the real points start.
              Experienced players focus on finding 5+ letter words.
            </p>
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
                  Do I need to download anything?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  No. WordGrid runs entirely in your browser on desktop and
                  mobile. No app installation required.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Can I play Boggle online with friends?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  The Daily Challenge gives everyone the same grid each day, so
                  you can compare scores with friends. There's also unlimited
                  practice mode for solo play.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Is there a time limit?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Standard games are 3 minutes — the same as classic Boggle.
                  Practice mode also offers 5-minute and untimed Zen modes.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Start Playing Free Boggle Now
            </h2>
            <p className="text-text mb-4">
              No sign-up. No download. Just click and play. You'll learn the
              mechanics in 30 seconds.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play Free Boggle Now
              </Link>
              <Link
                href="/daily"
                className="px-6 py-3 bg-surface hover:bg-surface-hover transition rounded-xl font-semibold"
              >
                Daily Challenge
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link
                href="/guides/boggle-rules-beginners/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Rules of Boggle: A Complete Beginner's Guide →
                </div>
                <div className="text-sm text-text-muted">
                  Every rule explained — the grid, adjacency, scoring, and the
                  Qu tile.
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
                  Time management, scoring math, and word families to maximize
                  your score.
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
      </article>
    </main>
  );
}
