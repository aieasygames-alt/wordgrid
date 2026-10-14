// Offline, deterministic editorial-bank generation. Never fetch third-party data.
const fs = require('node:fs');
const crypto = require('node:crypto');
const lexicon = JSON.parse(fs.readFileSync('public/data/complete/lexicon-v1.json','utf8'));
const required = [...new Set(lexicon.required.split(/\s+/))].sort();
const bonus = [...new Set(lexicon.bonus.split(/\s+/))].filter(word=>!required.includes(word)).sort();
const words = [...required,...bonus];
const trie = {};
for (const word of words) {
  let node = trie;
  for (const letter of word) node = node[letter] ||= {};
  node.word = word;
}
function solve(board) {
  const found = new Set();
  function visit(r,c,node,mask) {
    if(r<0||r>=4||c<0||c>=4) return;
    const bit=1<<(r*4+c); if(mask&bit) return;
    for(const letter of board[r][c].toUpperCase()) {node=node[letter];if(!node)return;}
    if(node.word)found.add(node.word);
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++)if(dr||dc)visit(r+dr,c+dc,node,mask|bit);
  }
  for(let r=0;r<4;r++)for(let c=0;c<4;c++)visit(r,c,trie,0);
  return [...found];
}
const anchors = required.filter(word=>word.length>=8&&word.length<=14&&!word.includes('Q'));
let state=0x434f4d50;
const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
const letters='AAAAAAAEEEEEEEEEEEIIIIOOOOOUUURRRRRSSSSSTTTTTTNNNNNLLLDDCCMMPBGFHW';
const seen=new Set();const puzzles=[];
const startArg = process.argv[2] || '2026-10-14';
const days = Number(process.argv[3] || 365);
const start = Date.parse(`${startArg}T00:00:00Z`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(startArg) || !Number.isFinite(start) || new Date(start).toISOString().slice(0,10) !== startArg || !Number.isInteger(days) || days < 1 || days > 730) {
  throw new Error('Usage: npm run generate:complete -- YYYY-MM-DD DAYS (1-730)');
}
for(let day=0;day<days;day++) {
  let selected;
  for(let attempt=0;attempt<10000;attempt++) {
    const board=Array.from({length:4},()=>Array.from({length:4},()=>letters[Math.floor(random()*letters.length)]));
    const anchor=anchors[Math.floor(random()*anchors.length)];
    let snake=Array.from({length:16},(_,i)=>({r:Math.floor(i/4),c:Math.floor(i/4)%2?3-i%4:i%4}));
    const turns=Math.floor(random()*4), mirror=random()<0.5;
    snake=snake.map(({r,c})=>{if(mirror)c=3-c;for(let t=0;t<turns;t++)[r,c]=[c,3-r];return {r,c};});
    const offset=Math.floor(random()*(17-anchor.length));
    [...anchor].forEach((letter,i)=>{const {r,c}=snake[offset+i];board[r][c]=letter;});
    const key=board.flat().join('');if(seen.has(key))continue;
    const solved=solve(board), targets=required.filter(word=>solved.includes(word));
    if(targets.length<10||targets.length>36||!targets.some(word=>word.length>=8))continue;
    seen.add(key);
    const date=new Date(start+day*86400000).toISOString().slice(0,10);
    selected={id:`complete-${date}`,date,version:crypto.createHash('sha256').update(key+lexicon.version).digest('hex').slice(0,12),rulesVersion:'1',dictionaryVersion:lexicon.version,board,requiredWords:targets,bonusWords:bonus.filter(word=>solved.includes(word)),difficulty:targets.length<17?'Gentle':targets.length<25?'Steady':'Stretch'};
    break;
  }
  if(!selected)throw new Error(`No acceptable board for day ${day}`);
  puzzles.push(selected);
}
const bank={version:'1',startDate:puzzles[0].date,endDate:puzzles.at(-1).date,puzzles};
fs.writeFileSync('public/data/complete/bank-v1.json',JSON.stringify(bank)+'\n');
console.log(`Generated ${puzzles.length} unique boards: ${bank.startDate} through ${bank.endDate}; ${required.length} targets, ${bonus.length} bonus spellings.`);
