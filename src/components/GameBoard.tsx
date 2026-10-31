"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Grid, isValidPath, scoreWord, LETTER_POINTS } from "@/lib/boggle";
import { loadDictionary, Trie } from "@/lib/dictionary";
import { sounds } from "@/lib/sounds";
import Timer from "./Timer";
import ThemeToggle from "./ThemeToggle";
import { trackEvent } from "@/lib/analytics";

interface FoundWord {
  word: string;
  score: number;
}

interface GameBoardProps {
  grid: Grid;
  initialDuration?: number;
  startPaused?: boolean;
  onStart?: () => void;
  onComplete?: (
    words: FoundWord[],
    totalScore: number,
    trie: Trie | null,
    bestCombo: number
  ) => void;
}

interface CellPos {
  row: number;
  col: number;
}

const MUTE_KEY = "wordgrid-muted";
const DURATION_KEY = "wordgrid-duration";
const DURATION_OPTIONS = [
  { label: "3 min", value: 180 },
  { label: "5 min", value: 300 },
  { label: "Zen", value: 0 },
];

export default function GameBoard({ grid, initialDuration, startPaused = false, onStart, onComplete }: GameBoardProps) {
  const boardSize = grid.length;
  const [selected, setSelected] = useState<CellPos[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [comboBurst, setComboBurst] = useState<number | null>(null);
  const [trie, setTrie] = useState<Trie | null>(null);
  const [dictError, setDictError] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(!startPaused);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(initialDuration ?? 180);
  const [durationReady, setDurationReady] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [floatingScore, setFloatingScore] = useState<{ score: number; word: string; key: number } | null>(null);
  const floatingTimerRef = useRef<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const cellRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const completedRef = useRef(false);
  const foundWordsRef = useRef<FoundWord[]>([]);
  const trieRef = useRef<Trie | null>(null);
  const selectedRef = useRef<CellPos[]>([]);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const comboBurstTimerRef = useRef<number | null>(null);
  const gameStartTrackedRef = useRef(false);

  // Keep refs in sync
  useEffect(() => { foundWordsRef.current = foundWords; }, [foundWords]);
  useEffect(() => { trieRef.current = trie; }, [trie]);
  useEffect(() => { selectedRef.current = selected; }, [selected]);
  useEffect(() => { bestComboRef.current = bestCombo; }, [bestCombo]);

  // Load saved duration
  useEffect(() => {
    if (typeof initialDuration === "number") {
      setDuration(initialDuration);
      setDurationReady(true);
      return;
    }
    const saved = localStorage.getItem(DURATION_KEY);
    if (saved) setDuration(parseInt(saved, 10));
    setDurationReady(true);
  }, [initialDuration]);

  useEffect(() => {
    const updateViewport = () => setViewportWidth(window.innerWidth);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    loadDictionary()
      .then(setTrie)
      .catch(() => setDictError(true));
  }, []);

  useEffect(() => {
    if (!durationReady || !hasStarted || gameStartTrackedRef.current) return;
    gameStartTrackedRef.current = true;
    trackEvent("game_start", {
      mode: duration === 0 ? "zen" : "timed",
      board_size: boardSize,
    });
  }, [boardSize, duration, durationReady, hasStarted]);

  useEffect(() => {
    setMuted(localStorage.getItem(MUTE_KEY) === "1");
  }, []);

  const playSound = useCallback(
    (fn: () => void) => {
      if (!muted) fn();
    },
    [muted]
  );

  const currentWord = selected
    .map((p) => grid[p.row][p.col].letter)
    .join("");

  const getCellAt = useCallback((x: number, y: number): CellPos | null => {
    for (let r = 0; r < boardSize; r++) {
      for (let c = 0; c < boardSize; c++) {
        const el = cellRefs.current[r]?.[c];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          return { row: r, col: c };
        }
      }
    }
    return null;
  }, [boardSize]);

  const getCellCenter = useCallback((r: number, c: number): { x: number; y: number } | null => {
    const el = cellRefs.current[r]?.[c];
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const boardRect = boardRef.current?.getBoundingClientRect();
    if (!boardRect) return null;
    return {
      x: rect.left + rect.width / 2 - boardRect.left,
      y: rect.top + rect.height / 2 - boardRect.top,
    };
  }, []);

  // SVG path string for selected cells
  const pathD = useMemo(() => {
    if (selected.length === 0) return "";
    const points: { x: number; y: number }[] = [];
    for (const cell of selected) {
      const center = getCellCenter(cell.row, cell.col);
      if (center) points.push(center);
    }
    if (points.length === 0) return "";
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  }, [selected, getCellCenter]);

  const isCellSelected = (r: number, c: number) =>
    selected.some((s) => s.row === r && s.col === c);

  const trySubmit = useCallback(() => {
    const sel = selectedRef.current;
    if (sel.length < 3) return; // silent on too-short when releasing

    if (!isValidPath(sel)) return;

    const word = sel
      .map((p) => grid[p.row][p.col].letter)
      .join("")
      .toUpperCase();

    if (foundWordsRef.current.some((f) => f.word === word)) {
      setError("Already found");
      setCombo(0);
      comboRef.current = 0;
      triggerFlash("wrong");
      playSound(sounds.error);
      return;
    }
    if (dictError) {
      setError("Dictionary failed to load. Refresh page.");
      return;
    }
    if (!trieRef.current) {
      setError("Dictionary loading…");
      return;
    }
    if (!trieRef.current.contains(word)) {
      setError("Not a valid word");
      setCombo(0);
      comboRef.current = 0;
      triggerFlash("wrong");
      playSound(sounds.error);
      shakeBoard();
      return;
    }

    const score = scoreWord(word);
    setFoundWords((prev) => [...prev, { word, score }]);
    setFloatingScore({ score, word, key: Date.now() });
    if (floatingTimerRef.current) window.clearTimeout(floatingTimerRef.current);
    floatingTimerRef.current = window.setTimeout(() => setFloatingScore(null), 850);

    const nextCombo = comboRef.current + 1;
    comboRef.current = nextCombo;
    setCombo(nextCombo);
    if (nextCombo > bestComboRef.current) {
      bestComboRef.current = nextCombo;
      setBestCombo(nextCombo);
    }
    if (nextCombo === 3 || nextCombo === 5) {
      if (comboBurstTimerRef.current) {
        window.clearTimeout(comboBurstTimerRef.current);
      }
      setComboBurst(nextCombo);
      playSound(() => sounds.comboBurst(nextCombo));
      comboBurstTimerRef.current = window.setTimeout(() => {
        setComboBurst(null);
        comboBurstTimerRef.current = null;
      }, nextCombo === 5 ? 900 : 700);
    }
    setSelected([]);
    setError(null);
    triggerFlash("correct");
    playSound(() => sounds.correct(word.length, nextCombo));
  }, [grid, dictError, playSound]);

  const handlePointerDown = (e: React.PointerEvent, r: number, c: number) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (gameOver || !hasStarted) return;
    e.preventDefault();
    setIsDragging(true);
    setSelected([{ row: r, col: c }]);
    setError(null);
    playSound(() => sounds.select(0));
  };

  const handleCellClick = (r: number, c: number) => {
    if (gameOver || !hasStarted) return;
    const current = selectedRef.current;
    const last = current[current.length - 1];
    if (!last) {
      setSelected([{ row: r, col: c }]);
      playSound(() => sounds.select(0));
      return;
    }
    const dr = Math.abs(r - last.row);
    const dc = Math.abs(c - last.col);
    if (dr <= 1 && dc <= 1 && dr + dc > 0 && !current.some((cell) => cell.row === r && cell.col === c)) {
      setSelected([...current, { row: r, col: c }]);
      playSound(() => sounds.select(current.length));
    }
  };

  const handleCellKeyDown = (e: React.KeyboardEvent, r: number, c: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCellClick(r, c);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      setSelected((current) => current.slice(0, -1));
    } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      const nextRow = Math.max(0, Math.min(boardSize - 1, r + (e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0)));
      const nextCol = Math.max(0, Math.min(boardSize - 1, c + (e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0)));
      const next = document.querySelector<HTMLElement>(`[aria-label="Row ${nextRow + 1} column ${nextCol + 1}, letter ${grid[nextRow][nextCol].letter}"]`);
      next?.focus();
    }
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || gameOver || !hasStarted) return;
      const pos = getCellAt(e.clientX, e.clientY);
      if (!pos) return;

      const idx = selected.findIndex((s) => s.row === pos.row && s.col === pos.col);
      if (idx !== -1) {
        if (idx === selected.length - 2) {
          setSelected(selected.slice(0, -1));
        }
        return;
      }

      const last = selected[selected.length - 1];
      if (!last) return;
      const dr = Math.abs(pos.row - last.row);
      const dc = Math.abs(pos.col - last.col);
      if (dr <= 1 && dc <= 1 && dr + dc > 0) {
        if (!selected.some((s) => s.row === pos.row && s.col === pos.col)) {
          setSelected([...selected, pos]);
          playSound(() => sounds.select(selected.length));
        }
      }
    },
    [isDragging, selected, getCellAt, gameOver, hasStarted, playSound]
  );

  // P0-2: Submit on pointer up
  const handlePointerUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      trySubmit();
    }
  }, [isDragging, trySubmit]);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Keyboard typing support for fast desktop arcade gameplay
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (gameOver || !hasStarted) return;
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key === "Enter") {
        e.preventDefault();
        trySubmit();
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        setSelected((curr) => curr.slice(0, -1));
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setSelected([]);
        setError(null);
        return;
      }

      const keyUpper = e.key.toUpperCase();
      if (/^[A-Z]$/.test(keyUpper)) {
        const curr = selectedRef.current;
        const last = curr[curr.length - 1];
        const targetLetter = keyUpper === "Q" ? "QU" : keyUpper;

        if (!last) {
          for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
              if (grid[r][c].letter.toUpperCase() === targetLetter) {
                setSelected([{ row: r, col: c }]);
                playSound(() => sounds.select(0));
                return;
              }
            }
          }
        } else {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = last.row + dr;
              const nc = last.col + dc;
              if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
                if (!curr.some((p) => p.row === nr && p.col === nc)) {
                  if (grid[nr][nc].letter.toUpperCase() === targetLetter) {
                    setSelected([...curr, { row: nr, col: nc }]);
                    playSound(() => sounds.select(curr.length));
                    return;
                  }
                }
              }
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [gameOver, hasStarted, boardSize, grid, trySubmit, playSound]);

  useEffect(() => {
    return () => {
      if (comboBurstTimerRef.current) {
        window.clearTimeout(comboBurstTimerRef.current);
      }
      if (floatingTimerRef.current) {
        window.clearTimeout(floatingTimerRef.current);
      }
    };
  }, []);

  const triggerFlash = (type: "correct" | "wrong") => {
    setFlash(type);
    setTimeout(() => setFlash(null), 300);
  };

  const shakeBoard = () => {
    const board = document.getElementById("game-board");
    if (board) {
      board.classList.add("animate-shake");
      setTimeout(() => board.classList.remove("animate-shake"), 400);
    }
  };

  const finishGame = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setGameOver(true);
    playSound(sounds.gameEnd);
    const current = foundWordsRef.current;
    const total = current.reduce((s, w) => s + w.score, 0);
    trackEvent("game_complete", {
      mode: duration === 0 ? "zen" : "timed",
      board_size: boardSize,
      score: total,
      words_found: current.length,
      duration_seconds: duration,
    });
    onComplete?.(current, total, trieRef.current, bestComboRef.current);
  }, [boardSize, duration, onComplete, playSound]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    localStorage.setItem(MUTE_KEY, next ? "1" : "0");
  };

  const changeDuration = (val: number) => {
    setDuration(val);
    localStorage.setItem(DURATION_KEY, String(val));
    setShowDurationPicker(false);
  };

  const startGame = () => {
    setHasStarted(true);
    onStart?.();
  };

  const totalScore = foundWords.reduce((s, w) => s + w.score, 0);
  const viewportSmall = viewportWidth < 640;
  const viewportWide = viewportWidth >= 1200;
  const tileSize =
    boardSize <= 4
      ? viewportSmall
        ? 72
        : viewportWide
        ? 92
        : 80
      : boardSize === 5
      ? viewportSmall
        ? 58
        : viewportWide
        ? 72
        : 64
      : viewportSmall
      ? 48
      : viewportWide
      ? 60
      : 54;
  const gap =
    boardSize <= 4
      ? viewportSmall
        ? 8
        : viewportWide
        ? 14
        : 12
      : boardSize === 5
      ? viewportSmall
        ? 6
        : viewportWide
        ? 10
        : 8
      : viewportSmall
      ? 4
      : viewportWide
      ? 8
      : 6;
  const renderedBoardSize = tileSize * boardSize + gap * (boardSize - 1);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-4xl mx-auto">
      {comboBurst && (
        <div
          className={`pointer-events-none fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full px-5 py-2 text-sm font-black uppercase tracking-[0.3em] text-white shadow-2xl ${
            comboBurst === 5
              ? "bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-300"
              : "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500"
          } animate-combo-burst`}
          aria-live="polite"
        >
          {comboBurst === 5 ? "Combo x5!" : "Combo x3!"}
        </div>
      )}

      <div className="w-full lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5 lg:items-start">
        <div className="flex flex-col items-center gap-4 w-full">
          {/* A compact game HUD keeps the board, score, and timer within one glance. */}
          <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 rounded-xl border border-border bg-surface/60 p-2 sm:p-3">
            <div className="flex items-center gap-1.5">
              {duration > 0 ? (
                <Timer seconds={duration} onExpire={finishGame} paused={gameOver || !hasStarted} />
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-2xl font-bold bg-surface text-text">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>∞</span>
                </div>
              )}
              {!gameOver && hasStarted && (
                <div className="relative">
                  <button
                    onClick={() => setShowDurationPicker(!showDurationPicker)}
                    aria-label="Change timer"
                    className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center bg-bg/60 hover:bg-surface-hover rounded-lg transition text-xs text-text-muted"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </button>
                  {showDurationPicker && (
                    <div className="absolute top-full mt-1 left-0 bg-surface rounded-lg shadow-xl border border-border z-50 overflow-hidden">
                      {DURATION_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => changeDuration(opt.value)}
                          className={`block w-full px-4 py-2 text-sm text-left hover:bg-surface-hover transition whitespace-nowrap ${
                            duration === opt.value ? "text-primary font-semibold" : "text-text"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Found</div>
              <div className="mt-0.5 text-sm font-semibold tabular-nums text-text">{foundWords.length} words{combo > 1 ? ` · x${combo}` : ""}</div>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <div className={`text-right transition-all duration-300 ${comboBurst ? "scale-110" : ""}`}>
                <div
                  className={`text-2xl font-bold tabular-nums transition-all duration-300 ${
                    comboBurst === 5
                      ? "text-success drop-shadow-[0_0_18px_rgba(74,222,128,0.55)]"
                      : comboBurst === 3
                      ? "text-primary drop-shadow-[0_0_18px_rgba(129,140,248,0.55)]"
                      : "text-primary"
                  }`}
                >
                  {totalScore}
                </div>
                <div className={`text-xs transition-colors duration-300 ${comboBurst ? "text-text" : "text-text-muted"}`}>
                  pts
                </div>
              </div>
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center bg-bg/60 hover:bg-surface-hover rounded-lg transition"
              >
                {muted ? (
                  <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.919 3.667 12 4.109 12 5v14c0 .891-1.081 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.919 3.667 12 4.109 12 5v14c0 .891-1.081 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Current word display */}
          <div className="h-12 flex items-center justify-center" aria-live="polite" aria-atomic="true">
            <div className="flex flex-col items-center gap-0.5">
              <span
                className={`rounded-full px-4 py-1 text-2xl font-bold tracking-[0.22em] min-w-[150px] text-center transition-colors duration-200 ${
                  flash === "correct"
                    ? "text-success"
                    : flash === "wrong"
                    ? "text-danger"
                    : "text-primary"
                }`}
              >
                {currentWord || <span className="text-text-muted text-sm font-semibold tracking-normal">Drag across letters</span>}
              </span>
              <span
                className={`min-h-4 text-xs font-semibold uppercase tracking-[0.24em] transition-all duration-300 ${
                  comboBurst === 5
                    ? "text-success drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                    : comboBurst === 3
                    ? "text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    : "text-text-muted"
                }`}
              >
                {combo > 1 ? `Combo x${combo}` : combo === 1 ? "Combo started" : " "}
              </span>
            </div>
          </div>

          {/* Grid with SVG path overlay wrapped in tactical game tray */}
          <div className="relative p-2.5 sm:p-3.5 rounded-3xl game-tray shadow-2xl">
            {floatingScore && (
              <div
                key={floatingScore.key}
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-score-float flex flex-col items-center"
              >
                <span className="text-4xl sm:text-5xl font-black text-amber-300 drop-shadow-[0_4px_16px_rgba(251,191,36,0.7)]">
                  +{floatingScore.score}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-slate-900/85 px-2.5 py-0.5 rounded-full mt-1 border border-amber-300/30 backdrop-blur-sm shadow-lg">
                  {floatingScore.word}
                </span>
              </div>
            )}
            <div
              ref={boardRef}
              id="game-board"
              className={`relative grid touch-none select-none transition-all duration-300 ${!hasStarted ? "opacity-70" : ""} ${
                comboBurst === 5
                  ? "scale-[1.03] drop-shadow-[0_0_28px_rgba(74,222,128,0.32)]"
                  : comboBurst === 3
                  ? "scale-[1.02] drop-shadow-[0_0_24px_rgba(99,102,241,0.28)]"
                  : ""
              }`}
              style={{
                width: renderedBoardSize,
                gridTemplateColumns: `repeat(${boardSize}, ${tileSize}px)`,
                gap,
              }}
              role="grid"
              aria-label={`${boardSize} by ${boardSize} letter grid`}
            >
              {!hasStarted && (
                <div className="absolute inset-0 z-40 flex items-center justify-center rounded-2xl bg-bg/75 p-5 text-center backdrop-blur-[2px]">
                  <div>
                    <div className="text-base font-bold text-text">Your board is ready</div>
                    <p className="mt-1 text-xs text-text-muted">The timer starts when you tap Start.</p>
                    <button
                      onClick={startGame}
                      className="relative z-50 mt-4 rounded-xl bg-gradient-to-r from-primary to-indigo-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-primary/40 transition hover:scale-105 active:scale-95"
                    >
                      Start Game
                    </button>
                  </div>
                </div>
              )}
              {comboBurst && (
                <div
                  className={`pointer-events-none absolute -inset-3 rounded-3xl opacity-80 blur-md ${
                    comboBurst === 5
                      ? "bg-emerald-400/15 animate-combo-ring"
                      : "bg-indigo-400/15 animate-combo-ring"
                  }`}
                />
              )}
              {selected.length > 1 && (
                <svg
                  className="absolute inset-0 pointer-events-none z-20"
                  width="100%"
                  height="100%"
                  style={{ overflow: "visible" }}
                >
                  <path
                    d={pathD}
                    stroke="rgba(99, 102, 241, 0.28)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d={pathD}
                    stroke="rgba(129, 140, 248, 0.85)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d={pathD}
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              )}
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  const selIdx = selected.findIndex((s) => s.row === r && s.col === c);
                  const isSel = selIdx !== -1;
                  const isLast = isSel && selIdx === selected.length - 1;
                  const pointValue = LETTER_POINTS[cell.letter] ?? 1;

                  return (
                    <div
                      key={`${r}-${c}`}
                      ref={(el) => {
                        if (!cellRefs.current[r]) cellRefs.current[r] = [];
                        cellRefs.current[r][c] = el;
                      }}
                      onPointerDown={(e) => handlePointerDown(e, r, c)}
                      onClick={() => handleCellClick(r, c)}
                      onKeyDown={(e) => handleCellKeyDown(e, r, c)}
                      role="gridcell"
                      aria-label={`Row ${r + 1} column ${c + 1}, letter ${cell.letter}, value ${pointValue}`}
                      aria-selected={isSel}
                      tabIndex={hasStarted ? 0 : -1}
                      className={`
                        flex items-center justify-center
                        rounded-xl sm:rounded-2xl font-black
                        transition-all cursor-pointer relative select-none
                        ${!hasStarted ? "pointer-events-none" : ""}
                        ${cell.letter === "Qu" ? "text-xl sm:text-2xl tracking-tighter" : ""}
                        ${
                          isSel
                            ? isLast
                              ? "game-tile-last z-40"
                              : "game-tile-selected z-30"
                            : "game-tile-3d text-text z-20"
                        }
                      `}
                      style={{
                        width: tileSize,
                        height: tileSize,
                        fontSize:
                          boardSize <= 4
                            ? viewportSmall
                              ? "1.875rem"
                              : viewportWide
                              ? "2.5rem"
                              : "2.25rem"
                            : boardSize === 5
                            ? viewportSmall
                              ? "1.55rem"
                              : viewportWide
                              ? "2rem"
                              : "1.9rem"
                            : viewportSmall
                            ? "1.3rem"
                            : viewportWide
                            ? "1.65rem"
                            : "1.55rem",
                      }}
                    >
                      <span className="relative z-10 leading-none">{cell.letter}</span>
                      <span
                        className={`absolute bottom-1 right-1.5 text-[10px] sm:text-[11px] font-bold leading-none select-none transition-colors ${
                          isSel ? "text-white/80" : "text-text-muted/60"
                        }`}
                      >
                        {pointValue}
                      </span>
                      {isSel && (
                        <span className="absolute top-1 left-1.5 text-[9px] sm:text-[10px] font-extrabold leading-none text-white/70 select-none">
                          {selIdx + 1}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Error feedback */}
          <div className="h-6 text-center" aria-live="assertive" aria-atomic="true">
            {error && <span className="text-danger text-sm font-semibold animate-shake">{error}</span>}
          </div>

          {/* Action: Clear only (submit is now on pointer up) */}
          <div className="flex gap-3 w-full">
            <button
              onClick={() => {
                setSelected([]);
                setError(null);
              }}
              disabled={gameOver || selected.length === 0}
              aria-label="Clear selection"
              className="flex-1 py-3 bg-surface hover:bg-surface-hover disabled:opacity-40 transition rounded-xl font-bold text-base active:scale-[0.98] border border-border"
            >
              Clear Trail
            </button>
          </div>
          <p className="text-text-dim text-xs -mt-1 text-center">
            <span className="hidden sm:inline">Drag tiles or type on keyboard · Enter to submit · Esc to clear</span>
            <span className="sm:hidden">Release to submit · Drag back to undo</span>
          </p>
        </div>

        <aside className="w-full space-y-4 rounded-3xl border border-border bg-surface/50 p-4 sm:p-5 lg:sticky lg:top-6 shadow-lg backdrop-blur-sm">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-text-muted text-xs font-bold uppercase tracking-wider">
                Found ({foundWords.length})
              </span>
              <span className="text-text-muted text-xs font-semibold">
                Best Combo: <span className="text-primary font-bold">{bestCombo > 0 ? `x${bestCombo}` : "—"}</span>
              </span>
            </div>
            <ul className="flex flex-wrap gap-1.5 min-h-[3rem] list-none p-0 lg:max-h-48 lg:overflow-y-auto">
              {foundWords.length === 0 ? (
                <li className="text-text-muted text-xs italic py-2">No words yet — drag across tiles to begin!</li>
              ) : (
                foundWords
                  .slice()
                  .reverse()
                  .map((f, i) => (
                    <li
                      key={i}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-wide flex items-center gap-1.5 shadow-sm transition ${
                        f.word.length >= 6
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : f.word.length >= 5
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                          : "bg-surface-hover text-text border border-border"
                      }`}
                    >
                      <span>{f.word}</span>
                      <span className="rounded bg-bg/60 px-1 py-0.5 text-[10px] text-primary font-bold">+{f.score}</span>
                    </li>
                  ))
              )}
            </ul>
          </div>

          {!gameOver && (
            <button
              onClick={finishGame}
              className="w-full text-text-muted hover:text-danger text-xs font-semibold transition py-2 rounded-lg hover:bg-danger-bg/20"
            >
              End Round Early
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
