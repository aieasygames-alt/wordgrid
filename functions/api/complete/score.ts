import bankData from "../../../public/data/complete/bank-v1.json";
import { CompleteBank, CompletePuzzle, completeDate, completeScore, findCompletePath } from "../../../src/lib/complete";

interface Statement {
  bind(...values: unknown[]): Statement;
  all<T>(): Promise<{ results?: T[] }>;
  run(): Promise<unknown>;
}
interface Database { prepare(sql: string): Statement }
interface Env { DB?: Database }
interface Context { request: Request; env: Env }
interface Entry { name: string; score: number; found: number; completed: number }
const bank = bankData as CompleteBank;
const MAX_BODY = 8192;
const json = (data: unknown, status = 200, headers: Record<string, string> = {}) => new Response(JSON.stringify(data), {
  status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers },
});

function puzzleFor(date: string): CompletePuzzle | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date > completeDate()) return undefined;
  return bank.puzzles.find((puzzle) => puzzle.date === date);
}

async function entries(db: Database, puzzle: CompletePuzzle) {
  const result = await db.prepare("SELECT name, score, found, completed FROM complete_scores WHERE puzzle_id = ? AND puzzle_version = ? ORDER BY score DESC, found DESC, created_at ASC LIMIT 50")
    .bind(puzzle.id, puzzle.version).all<Entry>();
  return result.results || [];
}

export async function onRequestGet({ request, env }: Context): Promise<Response> {
  const puzzle = puzzleFor(new URL(request.url).searchParams.get("date") || "");
  if (!puzzle) return json({error: "Published puzzle not found."}, 404);
  if (!env.DB) return json({entries: [], remote: false});
  try { return json({entries: await entries(env.DB, puzzle), remote: true}); }
  catch { return json({error: "Leaderboard temporarily unavailable."}, 503); }
}

async function readBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > MAX_BODY) throw new Error("size");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("json");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const {value,done} = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY) { await reader.cancel(); throw new Error("size"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

async function digest(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2,"0")).join("");
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  const url = new URL(request.url);
  if (request.headers.get("origin") !== url.origin || request.headers.get("sec-fetch-site") === "cross-site") return json({error: "Same-origin submission required."},403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({error:"Send JSON."},415);
  if (!env.DB) return json({error:"Leaderboard is not enabled here."},503);
  // Cloudflare supplies this header. Missing identity fails closed rather than bypassing limits.
  const ip = request.headers.get("cf-connecting-ip");
  if (!ip) return json({error:"Unable to verify request source."},503);
  try {
    const minute = Math.floor(Date.now()/60000);
    const bucket = await digest(`complete:${minute}:${ip}`);
    const result = await env.DB.prepare("INSERT INTO complete_rate_limits (bucket, expires_at, requests) VALUES (?, ?, 1) ON CONFLICT(bucket) DO UPDATE SET requests = requests + 1 WHERE requests < 10 RETURNING requests")
      .bind(bucket, (minute+2)*60).all<{requests:number}>();
    if (!result.results?.length) return json({error:"Too many submissions. Please wait a minute."},429,{"Retry-After":"60"});
    await env.DB.prepare("DELETE FROM complete_rate_limits WHERE expires_at < ?").bind(Math.floor(Date.now()/1000)).run();
  } catch { return json({error:"Leaderboard temporarily unavailable."},503); }
  let raw: unknown;
  try { raw = await readBody(request); }
  catch (reason) { return json({error: reason instanceof Error && reason.message === "size" ? "Submission too large." : "Invalid JSON."}, reason instanceof Error && reason.message === "size" ? 413 : 400); }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return json({error:"Invalid submission."},400);
  const body = raw as Record<string,unknown>;
  const puzzle = typeof body.date === "string" ? puzzleFor(body.date) : undefined;
  if (!puzzle || puzzle.date !== completeDate() || body.version !== puzzle.version) return json({error:"Only today's published puzzle version can be submitted."},400);
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!/^[A-Za-z0-9 _-]{1,24}$/.test(name)) return json({error:"Use 1-24 letters, numbers, spaces, hyphens or underscores for your public name."},400);
  const allowed = new Set([...puzzle.requiredWords,...puzzle.bonusWords]);
  if (!Array.isArray(body.words) || body.words.length < 1 || body.words.length > allowed.size || !Array.isArray(body.revealed)) return json({error:"Invalid word list."},400);
  const words = body.words;
  const revealed = body.revealed;
  if (new Set(words).size !== words.length || words.some((word) => typeof word !== "string" || !allowed.has(word) || !findCompletePath(puzzle,word))) return json({error:"Invalid or duplicate puzzle word."},400);
  if (new Set(revealed).size !== revealed.length || revealed.some((word) => typeof word !== "string" || !puzzle.requiredWords.includes(word) || !words.includes(word))) return json({error:"Invalid reveal list."},400);
  const score = completeScore(puzzle,words as string[],revealed as string[]);
  const found = words.filter((word) => puzzle.requiredWords.includes(word as string)).length;
  const existing = request.headers.get("cookie")?.match(/(?:^|;\s*)wg_complete_player=([a-f0-9-]{36})(?:;|$)/)?.[1];
  const player = existing || crypto.randomUUID();
  try {
    await env.DB.prepare(`INSERT INTO complete_scores (puzzle_id, puzzle_version, player_id, name, score, found, completed, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(puzzle_id, puzzle_version, player_id) DO UPDATE SET name = excluded.name,
      score = CASE WHEN excluded.score > complete_scores.score OR (excluded.score = complete_scores.score AND excluded.found > complete_scores.found) THEN excluded.score ELSE complete_scores.score END,
      found = CASE WHEN excluded.score > complete_scores.score OR (excluded.score = complete_scores.score AND excluded.found > complete_scores.found) THEN excluded.found ELSE complete_scores.found END,
      completed = CASE WHEN excluded.score > complete_scores.score OR (excluded.score = complete_scores.score AND excluded.found > complete_scores.found) THEN excluded.completed ELSE complete_scores.completed END,
      created_at = CASE WHEN excluded.score > complete_scores.score OR (excluded.score = complete_scores.score AND excluded.found > complete_scores.found) THEN excluded.created_at ELSE complete_scores.created_at END`)
      .bind(puzzle.id,puzzle.version,player,name,score,found,Number(found===puzzle.requiredWords.length)).run();
    const saved = await env.DB.prepare("SELECT name, score, found, completed FROM complete_scores WHERE puzzle_id = ? AND puzzle_version = ? AND player_id = ?")
      .bind(puzzle.id,puzzle.version,player).all<Entry>();
    return json({...saved.results?.[0],entries:await entries(env.DB,puzzle),remote:true},200,{
      "Set-Cookie":`wg_complete_player=${player}; Path=/api/complete/; HttpOnly; SameSite=Strict; Max-Age=31536000${url.protocol === "https:" ? "; Secure" : ""}`,
    });
  } catch { return json({error:"Leaderboard temporarily unavailable."},503); }
}
