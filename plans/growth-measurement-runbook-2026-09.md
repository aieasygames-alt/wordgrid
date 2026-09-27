# WordGrid Growth Measurement Runbook

## Purpose

Use this runbook after the play-loop, Pattern Sprint, and Daily Challenge updates deploy. It separates three questions that should not be conflated:

1. Can search users find and choose the right page?
2. Does the landing page start and complete a game?
3. Does a finished game create a useful next action, return visit, or shared challenge?

The historical search comparison point is `plans/seo-measurement-baseline-2026-08-15.md`. Do not compare a partial day with a full 28-day window.

## GA4 Event Dictionary

| Funnel stage | Event | Required dimensions | Decision use |
| --- | --- | --- | --- |
| Entry | `homepage_game_start_click` | `board_size`, `page_path` | Does the homepage primary action earn starts? |
| Start | `game_start` | `mode`, `board_size`, `page_path` | Which mode and entry page initiate real sessions? |
| Finish | `game_complete` | `mode`, `board_size`, `score`, `words_found`, `duration_seconds` | Completion and quality by game type. |
| Result loop | `result_next_action` | `action`, `mode`, `board_size` | Do results send players to Daily, Solver, challenge, or archive? |
| Learning | `training_recommendation_open` | `focus`, `destination` | Is post-game training relevant enough to open? |
| Training | `pattern_sprint_start`, `pattern_sprint_complete` | `focus`, `score`, `words_found`, `source` | Does focused practice complete and lead back to play? |
| Review | `solver_review_start`, `solver_solve` | `source`, `board_size` | Does review support the learning loop? |
| Social | `share_result` | `mode`, `result_type`, `board_size` | Which share format people use. |
| Challenge | `challenge_open`, `challenge_start`, `challenge_complete`, `challenge_return_score` | `board_size`, `challenge_mode`, `has_target`, `score` | Does a shared board become a completed challenge? |
| Scoreboard | `friend_challenge_score_saved` | `board_size`, `source` | Are played results saved rather than merely opened? |
| Content assist | `guide_cta_click` | `guide_slug`, `destination` | Which guides move readers into a product route? |

Never send full word input, a player's name, raw challenge URL, or free-text query as analytics parameters.

## GA4 Explorations

Build three saved explorations. Use `page_path` as a breakdown where sample size allows.

### 1. Acquisition to First Game

1. Sessions landing on `/`, `/play`, `/daily`, `/solver`, and priority guides.
2. `game_start` users.
3. `game_complete` users.
4. `result_next_action` users.

Report start rate as `game_start users / landing sessions` and completion rate as `game_complete users / game_start users`. Segment by device and landing page before changing design.

### 2. Post-Game Learning Loop

1. `game_complete`.
2. `training_recommendation_open` or `solver_review_start`.
3. `pattern_sprint_start` or `solver_solve`.
4. A later `game_start` in the same 7-day user window.

The useful comparison is post-game training/review adoption, not raw total events. Review the `focus` dimension to learn whether Qu, prefixes, suffixes, long words, or quick scans create follow-through.

### 3. Daily Social Loop

1. Daily `game_complete`.
2. `result_next_action` where action is `daily_challenge`.
3. `challenge_open` where source is `daily`.
4. `challenge_start` where `challenge_mode` is `daily`.
5. `challenge_complete`.
6. `challenge_return_score` and `friend_challenge_score_saved` where source is `played_challenge`.

Treat a scoreboard save as the completion signal. A copied link alone is intent, not successful social activation.

## Search Review Cadence

### Day 7: crawl and integrity

- Inspect GSC Pages for `/training/`, `/daily/`, `/play/`, `/solver/`, and refreshed guide URLs.
- Confirm canonical selection, sitemap discovery, mobile usability, and no new excluded URLs.
- Inspect Bing Webmaster crawl/index status for the same page set.
- Do not alter title tags based on seven days of CTR.

### Day 14: early CTR read

- Export GSC query, page, device, and country reports for a comparable 14-day period.
- Export Bing Webmaster query, page, device, and overview reports for the same dates.
- Compare `/`, `/daily/`, `/play/`, `/solver/`, and the four online-play guide URLs against the baseline.
- Segment `word grid`, `word grid game`, `boggle solver`, and the Boggle online query cluster.

Mark each page: `keep`, `iterate snippet`, `add content module`, or `diagnose intent mismatch`. Do not make URL consolidation decisions from low-volume rows.

### Day 30: product and SEO decision

- Compare equivalent 28- or 30-day windows with the baseline.
- Keep a snippet change when CTR improves and average position is within approximately two positions.
- Diagnose a page when impressions persist but CTR stays low after a rewritten snippet and above-fold intent match.
- Consolidate overlapping guide URLs only after query-level evidence identifies a clear primary page. Implement permanent redirects and update internal links in the same release.
- Compare GA4 completion, result action, training adoption, and Daily challenge return rates by landing source.

## Decision Thresholds

These are initial operating thresholds, not success claims:

| Metric | First decision threshold |
| --- | --- |
| Homepage start rate | Improve at least 20% from the deployment baseline. |
| Game completion rate | Track by timed, Zen, Daily, and challenge; investigate any mode falling 15% below its own baseline. |
| Post-game next action rate | Reach 20% of completed rounds. |
| Training recommendation open rate | Establish baseline; keep a focus only when it generates later game starts. |
| Daily challenge activation | Establish baseline; measure `daily_challenge` action to `challenge_start`. |
| Scoreboard completion | Measure `played_challenge` saves per Daily challenge start. |
| GSC total CTR | Improve from the historical 1.89% baseline toward 2.3%+ without a material rank decline. |

## Weekly Operating Notes

- Log release date, changed URLs, title/description changes, and major game-loop changes in the analytics annotation or a release note.
- Use consent-aware GA4 data only. A consent decline means the funnel sample is smaller, not that a user failed to act.
- Keep server-side challenge scores separate from game completion analytics: the score endpoint is a shared-board convenience, not anti-cheat infrastructure.
- Do not publish local-device stats, player names, or raw boards as SEO content.
