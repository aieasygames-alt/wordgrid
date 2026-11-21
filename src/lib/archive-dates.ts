import { todayDateString } from "./boggle";

// Preserve every date that could have been published by the original 30-day
// archive, first committed on 2026-07-09. Published URLs never roll out of range.
export const ARCHIVE_START_DATE = "2026-06-10";

export function isPublishedArchiveDate(date: string, anchor = todayDateString()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date
    && date >= ARCHIVE_START_DATE && date <= anchor;
}

export function getPublishedArchiveDates(anchor = todayDateString()): string[] {
  if (!isPublishedArchiveDate(anchor, anchor)) return [];
  const count = Math.floor((Date.parse(`${anchor}T00:00:00Z`) - Date.parse(`${ARCHIVE_START_DATE}T00:00:00Z`)) / 86400000) + 1;
  return Array.from({ length: count }, (_, index) =>
    new Date(Date.parse(`${anchor}T00:00:00Z`) - index * 86400000).toISOString().slice(0, 10)
  );
}
