// Lightweight Web Audio sound effects — procedural synth, zero audio files needed

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
  volume: number = 0.15,
  delay: number = 0
) {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const startTime = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

// Pentatonic frequencies for melodious tile dragging (C4 up to D6)
const PENTATONIC_SCALE = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  1046.50, // C6
  1174.66, // D6
];

export const sounds = {
  // Tile selection pitch ramps as the word path grows!
  select: (index: number = 0) => {
    const noteIdx = Math.min(Math.max(0, index), PENTATONIC_SCALE.length - 1);
    const freq = PENTATONIC_SCALE[noteIdx];
    playTone(freq, 0.06, "triangle", 0.08);
  },

  // Success chime adapts to word length & combo
  correct: (length: number = 3, combo: number = 1) => {
    if (length >= 7) {
      // Grand celebration chord + high octave sparkle for 7+ letter big words
      playTone(523.25, 0.28, "sine", 0.13, 0);       // C5
      playTone(659.25, 0.28, "sine", 0.12, 0.04);   // E5
      playTone(783.99, 0.32, "sine", 0.13, 0.08);   // G5
      playTone(1046.50, 0.45, "triangle", 0.14, 0.14); // C6
    } else if (length >= 5) {
      // Warm major triad for 5-6 letter words
      playTone(523.25, 0.22, "sine", 0.12, 0);     // C5
      playTone(659.25, 0.24, "sine", 0.11, 0.03); // E5
      playTone(783.99, 0.28, "sine", 0.12, 0.07); // G5
    } else {
      // Crisp two-note ascending chime for standard 3-4 letter words
      playTone(587.33, 0.14, "sine", 0.11, 0);     // D5
      playTone(880.00, 0.18, "sine", 0.10, 0.05); // A5
    }

    // Add extra chime if currently on a combo streak
    if (combo > 1) {
      playTone(1174.66, 0.18, "triangle", 0.07, 0.12);
    }
  },

  // Soft double-tap reject buzzer (gentle on ears, yet distinct)
  error: () => {
    playTone(180, 0.09, "sawtooth", 0.06, 0);
    playTone(140, 0.14, "sawtooth", 0.06, 0.08);
  },

  // Combo burst explosion chime (for x3 and x5 bursts)
  comboBurst: (level: number = 3) => {
    const base = level === 5 ? 659.25 : 523.25;
    playTone(base, 0.12, "triangle", 0.1, 0);
    playTone(base * 1.25, 0.12, "triangle", 0.1, 0.05);
    playTone(base * 1.5, 0.14, "triangle", 0.11, 0.1);
    playTone(base * 2, 0.25, "sine", 0.12, 0.15);
  },

  // Round over fanfare
  gameEnd: () => {
    playTone(523.25, 0.16, "sine", 0.12, 0);
    playTone(659.25, 0.16, "sine", 0.12, 0.1);
    playTone(783.99, 0.22, "sine", 0.12, 0.2);
    playTone(1046.50, 0.5, "triangle", 0.15, 0.32);
  },
};
