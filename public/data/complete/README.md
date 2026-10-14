# WordGrid Complete editorial data

This dataset was independently assembled for WordGrid Complete. It does not use
Squaredle boards, its encoded answers, NASPA's word list, definitions, images,
audio, or branding. `lexicon-v1.json` is a limited set of ordinary English
spellings, not a licensed tournament dictionary or an exhaustive English lexicon.

- Editorial version: wordgrid-editorial-1
- 635 target spellings (common words and longer word families), 82 bonus spellings
- Rules: at least four letters; adjacent including diagonals; no tile reuse;
  Qu contributes QU; bonuses are optional; reveals award zero points.
- Generation is offline and deterministic. Every board has 10-36 targets and
  at least one eight-letter target; boards are unique within the bank.
- First published batch: 2026-10-14 through 2027-10-13, midnight UTC+8.

Regenerate with `npm run generate:complete`. To extend coverage, regenerate from
the same start date with more days, e.g. `npm run generate:complete -- 2026-10-14 730`.
The deterministic stream keeps existing puzzle boards unchanged when only the
number of days increases. Do not replace an active bank with a different start
or silently change a published lexicon: version changes invalidate progress and
separate leaderboard records. Future rule or dictionary changes should publish
an explicitly versioned bank and coordinate both client and server consumers.

Answers are intentionally shipped as readable JSON. This is a casual untimed
game, not an answer-private or cheat-proof competition. Individual word status
may differ from larger dictionaries. New words must be editorially reviewed.
