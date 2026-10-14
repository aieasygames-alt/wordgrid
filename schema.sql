CREATE TABLE IF NOT EXISTS challenge_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  board TEXT NOT NULL,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  found INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS challenge_scores_board_score
  ON challenge_scores (board, score DESC, found DESC);

-- WordGrid Complete: server-derived points, one best entry per browser and puzzle version.
CREATE TABLE IF NOT EXISTS complete_scores (
  puzzle_id TEXT NOT NULL,
  puzzle_version TEXT NOT NULL,
  player_id TEXT NOT NULL,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  found INTEGER NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  PRIMARY KEY (puzzle_id, puzzle_version, player_id)
);
CREATE INDEX IF NOT EXISTS complete_scores_rank
  ON complete_scores (puzzle_id, puzzle_version, score DESC, found DESC, created_at ASC);
CREATE TABLE IF NOT EXISTS complete_rate_limits (
  bucket TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  requests INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS complete_rate_limits_expiry ON complete_rate_limits (expires_at);
