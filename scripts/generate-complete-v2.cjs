// Independent deterministic walks; never rewrite the immutable legacy bank.
require('./register-typescript.cjs');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { assessCompleteQuality, pathShape } = require('../src/lib/complete-quality.ts');
const legacy = JSON.parse(fs.readFileSync('public/data/complete/bank-v1.json', 'utf8'));
const first = JSON.parse(fs.readFileSync('public/data/complete/lexicon-v1.json', 'utf8'));
const additions = JSON.parse(fs.readFileSync('public/data/complete/lexicon-v2.json', 'utf8'));
const required = [...new Set(`${first.required} ${additions.requiredAdditions}`.split(/\s+/))].sort();
const requiredSet = new Set(required);
const bonus = [...new Set(`${first.bonus} ${additions.bonusAdditions}`.split(/\s+/))].filter(word => !requiredSet.has(word)).sort();
const all = [...required, ...bonus];
for (const word of all) if (!/^[A-Z]{4,16}$/.test(word)) throw new Error(`Invalid spelling: ${word}`);
const trie = {};
for (const word of all) {
  let node = trie;
  for (const letter of word) node = node[letter] ||= {};
  node.word = word;
}
function solve(board) {
  const found = new Set();
  function visit(row, col, node, mask) {
    if (row < 0 || row >= 4 || col < 0 || col >= 4) return;
    const bit = 1 << (row * 4 + col);
    if (mask & bit) return;
    for (const letter of board[row][col].toUpperCase()) { node = node[letter]; if (!node) return; }
    if (node.word) found.add(node.word);
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) if (dr || dc) visit(row + dr, col + dc, node, mask | bit);
  }
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) visit(r, c, trie, 0);
  return found;
}
const CUTOVER = '2026-11-23';
const endDate = process.argv[2] || legacy.endDate;
const end = Date.parse(`${endDate}T00:00:00Z`), start = Date.parse(`${CUTOVER}T00:00:00Z`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate) || !Number.isFinite(end) || new Date(end).toISOString().slice(0,10) !== endDate || end < start || (end-start)/86400000 > 730) throw new Error('Usage: npm run generate:complete:v2 -- END_DATE (up to two years from cutover)');
const seed = text => crypto.createHash('sha256').update(text).digest().readUInt32LE(0);
let state = 1;
const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
function walk(length) {
  const start = Math.floor(random() * 16);
  const visit = (cells, mask) => {
    if (cells.length === length) return cells;
    const last = cells.at(-1), neighbors = [];
    for (let row = Math.max(0,last.row-1); row <= Math.min(3,last.row+1); row++) for (let col = Math.max(0,last.col-1); col <= Math.min(3,last.col+1); col++) {
      const bit = 1 << (row*4+col);
      if (!(mask & bit)) neighbors.push({row,col,order:random()});
    }
    neighbors.sort((a,b)=>a.order-b.order);
    for (const next of neighbors) {
      const result = visit([...cells,{row:next.row,col:next.col}],mask | 1 << (next.row*4+next.col));
      if (result) return result;
    }
    return null;
  };
  return visit([{row:Math.floor(start/4),col:start%4}],1<<start);
}
const anchors = required.filter(word => word.length >= 8 && word.length <= 12 && !word.includes('Q'));
const letters = 'AAAAAAAEEEEEEEEEEEIIIIOOOOOUUURRRRRSSSSSTTTTTTNNNNNLLLDDCCMMPBGFHW';
const puzzles = legacy.puzzles.filter(p => p.date < CUTOVER).map(p => {
  const known = new Set([...p.requiredWords,...p.bonusWords]);
  return { ...p, extraWords:[...solve(p.board)].filter(word => !known.has(word)).sort() };
});
const seen = new Set(legacy.puzzles.map(p => p.board.flat().join('')));
const schedule = ['Gentle','Steady','Gentle','Steady','Stretch','Steady','Stretch'];
const attempts = [];
for (let stamp = start; stamp <= end; stamp += 86400000) {
  const date = new Date(stamp).toISOString().slice(0,10);
  const wanted = schedule[new Date(stamp).getUTCDay()];
  let selected;
  for (let attempt = 0; attempt < 5000; attempt++) {
    state = seed(`wordgrid-editorial-2:${date}:${attempt}`);
    const anchor = anchors[Math.floor(random()*anchors.length)], path = walk(anchor.length);
    if (!path || pathShape(path).turns < 3 || pathShape(path).diagonals < 2) continue;
    const board = Array.from({length:4},()=>Array.from({length:4},()=>letters[Math.floor(random()*letters.length)]));
    [...anchor].forEach((letter,i)=>{ board[path[i].row][path[i].col] = letter; });
    const boardKey = board.flat().join('');
    if (seen.has(boardKey)) continue;
    const solved = solve(board);
    const targets = required.filter(word=>solved.has(word));
    if (targets.length < 10 || targets.length > 36) continue;
    const bonusWords = bonus.filter(word=>solved.has(word));
    const assessment = assessCompleteQuality({board,requiredWords:targets});
    if (assessment.difficulty !== wanted || assessment.quality.anchorDiagonals < 2 || assessment.quality.anchorTurns < 3) continue;
    const version = crypto.createHash('sha256').update(JSON.stringify({ board, targets, bonusWords, dictionary:additions.version, model:assessment.quality.model })).digest('hex').slice(0,12);
    selected = {id:`complete-${date}`,date,version,rulesVersion:'1',dictionaryVersion:additions.version,board,requiredWords:targets,bonusWords,...assessment};
    seen.add(boardKey); attempts.push(attempt+1); break;
  }
  if (!selected) throw new Error(`No ${wanted} board for ${date}`);
  puzzles.push(selected);
}
const bank = {version:'2',startDate:puzzles[0].date,endDate:puzzles.at(-1).date,puzzles};
fs.writeFileSync('public/data/complete/bank-v2.json',JSON.stringify(bank)+'\n');
const fresh = puzzles.filter(p=>p.date>=CUTOVER);
const report = { model:'editorial-path-1',cutover:CUTOVER,requiredSpellings:required.length,bonusSpellings:bonus.length,legacyBoards:puzzles.length-fresh.length,newBoards:fresh.length,recognizedLegacyExtras:puzzles.filter(p=>p.extraWords).reduce((n,p)=>n+p.extraWords.length,0),difficulty:Object.fromEntries(['Gentle','Steady','Stretch'].map(label=>[label,fresh.filter(p=>p.difficulty===label).length])),pathTurns:{min:Math.min(...fresh.map(p=>p.quality.averageTurns)),max:Math.max(...fresh.map(p=>p.quality.averageTurns))},meanCandidates:Math.round(attempts.reduce((a,b)=>a+b,0)/attempts.length),maxCandidates:Math.max(...attempts),note:'Editorial estimates using target count, long-word burden and representative path turns; player validation remains necessary.' };
fs.writeFileSync('public/data/complete/quality-v2.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
