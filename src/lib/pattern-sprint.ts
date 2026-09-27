import { generateGrid, type Grid } from "@/lib/boggle";

export type PatternFocus = "qu" | "prefix" | "suffix" | "long" | "quick";

export type PatternSprint = {
  id: PatternFocus;
  label: string;
  title: string;
  description: string;
  tip: string;
  grid: Grid;
};

const SPRINTS: Record<PatternFocus, Omit<PatternSprint, "grid">> = {
  qu: {
    id: "qu",
    label: "Qu paths",
    title: "Qu Pattern Sprint",
    description: "Use a short round to train the Qu tile before it disappears into the rest of the board.",
    tip: "Start at Qu, test every neighboring vowel, then branch into common endings.",
  },
  prefix: {
    id: "prefix",
    label: "Prefixes",
    title: "Prefix Pattern Sprint",
    description: "Practice turning a familiar start into several complete word paths under a short clock.",
    tip: "When you spot RE, UN, IN, or PRE, look for multiple continuations before moving on.",
  },
  suffix: {
    id: "suffix",
    label: "Suffixes",
    title: "Suffix Pattern Sprint",
    description: "Train your eye to extend a valid stem with familiar endings before time runs out.",
    tip: "After finding a base word, test nearby S, ED, ER, and ING routes.",
  },
  long: {
    id: "long",
    label: "Long words",
    title: "Long Word Sprint",
    description: "Spend 30 seconds prioritizing paths that can grow into five letters or more.",
    tip: "Follow promising stems one tile farther than feels obvious before collecting short words.",
  },
  quick: {
    id: "quick",
    label: "Quick grabs",
    title: "Quick Grab Sprint",
    description: "Build scan speed with a short round focused on clear, reliable finds.",
    tip: "Sweep by starting letter and collect easy three- and four-letter words first.",
  },
};

const SEEDS: Record<PatternFocus, number> = {
  qu: 2026092701,
  prefix: 2026092702,
  suffix: 2026092703,
  long: 2026092704,
  quick: 2026092705,
};

export function getPatternFocus(value: string | null | undefined): PatternFocus {
  return value === "qu" || value === "prefix" || value === "suffix" || value === "long" || value === "quick"
    ? value
    : "quick";
}

export function getPatternSprint(focus: PatternFocus): PatternSprint {
  return { ...SPRINTS[focus], grid: generateGrid(SEEDS[focus]) };
}
