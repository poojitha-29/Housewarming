import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEventConfig } from "../context/EventContext";
import { useCountdown } from "../hooks/useCountdown";
import { generateICS } from "../utils/calendar";
import {
  Calendar,
  Clock,
  MapPin,
  DoorOpen,
  Flame,
  Music,
  Navigation,
  Phone,
  MessageCircle
} from "lucide-react";

/**
 * EXACT WISHLYS HOUSEWARMING MAIN INVITATION SITE
 * Matches Screenshots 3, 4, and 5:
 * - Peach-cream paper background with floating marigold petals
 * - Draped marigold & mango leaf toran at the top
 * - "|| Shree Ganeshaya Namah ||"
 * - Sacred Kalash artwork with coconut & mango leaves
 * - "Shubh Griha Pravesh" in cursive red script
 * - "The Srikanth Family" + "SRIKANTH & SIVAPRIYA & DAUGHTERS"
 * - Row of 5 glowing traditional clay diyas
 * - Lakshmi Padam footprints
 * - "Counting down to move-in day" with 4 rounded countdown cards
 * - "Our New Home" community showcase with 4K Urbanrise photos
 * - "Schedule / The Celebrations" vertical timeline with Door & Havan icons
 * - Floating bottom-right maroon "RSVP ->" + Music toggle pill
 */

// ─── Decorative Golden Marigold Divider (Matches Screenshots 4 & 5) ───────────
function MarigoldDivider() {
  return (
    <div className="flex items-center justify-center gap-2 my-4">
      <div className="h-[1.5px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#E0A458] to-[#E0A458]" />
      <div className="flex items-center gap-1">
        {/* Left Petal */}
        <div className="w-2.5 h-1.5 rounded-full bg-[#E67E00] transform -rotate-45" />
        {/* Left Marigold */}
        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#E67E00] to-[#FFA726] border border-[#BF360C]/20 flex items-center justify-center shadow-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D84315]" />
        </div>
        {/* Center Marigold (Larger) */}
        <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-[#F57F17] to-[#FDD835] border border-[#E65100]/20 flex items-center justify-center shadow-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FFA726] to-[#E65100] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#FFF9C4]" />
          </div>
        </div>
        {/* Right Marigold */}
        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#E67E00] to-[#FFA726] border border-[#BF360C]/20 flex items-center justify-center shadow-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D84315]" />
        </div>
        {/* Right Petal */}
        <div className="w-2.5 h-1.5 rounded-full bg-[#E67E00] transform rotate-45" />
      </div>
      <div className="h-[1.5px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-[#E0A458] to-[#E0A458]" />
    </div>
  );
}

// ─── Authentic Sacred Lakshmi Padam Footprints (Matches Screenshot 4) ────────
function LakshmiPadam() {
  return (
    <div className="flex flex-col items-center gap-2 mb-3">
      {/* Step 1: Left & Right Foot entering */}
      <div className="flex items-center gap-3 transform -rotate-12 translate-x-2">
        {/* Left Foot */}
        <svg width="20" height="28" viewBox="0 0 20 28" fill="#9E1B32" className="drop-shadow-xs">
          <ellipse cx="10" cy="17" rx="7" ry="10" />
          <circle cx="4.5" cy="4.5" r="2.2" />
          <circle cx="8" cy="3" r="2" />
          <circle cx="11.5" cy="3.5" r="1.8" />
          <circle cx="15" cy="5" r="1.6" />
          <circle cx="17.5" cy="7.5" r="1.3" />
        </svg>
        {/* Right Foot */}
        <svg width="20" height="28" viewBox="0 0 20 28" fill="#9E1B32" className="transform scale-x-[-1] translate-y-2 drop-shadow-xs">
          <ellipse cx="10" cy="17" rx="7" ry="10" />
          <circle cx="4.5" cy="4.5" r="2.2" />
          <circle cx="8" cy="3" r="2" />
          <circle cx="11.5" cy="3.5" r="1.8" />
          <circle cx="15" cy="5" r="1.6" />
          <circle cx="17.5" cy="7.5" r="1.3" />
        </svg>
      </div>
      {/* Step 2: Next step */}
      <div className="flex items-center gap-3 transform rotate-6 -translate-x-2">
        {/* Left Foot */}
        <svg width="20" height="28" viewBox="0 0 20 28" fill="#9E1B32" className="drop-shadow-xs">
          <ellipse cx="10" cy="17" rx="7" ry="10" />
          <circle cx="4.5" cy="4.5" r="2.2" />
          <circle cx="8" cy="3" r="2" />
          <circle cx="11.5" cy="3.5" r="1.8" />
          <circle cx="15" cy="5" r="1.6" />
          <circle cx="17.5" cy="7.5" r="1.3" />
        </svg>
        {/* Right Foot */}
        <svg width="20" height="28" viewBox="0 0 20 28" fill="#9E1B32" className="transform scale-x-[-1] translate-y-2 drop-shadow-xs">
          <ellipse cx="10" cy="17" rx="7" ry="10" />
          <circle cx="4.5" cy="4.5" r="2.2" />
          <circle cx="8" cy="3" r="2" />
          <circle cx="11.5" cy="3.5" r="1.8" />
          <circle cx="15" cy="5" r="1.6" />
          <circle cx="17.5" cy="7.5" r="1.3" />
        </svg>
      </div>
    </div>
  );
}

// ─── Floating Marigold Petals ────────────────────────────────────────────────
function FloatingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -20,
            x: `${(i * 5.8) % 100}vw`,
            rotate: 0,
            opacity: 0.7,
          }}
          animate={{
            y: "105vh",
            x: `${((i * 5.8) % 100) + Math.sin(i) * 8}vw`,
            rotate: 360,
            opacity: [0.7, 0.9, 0.4],
          }}
          transition={{
            duration: 8 + (i % 6) * 2,
            repeat: Infinity,
            delay: (i * 0.7) % 7,
            ease: "linear",
          }}
          className={`absolute rounded-full ${
            i % 2 === 0
              ? "w-3 h-2 bg-[#F59E0B] rounded-tr-none"
              : "w-2.5 h-3.5 bg-[#EA580C] rounded-bl-none"
          }`}
          style={{
            filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.08))",
          }}
        />
      ))}
    </div>
  );
}

interface WishlysMainSiteProps {
  onReplayEntrance?: () => void;
}

export default function WishlysMainSite({ onReplayEntrance }: WishlysMainSiteProps) {
  const { config } = useEventConfig();
  const { hosts, venue, events, gallery, sanskritBlessing, invitationMessage, posterMessage } = config;
  const invitationHeading = "శుభ గృహప్రవేశం 🙏";
  const [evNight, evMorning] = events;

  // Countdown to 25 November 2026
  const timeLeft = useCountdown(evNight.date + "T21:30:00");

  // Audio Player State (Raag Bhupali soothing auspicious music)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const melodyTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleMusic = () => {
    if (isPlayingMusic) {
      if (melodyTimerRef.current) clearInterval(melodyTimerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.suspend();
      setIsPlayingMusic(false);
    } else {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
      const seq = [0, 1, 2, 4, 5, 4, 2, 1, 0, 2, 4, 5];
      let idx = 0;

      const playMelody = () => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(NOTES[seq[idx % seq.length]], ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.6);
          idx++;
        } catch {}
      };

      playMelody();
      melodyTimerRef.current = setInterval(playMelody, 1100);
      setIsPlayingMusic(true);
    }
  };

  useEffect(() => {
    return () => {
      if (melodyTimerRef.current) clearInterval(melodyTimerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const handleCalendar = (ev: (typeof events)[number]) => {
    const ics = generateICS(ev);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ev.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Gallery state
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen text-[#3B1E08] font-sans antialiased overflow-x-hidden relative selection:bg-[#E0A458] selection:text-white"
      style={{
        background: "linear-gradient(180deg, #FFF9EE 0%, #FFEFD2 30%, #FDF1DD 70%, #FFF8EE 100%)",
      }}
    >
      <FloatingPetals />

      {/* ── PHONE / SCREEN MOCKUP WRAPPER FOR AUTHENTIC WISHLYS LOOK ── */}
      <div className="max-w-[430px] mx-auto min-h-screen bg-gradient-to-b from-[#FFF9EE] via-[#FFEFD2] to-[#FFF8EE] shadow-[0_0_60px_rgba(180,120,60,0.15)] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E1E1E] sm:my-6 sm:shadow-[0_25px_70px_rgba(0,0,0,0.25)] overflow-hidden relative pb-28">
        
        {/* Subtle Replay Door Opening Button at Top Right */}
        {onReplayEntrance && (
          <button
            onClick={onReplayEntrance}
            className="absolute top-4 right-4 z-30 bg-[#9E1B32]/10 hover:bg-[#9E1B32]/20 text-[#9E1B32] text-[10px] font-sans font-semibold tracking-wider px-2.5 py-1 rounded-full border border-[#9E1B32]/20 transition-all flex items-center gap-1 shadow-xs"
            title="Replay Front Door Opening"
          >
            <span>🚪 Replay Door</span>
          </button>
        )}

        {/* ── TOP MARIGOLD GARLAND (Matches Screenshot 3) ── */}
        <div className="relative w-full z-20 pointer-events-none">
          {/* Horizontal Garland swag with mango leaves and marigolds */}
          <div className="flex items-center justify-between px-2 pt-1">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center -mx-1">
                <div className="w-2.5 h-3.5 bg-[#2E7D32] rounded-full -mb-1 transform rotate-6" />
                <div
                  className={`w-5 h-5 rounded-full border border-black/10 shadow-xs flex items-center justify-center ${
                    i % 2 === 0
                      ? "bg-gradient-to-tr from-[#E67E00] to-[#FFA726]"
                      : "bg-gradient-to-tr from-[#F57F17] to-[#FDD835]"
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#BF360C]/30" />
                </div>
                {/* Golden Hanging Bells under alternating flowers (Matches Screenshot 3) */}
                {i % 3 === 1 && (
                  <div className="flex flex-col items-center -mt-0.5">
                    <div className="w-[1.5px] h-1.5 bg-[#B78103]" />
                    <div className="w-2 h-2 rounded-t-full bg-gradient-to-b from-[#FCE788] via-[#E5A912] to-[#B78103] shadow-xs" />
                    <div className="w-1 h-1 rounded-full bg-[#8A5C02] -mt-0.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Left hanging garland strand with bells (Matches Screenshot 3) */}
          <div className="absolute top-4 left-2 flex flex-col items-center gap-0.5">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border border-black/10 shadow-xs ${
                  i % 2 === 0 ? "bg-[#FFA726]" : "bg-[#FDD835]"
                }`}
              />
            ))}
            <div className="w-2.5 h-3 rounded-t-full bg-gradient-to-b from-[#FCE788] to-[#B78103] shadow-xs mt-0.5" />
          </div>

          {/* Right hanging garland strand with bells (Matches Screenshot 3) */}
          <div className="absolute top-4 right-2 flex flex-col items-center gap-0.5">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border border-black/10 shadow-xs ${
                  i % 2 === 0 ? "bg-[#FFA726]" : "bg-[#FDD835]"
                }`}
              />
            ))}
            <div className="w-2.5 h-3 rounded-t-full bg-gradient-to-b from-[#FCE788] to-[#B78103] shadow-xs mt-0.5" />
          </div>
        </div>

        {/* ── SECTION 1: HERO & SACRED KALASH (Matches Screenshot 3) ── */}
        <section className="pt-8 px-6 text-center">
          {/* Shloka */}
          <p className="text-[#9E1B32] text-xs sm:text-sm font-serif tracking-widest font-semibold">
            {sanskritBlessing.shloka}
          </p>

          {/* Sacred Kalash Graphic (Matches Screenshot 3) */}
          <div className="my-5 flex justify-center">
            <div className="relative w-20 h-24 flex flex-col items-center justify-end">
              {/* Coconut (Shriphal) */}
              <div className="w-8 h-8 rounded-full bg-[#5D3314] shadow-sm z-20 flex items-center justify-center -mb-2 border border-[#3E1E08]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3E1E08]" />
              </div>
              {/* Mango Leaves (Amra Pallav) */}
              <div className="relative w-16 h-8 z-10 flex justify-center">
                <div className="w-3.5 h-7 bg-[#2E7D32] rounded-t-full transform -rotate-30 -mr-1 shadow-xs" />
                <div className="w-4 h-9 bg-[#388E3C] rounded-t-full -my-1 shadow-xs" />
                <div className="w-3.5 h-7 bg-[#2E7D32] rounded-t-full transform rotate-30 -ml-1 shadow-xs" />
              </div>
              {/* Brass Kalash Pot */}
              <div className="w-16 h-14 rounded-b-[28px] rounded-t-[10px] bg-gradient-to-tr from-[#B78103] via-[#E5A912] to-[#FCE788] border-2 border-[#8A5C02] shadow-md flex flex-col items-center justify-center relative -mt-1">
                {/* Red Mauli Ribbon */}
                <div className="w-full h-1.5 bg-[#B71C1C] my-auto shadow-xs" />
                {/* Red Om / Swastik Symbol */}
                <span className="text-[#B71C1C] font-bold text-xs -mt-1">ॐ</span>
              </div>
            </div>
          </div>

          {/* శుభ గృహప్రవేశం 🙏 in Red Cursive Script */}
          <h2
            className="text-3xl sm:text-4xl text-[#9E1B32] font-script"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {invitationHeading}
          </h2>

          {/* Family Heading */}
          <h1
            className="text-3xl sm:text-4xl text-[#3B1E08] font-serif font-bold mt-2"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
          >
            {hosts.familyTitle}
          </h1>

          <p className="text-[#5D4037] text-xs sm:text-sm mt-4 max-w-xs mx-auto leading-relaxed font-sans">
            {invitationMessage}
          </p>

          {/* Date & Time Bar */}
          <div className="mt-5 flex items-center justify-center gap-4 text-[#8D2B0B] text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#9E1B32]" />
              <span>{evNight.displayDate.split(" ")[0]} &amp; {evMorning.displayDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#9E1B32]" />
              <span>{evNight.time} &amp; {evMorning.time}</span>
            </div>
          </div>

          {/* Row of 5 Traditional Glowing Diyas (Matches Screenshot 3) */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Glowing Flame */}
                <motion.div
                  animate={{ scaleY: [1, 1.25, 1], scaleX: [1, 0.9, 1] }}
                  transition={{ duration: 1.2 + (i % 3) * 0.3, repeat: Infinity }}
                  className="w-2.5 h-4 bg-gradient-to-t from-[#F57F17] via-[#FFD54F] to-[#FFFDE7] rounded-full shadow-[0_0_8px_#FFA000]"
                />
                {/* Clay Diya Bowl */}
                <div className="w-8 sm:w-9 h-3.5 bg-gradient-to-r from-[#8D4E21] via-[#B86830] to-[#733B14] rounded-b-full border-t border-[#D78B55] shadow-xs" />
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: LAKSHMI FOOTPRINTS & COUNTDOWN (Matches Screenshot 4) ── */}
        <section className="pt-14 px-6 text-center">
          {/* Auspicious Red Footprints (Lakshmi Padam) Walking into Home (Matches Screenshot 4) */}
          <LakshmiPadam />

          <p
            className="text-[#9E1B32] text-xl font-script"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {evNight.day}, {evNight.displayDate}
          </p>

          <h2
            className="text-2xl sm:text-3xl text-[#3B1E08] font-serif font-bold mt-1"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
          >
            Counting down to move-in day
          </h2>

          <MarigoldDivider />

          {/* 4 Rounded White Countdown Cards (Matches Screenshot 4) */}
          <div className="grid grid-cols-4 gap-2.5 mt-4">
            {[
              { val: timeLeft.days, label: "DAYS" },
              { val: timeLeft.hours, label: "HOURS" },
              { val: timeLeft.minutes, label: "MINS" },
              { val: timeLeft.seconds, label: "SECS" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="bg-white/95 rounded-2xl py-3 px-1 border border-[#EAD5BE] shadow-[0_6px_16px_rgba(200,150,90,0.12)] flex flex-col items-center"
              >
                <span
                  className="text-2xl sm:text-3xl font-serif font-bold text-[#851D2D] tabular-nums"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {String(val).padStart(2, "0")}
                </span>
                <span className="text-[#8D6E63] text-[9px] font-sans font-bold tracking-wider uppercase mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: OUR NEW HOME (Matches Screenshot 4) ── */}
        <section className="pt-16 px-6 text-center">
          <p
            className="text-[#9E1B32] text-xl font-script"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Home sweet home
          </p>

          <h2
            className="text-2xl sm:text-3xl text-[#3B1E08] font-serif font-bold mt-1"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
          >
            Our New Home
          </h2>

          <MarigoldDivider />

          {/* Genuine 4K Urbanrise Photo Card */}
          <div className="mt-4 rounded-3xl overflow-hidden bg-white border border-[#EAD5BE] shadow-[0_10px_25px_rgba(180,120,60,0.1)] text-left">
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={gallery[0]?.src || "/urbanrise/hero-tower.jpg"}
                alt="Urbanrise On Cloud 33"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#9E1B32] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Tower 3 · Flat 1208
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-serif font-bold text-[#3B1E08]">
                {venue.name}
              </h3>
              <p className="text-xs text-[#6D4C41] mt-1 leading-relaxed">
                {venue.addressLine1}, {venue.addressLine2}, {venue.city} – {venue.pincode}
              </p>

              <div className="mt-4 pt-3 border-t border-[#EAD5BE]/60 flex items-center justify-between text-xs font-semibold text-[#851D2D]">
                <span>Apartment Unit: {venue.apartment}</span>
                <a
                  href={venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#9E1B32] hover:underline"
                >
                  <Navigation size={13} />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: THE CELEBRATIONS SCHEDULE (Matches Screenshot 5) ── */}
        <section className="pt-16 px-6 text-center">
          <p
            className="text-[#9E1B32] text-xl font-script"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Schedule
          </p>

          <h2
            className="text-2xl sm:text-3xl text-[#3B1E08] font-serif font-bold mt-1"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
          >
            The Celebrations
          </h2>

          <MarigoldDivider />

          {/* ── VERTICAL TIMELINE WITH MAROON BADGES (Matches Screenshot 5) ── */}
          <div className="relative mt-8 text-left pl-6">
            {/* Golden Vertical Timeline Line */}
            <div className="absolute top-4 bottom-8 left-[19px] w-[1.5px] bg-[#E0A458]" />

            {/* EVENT 1: NIGHT CELEBRATION (Door Badge) */}
            <div className="relative mb-8">
              {/* Maroon Circular Badge with Door Icon */}
              <div className="absolute -left-6 top-3 w-10 h-10 rounded-full bg-[#9E1B32] text-white flex items-center justify-center shadow-md border-2 border-white z-10">
                <DoorOpen size={18} />
              </div>

              {/* White Card */}
              <div className="bg-white/95 rounded-2xl p-5 ml-4 border border-[#EAD5BE] shadow-[0_8px_20px_rgba(180,120,60,0.08)]">
                <h4 className="text-lg font-serif font-bold text-[#3B1E08]">
                  {evNight.title}
                </h4>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-[#9E1B32] font-semibold">
                  <Clock size={13} />
                  <span>{evNight.day.substring(0, 3)}, {evNight.displayDate.split(" ")[0]} {evNight.displayDate.split(" ")[1]?.substring(0, 3)} · {evNight.time}</span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-[#8D6E63]">
                  <MapPin size={13} />
                  <span>{venue.apartment}</span>
                </div>

                <p className="mt-2.5 text-xs text-[#5D4037] leading-relaxed">
                  {evNight.description}
                </p>

                <button
                  onClick={() => handleCalendar(evNight)}
                  className="mt-3 text-[11px] font-bold text-[#9E1B32] hover:text-[#6E1024] flex items-center gap-1 underline"
                >
                  <Calendar size={12} />
                  <span>Add to Calendar (.ics)</span>
                </button>
              </div>
            </div>

            {/* EVENT 2: GRIHA PRAVESH PUJA (Flame / Havan Badge) */}
            <div className="relative">
              {/* Maroon Circular Badge with Flame Icon */}
              <div className="absolute -left-6 top-3 w-10 h-10 rounded-full bg-[#9E1B32] text-white flex items-center justify-center shadow-md border-2 border-white z-10">
                <Flame size={18} />
              </div>

              {/* White Card */}
              <div className="bg-white/95 rounded-2xl p-5 ml-4 border border-[#EAD5BE] shadow-[0_8px_20px_rgba(180,120,60,0.08)]">
                <h4 className="text-lg font-serif font-bold text-[#3B1E08]">
                  {evMorning.title}
                </h4>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-[#9E1B32] font-semibold">
                  <Clock size={13} />
                  <span>{evMorning.day.substring(0, 3)}, {evMorning.displayDate.split(" ")[0]} {evMorning.displayDate.split(" ")[1]?.substring(0, 3)} · {evMorning.time}</span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-[#8D6E63]">
                  <MapPin size={13} />
                  <span>{venue.apartment}</span>
                </div>

                <p className="mt-2.5 text-xs text-[#5D4037] leading-relaxed">
                  {evMorning.description}
                </p>

                <button
                  onClick={() => handleCalendar(evMorning)}
                  className="mt-3 text-[11px] font-bold text-[#9E1B32] hover:text-[#6E1024] flex items-center gap-1 underline"
                >
                  <Calendar size={12} />
                  <span>Add to Calendar (.ics)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: 4K URBANRISE PHOTO GALLERY ── */}
        <section className="pt-16 px-6 text-center">
          <p
            className="text-[#9E1B32] text-xl font-script"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Memories in the making
          </p>

          <h2
            className="text-2xl sm:text-3xl text-[#3B1E08] font-serif font-bold mt-1"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
          >
            {venue.name}
          </h2>

          <MarigoldDivider />

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            {gallery.map(({ src, label }, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(src)}
                className="relative h-28 sm:h-36 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-[#EAD5BE] group"
              >
                <img
                  src={src}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] text-white font-medium truncate">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION: LUXURY INVITATION POSTER (Matches Section 5 Specification) ── */}
        <section className="pt-16 px-6 text-center">
          <p
            className="text-[#9E1B32] text-xl font-script"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Digital Invitation
          </p>

          <h2
            className="text-2xl sm:text-3xl text-[#3B1E08] font-serif font-bold mt-1"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
          >
            ఆత్మీయ ఆహ్వానం
          </h2>

          <MarigoldDivider />

          {/* High-Resolution Printable / Downloadable Poster Card */}
          <div
            className="mt-4 p-6 rounded-[28px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EC] to-[#FCE8C8] border-[3px] border-[#C99A43] shadow-[0_16px_38px_rgba(120,65,20,0.18)] relative overflow-hidden text-center"
          >
            <div className="absolute inset-[7px] rounded-[21px] border border-[#D9B56E]/70 pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#E7BD70]/15 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#9E1B32]/[0.06] blur-2xl pointer-events-none" />
            {/* Ornate Gold Corner Borders */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#B78103]" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#B78103]" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#B78103]" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#B78103]" />

            {/* Sacred Shloka */}
            <p className="text-[#9E1B32] text-[11px] font-serif tracking-widest font-semibold uppercase">
              {sanskritBlessing.shloka}
            </p>

            {/* Sacred Kalash Emblem */}
            <div className="my-3 flex justify-center">
              <div className="w-12 h-14 flex flex-col items-center justify-end">
                <div className="w-5 h-5 rounded-full bg-[#5D3314] -mb-1 border border-[#3E1E08]" />
                <div className="flex justify-center -mb-0.5">
                  <div className="w-2.5 h-5 bg-[#2E7D32] rounded-t-full transform -rotate-30 -mr-0.5" />
                  <div className="w-3 h-6 bg-[#388E3C] rounded-t-full -my-0.5" />
                  <div className="w-2.5 h-5 bg-[#2E7D32] rounded-t-full transform rotate-30 -ml-0.5" />
                </div>
                <div className="w-11 h-9 rounded-b-2xl rounded-t-md bg-gradient-to-tr from-[#B78103] via-[#E5A912] to-[#FCE788] border border-[#8A5C02] flex items-center justify-center">
                  <span className="text-[#B71C1C] text-[10px] font-bold">ॐ</span>
                </div>
              </div>
            </div>

            <p
              className="relative text-[27px] leading-tight text-[#9E1B32] font-semibold font-serif drop-shadow-[0_1px_0_rgba(201,154,67,0.25)]"
              style={{ fontFamily: "'Noto Serif Telugu', 'Gautami', serif" }}
            >
              {invitationHeading}
            </p>
            <div className="mx-auto mt-2 mb-3 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C99A43]" />
              <span className="text-[#C99A43] text-xs">✦ ❖ ✦</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C99A43]" />
            </div>

            <h3
              className="relative text-xl font-serif font-bold text-[#3B1E08] mt-1 tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {hosts.familyTitle}
            </h3>

            <p className="text-xs text-[#5D4037] mt-3 max-w-[280px] mx-auto leading-relaxed italic">
              "{posterMessage}"
            </p>

            {/* Celebrations Details Box */}
            <div className="mt-4 pt-3 border-t border-[#E0A458]/40 space-y-2 text-left">
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#EAD5BE]">
                <p className="text-[11px] font-bold text-[#9E1B32]">
                  🎉 {evNight.title}
                </p>
                <p className="text-[10px] text-[#5D4037]">
                  {evNight.day}, {evNight.displayDate} · {evNight.time}
                </p>
              </div>

              <div className="bg-white/80 p-2.5 rounded-xl border border-[#EAD5BE]">
                <p className="text-[11px] font-bold text-[#9E1B32]">
                  🪔 {evMorning.title}
                </p>
                <p className="text-[10px] text-[#5D4037]">
                  {evMorning.day}, {evMorning.displayDate} · {evMorning.time}
                </p>
              </div>
            </div>

            {/* Venue Box */}
            <div className="mt-3 bg-white/70 p-2.5 rounded-xl border border-[#EAD5BE] text-left text-[10px] text-[#5D4037]">
              <p className="font-bold text-[#3B1E08] text-[11px]">
                📍 Venue: {venue.name}
              </p>
              <p className="font-semibold text-[#851D2D]">
                Apartment: {venue.apartment}
              </p>
              <p className="mt-0.5 leading-tight text-[#6D4C41]">
                {venue.addressLine1}, {venue.addressLine2}, {venue.city} – {venue.pincode}
              </p>
              <p className="mt-1 font-bold text-[#3B1E08]">
                Contact: {hosts.contact}
              </p>
            </div>
          </div>

        </section>

        
       
{/* ── SECTION 6: SRI SATYANARAYANA SWAMY VRATAM ── */}
<section id="blessings" className="pt-16 px-6 text-center">
  <p
    className="text-[#9E1B32] text-xl font-script"
    style={{ fontFamily: "'Great Vibes', cursive" }}
  >
    An Auspicious Beginning
  </p>

  <h2
    className="text-2xl sm:text-3xl text-[#3B1E08] font-serif font-bold mt-1"
    style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
  >
    శ్రీ సత్యనారాయణ స్వామి వ్రతం
  </h2>

  <MarigoldDivider />

  <p className="text-xs sm:text-sm text-[#6D4C41] leading-relaxed max-w-sm mx-auto mt-3 mb-6">
    మా నూతన గృహంలో శ్రీ సత్యనారాయణ స్వామి వారి వ్రతాన్ని భక్తిశ్రద్ధలతో నిర్వహించుకుంటున్న ఈ పవిత్రమైన శుభసందర్భంగా, మీరు మీ కుటుంబ సభ్యులతో కలిసి విచ్చేసి స్వామివారి దివ్య ఆశీస్సులు పొందవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.
  </p>

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="w-full max-w-[360px] sm:max-w-[400px] mx-auto"
  >
    <div className="rounded-2xl overflow-hidden border-2 border-[#E0A458] shadow-[0_12px_30px_rgba(180,120,60,0.18)] bg-white">
      <img
        src="/satyanarayana-vratam.png"
        alt="Sri Satyanarayana Swamy Vratam"
        className="block w-full h-auto object-contain"
        loading="lazy"
      />
    </div>
  </motion.div>

  <p
    className="text-lg sm:text-xl text-[#9E1B32] mt-6 font-serif"
    style={{ fontFamily: "'Cormorant Garamond', serif" }}
  >
    May His divine blessings always be with us 🙏
  </p>
</section>


        {/* ── FOOTER: OUR DOOR IS ALWAYS OPEN FOR YOU ── */}
        <footer className="pt-16 pb-8 px-6 text-center">
          <p className="text-[#8D6E63] text-xs uppercase tracking-widest font-semibold">
            Our door is always open for you
          </p>
          <p className="text-[#3B1E08] font-serif font-bold text-lg mt-1">
            {hosts.familyTitle}
          </p>
          <p className="text-[#8D6E63] text-[11px] mt-0.5">
            {venue.apartment} · {venue.name} · {venue.city}
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href={hosts.phoneLink}
              className="w-9 h-9 rounded-full bg-white border border-[#EAD5BE] flex items-center justify-center text-[#9E1B32] shadow-xs"
              title="Call"
            >
              <Phone size={15} />
            </a>
            <a
              href={hosts.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-[#EAD5BE] flex items-center justify-center text-[#2E7D32] shadow-xs"
              title="WhatsApp"
            >
              <MessageCircle size={15} />
            </a>
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-[#EAD5BE] flex items-center justify-center text-[#8D2B0B] shadow-xs"
              title="Directions"
            >
              <MapPin size={15} />
            </a>
          </div>

          {/* Family Contacts - shown when names and phone numbers are provided */}
       {/* Family Contacts */}
<div className="mt-6 pt-4 border-t border-[#EAD5BE]">
  <p className="text-[#9E1B32] text-xs uppercase tracking-widest font-semibold">
    For any assistance, contact
  </p>

  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
    {[
      { id: "1", name: "Srikanth", phone: "8106868686" },
      { id: "2", name: "Sivapriya", phone: "9010723544" },
      { id: "3", name: "Sangeetha", phone: "9182965179" },
      { id: "4", name: "Poojitha", phone: "8106242929" },
    ].map((person) => (
      <a
        key={person.id}
        href={`tel:${person.phone}`}
        className="bg-white/80 border border-[#EAD5BE] rounded-xl px-3 py-2.5 flex items-center justify-between gap-2 text-left"
      >
        <span className="text-xs font-semibold text-[#3B1E08]">
          {person.name}
        </span>
        <span className="text-xs text-[#9E1B32] whitespace-nowrap">
          {person.phone}
        </span>
      </a>
    ))}
  </div>
</div>

          {onReplayEntrance && (
            <button
              onClick={onReplayEntrance}
              className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#9E1B32] hover:text-[#7F1426] font-semibold py-1.5 px-3 rounded-full bg-[#9E1B32]/10 hover:bg-[#9E1B32]/20 transition-colors cursor-pointer"
            >
              <span>🚪 Replay Door Opening Animation</span>
            </button>
          )}
        </footer>

        {/* ── FLOATING BOTTOM-RIGHT WISHLYS RSVP & MUSIC PILL (Matches Screenshots 3, 4, 5) ── */}
        <div className="fixed bottom-6 right-6 z-40 flex items-center shadow-[0_8px_25px_rgba(158,27,50,0.35)] rounded-full">
          {/* Maroon RSVP Button */}
          <a
            href={hosts.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#9E1B32] hover:bg-[#7F1426] text-white text-xs font-bold px-4 py-2.5 rounded-l-full flex items-center gap-1.5 transition-colors"
          >
            <span>RSVP</span>
            <span>→</span>
          </a>

          {/* Attached Music Toggle Button (Matches Screenshot 3, 4, 5 icon) */}
          <button
            onClick={toggleMusic}
            className="bg-[#FFF4E4] hover:bg-[#FFE8CC] text-[#9E1B32] p-2.5 rounded-r-full border-l border-[#F0D5B8] flex items-center justify-center transition-colors"
            title={isPlayingMusic ? "Mute Music" : "Play Celebration Music"}
          >
            <Music size={15} className={isPlayingMusic ? "animate-pulse" : ""} />
          </button>
        </div>

        {/* ── FULLSCREEN PHOTO MODAL ── */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/90 p-4 flex items-center justify-center backdrop-blur-md"
            >
              <img
                src={selectedPhoto}
                alt="Enlarged"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
