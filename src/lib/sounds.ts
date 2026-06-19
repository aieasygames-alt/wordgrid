// Lightweight Web Audio sound effects — no audio files needed

type AudioContextConstructor = typeof AudioContext;

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor: AudioContextConstructor | undefined =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: AudioContextConstructor })
        .webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.15
) {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export const sounds = {
  correct: () => {
    // Pleasant ascending two-note chime
    playTone(523.25, 0.12, "sine", 0.12); // C5
    setTimeout(() => playTone(783.99, 0.15, "sine", 0.1), 60); // G5
  },
  error: () => {
    // Low buzz
    playTone(150, 0.18, "sawtooth", 0.08);
  },
  select: () => {
    // Soft click per letter
    playTone(440, 0.04, "triangle", 0.05);
  },
  gameEnd: () => {
    // Descending arpeggio
    playTone(523.25, 0.15, "sine", 0.1);
    setTimeout(() => playTone(415.3, 0.15, "sine", 0.1), 120);
    setTimeout(() => playTone(329.63, 0.3, "sine", 0.1), 240);
  },
};
