# WordGrid upgrades — 2026-11-21

The static daily archive previously depended on the last manual build date and
expired URLs after 30 days. Builds now preserve dates from June 10, 2026 onward,
solve each requested board once per worker, and include those dates in the sitemap.
The archive calls its newest entry the latest published board so a delayed build
does not label an old board as today.

The daily refresh workflow validates the site at 00:15 and 12:15 UTC+8, then
advances a date file on main to trigger the existing Cloudflare Pages Git deployment.
GitHub schedules may be delayed. Workflow success, deployment success, and the
public archive/sitemap should all be checked when investigating freshness.

## Changed search and product entry points

- `/`: identifies WordGrid as the free word grid game while retaining instant play.
- `/play/`: describes unlimited practice with three sizes and Timed/Zen modes.
- `/daily/`: distinguishes the shared daily 4×4 challenge.
- `/guides/boggle-dictionary/`: puts the existing checker before navigation cards
  and long-form copy; describes the current 3–6 letter game dictionary.
- `/guides/boggle-rules-beginners/`: adds a legal TAP path and the WordGrid
  1/2/4/6 score table before the full article, with a tracked play link.
- `/guides/boggle-generator/`: generates and previews 4×4, 5×5, or 6×6 boards;
  both play links and sharing preserve every displayed tile.
- `/guides/boggle-word-lists/` and `/guides/most-common-boggle-words/`: retain the
  study lists and add tracked links to relevant training focuses.
- `/training/`: makes the first render stable before reading the URL focus;
  Qu and prefix boards now have verified matching word paths.

Only changed entry points receive the new sitemap modification date. Existing
solver URLs retain their current canonical/indexing behavior. Search engines
may rewrite snippets; compare the same queries, countries, and devices after
14–28 days before attributing a CTR change to these edits.

## Measurement

The existing GA4 measurement ID is retained. Consent defaults, saved consent,
and property configuration are queued in order before the asynchronous tag
loads. Consent updates preserve the installed `gtag` and its Arguments queue
format. Local and preview hosts do not configure the production property.

Added events:

| Events | Parameters and meaning |
| --- | --- |
| `word_check_submit`, `word_check_result` | Word length and result only |
| `generator_generate`, `generator_play`, `generator_share_success` | Size, mode, and successful sharing method |
| `complete_tutorial_start`, `complete_tutorial_finish`, `complete_tutorial_skip` | Entry source, tutorial step, practice flag |
| `complete_first_word` | First live find, target/bonus type |
| `complete_milestone` | Newly crossed 20/40/60/100% thresholds and counts |
| `complete_share_success` | Successful share/copy and collection counts |

Restoring or syncing saved Complete progress does not replay milestones. New
custom events do not include submitted words, names, or board payloads. Tag
queue tests confirm client behavior; successful GA4 ingestion still requires
verification in the production property's Realtime/DebugView after deployment.

PWA copy now describes a home-screen shortcut and requires an internet
connection. README documents UTC+8 daily dates and Complete's published indexable
state. Full offline caching and dependency upgrades remain separate work.

## Validation

- `npm test`: 20 passing tests, including all 365 Complete puzzles, SQLite API
  validation, retained archive URLs, UTC+8 boundary dates, exact-board links,
  consent queue ordering, collection milestones, and matching training words.
- `npm run lint`: no warnings or errors.
- `npm run build`: production static export, 493 generated pages, 485 sitemap
  URLs, including 165 archive dates through November 21, 2026.
- Every sitemap URL resolves to an exported HTML file. Changed landing pages
  have one canonical URL and remain indexable.
- Browser checks cover exact 6×6 board reuse in Zen, a valid dictionary word
  and invalid spaced input, all three tutorial steps, first find and restored
  progress, and mobile generator/checker layout without document overflow.

The next day's scheduled archive build and GA4 ingestion cannot be inferred
from a local build. Check them independently after publication.
