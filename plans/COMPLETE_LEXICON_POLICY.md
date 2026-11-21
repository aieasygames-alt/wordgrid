# Complete editorial lexicon policy

The original `lexicon-v1.json` and `bank-v1.json` are retained byte for byte.
Version 2 combines that independently assembled spelling list with an explicit
list of everyday nouns, verbs, adjectives and inflections edited for this project.
No licensed tournament dictionary, scraped puzzle answers, definitions or external
frequency corpus is imported. Additions are ordinary English spellings; no claim
is made that this is an official or exhaustive dictionary.

Required additions emphasize familiar vocabulary and ordinary inflections. Less
familiar spellings and short word-game variants belong to the bonus list. Every
entry must have 4–16 letters, be explicitly listed, and have a legal route on a
board before it is recognized. The generator de-duplicates entries and puts any
required/bonus overlap in required. No automatic suffix production is used.

Published legacy boards retain their original tiles, targets, bonuses, versions,
difficulty labels and score limits. Newly covered spellings are shown separately
as **recognized extras, zero points**. They are stored separately and are never
sent as ranked words. For example STAND/TANS can be acknowledged on the original
UNDERSTAND board without changing its ten targets, score or existing ranking.

From November 23, 2026, new daily boards use `wordgrid-editorial-2`. Their expanded
non-target coverage is scored as bonuses. The old bank remains available for old
clients and the API accepts a legacy current-day version as its own ranking.
Do not rewrite published versions when correcting a list; plan the next cutover.

New anchors follow randomized adjacent, non-repeating walks with bends and
diagonals, rather than a rotated/mirrored fixed snake. A board's difficulty model
uses target count, total long-word burden and representative path direction
changes. This is an editorial estimate; player completion/abandonment evidence
is still needed for empirical calibration. The generated quality report exposes
the distribution and path metrics for review.
