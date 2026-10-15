"use client";

import { useState } from "react";
import CompleteLetterBoard from "./CompleteLetterBoard";
import { CompletePuzzle, Position, wordFromPath } from "@/lib/complete";

const DEMO: CompletePuzzle = {id:"tutorial",date:"",version:"1",rulesVersion:"1",dictionaryVersion:"demo",board:[["R","A","T"],["L","E","E"],["O","N","D"]],requiredWords:["RATE","LATE"],bonusWords:[],difficulty:"Gentle"};
const STEPS=[{word:"RATE",text:"Drag R → A → T → E and release. Or tap those tiles, then submit."},{word:"LATE",text:"Try L → A → T → E. L to A is diagonal: diagonal neighbors count too."},{word:"RATE",text:"Select R → A, undo A with Undo (or Backspace), then add A → T → E and submit. Escape clears a trail."}];
export default function CompleteTutorial({onClose}: {onClose:()=>void}) {
  const [step,setStep]=useState(0);
  const [path,setPath]=useState<Position[]>([]);
  const [message,setMessage]=useState("");
  const [undone,setUndone]=useState(false);
  const [done,setDone]=useState(false);
  const change=(next:Position[])=>{if(step===2 && next.length<path.length)setUndone(true);setPath(next);};
  const submit=(trail:Position[])=>{
    if(wordFromPath(DEMO,trail)!==STEPS[step].word){setMessage(`Try ${STEPS[step].word}.`);setPath([]);return;}
    if(step===2&&!undone){setMessage("Try removing one selected tile with Undo before submitting.");return;}
    setMessage("Nice trail! This practice does not change your daily score.");setPath([]);setDone(true);
  };
  return <section className="mb-6 rounded-3xl border border-primary/40 bg-primary/5 p-4 sm:p-6" aria-label="Quick start tutorial">
    <div className="flex justify-between gap-3"><h2 className="text-lg font-bold">Quick start / {step+1} of 3</h2><button onClick={onClose} className="text-sm text-text-muted">Skip tutorial</button></div>
    <p className="mt-2 text-sm text-text-muted">{STEPS[step].text}</p>
    <div className="max-w-xs"><CompleteLetterBoard puzzle={DEMO} path={path} onPath={change} onSubmit={submit} onFeedback={setMessage} disabled={done} /></div>
    <div className="flex flex-wrap items-center gap-3"><span className="min-w-0 break-all font-mono">{path.map(cell=>DEMO.board[cell.row][cell.col]).join("")||"Select a trail"}</span><button disabled={!path.length||done} onClick={()=>change(path.slice(0,-1))} className="text-sm text-primary disabled:opacity-40">Undo</button><button disabled={!path.length||done} onClick={()=>submit(path)} className="text-sm text-primary disabled:opacity-40">Submit tutorial path</button>{done&&<button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white" onClick={()=>{if(step===2)onClose();else{setStep(step+1);setDone(false);setUndone(false);setMessage("");}}}>{step===2?"Start today's board":"Next example"}</button>}</div>
    <p role="status" className="mt-3 text-sm text-text-muted">{message}</p>
  </section>;
}
