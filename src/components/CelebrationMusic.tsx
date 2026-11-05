import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

/**
 * Traditional Indian Flute & Shehnai Melodic Synthesizer
 * Uses Web Audio API to play gentle, auspicious Raag Bhupali (Indian celebratory scale)
 * Never autoplays; starts only when visitor taps Play/Unmute.
 */
export default function CelebrationMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Raag Bhupali auspicious notes (Sa, Re, Ga, Pa, Dha) in Hz
  const RAAG_BHUPALI = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

  const playNote = (ctx: AudioContext, freq: number, duration: number) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Flute-like gentle warmth
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio node cleanup
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.suspend();
      setIsPlaying(false);
    } else {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      let noteIdx = 0;
      const melodySequence = [0, 1, 2, 4, 5, 4, 2, 1, 0, 2, 4, 5, 7, 5, 4, 2];

      const playNext = () => {
        const note = RAAG_BHUPALI[melodySequence[noteIdx % melodySequence.length]];
        playNote(ctx, note, 1.8);
        noteIdx++;
      };

      playNext();
      intervalRef.current = setInterval(playNext, 1200);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
      className={`fixed top-4 right-4 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-md transition-all shadow-md active:scale-95 ${
        isPlaying
          ? "bg-[#C5A059] text-stone-950 font-bold border-[#B48A3C] shadow-[0_0_20px_rgba(197,160,89,0.5)]"
          : "bg-white/95 text-[#1C1917] border-[#E8DEC8] hover:border-[#C5A059] shadow-sm"
      }`}
      title={isPlaying ? "Mute Auspicious Music" : "Play Auspicious Music"}
    >
      <Music size={15} className={isPlaying ? "animate-bounce" : ""} />
      {isPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
      <span className="text-xs font-serif tracking-wider uppercase hidden sm:inline">
        {isPlaying ? "Music Playing" : "Auspicious Music"}
      </span>
    </button>
  );
}
