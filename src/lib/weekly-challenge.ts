import { generateGrid, type Grid } from "@/lib/boggle";

export type WeeklyChallenge = {
  id: string;
  title: string;
  detail: string;
  focus: "qu" | "long" | "quick";
  grid: Grid;
};

function mondayUtc(date = new Date()): Date {
  const value = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = value.getUTCDay() || 7;
  value.setUTCDate(value.getUTCDate() - day + 1);
  return value;
}

function weekId(date = new Date()): string {
  return mondayUtc(date).toISOString().slice(0, 10);
}

function seedFromWeek(id: string): number {
  return [...id].reduce((seed, char) => ((seed * 31) + char.charCodeAt(0)) >>> 0, 17);
}

export function getWeeklyChallenge(date = new Date()): WeeklyChallenge {
  const id = weekId(date);
  const index = Math.floor(Date.parse(`${id}T00:00:00Z`) / 604800000) % 3;
  const themes: Array<Omit<WeeklyChallenge, "id" | "grid">> = [
    {
      title: "Qu Hunt",
      detail: "This week, scan the Qu tile early and build outward through nearby vowels.",
      focus: "qu",
    },
    {
      title: "Long Word Run",
      detail: "This week, slow down long enough to extend promising paths into 5+ letter words.",
      focus: "long",
    },
    {
      title: "Quick Grab Sprint",
      detail: "This week, sweep for short, reliable words first, then return for higher-value paths.",
      focus: "quick",
    },
  ];
  const theme = themes[index];
  return { id, ...theme, grid: generateGrid(seedFromWeek(id)) };
}
