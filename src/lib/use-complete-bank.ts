"use client";
import { useEffect, useState } from "react";
import { completeDate, CompleteBank } from "./complete";

export function validCompleteBank(value: unknown): value is CompleteBank {
  if (!value || typeof value !== "object") return false;
  const bank = value as CompleteBank;
  if (!["1", "2"].includes(bank.version) || !Array.isArray(bank.puzzles) || !bank.puzzles.length) return false;
  const dates = new Set<string>();
  for (const puzzle of bank.puzzles) {
    if (!puzzle || !/^\d{4}-\d{2}-\d{2}$/.test(puzzle.date) || dates.has(puzzle.date) ||
      typeof puzzle.id !== "string" || !puzzle.version || !puzzle.dictionaryVersion || puzzle.rulesVersion !== "1" ||
      !Array.isArray(puzzle.board) || puzzle.board.length !== 4 || !puzzle.board.every(row => Array.isArray(row) && row.length === 4 && row.every(cell => /^(?:[A-Z]|Qu)$/.test(cell))) ||
      !Array.isArray(puzzle.requiredWords) || !puzzle.requiredWords.length || !Array.isArray(puzzle.bonusWords) ||
      (puzzle.extraWords !== undefined && !Array.isArray(puzzle.extraWords)) ||
      ![...puzzle.requiredWords,...puzzle.bonusWords,...(puzzle.extraWords || [])].every(word => typeof word === "string" && /^[A-Z]{4,16}$/.test(word))) return false;
    dates.add(puzzle.date);
  }
  return true;
}

export function useCompleteBank() {
  const [bank, setBank] = useState<CompleteBank | null>(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const legacy = new URLSearchParams(window.location.search).get("edition") === "legacy";
    fetch(`/data/complete/bank-v${legacy ? "1" : "2"}.json`, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error("Puzzle bank unavailable");
      return response.json();
    }).then(value => {
      if (!validCompleteBank(value)) throw new Error("Unsupported puzzle bank");
      setBank(value);
    }).catch(reason => { if (reason.name !== "AbortError") setError("Unable to load the puzzle bank. Connect once to save it for offline play, then reload."); });
    const tick = () => setDate(completeDate());
    tick();
    const timer = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => { controller.abort(); clearInterval(timer); document.removeEventListener("visibilitychange", tick); };
  }, []);
  return { bank, date, error };
}
