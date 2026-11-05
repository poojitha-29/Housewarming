import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEventConfig } from "../context/EventContext";

interface WishlysFrontDoorProps {
  onOpen: () => void;
}

export default function WishlysFrontDoor({ onOpen }: WishlysFrontDoorProps) {
  const { config } = useEventConfig();
  const [isRinging, setIsRinging] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play pleasant doorbell chime (ding-dong) using Web Audio API
  const playDoorbell = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      // Ding (High tone)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      gain1.gain.setValueAtTime(0.3, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.8);

      // Dong (Low tone) after 250ms
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gain2.gain.setValueAtTime(0.35, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 1.2);
      }, 260);
    } catch {
      // Audio fallback
    }
  };

  const handleRingAndOpen = () => {
    if (isOpening) return;
    setIsRinging(true);
    playDoorbell();

    // After bell rings, door swings open in 3D
    setTimeout(() => {
      setIsOpening(true);
    }, 600);

    // Transition to the inside invitation
    setTimeout(() => {
      onOpen();
    }, 2200);
  };

  // Auto-ring and open after 2.5 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      handleRingAndOpen();
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#500b17]"
      style={{
        backgroundImage: `
          radial-gradient(#8f1e34 1px, transparent 1px),
          linear-gradient(180deg, #5c0d1b 0%, #4a0914 100%)
        `,
        backgroundSize: "24px 24px, 100% 100%",
      }}
    >
      {/* ── PHONE FRAME CONTAINER ── */}
      <div className="relative w-full max-w-[420px] h-full sm:h-[860px] sm:max-h-[94vh] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E1E1E] sm:shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between items-center text-center">
        
        {/* Background Wallpaper Pattern (Matches Screenshot 1) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(244, 211, 150, 0.15) 1.5px, transparent 1.5px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* ── TOP HEADER SECTION ── */}
        <div className="relative z-20 pt-10 sm:pt-12 px-6">
          <p className="text-[#E6C280] text-[11px] sm:text-xs font-sans tracking-[0.25em] uppercase font-semibold">
            {config.door.badge}
          </p>

          <h1
            className="text-3xl sm:text-4xl text-[#F9E2B6] font-serif font-bold mt-2 mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
          >
            {config.door.familyTitle}
          </h1>

          <p className="text-[#C5A880] text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
            {config.door.ctaPrompt}
          </p>
        </div>

        {/* ── THE ARCHED DOOR & BELL COMPONENT ── */}
        <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-end pb-0">
          
          {/* Outer perspective wrapper for realistic 3D door swing */}
          <div
            className="relative w-[280px] sm:w-[320px] h-[440px] sm:h-[480px] flex items-end justify-center"
            style={{ perspective: "1200px" }}
          >
            {/* 🌸 MARIGOLD & MANGO LEAF TORAN OVER THE ARCH 🌸 */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[340px] z-30 pointer-events-none">
              {/* Top horizontal swag */}
              <div className="flex items-center justify-center gap-1.5 px-2">
                {Array.from({ length: 13 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center -mx-1">
                    {/* Mango leaf backdrop */}
                    <div className="w-2.5 h-4 bg-[#2D7A38] rounded-full -mb-1 transform rotate-6" />
                    {/* Marigold flower */}
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/10 shadow-sm flex items-center justify-center ${
                        i % 2 === 0
                          ? "bg-gradient-to-tr from-[#E67E00] to-[#FFA726]"
                          : "bg-gradient-to-tr from-[#F57F17] to-[#FDD835]"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#BF360C]/30" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Left hanging garland strand (Matches Screenshot 1) */}
              <div className="absolute top-5 left-1 flex flex-col items-center gap-0.5">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full border border-black/10 shadow-xs ${
                      i % 2 === 0 ? "bg-[#FFA726]" : "bg-[#FDD835]"
                    }`}
                  />
                ))}
              </div>

              {/* Right hanging garland strand (Matches Screenshot 1) */}
              <div className="absolute top-5 right-1 flex flex-col items-center gap-0.5">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full border border-black/10 shadow-xs ${
                      i % 2 === 0 ? "bg-[#FFA726]" : "bg-[#FDD835]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ── ARCHED DOOR FRAME ── */}
            <div className="relative w-[240px] sm:w-[270px] h-[390px] sm:h-[430px] rounded-t-[135px] border-[5px] border-[#8B5E3C] bg-[#2E150A] shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden">
              
              {/* Warm interior light revealed when door swings open */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5E0] via-[#FFE8B8] to-[#FAD48E] flex flex-col items-center justify-center p-4 text-center">
                <span className="text-4xl animate-bounce">🕉️</span>
                <p className="text-[#851D2D] font-serif font-bold text-lg mt-2">
                  {config.door.welcomeInteriorTitle}
                </p>
                <p className="text-[#6D4C41] text-xs font-sans">
                  {config.door.welcomeInteriorSubtitle}
                </p>
              </div>

              {/* 🚪 THE ARCHED WOODEN DOOR SLAB (Swings open on left hinge) 🚪 */}
              <motion.div
                animate={{
                  rotateY: isOpening ? -85 : 0,
                }}
                transition={{
                  duration: 1.8,
                  ease: [0.65, 0, 0.35, 1],
                }}
                onClick={handleRingAndOpen}
                className="absolute inset-0 cursor-pointer rounded-t-[130px] flex flex-col justify-between p-4 shadow-2xl"
                style={{
                  transformOrigin: "left center",
                  background: "linear-gradient(180deg, #7E4B25 0%, #683B1A 60%, #522E14 100%)",
                  boxShadow: isOpening
                    ? "15px 0 35px rgba(0,0,0,0.6)"
                    : "inset 2px 0 6px rgba(255,255,255,0.15)",
                }}
              >
                {/* 6 Inset Architectural Panels (2 Arched Top, 4 Rectangular) */}
                <div className="relative w-full h-full grid grid-cols-2 gap-2 pt-16 pb-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <div
                      key={idx}
                      className={`border border-[#4A260F] shadow-inner ${
                        idx < 2 ? "rounded-t-3xl" : "rounded-md"
                      }`}
                      style={{
                        background: "linear-gradient(145deg, #643717 0%, #4E2A11 100%)",
                        boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.4), 1px 1px 2px rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </div>

                {/* 📛 GOLDEN BRASS NAMEPLATE (Matches Screenshot 1) 📛 */}
                <div className="absolute top-[85px] left-1/2 -translate-x-1/2 z-20 w-[120px] sm:w-[135px] py-2 px-3 rounded-md border border-[#FDFBF7] shadow-[0_4px_10px_rgba(0,0,0,0.35)] text-center bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11]">
                  <p className="text-[#2B1E17] font-serif font-black text-xs sm:text-sm tracking-widest leading-tight">
                    {config.door.flatNumber}
                  </p>
                  <p className="text-[#3A2A1A] font-sans font-bold text-[7px] sm:text-[8px] tracking-[0.18em] uppercase mt-0.5">
                    {config.door.nameplateLine1}
                  </p>
                  <p className="text-[#3A2A1A] font-sans font-bold text-[7px] sm:text-[8px] tracking-[0.18em] uppercase">
                    {config.door.nameplateLine2}
                  </p>
                </div>

                {/* 🔘 BRASS OVAL DOOR HANDLE (Matches Screenshot 1) */}
                <div className="absolute right-3.5 top-[52%] -translate-y-1/2 w-4 sm:w-5 h-8 sm:h-9 rounded-full border border-[#FFF8DC] bg-gradient-to-r from-[#F5DEB3] via-[#D4AF37] to-[#8B6508] shadow-[2px_3px_6px_rgba(0,0,0,0.4)]" />
              </motion.div>
            </div>

            {/* 🔔 GOLDEN DOORBELL BUTTON ON RIGHT WALL (Matches Screenshot 1) 🔔 */}
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
                handleRingAndOpen();
              }}
              whileTap={{ scale: 0.9 }}
              animate={isRinging ? { scale: [1, 1.15, 1] } : {}}
              className="absolute right-0 sm:-right-2 top-[52%] -translate-y-1/2 cursor-pointer z-30 w-9 sm:w-11 h-14 sm:h-16 rounded-xl border-2 border-[#F9E2B6] flex items-center justify-center shadow-[0_6px_15px_rgba(0,0,0,0.4)] bg-gradient-to-b from-[#E6C280] via-[#D4AF37] to-[#996515]"
              title="Ring Bell"
            >
              {/* White/Ivory glowing circular button */}
              <div
                className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border border-white flex items-center justify-center transition-all ${
                  isRinging
                    ? "bg-[#FFF9C4] shadow-[0_0_15px_#FFD54F]"
                    : "bg-[#FFFDF7] shadow-inner"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]/50" />
              </div>
            </motion.div>
          </div>

          {/* ── FLOOR & WELCOME DOORMAT (Matches Screenshot 1) ── */}
          <div className="relative w-full bg-gradient-to-b from-[#3D1E0C] to-[#261206] pt-2 pb-6 px-4 flex flex-col items-center z-10 shadow-[0_-10px_25px_rgba(0,0,0,0.4)]">
            {/* Ribbed Coir Doormat */}
            <div
              className="w-[180px] sm:w-[210px] py-2 px-6 rounded border border-[#6B3E1F] text-center shadow-inner"
              style={{
                background: "repeating-linear-gradient(90deg, #42200D 0px, #42200D 3px, #331808 3px, #331808 6px)",
              }}
            >
              <span className="text-[#E6C280] font-sans font-bold text-[10px] sm:text-xs tracking-[0.35em] uppercase">
                WELCOME
              </span>
            </div>
          </div>
        </div>

        {/* ── QUICK SKIP BUTTON IN CORNER ── */}
        <button
          onClick={onOpen}
          className="absolute top-4 right-4 z-40 text-[#E6C280]/80 hover:text-white text-xs font-sans tracking-wider uppercase px-3 py-1.5 rounded-full border border-[#E6C280]/30 hover:border-[#E6C280] transition-colors"
        >
          Skip →
        </button>
      </div>
    </motion.div>
  );
}
