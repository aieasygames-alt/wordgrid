import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boggle Variants — Fun Game Variations & Alternatives | WordGrid",
  description:
    "Explore fun Boggle variants and game variations. Big Boggle, Boggle Junior, themed games, solo challenges, and creative rule modifications for family game nights.",
  alternates: { canonical: "/guides/boggle-variants" },
  keywords: [
    "boggle variants", "boggle variations", "big boggle rules", "boggle junior",
    "boggle game variations", "boggle alternatives", "boggle rule variations",
    "boggle themed games", "solo boggle",
  ],
  openGraph: {
    title: "Boggle Variants — Fun Game Variations & Alternatives",
    description:
      "Discover Boggle variants including Big Boggle, Boggle Junior, themed games, and creative rule modifications for fresh gameplay.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Variants — Fun Game Variations & Alternatives",
  description:
    "A comprehensive guide to Boggle variants and game variations including Big Boggle, Boggle Junior, themed games, solo challenges, and creative rule modifications.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-variants/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the different Boggle variants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Popular Boggle variants include: Big Boggle (5×5 grid, 4-minute timer, 4+ letter minimum), Boggle Junior (3×3 grid for younger players), Boggle Master (deluxe edition with extra cubes), and themed versions like Boggle Travel, Boggle Reinvention, and digital variants. Players also create custom rules like Category Boggle, Solo Boggle, and Team Boggle.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules for Big Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Big Boggle rules: 5×5 grid of 25 letter cubes (instead of 4×4), 4-minute timer (instead of 3), minimum 4 letters per word (instead of 3), and extended scoring: 4 letters = 1 point, 5 = 2 points, 6 = 3 points, 7 = 5 points, 8+ = 11 points. The larger grid creates more word possibilities but requires more time to scan.",
      },
    },
    {
      "@type": "Question",
      name: "How is Boggle Junior different from regular Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle Junior is designed for younger players (ages 6-8) with a 3×3 grid of 9 letters, longer time limits (5 minutes), simpler scoring (1 point per word), and often allows 2-letter words. It focuses on fun and learning rather than competitive scoring, making it ideal for building early vocabulary and spelling skills.",
      },
    },
    {
      "@type": "Question",
      name: "Can you play Boggle solo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, solo Boggle is excellent for practice and skill-building. Play against your own high score, set word-count targets, or use online Daily Challenges. Solo play focuses on personal improvement rather than competition, making it perfect for vocabulary building and pattern recognition training.",
      },
    },
    {
      "@type": "Question",
      name: "What are fun Boggle variations for parties?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fun party Boggle variations include: Team Boggle (pairs work together), Category Boggle (words must fit a theme like 'food'), Speed Boggle (90-second rounds), Elimination Boggle (lowest scorer eliminated each round), and Story Boggle (use found words to create a story). These variations add social interaction and creative twists to classic gameplay.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides/` },
    { "@type": "ListItem", position: 3, name: "Boggle Variants" },
  ],
};

export default function BoggleVariantsGuide() {
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

      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <nav className="text-sm text-text-dim flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-text">Home</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Boggle Variants — Fun Game Variations & Alternatives
          </h1>
          <p className="text-text-muted">8 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              Classic Boggle is great, but sometimes you want fresh gameplay.
              These <strong>Boggle variants</strong> add new challenges, accommodate
              different ages and skill levels, and breathe new life into game
              night.
            </p>
            <p className="leading-relaxed mt-3">
              From official spinoffs to creative house rules, there's a
              variation for every situation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Big Boggle Rules
            </h2>
            <p className="leading-relaxed mb-3">
              <strong>Big Boggle</strong> is the most popular official variant —
              designed for experienced players who want more complexity.
            </p>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Grid & Setup</h3>
                  <ul className="space-y-1">
                    <li>• 5×5 grid (25 letter cubes)</li>
                    <li>• 4-minute timer</li>
                    <li>• Minimum 4 letters per word</li>
                    <li>• More complex letter distribution</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Scoring</h3>
                  <ul className="space-y-1">
                    <li>• 4 letters = 1 point</li>
                    <li>• 5 letters = 2 points</li>
                    <li>• 6 letters = 3 points</li>
                    <li>• 7 letters = 5 points</li>
                    <li>• 8+ letters = 11 points</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="leading-relaxed mt-3">
              <strong>Why it's harder:</strong> The 5×5 grid creates significantly
              more word possibilities, but requires more time to scan
              effectively. The 4-letter minimum forces you to think longer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Boggle Junior (For Kids)
            </h2>
            <p className="leading-relaxed mb-3">
              <strong>Boggle Junior</strong> adapts the game for ages 6-8 with
              simplified mechanics.
            </p>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Kid-Friendly Rules</h3>
                  <ul className="space-y-1">
                    <li>• 3×3 grid (9 letters)</li>
                    <li>• 5-minute timer</li>
                    <li>• Often allows 2-letter words</li>
                    <li>• 1 point per word (simple scoring)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Focus Areas</h3>
                  <ul className="space-y-1">
                    <li>• Vocabulary building</li>
                    <li>• Spelling practice</li>
                    <li>• Letter recognition</li>
                    <li>• Fun over competition</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="leading-relaxed mt-3">
              <strong>Best for:</strong> Young children, classrooms, family
              game night with mixed ages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Popular Creative Variations
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Category Boggle</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Setup:</strong> Pick a category (animals, food, sports,
                  countries)
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Play:</strong> Only words fitting the category count.
                  First to find 10 category words wins.
                </p>
                <p className="text-xs text-text-muted mt-2">
                  <strong>Best for:</strong> Vocabulary building, classroom
                  themes, party games
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Team Boggle</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Setup:</strong> Players pair up in teams of 2
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Play:</strong> Teams work together to find words,
                  combining their discoveries. Highest team score wins.
                </p>
                <p className="text-xs text-text-muted mt-2">
                  <strong>Best for:</strong> Parties, classrooms, team building
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Speed Boggle</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Setup:</strong> Reduce timer to 90 seconds
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Play:</strong> Fast-paced rounds. Play multiple rounds
                  and sum scores. Most total points wins.
                </p>
                <p className="text-xs text-text-muted mt-2">
                  <strong>Best for:</strong> Quick games, large groups,
                  tournament play
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Elimination Boggle</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Setup:</strong> 4+ players, standard rules
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Play:</strong> After each round, lowest scorer is
                  eliminated. Continue until one champion remains.
                </p>
                <p className="text-xs text-text-muted mt-2">
                  <strong>Best for:</strong> Parties, competitive groups,
                  tournaments
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Story Boggle</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Setup:</strong> Standard game, but keep found words
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Play:</strong> After the game, use your words to write
                  a creative story. Share and vote on best tale.
                </p>
                <p className="text-xs text-text-muted mt-2">
                  <strong>Best for:</strong> Creative writing, classrooms,
                  family fun
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Solo Boggle</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Setup:</strong> Play alone, online or with physical
                  set
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Play:</strong> Beat your own high score, set word-count
                  targets, or complete Daily Challenges. Focus on personal
                  improvement.
                </p>
                <p className="text-xs text-text-muted mt-2">
                  <strong>Best for:</strong> Practice, skill building,
                  relaxation
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Official Boggle Editions
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Boggle Master (Deluxe Edition)</h3>
                <p className="text-sm leading-relaxed">
                  Enhanced version with 6×6 grid, special letter cubes, and
                  advanced scoring. Designed for dedicated players who want
                  maximum complexity.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Boggle Travel</h3>
                <p className="text-sm leading-relaxed">
                  Compact, portable version with storage for letter cubes.
                  Often includes 3×3 mini-grid option for quick games. Perfect
                  for road trips and travel.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Boggle Reinvention</h3>
                <p className="text-sm leading-relaxed">
                  Modern reimagining with updated letter distribution, redesigned
                  cubes, and new rule options. Keeps core gameplay while adding
                  fresh elements.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Digital Boggle</h3>
                <p className="text-sm leading-relaxed">
                  Online and app versions with unlimited grids, Daily Challenges,
                  leaderboards, and multiplayer modes. Offers convenience and
                  variety beyond physical sets.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Custom Rule Ideas
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Alphabet Boggle</h3>
                <p className="text-sm leading-relaxed">
                  Try to find at least one word starting with each letter A-Z.
                  Advanced: find words in alphabetical order. Great for alphabet
                  practice and creative searching.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Minimum Length Boggle</h3>
                <p className="text-sm leading-relaxed">
                  Raise minimum word length each round. Round 1: 3 letters. Round
                  2: 4 letters. Round 3: 5 letters. Forces adaptive strategy
                  and longer word hunting.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Blind Boggle</h3>
                <p className="text-sm leading-relaxed">
                  One player describes letter positions without showing the
                  grid. Other players mentally visualize and call out words.
                  Tests spatial reasoning and communication.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Double Score Boggle</h3>
                <p className="text-sm leading-relaxed">
                  Pick a bonus letter (like S or R). Words containing that
                  letter count double. Adds strategic layer to word selection.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Relay Boggle</h3>
                <p className="text-sm leading-relaxed">
                  Teams take turns adding one letter at a time to build words.
                  First team to create a valid 5+ letter word wins. Combines
                  Boggle mechanics with relay race excitement.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Choosing the Right Variant
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-muted">Situation</th>
                  <th className="text-left py-2 text-text-muted">Best Variant</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Young kids (6-8)", "Boggle Junior"],
                  ["Family game night", "Team Boggle or Category Boggle"],
                  ["Party with adults", "Speed Boggle or Elimination"],
                  ["Classroom learning", "Category Boggle or Story Boggle"],
                  ["Solo practice", "Solo Boggle or Daily Challenges"],
                  ["Experienced players", "Big Boggle or Boggle Master"],
                  ["Quick games", "Speed Boggle (90 seconds)"],
                  ["Creative groups", "Story Boggle or Relay Boggle"],
                ].map(([situation, variant]) => (
                  <tr key={situation} className="border-b border-surface">
                    <td className="py-2">{situation}</td>
                    <td className="py-2">{variant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-surface/50 rounded-xl p-4" open>
                <summary className="font-semibold cursor-pointer">
                  What are the different Boggle variants?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Popular Boggle variants include Big Boggle (5×5 grid, 4-minute
                  timer, 4+ letter minimum), Boggle Junior (3×3 grid for kids),
                  Boggle Master (deluxe edition), and themed versions. Players
                  also create custom rules like Category Boggle, Solo Boggle,
                  and Team Boggle.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What are the rules for Big Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Big Boggle rules: 5×5 grid of 25 letter cubes, 4-minute timer,
                  minimum 4 letters per word. Extended scoring: 4 letters = 1
                  point, 5 = 2 points, 6 = 3 points, 7 = 5 points, 8+ = 11
                  points. Larger grid creates more possibilities but requires
                  more scanning time.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How is Boggle Junior different from regular Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Boggle Junior is for ages 6-8 with a 3×3 grid of 9 letters,
                  longer time limits (5 minutes), simpler scoring (1 point per
                  word), and often allows 2-letter words. Focuses on fun and
                  learning rather than competitive scoring.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Can you play Boggle solo?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes, solo Boggle is excellent for practice. Play against your
                  own high score, set word-count targets, or use online Daily
                  Challenges. Solo play focuses on personal improvement and
                  skill-building rather than competition.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Try These Variants Now
            </h2>
            <p className="text-text mb-4">
              Start with classic gameplay, then experiment with variations. Find
              what works best for your group.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Play Classic Boggle
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
                href="/guides/boggle-rules-for-kids/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Rules for Kids →
                </div>
                <div className="text-sm text-text-muted">
                  Simplified rules and teaching tips for children.
                </div>
              </Link>
              <Link
                href="/guides/boggle-strategy-guide/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Strategy Guide →
                </div>
                <div className="text-sm text-text-muted">
                  Competitive strategies for all skill levels.
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
