import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boggle Word Lists — Complete Reference",
  description:
    "Complete Boggle word lists organized by letter. High-frequency words, common patterns, and letter-specific vocabulary to improve your word-finding speed and score.",
  alternates: { canonical: "/guides/boggle-word-lists" },
  keywords: [
    "boggle word lists", "boggle words by letter", "boggle word list",
    "boggle vocabulary", "boggle word reference", "boggle high frequency words",
    "boggle word patterns", "boggle common words",
  ],
  openGraph: {
    title: "Boggle Word Lists by Letter — Complete Reference",
    description:
      "Comprehensive Boggle word lists organized by letter with high-frequency words, common patterns, and letter-specific vocabulary for improving gameplay.",
  },
};

const BASE_URL = "https://wordgrid.games";

// Word lists by letter for Boggle
const WORD_LISTS = {
  A: ["ABLE", "ABOUT", "ABOVE", "ACT", "ADD", "AGE", "AGENT", "AGO", "AIR", "ALL", "ALSO", "AN", "AND", "ANIMAL", "ANSWER", "ANY", "APPEAR", "AREA", "ARM", "ART", "ASK"],
  B: ["BACK", "BALL", "BAND", "BAR", "BASE", "BE", "BEAR", "BEAT", "BEAUTIFUL", "BED", "BEEN", "BEFORE", "BEGIN", "BEHIND", "BELIEVE", "BENEFIT", "BEST", "BETTER", "BETWEEN", "BEYOND", "BIG", "BILL", "BIT", "BLACK", "BLOOD", "BLUE", "BOARD", "BODY", "BOOK", "BORN", "BOTH", "BOX", "BOY", "BREAK", "BREATH", "BRING", "BROTHER", "BUILD", "BUSINESS", "BUT", "BUY", "BY"],
  C: ["CALL", "CAN", "CANDIDATE", "CAR", "CARD", "CARE", "CARRY", "CASE", "CATCH", "CAUSE", "CELL", "CENTER", "CENTURY", "CERTAIN", "CHANCE", "CHANGE", "CHARACTER", "CHARGE", "CHECK", "CHILD", "CHOICE", "CHOOSE", "CHURCH", "CITIZEN", "CITY", "CIVIL", "CLAIM", "CLASS", "CLEAR", "CLEARLY", "CLOSE", "COLLEAGUE", "COME", "COMMERCIAL", "COMMON", "COMMUNITY", "COMPANY", "COMPARE", "COMPUTER", "CONCERN", "CONDITION", "CONFERENCE", "CONGRESS", "CONSIDER", "CONSUMER", "CONTAIN", "CONTINUE", "CONTROL", "COST", "COULD", "COUNTRY", "COUPLE", "COURSE", "COVER", "CREATE", "CROSS", "CROWD", "CULTURE", "CUP", "CURRENT", "CUSTOMER", "CUT"],
  D: ["DARK", "DATA", "DAUGHTER", "DAY", "DEAD", "DEAL", "DEATH", "DEBATE", "DECIDE", "DECISION", "DEEP", "DEFENSE", "DEGREE", "DEMOCRATIC", "DESCRIPTION", "DESIGN", "DESIRE", "DETAIL", "DETERMINE", "DEVELOP", "DIE", "DIFFERENCE", "DIFFICULT", "DINNER", "DIRECT", "DISCUSS", "DISCUSSION", "DISEASE", "DO", "DOCTOR", "DOG", "DOOR", "DOWN", "DRAW", "DREAM", "DRIVE", "DROP", "DRUG", "DURING", "EACH"],
  E: ["EARLY", "EAST", "EASY", "EAT", "ECONOMIC", "ECONOMY", "EDGE", "EDUCATION", "EFFECT", "EFFORT", "EIGHT", "EITHER", "ELECTION", "ELSE", "EMPLOYEE", "END", "ENERGY", "ENJOY", "ENOUGH", "ENTER", "ENTIRE", "ENVIRONMENT", "ENVIRONMENTAL", "ESPECIALLY", "ESTABLISH", "EVEN", "EVENING", "EVENT", "EVER", "EVERY", "EVERYBODY", "EVERYONE", "EVERYTHING", "EVIDENCE", "EXACTLY", "EXAMPLE", "EXECUTIVE", "EXIST", "EXPECT", "EXPERIENCE", "EXPERT", "EXPLAIN", "EYE"],
  F: ["FACE", "FACT", "FACTOR", "FAIL", "FALL", "FAMILY", "FAR", "FAST", "FATHER", "FEAR", "FEDERAL", "FEEL", "FEELING", "FEW", "FIELD", "FIGHT", "FIGURE", "FILL", "FINAL", "FINALLY", "FINANCIAL", "FIND", "FINE", "FINGER", "FINISH", "FIRE", "FIRM", "FIRST", "FISH", "FIVE", "FLOOR", "FLY", "FOCUS", "FOLLOW", "FOOD", "FOOT", "FOR", "FORCE", "FOREIGN", "FORGET", "FORM", "FORMER", "FORWARD", "FOUR", "FREE", "FRIEND", "FROM", "FRONT", "FULL", "FUND", "FUTURE"],
  G: ["GATHER", "GAME", "GARDEN", "GAS", "GENERAL", "GENERATION", "GET", "GIRL", "GIVE", "GLASS", "GO", "GOAL", "GOOD", "GOVERNMENT", "GREAT", "GREEN", "GROUND", "GROUP", "GROW", "GROWTH", "GUESS", "GUN", "GUY"],
  H: ["HAIR", "HALF", "HAND", "HANG", "HAPPEN", "HAPPY", "HARD", "HAVE", "HE", "HEAD", "HEALTH", "HEAR", "HEART", "HEAT", "HEAVY", "HELP", "HER", "HERE", "HERSELF", "HIGH", "HIM", "HIMSELF", "HIS", "HISTORY", "HIT", "HOLD", "HOME", "HOPE", "HOSPITAL", "HOT", "HOTEL", "HOUR", "HOUSE", "HOW", "HOWEVER", "HUGE", "HUMAN", "HUNDRED", "HUSBAND"],
  I: ["IDEA", "IDENTIFY", "IF", "IMAGE", "IMAGINE", "IMPACT", "IMPORTANT", "IMPROVE", "IN", "INCLUDE", "INCLUDING", "INCOME", "INCREASE", "INDEED", "INDIVIDUAL", "INDUSTRY", "INFORMATION", "INSIDE", "INSTEAD", "INSTITUTION", "INTEREST", "INTERESTING", "INTERNATIONAL", "INTERVIEW", "INTO", "INVESTMENT", "INVOLVE", "ISSUE", "IT", "ITEM", "ITS", "ITSELF"],
  J: ["JOB", "JOIN", "JUST"],
  K: ["KEEP", "KILL", "KIND", "KING", "KNOW", "KNOWLEDGE"],
  L: ["LABOR", "LACK", "LAND", "LANGUAGE", "LARGE", "LAST", "LATE", "LATER", "LAUGH", "LAW", "LAWYER", "LAY", "LEAD", "LEADER", "LEARN", "LEAST", "LEAVE", "LEFT", "LEG", "LEGAL", "LESS", "LET", "LETTER", "LEVEL", "LIE", "LIFE", "LIGHT", "LIKE", "LIKELY", "LINE", "LIST", "LISTEN", "LITTLE", "LIVE", "LOCAL", "LONG", "LOOK", "LOSE", "LOSS", "LOT", "LOVE"],
  M: ["MACHINE", "MAGAZINE", "MAIN", "MAINTAIN", "MAJOR", "MAJORITY", "MAKE", "MAN", "MANAGE", "MANAGEMENT", "MANAGER", "MANY", "MARKET", "MARRIAGE", "MATERIAL", "MATTER", "MAY", "MAYBE", "ME", "MEAN", "MEASURE", "MEDIA", "MEDICAL", "MEET", "MEETING", "MEMBER", "MEMORY", "MENTION", "MESSAGE", "METHOD", "MIDDLE", "MIGHT", "MILE", "MILITARY", "MIND", "MINUTE", "MISS", "MISSION", "MODEL", "MODERN", "MOMENT", "MONEY", "MONTH", "MORE", "MORNING", "MOST", "MOTHER", "MOUTH", "MOVE", "MOVEMENT", "MOVIE", "MR", "MRS", "MUCH", "MUSIC", "MUST", "MY", "MYSELF"],
  N: ["NAME", "NATION", "NATIONAL", "NATURAL", "NATURE", "NEAR", "NEARLY", "NECESSARY", "NEED", "NETWORK", "NEVER", "NEW", "NEWS", "NEWSPAPER", "NEXT", "NICE", "NIGHT", "NO", "NONE", "NOR", "NOT", "NOTE", "NOTHING", "NOTICE", "NOW", "NUMBER"],
  O: ["OFF", "OFFICE", "OFFICER", "OFFICIAL", "OFTEN", "OH", "OIL", "OK", "OLD", "ON", "ONCE", "ONE", "ONLY", "ONTO", "OPEN", "OPERATION", "OPPORTUNITY", "OPTION", "OR", "ORDER", "ORGANIZATION", "OTHER", "OTHERS", "OUR", "OUT", "OUTSIDE", "OVER", "OWN", "OWNER"],
  P: ["PAGE", "PAIN", "PAINT", "PAINTING", "PAPER", "PARENT", "PART", "PARTICIPANT", "PARTICULAR", "PARTICULARLY", "PARTNER", "PARTY", "PASS", "PAST", "PATIENT", "PATTERN", "PAY", "PEACE", "PEOPLE", "PER", "PERFORM", "PERFORMANCE", "PERHAPS", "PERIOD", "PERSON", "PERSONAL", "PHONE", "PHYSICAL", "PICK", "PICTURE", "PIECE", "PLACE", "PLAN", "PLANT", "PLAY", "PLAYER", "POINT", "POLICE", "POLICY", "POLITICAL", "POLITICS", "POOR", "POPULAR", "POPULATION", "POSITION", "POSITIVE", "POSSIBLE", "POWER", "PRACTICE", "PREPARE", "PRESENT", "PRESIDENT", "PRESSURE", "PRETTY", "PREVENT", "PRICE", "PRIVATE", "PROBABLY", "PROBLEM", "PROCESS", "PRODUCE", "PRODUCT", "PRODUCTION", "PROFESSIONAL", "PROFESSOR", "PROGRAM", "PROJECT", "PROPERTY", "PROTECT", "PROVE", "PROVIDE", "PUBLIC", "PULL", "PURPOSE", "PUSH", "PUT"],
  Qu: ["QUALITY", "QUARTER", "QUESTION", "QUICKLY", "QUIET", "QUITE"],
  R: ["RACE", "RADIO", "RAISE", "RANGE", "RATE", "RATHER", "REACh", "READ", "READER", "REALITY", "REALIZE", "REALLY", "REASON", "RECEIVE", "RECENT", "RECENTLY", "RECOGNIZE", "RECORD", "RED", "RELATION", "RELATIONSHIP", "RELIGIOUS", "REMAIN", "REMEMBER", "REMOVE", "REPORT", "REPRESENT", "REPUBLICAN", "REQUIRE", "RESEARCH", "RESOURCE", "RESPOND", "RESPONSE", "REST", "RESULT", "RETURN", "REVEAL", "RICH", "RIGHT", "RISE", "RISK", "ROAD", "ROCK", "ROLE", "ROOM", "RULE", "RUN"],
  S: ["SAFE", "SAME", "SAVE", "SAY", "SCENE", "SCHOOL", "SCIENCE", "SCIENTIST", "SCORE", "SEA", "SEASON", "SEAT", "SECOND", "SECTION", "SECURITY", "SEE", "SEEK", "SEEM", "SELL", "SEND", "SENIOR", "SENSE", "SERIES", "SERIOUS", "SERVE", "SERVICE", "SET", "SEVEN", "SEVERAL", "SEX", "SEXUAL", "SHAKE", "SHARE", "SHE", "SHOOT", "SHOP", "SHORT", "SHOT", "SHOULD", "SHOULDER", "SHOW", "SIDE", "SIGN", "SIGNIFICANT", "SIMILAR", "SIMPLE", "SIMPLY", "SINCE", "SING", "SINGLE", "SISTER", "SIT", "SITE", "SITUATION", "SIX", "SIZE", "SKILL", "SKIN", "SMALL", "SMILE", "SO", "SOCIAL", "SOCIETY", "SOLDIER", "SOME", "SOMEBODY", "SOMEONE", "SOMETHING", "SOMETIMES", "SOMEWHAT", "SONG", "SOON", "SORT", "SOUND", "SOURCE", "SOUTH", "SOUTHERN", "SPACE", "SPEAK", "SPEAKER", "SPECIAL", "SPECIES", "SPECIFIC", "SPEECH", "SPEND", "SPORT", "SPRING", "STAFF", "STAGE", "STAND", "STANDARD", "STAR", "START", "STATE", "STATEMENT", "STATION", "STATISTICS", "STAY", "STEP", "STILL", "STOCK", "STOP", "STORE", "STORY", "STRATEGY", "STREET", "STRONG", "STRUCTURE", "STUDENT", "STUDY", "STUFF", "STYLE", "SUBJECT", "SUCCESS", "SUCCESSFUL", "SUCH", "SUDDENLY", "SUFFER", "SUGGEST", "SUMMER", "SUPPORT", "SURFACE", "SYSTEM"],
  T: ["TABLE", "TAKE", "TALK", "TASK", "TAX", "TEACH", "TEACHER", "TEACHING", "TEAM", "TECHNOLOGY", "TELEVISION", "TELL", "TEN", "TEND", "TERM", "TEST", "THAN", "THANK", "THAT", "THE", "THEIR", "THEM", "THEMSELVES", "THEN", "THEORY", "THERE", "THESE", "THEY", "THING", "THINK", "THIRD", "THIS", "THOSE", "THOUGH", "THOUGHT", "THOUSAND", "THREAT", "THREE", "THROUGH", "THROUGHOUT", "THROW", "THUS", "TIME", "TO", "TODAY", "TOGETHER", "TONIGHT", "TOO", "TOP", "TOTAL", "TOUGH", "TOWARD", "TOWN", "TRADE", "TRADITIONAL", "TRAINING", "TRAVEL", "TREAT", "TREATMENT", "TREE", "TRIAL", "TRIP", "TROUBLE", "TRUE", "TRUTH", "TRY", "TURN", "TV", "TWO", "TYPE"],
  U: ["UNDER", "UNDERSTAND", "UNIT", "UNITED", "UNIVERSITY", "UNLESS", "UNTIL", "UP", "UPON", "US", "USE", "USUALLY"],
  V: ["VALUE", "VARIOUS", "VERY", "VICTIM", "VIEW", "VIOLENCE", "VISIT", "VOICE", "VOTE"],
  W: ["WAIT", "WALK", "WALL", "WANT", "WAR", "WATCH", "WATER", "WAY", "WE", "WEAPON", "WEAR", "WEEK", "WEIGHT", "WELL", "WEST", "WESTERN", "WHAT", "WHATEVER", "WHETHER", "WHICH", "WHILE", "WHITE", "WHO", "WHOM", "WHOSE", "WHY", "WIDE", "WIFE", "WILL", "WIN", "WIND", "WINDOW", "WISH", "WITH", "WITHIN", "WITHOUT", "WOMAN", "WONDER", "WORD", "WORK", "WORKER", "WORLD", "WORRY", "WRITE", "WRITER", "WRONG"],
  Y: ["YARD", "YEAR", "YES", "YET", "YOU", "YOUNG", "YOUR", "YOURSELF"],
  Z: ["ZERO", "ZONE"],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Boggle Word Lists by Letter — Complete Reference",
  description:
    "Comprehensive Boggle word lists organized by letter with high-frequency words, common patterns, and letter-specific vocabulary for improving gameplay.",
  author: { "@type": "Organization", name: "WordGrid" },
  publisher: { "@type": "Organization", name: "WordGrid" },
  datePublished: "2026-06-29",
  dateModified: "2026-06-29",
  mainEntityOfPage: `${BASE_URL}/guides/boggle-word-lists/`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the most common Boggle words?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common Boggle words include high-frequency English words like THE, AND, THAT, HAVE, FOR, NOT, YOU, THIS, BUT, FROM, THEY, WITH, ARE, WAS, WERE, WHAT, WHEN, MAKE, TIME, JUST, KNOW, TAKE, YEAR, GOOD, SEE, COME, THINK, LOOK, WANT, GIVE, USE, FIND, TELL, ASK, WORK, SEEM, FEEL, TRY, LEAVE, CALL. These words appear frequently in grids and should be instantly recognizable.",
      },
    },
    {
      "@type": "Question",
      name: "How can I learn Boggle word lists?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Learn Boggle word lists by starting with high-frequency words organized by letter. Focus on S, R, T, N, E, A which appear in 65% of words. Practice 10-20 words per letter, focusing on common patterns like -TION, -NESS, -MENT, -ING. Play Daily Challenges to reinforce pattern recognition rather than rote memorization.",
      },
    },
    {
      "@type": "Question",
      name: "What words start with each letter in Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common Boggle words by starting letter: A-ABOUT, ACT, ADD; B-BACK, BALL, BASE; C-CALL, CAN, CARD; D-DARK, DATA, DAY; E-EACH, EARLY, EASY; F-FACE, FACT, FAIL; G-GAME, GENERAL, GET; H-HAND, HAPPEN, HAVE; I-IDEA, IDENTIFY, IF; J-JOB, JOIN; K-KEEP, KNOW; L-LABOR, LAND, LARGE; M-MAKE, MANAGE, MANY; N-NAME, NATION, NEED; O-OFFER, OFFICE, OPEN; P-PAGE, PARENT, PART; Qu-QUESTION, QUICKLY; R-RACE, RAISE, READ; S-SAFE, SAME, SAVE; T-TAKE, TALK, TASK; U-UNDER, UNIT, UNITED; V-VALUE, VARIOUS; W-WAIT, WALK, WANT; Y-YARD, YEAR, YES; Z-ZERO, ZONE.",
      },
    },
    {
      "@type": "Question",
      name: "What are high-value words for Boggle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "High-value Boggle words (5+ letters): -TION words (ACTION, CONDITION, MOTION, PROMOTION), -NESS words (KINDNESS, SADNESS, HAPPINESS), -MENT words (MOMENT, MOVEMENT, PAYMENT), and common 5+ letter words (ABOUT, ABOVE, AFTER, AGAINST, ALONG, AMONG, AROUND, BECAUSE, BEFORE, BEHIND, BELOW, BETTER, BETWEEN, BEYOND). These score 4-8 points each.",
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
    { "@type": "ListItem", position: 3, name: "Boggle Word Lists" },
  ],
};

export default function BoggleWordListsGuide() {
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
            Boggle Word Lists by Letter — Complete Reference
          </h1>
          <p className="text-text-muted">15 min read &middot; Updated June 2026</p>
        </header>

        <div className="space-y-6 text-text">
          <section>
            <p className="leading-relaxed">
              Building your <strong>Boggle vocabulary</strong> isn't about
              memorizing the dictionary. It's about learning high-frequency
              patterns and common words that appear regularly in grids.
            </p>
            <p className="leading-relaxed mt-3">
              These word lists are organized by letter and frequency to help you
              develop instant word recognition — the skill that separates 40-
              point players from 60+ champions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              How to Use These Word Lists
            </h2>
            <div className="bg-surface/50 rounded-xl p-4 border-l-4 border-primary">
              <ol className="space-y-2 list-decimal ml-4">
                <li>
                  <strong>Don't memorize.</strong> Browse these lists to build
                  pattern recognition.
                </li>
                <li>
                  <strong>Focus on anchors.</strong> S, R, T, N, E, A appear in
                  65% of words. Prioritize these.
                </li>
                <li>
                  <strong>Practice with Daily Challenges.</strong> Apply what you
                  see here in real games.
                </li>
                <li>
                  <strong>Look for patterns.</strong> -TION, -NESS, -MENT endings
                  are worth more points.
                </li>
                <li>
                  <strong>Think in word families.</strong> PLAY → PLAYED → PLAYING →
                  PLAYER → PLAYERS.
                </li>
              </ol>
            </div>
          </section>

          {Object.entries(WORD_LISTS).map(([letter, words]) => (
            <section key={letter}>
              <h2 className="text-2xl font-semibold text-primary mb-3">
                Words Starting with {letter}
              </h2>
              <div className="bg-surface/50 rounded-xl p-4">
                <p className="text-sm text-text-dim mb-3">
                  {words.length} common Boggle words
                </p>
                <div className="flex flex-wrap gap-2">
                  {words.map((word) => (
                    <span
                      key={word}
                      className="px-2 py-1 bg-surface rounded text-sm font-mono"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              High-Value Word Patterns
            </h2>
            <div className="space-y-4">
              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">-TION Words (6 points each)</h3>
                <div className="flex flex-wrap gap-2">
                  {["ACTION", "CONDITION", "MOTION", "NATION", "NOTION", "PROMOTION", "SECTION", "STATION"].map(
                    (word) => (
                      <span
                        key={word}
                        className="px-2 py-1 bg-primary/20 rounded text-sm font-mono"
                      >
                        {word}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">-NESS Words (6-8 points each)</h3>
                <div className="flex flex-wrap gap-2">
                  {["HAPPINESS", "SADNESS", "KINDNESS", "DARKNESS", "WEAKNESS", "FITNESS"].map(
                    (word) => (
                      <span
                        key={word}
                        className="px-2 py-1 bg-primary/20 rounded text-sm font-mono"
                      >
                        {word}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">-MENT Words (6 points each)</h3>
                <div className="flex flex-wrap gap-2">
                  {["MOMENT", "MOVEMENT", "PAYMENT", "JUDGMENT", "AGREEMENT", "DEVELOPMENT"].map(
                    (word) => (
                      <span
                        key={word}
                        className="px-2 py-1 bg-primary/20 rounded text-sm font-mono"
                      >
                        {word}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-surface/50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Qu Words (5-6 points each)</h3>
                <div className="flex flex-wrap gap-2">
                  {["QUICK", "QUEST", "QUOTE", "QUIZ", "QUIET", "QUITE", "QUALITY", "QUARTER"].map(
                    (word) => (
                      <span
                        key={word}
                        className="px-2 py-1 bg-primary/20 rounded text-sm font-mono"
                      >
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
              Word Extensions Reference
            </h2>
            <p className="leading-relaxed mb-3">
              Every word you find can generate multiple related words:
            </p>
            <div className="bg-surface/50 rounded-xl p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-text-muted">Base</th>
                    <th className="text-left py-2 text-text-muted">Extensions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["PLAY", "PLAYS, PLAYED, PLAYING, PLAYER, PLAYERS, REPLAY"],
                    ["RUN", "RUNS, RAN, RUNNING, RUNNER, RUNNERS"],
                    ["HAPPY", "HAPPINESS, HAPPIER, HAPPIEST, UNHAPPY"],
                    ["KIND", "KINDNESS, KINDER, KINDEST, UNKIND"],
                    ["CLEAR", "CLEARS, CLEARED, CLEARING, CLEARLY, UNCLEAR"],
                  ].map(([base, extensions]) => (
                    <tr key={base} className="border-b border-surface">
                      <td className="py-2 font-mono font-semibold">{base}</td>
                      <td className="py-2 text-xs">{extensions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-surface/50 rounded-xl p-4" open>
                <summary className="font-semibold cursor-pointer">
                  What are the most common Boggle words?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Most common Boggle words: THE, AND, THAT, HAVE, FOR, NOT, YOU,
                  THIS, BUT, FROM, THEY, WITH, ARE, WAS, WERE, WHAT, WHEN,
                  MAKE, TIME, JUST, KNOW, TAKE, YEAR, GOOD, SEE, COME, THINK,
                  LOOK, WANT, GIVE, USE, FIND, TELL, ASK, WORK, SEEM, FEEL,
                  TRY, LEAVE, CALL. These appear frequently in grids.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  How can I learn Boggle word lists?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  Learn Boggle word lists by focusing on high-frequency words by
                  letter. Start with S, R, T, N, E, A (65% of words). Practice
                  10-20 words per letter, focusing on patterns like -TION, -NESS,
                  -MENT. Play Daily Challenges to reinforce recognition rather
                  than memorization.
                </p>
              </details>
              <details className="bg-surface/50 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer">
                  What are high-value words for Boggle?
                </summary>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">
                  High-value Boggle words (5+ letters): -TION words (ACTION,
                  CONDITION, MOTION), -NESS words (KINDNESS, SADNESS, HAPPINESS),
                  -MENT words (MOMENT, MOVEMENT, PAYMENT), and common 5+ letter
                  words (ABOUT, ABOVE, AFTER, AGAINST, BETWEEN, BEYOND). These
                  score 4-8 points each.
                </p>
              </details>
            </div>
          </section>

          <div className="mt-8 p-6 bg-indigo-900/30 rounded-xl border border-indigo-800/50">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Practice These Word Lists
            </h2>
            <p className="text-text mb-4">
              Don't memorize — practice. Play games and look for these patterns.
              Daily Challenges are perfect for building word recognition.
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
            <h2 className="text-lg font-semibold mb-3">Keep Reading</h2>
            <div className="space-y-3">
              <Link
                href="/guides/most-common-boggle-words/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Most Common Boggle Words →
                </div>
                <div className="text-sm text-text-muted">
                  Top 100 most frequently found words in Boggle.
                </div>
              </Link>
              <Link
                href="/guides/advanced-boggle-strategies/"
                className="block bg-surface/50 hover:bg-surface transition rounded-xl p-4"
              >
                <div className="font-semibold text-primary">
                  Advanced Boggle Strategies →
                </div>
                <div className="text-sm text-text-muted">
                  Expert-level techniques for consistently high scores.
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
