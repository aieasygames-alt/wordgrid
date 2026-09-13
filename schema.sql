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
