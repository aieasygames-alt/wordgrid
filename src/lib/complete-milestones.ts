// Compare an intentional local move with its previous state. Restoring saved
// progress does not call this function and cannot replay earlier milestones.
export function crossedCompleteMilestones(before: number, after: number, total: number): number[] {
  if (total <= 0 || after <= before) return [];
  return [20, 40, 60, 100].filter((percent) => before * 100 < total * percent && after * 100 >= total * percent);
}
