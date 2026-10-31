"use client";

import { PointerEvent, useRef } from "react";
import { CompletePuzzle, Position, rotateCompletePosition } from "@/lib/complete";
import { LETTER_POINTS } from "@/lib/boggle";

interface Props {
  puzzle: CompletePuzzle;
  turns?: number;
  path: Position[];
  preview?: Position[];
  counts?: number[][];
  disabled?: boolean;
  onPath: (path: Position[]) => void;
  onSubmit: (path: Position[]) => void;
  onFeedback: (message: string) => void;
}

export default function CompleteLetterBoard({puzzle, turns = 0, path, preview = [], counts, disabled, onPath, onSubmit, onFeedback}: Props) {
  const current = useRef(path);
  current.current = path;
  const pointer = useRef<number | null>(null);
  const start = useRef<Position | null>(null);
  const dragging = useRef(false);
  const size = puzzle.board.length;
  const same = (a: Position, b: Position) => a.row === b.row && a.col === b.col;
  const change = (next: Position[]) => { current.current = next; onPath(next); };
  const add = (cell: Position) => {
    const trail = current.current;
    const last = trail.at(-1);
    if (last && same(last,cell)) return;
    if (trail.length > 1 && same(trail[trail.length-2],cell)) {change(trail.slice(0,-1));onFeedback("Last tile removed.");return;}
    if (trail.some(item=>same(item,cell))) {onFeedback("A tile can only be used once. Undo or choose another tile.");return;}
    if (last && (Math.abs(last.row-cell.row)>1 || Math.abs(last.col-cell.col)>1)) {onFeedback("Choose a neighboring tile, including diagonals.");return;}
    change([...trail,cell]);
  };
  const down = (event: PointerEvent<HTMLButtonElement>, cell: Position) => {
    if (disabled || !event.isPrimary || event.button!==0) return;
    pointer.current=event.pointerId;start.current=cell;dragging.current=false;
    event.currentTarget.setPointerCapture(event.pointerId);add(cell);
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (pointer.current!==event.pointerId) return;
    const target=document.elementFromPoint(event.clientX,event.clientY)?.closest<HTMLButtonElement>("button[data-complete-cell]");
    if (!target || !event.currentTarget.closest('[data-complete-board]')?.contains(target)) return;
    const cell={row:Number(target.dataset.row),col:Number(target.dataset.col)};
    if (!dragging.current && start.current && !same(start.current,cell)) {dragging.current=true;change([start.current]);}
    add(cell);
  };
  const shown = (path.length ? path : preview).map(cell=>rotateCompletePosition(cell,size,turns));
  // Tiles use a 90-unit pitch with a 10-unit gap, matching the 9:1 CSS gap ratio.
  const points=shown.map(cell=>`${cell.col*100+45},${cell.row*100+45}`).join(" ");
  return <div className="relative mx-auto my-6 max-w-md touch-none select-none rounded-3xl p-3 sm:p-4 game-tray shadow-xl" data-complete-board aria-label="Letter board"
    onKeyDown={event=>{
      if (disabled) return;
      if (event.key==='Escape') {event.preventDefault();change([]);onFeedback("Trail cleared.");}
      if (event.key==='Backspace') {event.preventDefault();change(current.current.slice(0,-1));onFeedback("Last tile removed.");}
      if (event.key==='Enter' && current.current.length) {event.preventDefault();onSubmit(current.current);}
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)) {
        const target=(event.target as HTMLElement).closest<HTMLButtonElement>('[data-complete-cell]');
        if (!target) return;
        event.preventDefault();
        const display=rotateCompletePosition({row:Number(target.dataset.row),col:Number(target.dataset.col)},size,turns);
        const row=Math.max(0,Math.min(size-1,display.row+(event.key==='ArrowDown'?1:event.key==='ArrowUp'?-1:0)));
        const col=Math.max(0,Math.min(size-1,display.col+(event.key==='ArrowRight'?1:event.key==='ArrowLeft'?-1:0)));
        const original=rotateCompletePosition({row,col},size,-turns);
        event.currentTarget.querySelector<HTMLButtonElement>(`[data-row="${original.row}"][data-col="${original.col}"]`)?.focus();
      }
    }}>
    <div className="grid" style={{gridTemplateColumns:`repeat(${size},minmax(0,1fr))`,gap:`${100/(size*10-1)}%`}}>
      {Array.from({length:size*size},(_,index)=>{
        const display={row:Math.floor(index/size),col:index%size};
        const cell=rotateCompletePosition(display,size,-turns);
        const letter=puzzle.board[cell.row][cell.col];
        const selected=path.findIndex(item=>same(item,cell));
        const reviewed=preview.findIndex(item=>same(item,cell));
        const pointValue = LETTER_POINTS[letter] ?? 1;
        const isSel = selected >= 0;
        const isRev = reviewed >= 0;
        return <button key={`${cell.row}-${cell.col}`} type="button" disabled={disabled} data-complete-cell data-row={cell.row} data-col={cell.col}
          aria-label={`Row ${display.row+1}, column ${display.col+1}: ${letter}${counts ? `, ${counts[cell.row][cell.col]} remaining words start here` : ""}`} aria-pressed={isSel}
          className={`relative aspect-square rounded-2xl font-black transition-all text-2xl sm:text-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isSel ? 'game-tile-selected z-30' : isRev ? 'border border-accent bg-accent/20 z-20' : 'game-tile-3d text-text z-10'}`}
          onPointerDown={event=>down(event,cell)} onPointerMove={move} onPointerUp={event=>{if(pointer.current!==event.pointerId)return;pointer.current=null;if(dragging.current)onSubmit(current.current);}}
          onPointerCancel={()=>{pointer.current=null;change([]);onFeedback("Gesture cancelled. Try again.");}}
          onClick={event=>{if(event.detail===0)add(cell);}}>
          <span className="relative z-10">{letter}</span>
          <span className={`absolute bottom-1 right-1.5 text-[10px] font-bold leading-none select-none ${isSel ? 'text-white/80' : 'text-text-muted/60'}`}>{pointValue}</span>
          {(isSel || isRev) && <span className="absolute left-1.5 top-1 z-10 text-[9px] font-black leading-none text-white/80">{(isSel ? selected : reviewed) + 1}</span>}
          {counts && <span className="absolute top-1 right-1 z-10 rounded bg-bg/90 px-1 py-0.5 text-[9px] font-bold text-accent shadow-sm">{counts[cell.row][cell.col]}</span>}
        </button>;
      })}
    </div>
    {shown.length>1 && <svg className="pointer-events-none absolute inset-0 h-full w-full text-accent" viewBox={`0 0 ${size*100-10} ${size*100-10}`} aria-hidden="true"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" opacity="0.65" /></svg>}
  </div>;
}
