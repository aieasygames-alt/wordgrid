import test from "node:test";
import assert from "node:assert/strict";
import { CompletePuzzle, checkCompleteWord, cleanProgress, completeDate, completeScore, findCompletePath, mergeCompleteProgress, progressKey, selectCompletePuzzle, wordFromPath } from "../src/lib/complete";

const puzzle: CompletePuzzle = {
  id: "test", date: "2026-10-14", version: "1", rulesVersion: "1", dictionaryVersion: "1",
  board: [["R", "A", "T", "E"], ["Qu", "I", "E", "T"], ["S", "N", "O", "P"], ["D", "L", "C", "K"]],
  requiredWords: ["RATE", "QUIET"], bonusWords: ["RAT"], difficulty: "Gentle",
};
test("find and score required words without duplicate scoring", () => {
  assert.equal(checkCompleteWord(puzzle, "rate", []).kind, "required");
  assert.equal(checkCompleteWord(puzzle, "RATE", ["RATE"]).kind, "duplicate");
  assert.equal(completeScore(puzzle, ["RATE", "RATE", "FAKE"]), 2);
});
test("paths support diagonals and Qu, reject reused, disconnected, outside and empty cells", () => {
  const path = findCompletePath(puzzle, "QUIET");
  assert.ok(path);
  assert.equal(wordFromPath(puzzle, path), "QUIET");
  assert.equal(wordFromPath(puzzle, [{row:0,col:0},{row:0,col:1},{row:0,col:0},{row:0,col:1}]), null);
  assert.equal(wordFromPath(puzzle, [{row:0,col:0},{row:3,col:3}]), null);
  assert.equal(wordFromPath(puzzle, [{row:-1,col:0},{row:0,col:0}]), null);
  const hollow = {...puzzle, board: [["R", "A"], ["", "E"]]};
  assert.equal(wordFromPath(hollow, [{row:0,col:0},{row:0,col:1},{row:1,col:0},{row:1,col:1}]), null);
  assert.equal(findCompletePath(puzzle, "ZZZZ"), null);
});
test("stored progress is sanitized; revealed words count toward completion but not score", () => {
  assert.deepEqual(cleanProgress(puzzle, {found:["RATE","RATE","FAKE"],revealed:["QUIET"]}), {found:["RATE","QUIET"],revealed:["QUIET"]});
  assert.equal(completeScore(puzzle, ["RATE","QUIET"], ["QUIET"]), 2);
  assert.deepEqual(cleanProgress(puzzle, null), {found:[],revealed:[]});
  assert.notEqual(progressKey(puzzle), progressKey({...puzzle, version:"2"}));
  assert.notEqual(progressKey(puzzle), progressKey(puzzle,true));
});
test("daily puzzles use UTC+8 with explicit practice fallback", () => {
  assert.equal(completeDate(new Date("2026-10-14T15:59:59Z")), "2026-10-14");
  assert.equal(completeDate(new Date("2026-10-14T16:00:00Z")), "2026-10-15");
  const bank = {version:"1",startDate:puzzle.date,endDate:puzzle.date,puzzles:[puzzle]};
  assert.equal(selectCompletePuzzle(bank,puzzle.date).practice,false);
  assert.equal(selectCompletePuzzle(bank,"2028-01-01").practice,true);
});

test("stale tabs merge discoveries and reveals without losing words or restoring revealed points", () => {
  const a = {found:["RATE"],revealed:[]};
  const b = {found:["QUIET"],revealed:["QUIET"]};
  const merged = mergeCompleteProgress(puzzle,a,b);
  assert.deepEqual(merged,{found:["QUIET","RATE"],revealed:["QUIET"]});
  assert.deepEqual(mergeCompleteProgress(puzzle,b,a),merged);
  assert.deepEqual(mergeCompleteProgress(puzzle,merged,a),merged);
  assert.equal(completeScore(puzzle,merged.found,merged.revealed),2);
});

import bankData from "../public/data/complete/bank-v1.json";
import { onRequestGet, onRequestPost } from "../functions/api/complete/score";
const { DatabaseSync } = require("node:sqlite") as { DatabaseSync: new (path: string) => { exec(sql: string): void; close(): void; prepare(sql: string): { all(...args: (string | number)[]): unknown[]; run(...args: (string | number)[]): unknown } } };
import { readFileSync } from "node:fs";
const bank = bankData as import("../src/lib/complete").CompleteBank;

test("all 365 generated puzzles are unique, playable, long-word qualified and versioned", () => {
  assert.equal(bank.puzzles.length,365);
  const boards = new Set<string>();
  for (const [index,p] of bank.puzzles.entries()) {
    assert.equal(p.date,new Date(Date.UTC(2026,9,14)+index*86400000).toISOString().slice(0,10));
    assert.ok(p.requiredWords.length>=10&&p.requiredWords.length<=36);
    assert.ok(p.requiredWords.some(word=>word.length>=8));
    assert.equal(p.board.length,4);
    assert.ok(p.board.every(row=>row.length===4));
    assert.equal(new Set([...p.requiredWords,...p.bonusWords]).size,p.requiredWords.length+p.bonusWords.length);
    for (const word of [...p.requiredWords,...p.bonusWords]) {
      const path=findCompletePath(p,word);
      assert.ok(path,`${p.id}: ${word}`);
      assert.equal(wordFromPath(p,path),word);
    }
    boards.add(JSON.stringify(p.board));
  }
  assert.equal(boards.size,365);
});

function database() {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync("schema.sql","utf8"));
  return {db, binding:{ prepare(sql: string) {
    let args: (string | number)[] = [];
    const statement = db.prepare(sql);
    const bound = {
      bind(...values: unknown[]) { args = values as (string | number)[]; return bound; },
      async all<T>() { return {results: statement.all(...args) as T[]}; },
      async run() { return statement.run(...args); },
    };
    return bound;
  }}};
}
const daily = bank.puzzles[0];
function request(body: unknown, ip="192.0.2.1", cookie="") {
  return new Request("https://wordgrid.games/api/complete/score", {method:"POST",headers:{origin:"https://wordgrid.games","content-type":"application/json","cf-connecting-ip":ip,cookie},body:JSON.stringify(body)});
}
const valid = {date:daily.date,version:daily.version,name:"Trail Reader",words:[daily.requiredWords[0]],revealed:[]};

test("API degrades safely without database and rejects cross-site/invalid content", async (context) => {
  context.mock.timers.enable({apis:["Date"],now:Date.UTC(2026,9,14,12)});
  const get=await onRequestGet({request:new Request(`https://wordgrid.games/api/complete/score?date=${daily.date}`),env:{}});
  assert.equal(get.status,200);assert.equal((await get.json()).remote,false);
  assert.equal((await onRequestPost({request:request(valid),env:{}})).status,503);
  assert.equal((await onRequestPost({request:new Request("https://wordgrid.games/api/complete/score",{method:"POST"}),env:{}})).status,403);
});

test("real SQLite endpoint validates paths and derives points, deduplicates player, keeps best and excludes future puzzles", async (context) => {
  context.mock.timers.enable({apis:["Date"],now:Date.UTC(2026,9,14,12)});
  const {db,binding}=database();
  try {
    const env={DB:binding};
    const response=await onRequestPost({request:request({...valid,score:999999}),env});
    assert.equal(response.status,200);
    const value=await response.json();assert.equal(value.score,completeScore(daily,valid.words));
    const cookie=response.headers.get("set-cookie")!.split(";")[0];
    assert.match(response.headers.get("set-cookie")!,/HttpOnly; SameSite=Strict/);
    assert.equal((await onRequestPost({request:request(valid,"192.0.2.1",cookie),env})).status,200);
    const list=await onRequestGet({request:new Request(`https://wordgrid.games/api/complete/score?date=${daily.date}`),env});
    assert.equal((await list.json()).entries.length,1);
    const lower=await onRequestPost({request:request({...valid,name:"New Name",revealed:valid.words},"192.0.2.1",cookie),env});
    assert.equal(lower.status,200);
    assert.equal((await lower.json()).score,value.score);
    const after=await onRequestGet({request:new Request(`https://wordgrid.games/api/complete/score?date=${daily.date}`),env});
    const saved=(await after.json()).entries[0];
    assert.equal(saved.score,value.score);
    assert.equal(saved.name,"New Name");
    const finished=await onRequestPost({request:request({...valid,words:daily.requiredWords,revealed:daily.requiredWords},"192.0.2.8"),env});
    assert.equal(finished.status,200);
    const finishedData=await finished.json();
    assert.equal(finishedData.score,0);
    assert.equal(finishedData.found,daily.requiredWords.length);
    assert.ok(finishedData.entries.some((entry: {completed:number;score:number})=>entry.completed===1&&entry.score===0));
    for(const bad of [{...valid,words:["ZZZZ"]},{...valid,words:[...valid.words,...valid.words]},{...valid,version:"bad"},{...valid,name:"<script>"},{...valid,revealed:["FAKE"]},{...valid,date:"2099-01-01"}]) {
      assert.equal((await onRequestPost({request:request(bad,"192.0.2.2"),env})).status,400);
    }
    assert.equal((await onRequestGet({request:new Request("https://wordgrid.games/api/complete/score?date=2099-01-01"),env})).status,404);
  } finally {db.close();}
});
test("D1 rate limit is atomic; oversized payloads and missing source fail closed", async (context) => {
  context.mock.timers.enable({apis:["Date"],now:Date.UTC(2026,9,14,12)});
  const {db,binding}=database();
  try {
    const env={DB:binding};
    const huge=await onRequestPost({request:request({data:"x".repeat(9000)},"192.0.2.4"),env});
    assert.equal(huge.status,413);
    const missing=request(valid);missing.headers.delete("cf-connecting-ip");
    assert.equal((await onRequestPost({request:missing,env})).status,503);
    for(let i=0;i<10;i++) assert.notEqual((await onRequestPost({request:request({},"192.0.2.5"),env})).status,429);
    const limited=await onRequestPost({request:request({},"192.0.2.5"),env});
    assert.equal(limited.status,429);assert.equal(limited.headers.get("retry-after"),"60");
  } finally {db.close();}
});

import { completeHintUnlock, completeShareText, remainingStartCounts, rotateCompletePosition } from "../src/lib/complete";
test("rotation maps display coordinates back to canonical paths without changing words",()=>{
  const path=findCompletePath(puzzle,"QUIET")!;
  for(let turns=0;turns<4;turns++) {
    const rotated=path.map(cell=>rotateCompletePosition(cell,4,turns));
    const restored=rotated.map(cell=>rotateCompletePosition(cell,4,-turns));
    assert.deepEqual(restored,path);
    assert.equal(wordFromPath(puzzle,restored),"QUIET");
  }
});
test("progressive hints unlock at target completion thresholds and count every possible start",()=>{
  const p=bank.puzzles[0];
  assert.equal(completeHintUnlock(p,{found:[],revealed:[]}),0);
  assert.equal(completeHintUnlock(p,{found:p.requiredWords.slice(0,2),revealed:[]}),1);
  assert.equal(completeHintUnlock(p,{found:p.requiredWords.slice(0,4),revealed:[]}),2);
  assert.equal(completeHintUnlock(p,{found:p.requiredWords.slice(0,6),revealed:[]}),3);
  assert.ok(remainingStartCounts(p,[]).flat().some(count=>count>0));
  assert.ok(remainingStartCounts(p,p.requiredWords).flat().every(count=>count===0));
  const multi={...puzzle,board:[["R","A","T","E"],["X","X","X","X"],["R","A","T","E"],["X","X","X","X"]],requiredWords:["RATE"],bonusWords:[]};
  const counts=remainingStartCounts(multi,[]);
  assert.equal(counts[0][0],1);assert.equal(counts[2][0],1);
});
test("sharing never includes answers or board data and preserves hint usage through old saves and merges",()=>{
  const progress={found:["RATE","QUIET"],revealed:[],hintLevel:2};
  const merged=mergeCompleteProgress(puzzle,progress,{found:["RATE"],revealed:[]});
  assert.equal(merged.hintLevel,2);
  assert.equal(cleanProgress(puzzle,{...progress,hintLevel:99}).hintLevel,3);
  const text=completeShareText(puzzle,merged);
  assert.match(text,/2\/2 targets \(100%\)/);assert.match(text,/Hints used/);
  for(const word of puzzle.requiredWords)assert.ok(!text.includes(word));
  assert.match(completeShareText(puzzle,{found:[],revealed:[]}),/No hints used/);
  assert.match(completeShareText(puzzle,{found:["RATE"],revealed:["RATE"]},true),/Practice.*\n.*\n.*\nHints used/);
});
