import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boggle Dictionary — Complete Word Lists & Vocabulary",
  description:
    "Complete Boggle dictionary with word lists, vocabulary references, and valid word guidelines. Lookup any word, explore high-frequency game vocabulary, and improve your word-finding skills.",
  alternates: { canonical: "/guides/boggle-dictionary" },
  keywords: [
    "boggle dictionary", "boggle word list", "boggle vocabulary",
    "boggle valid words", "boggle word lookup", "boggle word reference",
    "boggle dictionary online", "boggle word checker",
  ],
  openGraph: {
    title: "Boggle Dictionary — Complete Word Lists & Vocabulary",
    description:
      "Complete Boggle dictionary with word lists, vocabulary references, and valid word guidelines. Lookup words and improve your gameplay vocabulary.",
  },
};

const BASE_URL = "https://wordgrid.games";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  headline: "Boggle Dictionary — Complete Word Lists & Vocabulary",
  description:
    "A comprehensive Boggle dictionary including word lists, vocabulary references, valid word guidelines, and word lookup for improving gameplay.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-dictionary/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What words are allowed in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle allows words that are at least 3 letters long, appear in standard English dictionaries, and are not proper nouns (names of people/places like Paris, Google), abbreviations (TV, ASAP), or foreign words commonly used in English. Different dictionaries may vary slightly on specific words. Common words like THE, AND, THAT, HAVE, FOR, NOT, YOU, THIS always count.",
      },
    },
    {
      "@type": "Question",
      name: "How many words are in a Boggle dictionary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard Boggle dictionary contains approximately 80,000-100,000 valid English words meeting Boggle criteria (3+ letters, standard dictionary words, not proper nouns or abbreviations). Online versions may have 50,000-200,000 words depending on inclusiveness. Tournament dictionaries typically use 80,000-100,000 words as the standard.",
      },
    },
    {
      "@type": "Question",
      name: "What dictionary does Boggle use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Boggle typically uses standard comprehensive English dictionaries like Merriam-Webster, Oxford English Dictionary, or Collins. Online versions often use open-source dictionaries like WordNet or SCOWL. Tournament play uses approved word lists to avoid disputes. The key is consistency — all players must agree on which dictionary source defines valid words.",
      },
    },
    {
      "@type": "Question",
      name: "Can you look up words in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "During competitive play, you cannot use external dictionaries or word lookup tools — this would be cheating. However, for learning and practice, word lookups are excellent for vocabulary building. Use dictionaries after games to learn new words you missed, study word patterns, and expand your vocabulary for future games.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Boggle official word list?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no single 'official' Boggle word list. Different editions and online versions use different dictionaries. Tournament play typically uses approved word lists agreed upon by organizers. For casual play, any standard English dictionary works. Consistency matters more than the specific source — all players should agree on word validity rules beforehand.",
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
    { "@type": "ListItem", position: 3, name: "Boggle Dictionary" },
  ],
};

export default function BoggleDictionaryGuide() {
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
            Boggle Dictionary — Complete Word Lists & Vocabulary
          </h1>
          <p className="text-text-muted">8 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              A <strong>Boggle dictionary</strong> defines valid words, provides
              vocabulary references, and helps you expand your word-finding
              repertoire. Understanding what words count and building your
              vocabulary are keys to consistently high scores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              What Words Count in Boggle
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border border-border">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">✅ Allowed Words</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• 3+ letters long</li>
                    <li>• Standard English words</li>
                    <li>• Common dictionary entries</li>
                    <li>• Plurals (CATS, DOGS)</li>
                    <li>• Past tense (PLAYED, RAN)</li>
                    <li>• -ING forms (PLAYING)</li>
                    <li>• Compound words (FOOTBALL)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">❌ Not Allowed</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• 2-letter words (AT, GO)</li>
                    <li>• Proper nouns (PARIS, GOOGLE)</li>
                    <li>• Abbreviations (TV, ASAP)</li>
                    <li>• Foreign words (usually)</li>
                    <li>• Words needing apostrophes</li>
                    <li>• Hyphenated words (usually)</li>
                    <li>• Acronyms (NASA, FBI)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Essential Boggle Vocabulary
            </h2>
            <p className="leading-relaxed mb-3">
              High-frequency words that appear regularly in games:
            </p>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Top 20 Most Common</h3>
                <div className="grid grid-cols-5 gap-2 text-sm">
                  {["THE", "AND", "THAT", "HAVE", "FOR", "NOT", "YOU", "THIS", "BUT", "FROM", "THEY", "WITH", "ARE", "WAS", "WERE", "WHAT", "WHEN", "MAKE", "TIME"].map(
                    (word) => (
                      <span key={word} className="px-2 py-1 bg-surface rounded font-mono">
                        {word}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">High-Value Common Words</h3>
                <p className="text-xs text-text-dim mb-2">
                  Common words worth 5+ points:
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {["THINK", "BELIEVE", "CREATE", "CONTROL", "SUPPORT", "REMEMBER", "UNDERSTAND", "KNOWLEDGE"].map(
                    (word) => (
                      <span key={word} className="px-2 py-1 bg-primary/20 rounded font-mono">
                        {word}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Pattern Words</h3>
                <p className="text-xs text-text-dim mb-2">
                  Words with common endings:
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {["ACTION", "MOTION", "PROMOTION", "HAPPINESS", "KINDNESS", "MOVEMENT", "PAYMENT"].map(
                    (word) => (
                      <span key={word} className="px-2 py-1 bg-surface rounded font-mono">
                        {word}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Using Dictionaries for Learning
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Post-Game Vocabulary Building</h3>
                <p className="text-sm leading-relaxed">
                  After each game, look up words you missed but the solver
                  found. Study their meanings and common usage. Focus on words
                  that appear regularly in grids but you don't know. Over time,
                  this builds a game-specific vocabulary that improves your
                  scores.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Pattern Dictionary Study</h3>
                <p className="text-sm leading-relaxed">
                  Instead of memorizing individual words, study word patterns.
                  Learn all words starting with common prefixes (RE-, UN-, PRE-).
                  Study word families (PLAY, PLAYED, PLAYING, PLAYER). Pattern
                  knowledge is more valuable than rote memorization.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Letter Combination Reference</h3>
                <p className="text-sm leading-relaxed">
                  Build mental dictionaries of letter combinations: TH words
                  (THE, THIS, THAT, WITH), HE words (THEM, HERE, HELD), IN words
                  (INTO, TIME, FIND). When you see these pairs, your brain should
                  automatically generate candidate words.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Word Lookup During Play
            </h2>
            <div className="space-y-4">
              <div className="bg-red-900/20 rounded-xl p-4 border border-red-800/30">
                <h3 className="font-semibold mb-2">❌ During Competitive Play</h3>
                <p className="text-sm leading-relaxed">
                  Looking up words during games is cheating. It violates fair play,
                  gives you an unfair advantage, and doesn't help you build
                  skills. Competitive play relies on your existing vocabulary
                  and pattern recognition.
                </p>
              </div>

              <div className="bg-green-900/20 rounded-xl p-4 border border-green-800/30">
                <h3 className="font-semibold mb-2">✅ For Practice and Learning</h3>
                <p className="text-sm leading-relaxed">
                  Dictionary use is encouraged for learning. Look up words after
                  games to expand vocabulary. Study word lists to build pattern
                  recognition. Use dictionaries to settle disputes about word
                  validity in casual games.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Dictionary Sources and Standards
            </h2>
            <p className="leading-relaxed mb-3">
              Common dictionary sources used in Boggle:
            </p>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Print Dictionaries</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Merriam-Webster Collegiate Dictionary</li>
                  <li>• Oxford English Dictionary</li>
                  <li>• Collins English Dictionary</li>
                  <li>• Webster's New World College Dictionary</li>
                </ul>
                <p className="text-xs text-text-muted mt-2">
                  These are comprehensive standard references used in
                  tournaments and formal play.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Digital Sources</h3>
                <ul className="space-y-1 text-sm">
                  <li>• WordNet (Princeton University)</li>
                  <li>• SCOWL (Spell Checker Oriented Word Lists)</li>
                  <li>• ENABLE (Enhanced North American Benchmark Lexicon)</li>
                  <li>• Official Scrabble Players Dictionary (OSP D)</li>
                </ul>
                <p className="text-xs text-text-muted mt-2">
                  Online Boggle games typically use one of these open-source
                  dictionaries or custom combinations.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Tournament Standards</h3>
                <p className="text-sm leading-relaxed">
                  Competitive play uses agreed-upon word lists to avoid disputes.
                  Before tournaments, organizers specify which dictionary
                  defines valid words. This ensures all players have the same
                  reference and prevents disagreements.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Building Your Game Vocabulary
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Tier 1: Core Vocabulary (Essential)</h3>
                <p className="text-sm leading-relaxed">
                  Master the top 100 most common Boggle words. These appear in
                  almost every game and should be instant recognition. THE,
                  AND, THAT, HAVE, FOR, NOT, YOU, THIS, BUT, FROM, THEY, WITH,
                  ARE, WAS, WERE, WHAT, WHEN, MAKE, TIME.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Tier 2: Common Patterns (Important)</h3>
                <p className="text-sm leading-relaxed">
                  Learn common letter combinations and word families: TH, HE,
                  IN, ER, AN, RE pairs. Words ending in -ING, -ED, -ER, -EST.
                  Prefixes like RE-, UN-, PRE-. These patterns generate dozens of
                  words from grid positions.
                </p>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Tier 3: Advanced Vocabulary (Competitive)</h3>
                <p className="text-sm leading-relaxed">
                  For competitive play, learn longer words: -TION words (ACTION,
                  CONDITION, MOTION), -NESS words (HAPPINESS, KINDNESS), -MENT
                  words (MOMENT, MOVEMENT). Also learn specific vocabulary:
                  REMEMBER, BELIEVE, CONTROL, CREATE, SUPPORT.
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
                  What words are allowed in Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Boggle allows words 3+ letters long from standard English
                  dictionaries. No proper nouns (Paris, Google), abbreviations
                  (TV, ASAP), or foreign words. Common words like THE, AND, THAT,
                  HAVE, FOR, NOT, YOU, THIS always count.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How many words are in a Boggle dictionary?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  A standard Boggle dictionary contains 80,000-100,000 valid
                  English words. Online versions may have 50,000-200,000 words
                  depending on inclusiveness. Tournament dictionaries typically
                  use 80,000-100,000 words.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What dictionary does Boggle use?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Boggle typically uses standard English dictionaries like
                  Merriam-Webster, Oxford, or Collins. Online versions use
                  open-source dictionaries like WordNet or SCOWL. Consistency
                  matters — all players should agree on which dictionary to use.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  Can you look up words in Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  During competitive play, no — this would be cheating. For
                  learning and practice, word lookups are excellent for vocabulary
                  building. Use dictionaries after games to learn new words you
                  missed.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Build Your Vocabulary
            </h2>
            <p className="text-text mb-4">
              Study word lists, practice pattern recognition, and play daily to
              expand your game vocabulary. Consistent practice builds instant
              word recognition.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/play"
                className="px-6 py-3 bg-primary hover:bg-primary-hover transition rounded-xl font-semibold"
              >
                Practice Now
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
            <h2 className="text-lg font-semibold mb-3">Related Resources</h2>
            <div className="space-y-3">
              <Link
                href="/guides/boggle-word-lists/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Boggle Word Lists by Letter →
                </div>
                <div className="text-sm text-text-muted">
                  Complete vocabulary reference organized by letter.
                </div>
              </Link>
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
