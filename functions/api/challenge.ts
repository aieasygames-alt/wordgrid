interface D1Result<T> { results?: T[] }
interface D1Statement { bind: (...values: unknown[]) => D1Statement; all: <T>() => Promise<D1Result<T>>; run: () => Promise<unknown> }
interface D1Database { prepare: (query: string) => D1Statement }
interface Env { DB?: D1Database }
interface PagesContext<E> { request: Request; env: E }
type PagesFunction<E> = (context: PagesContext<E>) => Response | Promise<Response>;

type ScoreRow = { name: string; score: number; found: number; created_at: string };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ entries: [], remote: false });
  const board = new URL(request.url).searchParams.get("board");
  if (!board || board.length > 512) return json({ error: "Invalid board" }, 400);
  const result = await env.DB.prepare("SELECT name, score, found, created_at FROM challenge_scores WHERE board = ? ORDER BY score DESC, found DESC LIMIT 50").bind(board).all<ScoreRow>();
  return json({ entries: result.results || [], remote: true });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ error: "Remote scoreboard unavailable" }, 503);
  let body: { board?: string; name?: string; score?: number; found?: number };
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const board = String(body.board || "");
  const name = String(body.name || "You").trim().slice(0, 24);
  const score = Number(body.score);
  const found = Number(body.found || 0);
  if (!board || board.length > 512 || !name || !Number.isFinite(score) || !Number.isFinite(found) || score < 0 || found < 0) return json({ error: "Invalid score" }, 400);
  await env.DB.prepare("INSERT INTO challenge_scores (board, name, score, found, created_at) VALUES (?, ?, ?, ?, datetime('now'))").bind(board, name, score, found).run();
  return onRequestGet({ request: new Request(new URL(`/api/challenge?board=${encodeURIComponent(board)}`, request.url)), env } as Parameters<PagesFunction<Env>>[0]);
};
