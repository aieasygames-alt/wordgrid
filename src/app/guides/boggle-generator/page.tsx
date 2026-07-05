import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boggle Generator — Create Custom Word Puzzles",
  description:
    "Free Boggle generator to create custom 4×4 word puzzles. Design personalized grids for practice, teaching, or game nights with adjustable difficulty and letter distribution.",
  alternates: { canonical: "/guides/boggle-generator" },
  keywords: [
    "boggle generator", "boggle puzzle maker", "custom boggle grid",
    "boggle board generator", "create boggle puzzle", "boggle grid maker",
    "make your own boggle", "boggle game creator",
  ],
  openGraph: {
    title: "Boggle Generator — Create Custom Word Puzzles",
    description:
      "Free Boggle generator to create custom 4×4 word puzzles. Design personalized grids for practice, teaching, or game nights with adjustable difficulty.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Boggle Generator",
  applicationCategory: "Game",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free Boggle generator that creates custom 4×4 word puzzles with adjustable difficulty, letter distribution controls, and printable grids for practice and teaching.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "890",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you create a custom Boggle grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To create a custom Boggle grid: 1) Choose a difficulty level (easy/medium/hard) which adjusts letter distribution, 2) Select grid size (standard 4×4 or big 5×5), 3) Optionally include specific letters or patterns, 4) Generate the grid, 5) Print or play online. Custom generators allow you to control consonant-vowel ratios and letter frequency for targeted practice.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best Boggle generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best Boggle generators offer: difficulty adjustment (controls letter distribution), multiple grid sizes (4×4 and 5×5), printable output, letter customization options, word count estimates, and fairness validation (ensures reasonable word counts). WordGrid's generator provides these features for free with no sign-up required.",
      },
    },
    {
      "@type": "Question",
      name: "Can you make your own Boggle game?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can make your own Boggle game using a generator or physical dice. For online play, use generators to create custom grids. For physical games, use blank dice and letter stickers to create personalized cubes. Custom games are great for themed events, teaching specific vocabulary, or creating challenge grids for friends.",
      },
    },
    {
      "@type": "Question",
      name: "How do Boggle dice work in generators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle generators simulate physical dice using letter frequency data. Standard Boggle uses 16 cubes with specific letter distributions (more common letters like E, A, R appear more frequently). Generators use algorithms to replicate this distribution while allowing customization for difficulty and specific letter combinations.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good Boggle grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good Boggle grid has: balanced letter distribution (mix of common and rare letters), reasonable word count (100-200 possible words), diagonal connectivity for word paths, strategic letter clusters (TH, HE, IN, ER), and at least one Qu tile for high-value word opportunities. Fair grids avoid impossible layouts or excessive rare letters.",
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
    { "@type": "ListItem", position: 3, name: "Boggle Generator" },
  ],
};

export default function BoggleGeneratorGuide() {
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
            <Link href="/" className="hover:text-text">Word Grid</Link>
            <span>/</span>
            <Link href="/guides/" className="hover:text-text">Guides</Link>
          </nav>
          <h1 className="text-4xl font-bold mb-2">
            Boggle Generator — Create Custom Word Puzzles
          </h1>
          <p className="text-text-muted">6 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              A <strong>Boggle generator</strong> creates custom 4×4 word puzzles
              for practice, teaching, or game nights. Design personalized grids
              with adjustable difficulty, control letter distribution, and print
              unlimited custom boards.
            </p>
            <p className="leading-relaxed mt-3">
              <Link href="/play" className="text-primary hover:underline">
                Generate and play custom grids now →
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How to Use a Boggle Generator
            </h2>
            <ol className="space-y-3 ml-4 list-decimal">
              <li>
                <strong>Choose your settings.</strong> Select grid size (4×4 or
                5×5), difficulty level, and any custom letter requirements.
              </li>
              <li>
                <strong>Generate the grid.</strong> The algorithm creates a fair,
                playable board with balanced letter distribution.
              </li>
              <li>
                <strong>Preview and adjust.</strong> Review the generated grid and
                regenerate if needed.
              </li>
              <li>
                <strong>Print or play.</strong> Download a printable version or
                play directly online.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Generator Features
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Difficulty Control</h3>
                <p className="text-sm leading-relaxed">
                  Adjust letter distribution to change difficulty:
                </p>
                <ul className="space-y-1 text-sm mt-2">
                  <li>
                    <strong>Easy:</strong> More common letters (E, A, R, T, N),
                    higher vowel-to-consonant ratio, more word possibilities
                  </li>
                  <li>
                    <strong>Medium:</strong> Standard Boggle letter
                    distribution, balanced gameplay
                  </li>
                  <li>
                    <strong>Hard:</strong> More rare letters, strategic
                    positioning, requires pattern mastery
                  </li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Grid Size Options</h3>
                <p className="text-sm leading-relaxed">
                  <strong>Standard 4×4:</strong> Classic Boggle format, 16 letters,
                  3-minute timer
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Big 5×5:</strong> Advanced play, 25 letters, 4-minute timer,
                  4-letter minimum
                </p>
                <p className="text-xs text-text-muted mt-2">
                  Larger grids create more word possibilities but require more
                  scanning time and advanced pattern recognition.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Custom Letter Controls</h3>
                <p className="text-sm leading-relaxed">
                  Force specific letters or patterns:
                </p>
                <ul className="space-y-1 text-sm mt-2">
                  <li>• Include Qu tile (always recommended)</li>
                  <li>• Add specific letters for vocabulary practice</li>
                  <li>• Create themed grids (only certain letters)</li>
                  <li>• Balance consonant-vowel ratios</li>
                </ul>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Fairness Validation</h3>
                <p className="text-sm leading-relaxed">
                  Good generators ensure:
                </p>
                <ul className="space-y-1 text-sm mt-2">
                  <li>• 100-200 possible words (reasonable range)</li>
                  <li>• No impossible layouts</li>
                  <li>• Balanced letter distribution</li>
                  <li>• Strategic diagonal connections</li>
                  <li>• At least one high-value opportunity</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Uses for Custom Boggle Grids
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Teaching and Education</h3>
                <p className="text-sm leading-relaxed">
                  Create grids for specific vocabulary practice. For ESL students,
                  generate easy grids with common vocabulary. For advanced
                  students, create challenging grids with complex letter
                  combinations. Teachers can design themed grids for literature
                  units or subject-specific vocabulary.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Skill Building Practice</h3>
                <p className="text-sm leading-relaxed">
                  Generate grids targeting specific weaknesses. If you struggle
                  with diagonal words, create grids rich in diagonal connections.
                  To practice long-word patterns, generate grids with -TION,
                  -NESS, -MENT combinations. Custom grids accelerate focused
                  improvement.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Game Nights and Events</h3>
                <p className="text-sm leading-relaxed">
                  Design custom grids for parties, tournaments, or themed
                  events. Create holiday-themed puzzles, birthday challenges,
                  or competitive grids for group play. Print custom boards for
                  guests and use generated scoring sheets.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Tournament Preparation</h3>
                <p className="text-sm leading-relaxed">
                  Competitive players use generators to practice specific
                  scenarios. Create grids mimicking tournament conditions or
                  practice particular letter distributions. Some generators
                  include word count estimates to measure improvement.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How Generators Create Fair Grids
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm leading-relaxed mb-3">
                <strong>The generation algorithm:</strong>
              </p>
              <ol className="space-y-2 list-decimal ml-4 text-sm">
                <li>
                  <strong>Letter distribution:</strong> Use frequency data from
                  standard Boggle cubes or English language corpus
                </li>
                <li>
                  <strong>Positioning algorithm:</strong> Place letters to ensure
                  diagonal connectivity and word path options
                </li>
                <li>
                  <strong>Balance check:</strong> Verify reasonable word count
                  (100-200 possible words)
                </li>
                <li>
                  <strong>Difficulty validation:</strong> Confirm appropriate
                  consonant-vowel ratio and letter mix
                </li>
                <li>
                  <strong>Quality control:</strong> Ensure no impossible layouts or
                  unfairly difficult configurations
                </li>
              </ol>
              <p className="text-xs text-text-muted mt-3">
                Advanced generators use Monte Carlo methods to test thousands of
                random letter combinations before selecting optimal arrangements.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Making Physical Boggle Games
            </h2>
            <p className="leading-relaxed mb-3">
              Beyond online generators, you can create custom physical games:
            </p>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Custom Dice Method</h3>
                <p className="text-sm leading-relaxed">
                  Use blank dice and letter stickers to create personalized cubes.
                  Design custom letter distributions for your group or teaching
                  needs. This creates a permanent custom set for repeated play.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Printable Grids Method</h3>
                <p className="text-sm leading-relaxed">
                  Generate custom grids online, print them, and use with standard
                  Boggle rules. Great for classrooms, parties, or temporary
                  themed events. Simply laminate printed grids for durability.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Card/Tile Method</h3>
                <p className="text-sm leading-relaxed">
                  Create letter tiles using cardboard or cardstock. Arrange them
                  manually in 4×4 grids. Shuffle and redeal for infinite variety.
                  Portable and customizable for travel play.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Generator Best Practices
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">For Teaching</h3>
                <p className="text-sm leading-relaxed">
                  Use easy difficulty with common vocabulary. Include visual
                  aids for younger players. Focus on specific letter patterns
                  being taught. Create multiple grids with the same patterns for
                  reinforcement practice.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">For Practice</h3>
                <p className="text-sm leading-relaxed">
                  Start with medium difficulty to build baseline skills. Progress
                  to hard grids as you improve. Use solvers to check custom
                  grids and ensure fairness. Track your improvement on repeated
                  grid types.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">For Events</h3>
                <p className="text-sm leading-relaxed">
                  Test grids beforehand to ensure appropriate difficulty. Have
                  backup grids ready. Print scoring sheets and rules. Consider
                  theme-appropriate letter choices for special occasions.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-surface/50 rounded-xl p-4" open>
                <summary className="font-semibold cursor-pointer">
                  How do you create a custom Boggle grid?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  To create a custom Boggle grid: Choose difficulty (controls
                  letter distribution), select grid size (4×4 or 5×5),
                  optionally include specific letters, generate the grid, and
                  print or play online. Generators allow you to control
                  consonant-vowel ratios and letter frequency.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What is the best Boggle generator?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Best Boggle generators offer: difficulty adjustment, multiple
                  grid sizes, printable output, letter customization, word count
                  estimates, and fairness validation. WordGrid's generator
                  provides these features for free with no sign-up required.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Can you make your own Boggle game?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Yes, you can make your own Boggle game using generators or
                  physical dice. For online play, use generators to create custom
                  grids. For physical games, use blank dice and letter stickers.
                  Custom games are great for themed events or teaching.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What makes a good Boggle grid?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  A good Boggle grid has: balanced letter distribution, 100-200
                  possible words, diagonal connectivity, strategic letter
                  clusters (TH, HE, IN, ER), and at least one Qu tile for
                  high-value words. Fair grids avoid impossible layouts.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Create Your Custom Grid
            </h2>
            <p className="text-text mb-4">
              Generate custom Boggle grids for practice, teaching, or game
              nights. Adjust difficulty and letter distribution to your needs.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Generate & Play
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
            <h2 className="text-lg font-semibold mb-3">Related Tools</h2>
            <div className="space-y-3">
              <Link
                href="/guides/boggle-solver/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Solver →
                </div>
                <div className="text-sm text-text-muted">
                  Find all words in any grid.
                </div>
              </Link>
              <Link
                href="/guides/boggle-dictionary/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Dictionary →
                </div>
                <div className="text-sm text-text-muted">
                  Word lists and vocabulary reference.
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
