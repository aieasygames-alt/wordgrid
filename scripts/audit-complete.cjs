// Read-only editorial audit. This never regenerates or changes a published bank.
require('./register-typescript.cjs');
const fs = require('node:fs');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { findCompletePath } = require('../src/lib/complete.ts');
const { assessCompleteQuality } = require('../src/lib/complete-quality.ts');
const { Trie } = require('../src/lib/dictionary.ts');
const { solveBoard } = require('../src/lib/solver.ts');
const load = name => JSON.parse(fs.readFileSync(`public/data/complete/${name}.json`, 'utf8'));
const legacy = load('bank-v1'), bank = load('bank-v2');
const first = load('lexicon-v1'), second = load('lexicon-v2'), quality = load('quality-v2');
const split = text => text.trim().split(/\s+/);
const required = new Set(split(`${first.required} ${second.requiredAdditions}`));
const bonus = new Set(split(`${first.bonus} ${second.bonusAdditions}`).filter(word => !required.has(word)));
// Independently chosen everyday spellings, deliberately includes inflections and
// short function words. A review sample, not a frequency corpus or coverage % of English.
const probes = [...new Set(split(`
ABLE ABOUT ABOVE ACCEPT ACCOUNT ACROSS ACTION ACTIVE ACTUAL AFTER AGAIN ALMOST
ALONE ALONG ALREADY ALSO ALWAYS AMONG AMOUNT ANOTHER ANSWER ANYTHING APART APPEAR
AROUND ARRIVE ASKED AWAY BABY BACK BASIC BATH BEACH BEAUTY BECAME BECAUSE BECOME
BEEN BEFORE BEGAN BEGIN BEHIND BEING BELIEVE BELOW BEST BETTER BETWEEN BIRD BLACK
BLUE BOAT BODY BOOK BOTH BRAIN BREAD BREAK BRING BROTHER BUILD BUSINESS CALL CAME
CARE CARRY CASE CAUSE CHAIR CHANCE CHANGE CHILD CHILDREN CITY CLASS CLEAN CLEAR
CLOSE CLOTHES COLD COLOUR COME COMMON COMPANY COULD COUNTRY COURSE CREATE DAILY
DARK DAUGHTER DAYS DEAR DEEP DIFFERENT DOCTOR DOES DOING DONE DOOR DOWN DRAW DREAM
DRINK DRIVE DURING EACH EARLY EARTH EAST EASY EIGHT EITHER ELSE ENOUGH EVEN EVER
EVERY EXACT EYES FACE FACT FAMILY FARTHER FAST FATHER FEEL FEET FEW FIFTY FIGHT
FIND FINE FIRE FIRST FISH FIVE FLOOR FLOWER FOLLOW FOOD FOOT FORCE FORM FOUR FREE
FRIEND FROM FRONT FULL GAME GAVE GIRL GIVE GLASS GOES GOING GOLD GONE GOOD GREAT
GREEN GROUND GROUP GROW HALF HAND HARD HAVE HEAD HEAR HEART HEAT HEAVY HELD HELP
HERE HIGH HOME HOPE HOUR HOUSE IDEA IMPORTANT INTO IRON ITEM JOIN JUMP JUST KEEP
KIND KNEW KNOW LAND LANGUAGE LARGE LAST LATE LATER LAUGH LEAD LEARN LEAST LEAVE
LEFT LESS LIFE LIGHT LIKE LINE LIST LITTLE LIVE LOCAL LONG LOOK LOVE MADE MAIN
MAKE MANY MARK MATCH MATTER MEAL MEAN MEET MIGHT MILE MILK MIND MISS MONEY MONTH
MORE MOST MOTHER MOVE MUCH MUSIC MUST NAME NEAR NEED NEVER NEXT NICE NIGHT NINE
NONE NORTH NOTE NOTHING NUMBER OFTEN ONCE ONLY OPEN ORDER OTHER OURS OVER OWNED
PAGE PAID PAIN PAIR PAPER PARENT PART PASS PAST PATH PEER PEOPLE PERHAPS PERSON
PHONE PICK PICTURE PIECE PLACE PLAN PLAY POINT POOR POWER PRICE PROBLEM PUBLIC
PULL PUSH QUESTION QUICK QUITE RACE RAIN RATHER REACH READ READY REAL REASON REDS
REMAIN REMEMBER REST RICH RIDE RIGHT RISE RIVER ROAD ROCK ROOM ROUND RULE SAFE
SAID SAME SAVE SCHOOL SEAT SECOND SEEM SEEN SELF SEND SENSE SENT SEVEN SHALL SHAPE
SHARE SHORT SHOW SIDE SIGN SIMPLE SINCE SING SISTER SITE SIZE SKIN SMALL SNOW SOME
SOMETHING SONG SOON SORT SOUND SOUTH SPACE SPEAK SPECIAL SPEED SPELL SPEND SPENT
SPRING STAND START STATE STAY STEP STILL STONE STOP STORY STREET STRONG STUDENT
STUDY SUCH SURE TABLE TAKE TALK TALL TEAM TELL TEST THAN THANK THAT THEIR THEM
THEN THERE THESE THEY THING THINK THIRD THIS THOSE THOUGH THOUGHT THREE THROUGH
TIME TODAY TOGETHER TOLD TOOK TOOL TOWN TREE TRUE TURN TYPE UNDER UNIT UNTIL UPON
USED USER VERY VIEW VOICE WAIT WALK WALL WANT WARM WASH WATCH WATER WAVE WEEK WELL
WENT WERE WEST WHAT WHEN WHERE WHICH WHILE WHITE WHOLE WHOSE WIDE WIFE WILL WIND
WINDOW WISH WITH WITHIN WITHOUT WOMAN WOMEN WONDER WOOD WORD WORK WORLD WORRY
WOULD WRITE WRONG YEAR YOUNG YOUR
`))].filter(word => word.length >= 4 && word.length <= 16).sort();
const core = split(fs.readFileSync('public/data/words.txt', 'utf8').toUpperCase()).filter(word => /^[A-Z]{4,16}$/.test(word));
const coreSet = new Set(core);
const trie = new Trie();
for (const word of new Set([...core, ...required, ...bonus, ...probes])) trie.insert(word);
const fresh = bank.puzzles.filter(p => p.date >= quality.cutover);
const usage = new Map(), probeUsage = new Map(probes.map(word => [word, 0]));
let broadCandidates = 0, withBroadCandidates = 0;
for (const puzzle of bank.puzzles) {
  const old = legacy.puzzles.find(p => p.date === puzzle.date);
  if (puzzle.date < quality.cutover) {
    const { extraWords, ...original } = puzzle;
    assert.deepEqual(original, old, `Legacy mutation: ${puzzle.date}`);
    assert.ok(Array.isArray(extraWords));
  }
  const allowed = [...puzzle.requiredWords, ...puzzle.bonusWords, ...(puzzle.extraWords || [])];
  assert.equal(new Set(allowed).size, allowed.length, `Duplicate classes: ${puzzle.date}`);
  for (const word of allowed) assert.ok(findCompletePath(puzzle, word), `Unplayable entry: ${puzzle.date}`);
  const grid = puzzle.board.map((row, r) => row.map((letter, col) => ({ letter, row: r, col })));
  const solved = solveBoard(grid, trie).map(item => item.word).filter(word => findCompletePath(puzzle, word));
  const recognized = new Set(allowed);
  // Every playable v2 lexicon entry must be recognized, including legacy extras.
  const missingAllowed = solved.filter(word => (required.has(word) || bonus.has(word)) && !recognized.has(word));
  assert.deepEqual(missingAllowed, [], `Missing recognized entry: ${puzzle.date}`);
  if (puzzle.date < quality.cutover) continue;
  assert.ok(puzzle.requiredWords.every(word => required.has(word)), `Wrong target classification: ${puzzle.date}`);
  assert.ok(puzzle.bonusWords.every(word => bonus.has(word)), `Wrong bonus classification: ${puzzle.date}`);
  assert.deepEqual(assessCompleteQuality(puzzle), { difficulty: puzzle.difficulty, quality: puzzle.quality });
  const candidates = solved.filter(word => !recognized.has(word) && coreSet.has(word));
  broadCandidates += candidates.length;
  if (candidates.length) withBroadCandidates++;
  for (const word of puzzle.requiredWords) usage.set(word, (usage.get(word) || 0) + 1);
  for (const word of solved) if (probeUsage.has(word)) probeUsage.set(word, probeUsage.get(word) + 1);
}
function range(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return { min: sorted[0], median: sorted[Math.floor(sorted.length / 2)], max: sorted.at(-1) };
}
const classifiedProbes = probes.map(word => ({ word, classification: required.has(word) ? 'target' : bonus.has(word) ? 'bonus' : 'missing', playableNewBoards: probeUsage.get(word) }));
const hash = name => crypto.createHash('sha256').update(fs.readFileSync(`public/data/complete/${name}.json`)).digest('hex');
const report = {
  schema: 1, bankVersion: bank.version, cutover: quality.cutover, coverageEnd: bank.endDate,
  inputHashes: Object.fromEntries(['bank-v1','bank-v2','lexicon-v1','lexicon-v2'].map(name => [name, hash(name)])),
  integrity: { boards: bank.puzzles.length, legacyPreserved: bank.puzzles.length - fresh.length, newBoards: fresh.length, playableEntriesAndCompleteLexiconCoverage: true, qualityModelReproduced: true },
  editorialLexicon: { required: required.size, bonus: bonus.size, usedNewTargets: usage.size, unusedTargetSpellings: required.size - usage.size },
  difficulty: Object.fromEntries(['Gentle','Steady','Stretch'].map(label => {
    const sample = fresh.filter(p => p.difficulty === label);
    return [label, { boards: sample.length, targets: range(sample.map(p => p.requiredWords.length)), longWords: range(sample.map(p => p.quality.longWords)), averageTurns: range(sample.map(p => p.quality.averageTurns)), score: range(sample.map(p => p.quality.score)) }];
  })),
  representativeAnchor: { turns: range(fresh.map(p => p.quality.anchorTurns)), diagonals: range(fresh.map(p => p.quality.anchorDiagonals)) },
  repeatedTargets: [...usage].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 12).map(([word, boards]) => ({ word, boards })),
  reviewSample: {
    note: 'Hand-selected everyday spelling probes, not a frequency corpus. Missing/bonus entries require editorial review and a versioned cutover; no automatic import.',
    total: probes.length,
    classifications: Object.fromEntries(['target','bonus','missing'].map(label => [label, classifiedProbes.filter(item => item.classification === label).length])),
    missingSpellings: classifiedProbes.filter(item => item.classification === 'missing').map(item => item.word),
    missingPlayable: classifiedProbes.filter(item => item.classification === 'missing' && item.playableNewBoards).sort((a, b) => b.playableNewBoards - a.playableNewBoards || a.word.localeCompare(b.word)),
    familiarBonuses: classifiedProbes.filter(item => item.classification === 'bonus'),
  },
  broaderDictionary: { candidateDiscoveries: broadCandidates, affectedNewBoards: withBroadCandidates, note: 'Candidate discrepancies against the existing general game dictionary, not verified omissions and not a licensing or word-frequency signal. Lists differ by design.' },
};
console.log(JSON.stringify(report, null, 2));
