import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import legacyData from "../public/data/complete/bank-v1.json";
import expandedData from "../public/data/complete/bank-v2.json";
import { checkCompleteWord, cleanProgress, completeScore, CompleteBank, findCompletePath, mergeCompleteProgress, progressKey, wordFromPath } from "../src/lib/complete";
import { assessCompleteQuality, pathShape } from "../src/lib/complete-quality";
import { publishedCompletePuzzles, readCompleteHistory, selectCompleteSession, summarizeCompleteHistory } from "../src/lib/complete-history";
import { shareCompleteResult } from "../src/lib/complete-sharing";
import { validCompleteBank } from "../src/lib/use-complete-bank";

const legacy = legacyData as CompleteBank, bank = expandedData as CompleteBank;

test("bank validation rejects malformed optional word lists without throwing", () => {
  assert.equal(validCompleteBank(bank),true);
  for (const extraWords of [{},"STAND",4,null]) {
    assert.equal(validCompleteBank({...bank,puzzles:[{...bank.puzzles[0],extraWords}]}),false);
  }
});

test("sharing reports blocked/missing clipboard and cancelled native shares without false success", async () => {
  const text="WordGrid Complete - sample";
  const blocked={writeText:async()=>{throw new Error("NotAllowedError");}};
  for (const api of [{}, {clipboard:blocked}]) {
    const result=await shareCompleteResult(text,true,api);
    assert.equal(result.success,false);
    assert.match(result.message,/Select and copy the preview/);
  }
  let copied="";
  assert.equal((await shareCompleteResult(text,true,{clipboard:{writeText:async value=>{copied=value;}}})).success,true);
  assert.equal(copied,text);
  const cancelled=await shareCompleteResult(text,false,{share:async()=>{throw Object.assign(new Error("cancelled"),{name:"AbortError"});},clipboard:blocked});
  assert.equal(cancelled.success,false);
  assert.equal(cancelled.message,"Sharing cancelled.");
  assert.equal((await shareCompleteResult(text,false,{share:async()=>{throw new Error("NotAllowedError");}})).success,false);
});

test("immutable legacy bank and original saved keys survive expanded coverage", () => {
  assert.equal(createHash("sha256").update(readFileSync("public/data/complete/bank-v1.json")).digest("hex"), "8d1974f35b68f2ec5605e99cd40cff919319a6b5bb69ba807a423cd271f7d57e");
  for (const original of legacy.puzzles.filter(p => p.date < "2026-11-23")) {
    const expanded = bank.puzzles.find(p => p.date === original.date)!;
    const { extraWords, ...unchanged } = expanded;
    assert.deepEqual(unchanged, original);
    assert.equal(progressKey(expanded),progressKey(original));
    assert.deepEqual(cleanProgress(expanded, {found:original.requiredWords,revealed:[]}),{found:original.requiredWords,revealed:[]});
    assert.ok(extraWords?.every(word=>!!findCompletePath(expanded,word)));
  }
  const p = bank.puzzles[0];
  assert.equal(checkCompleteWord(p,"STAND",[]).kind,"extra");
  assert.equal(checkCompleteWord(p,"TANS",[]).kind,"extra");
  assert.equal(completeScore(p,["STAND","TANS"]),0);
  assert.equal(p.requiredWords.length,10);
  const merged = mergeCompleteProgress(p,{found:[p.requiredWords[0]],revealed:[],extra:["STAND"]},{found:[],revealed:[],extra:["TANS","FAKE"]});
  assert.deepEqual(merged.extra,["STAND","TANS"]);
  assert.equal(merged.found.length,1);
});

test("v2 puzzles are contiguous, covered, versioned and have diverse turning diagonal paths", () => {
  const shapes = new Set<string>(), boards = new Set<string>();
  const counts = {Gentle:0,Steady:0,Stretch:0};
  for (const [index,p] of bank.puzzles.entries()) {
    assert.equal(p.date,new Date(Date.UTC(2026,9,14)+index*86400000).toISOString().slice(0,10));
    assert.ok(!boards.has(p.board.flat().join(""))); boards.add(p.board.flat().join(""));
    assert.equal(new Set([...p.requiredWords,...p.bonusWords,...(p.extraWords||[])]).size,p.requiredWords.length+p.bonusWords.length+(p.extraWords?.length||0));
    for (const word of [...p.requiredWords,...p.bonusWords,...(p.extraWords||[])]) {
      const path = findCompletePath(p,word);
      assert.ok(path,`${p.id}: ${word}`); assert.equal(wordFromPath(p,path),word);
    }
    if (p.date < "2026-11-23") continue;
    counts[p.difficulty]++;
    assert.equal(p.dictionaryVersion,"wordgrid-editorial-2");
    assert.ok(p.requiredWords.length>=10&&p.requiredWords.length<=36);
    const longest = [...p.requiredWords].sort((a,b)=>b.length-a.length)[0];
    assert.ok(longest.length>=8);
    const path = findCompletePath(p,longest)!;
    assert.ok(pathShape(path).turns>=3&&pathShape(path).diagonals>=2);
    assert.deepEqual(assessCompleteQuality(p),{difficulty:p.difficulty,quality:p.quality});
    shapes.add(path.map(({row,col})=>`${row},${col}`).join(";"));
  }
  assert.ok(Object.values(counts).every(count=>count>60));
  assert.ok(shapes.size>150);
  assert.ok(bank.puzzles.some(p=>p.quality && p.requiredWords.length<=16 && p.difficulty!=="Gentle"),"short collections can still have demanding paths/long words");
});

test("archive selection rejects future/invalid dates and keeps every replay namespace separate", () => {
  const date="2026-11-21";
  assert.ok(publishedCompletePuzzles(bank,date).every(p=>p.date<=date));
  for (const query of ["date=2026-11-22","date=2026-02-30","date=2099-01-01","replay=bad%3Akey"]) assert.ok("error" in selectCompleteSession(bank,date,query));
  const selected = selectCompleteSession(bank,date,"date=2026-10-14&replay=test-run");
  assert.ok("puzzle" in selected);
  if ("puzzle" in selected) {
    assert.equal(selected.mode,"replay");
    assert.notEqual(progressKey(selected.puzzle),progressKey(selected.puzzle,false,selected.replay));
    assert.notEqual(progressKey(selected.puzzle,false,"run-a"),progressKey(selected.puzzle,false,"run-b"));
  }
  const fallback=selectCompleteSession(bank,"2029-01-01","");
  assert.ok("mode" in fallback);
  if("mode" in fallback)assert.equal(fallback.mode,"practice");
});

test("Complete stats read original sessions only, tolerate damaged saves and keep UTC+8 date streaks separate", () => {
  const storage = new Map<string,string>();
  const three = bank.puzzles.slice(0,3);
  for (const p of three) storage.set(progressKey(p),JSON.stringify({found:p.requiredWords,revealed:[]}));
  storage.set(progressKey(three[0],false,"replay"),JSON.stringify({found:[],revealed:[]}));
  storage.set(progressKey(bank.puzzles[3]),JSON.stringify({found:bank.puzzles[3].requiredWords,revealed:[]}));
  storage.set(progressKey(bank.puzzles[4]),"not JSON");
  const read = (date: string) => readCompleteHistory(bank,date,{getItem:key=>storage.get(key)||null});
  assert.deepEqual(summarizeCompleteHistory(read("2026-10-16"),"2026-10-16"),{played:3,completed:3,unassisted:3,score:three.reduce((sum,p)=>sum+completeScore(p,p.requiredWords),0),currentStreak:3,longestStreak:3});
  assert.equal(summarizeCompleteHistory(read("2026-10-18"),"2026-10-18").currentStreak,4);
  assert.equal(summarizeCompleteHistory(read("2026-10-19"),"2026-10-19").currentStreak,0);
  assert.equal(read("2026-10-18").length,5);
});
