import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT_CONFIG } from "../config/event";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * EXACT WISHLYS HOUSEWARMING 3D DOOR OPENING COMPONENT
 * Modeled directly from https://wishlys.com/studio/housewarming
 *
 * Features:
 * - Ivory & Champagne French double doors with 3D perspective
 * - Concentric raised inner panels with beveled gold foil trim
 * - Suspended gold wire with diamond knot & fluted gold medallion seal
 * - Monogram "S & S" + "GRIHA PRAVESHAM"
 * - Automatic cinematic door opening (rotates -115deg / +115deg in 3D)
 * - Tap to open enabled as well
 * - Unobtrusive Skip button
 */

interface WishlysDoorProps {
  onComplete: () => void;
}

export default function WishlysDoor({ onComplete }: WishlysDoorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const autoOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Door palette from Wishlys Ivory Studio
  const palette = {
    leftDoorBg: "linear-gradient(135deg, #FAF8F5 0%, #F3EAE0 50%, #E5D5C0 100%)",
    rightDoorBg: "linear-gradient(225deg, #FAF8F5 0%, #F3EAE0 50%, #E5D5C0 100%)",
    panelBorder: "rgba(197, 168, 128, 0.35)",
    panelInnerBorder: "rgba(197, 168, 128, 0.55)",
    trimColor: "#C5A880",
    goldDark: "#8B6F47",
    goldLight: "#FBF5E6",
    sealBg: "radial-gradient(circle at 40% 35%, #FBF5E6 0%, #E6C280 45%, #B38F4D 85%, #8B6F47 100%)",
    sealBorder: "#FDFBF7",
    textColor: "#2B1E17",
  };

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // After doors swing open and light bursts in, dismiss intro
    setTimeout(() => {
      setIsDismissed(true);
      onComplete();
    }, 2400);
  };

  // Automatic opening after short initial presentation (2.2 seconds)
  useEffect(() => {
    autoOpenTimerRef.current = setTimeout(() => {
      handleOpen();
    }, 2200);

    return () => {
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    };
  }, []);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    setIsDismissed(true);
    onComplete();
  };

  if (isDismissed) return null;

  return (
    <div
      onClick={handleOpen}
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer bg-[#FCFBF7] select-none flex items-center justify-center"
      style={{
        perspective: "1600px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* ── SKIP TO INVITATION BUTTON ── */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-40 bg-white/90 hover:bg-[#C5A059] text-[#2B1E17] hover:text-white font-sans text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-[#C5A880]/50 shadow-md backdrop-blur-md transition-all flex items-center gap-1.5"
      >
        <span>Skip</span>
        <ArrowRight size={13} />
      </button>

      {/* ── BACKGROUND REVEALED WHEN DOORS OPEN ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F5EFEB] flex flex-col items-center justify-center p-6 text-center z-0">
        <motion.div
          animate={{ scale: isOpen ? 1 : 0.95, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="max-w-lg"
        >
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white border border-[#C5A059]/40 flex items-center justify-center text-3xl shadow-sm">
            🕉️
          </div>
          <p className="text-[#8B6F47] text-xs uppercase tracking-[0.3em] font-bold">
            ॥ शुभ गृहप्रवेशम् ॥
          </p>
          <h2
            className="text-4xl sm:text-5xl text-[#2B1E17] font-serif font-bold mt-2 mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Welcome to Our Home
          </h2>
          <p className="text-[#8B6F47] text-sm font-serif italic">
            Srikanth, Sivapriya &amp; Their Two Daughters
          </p>
        </motion.div>
      </div>

      {/* ── LEFT DOOR ── */}
      <motion.div
        animate={{
          rotateY: isOpen ? -115 : 0,
        }}
        transition={{
          duration: 2.1,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-end z-20 overflow-hidden"
        style={{
          background: palette.leftDoorBg,
          backgroundImage: `${palette.leftDoorBg}, radial-gradient(circle at 100% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 70%), repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 4px)`,
          transformOrigin: "left center",
          borderRight: `2px solid ${palette.trimColor}`,
          boxShadow: isOpen
            ? "10px 0 40px rgba(0,0,0,0.25)"
            : "5px 0 25px rgba(0,0,0,0.08)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Outer Panel Border */}
        <div
          className="absolute inset-4 sm:inset-6 pointer-events-none"
          style={{ border: `1px solid ${palette.panelBorder}` }}
        />
        {/* Inner Panel Border */}
        <div
          className="absolute inset-6 sm:inset-9 pointer-events-none"
          style={{ border: `1.5px solid ${palette.panelInnerBorder}` }}
        />

        {/* Top & Bottom Inset Architectural Paneling */}
        {[-32, 32].map((offset) => (
          <div
            key={offset}
            className="absolute right-6 sm:right-10 w-28 sm:w-44 h-32 sm:h-48 border border-[#C5A880]/30 rounded-lg pointer-events-none"
            style={{
              top: `calc(50% + ${offset * 3.5}px - 60px)`,
              background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(230,215,195,0.2) 100%)",
            }}
          />
        ))}

        {/* Center Vertical Handle Edge Bevel */}
        <div
          className="absolute top-0 right-0 h-full w-6 sm:w-8 pointer-events-none border-l z-10"
          style={{
            borderColor: "rgba(0, 0, 0, 0.08)",
            background: `repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0px, rgba(255, 255, 255, 0.12) 2px, rgba(0, 0, 0, 0.08) 3px, rgba(0, 0, 0, 0.12) 5px, transparent 6px)`,
            boxShadow: "inset 1px 0 4px rgba(0,0,0,0.12)",
          }}
        />

        {/* Vertical Brushed Brass Pull Handle */}
        <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 w-2 sm:w-2.5 h-36 sm:h-48 rounded-full bg-gradient-to-r from-[#FBF5E6] via-[#E6C280] to-[#8B6F47] shadow-[2px_3px_8px_rgba(0,0,0,0.18)]" />
      </motion.div>

      {/* ── RIGHT DOOR ── */}
      <motion.div
        animate={{
          rotateY: isOpen ? 115 : 0,
        }}
        transition={{
          duration: 2.1,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-start z-20 overflow-hidden"
        style={{
          background: palette.rightDoorBg,
          backgroundImage: `${palette.rightDoorBg}, radial-gradient(circle at 0% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 70%), repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 4px)`,
          transformOrigin: "right center",
          borderLeft: `2px solid ${palette.trimColor}`,
          boxShadow: isOpen
            ? "-10px 0 40px rgba(0,0,0,0.25)"
            : "-5px 0 25px rgba(0,0,0,0.08)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Outer Panel Border */}
        <div
          className="absolute inset-4 sm:inset-6 pointer-events-none"
          style={{ border: `1px solid ${palette.panelBorder}` }}
        />
        {/* Inner Panel Border */}
        <div
          className="absolute inset-6 sm:inset-9 pointer-events-none"
          style={{ border: `1.5px solid ${palette.panelInnerBorder}` }}
        />

        {/* Top & Bottom Inset Architectural Paneling */}
        {[-32, 32].map((offset) => (
          <div
            key={offset}
            className="absolute left-6 sm:left-10 w-28 sm:w-44 h-32 sm:h-48 border border-[#C5A880]/30 rounded-lg pointer-events-none"
            style={{
              top: `calc(50% + ${offset * 3.5}px - 60px)`,
              background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(230,215,195,0.2) 100%)",
            }}
          />
        ))}

        {/* Center Vertical Handle Edge Bevel */}
        <div
          className="absolute top-0 left-0 h-full w-6 sm:w-8 pointer-events-none border-r z-10"
          style={{
            borderColor: "rgba(0, 0, 0, 0.08)",
            background: `repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0px, rgba(255, 255, 255, 0.12) 2px, rgba(0, 0, 0, 0.08) 3px, rgba(0, 0, 0, 0.12) 5px, transparent 6px)`,
            boxShadow: "inset -1px 0 4px rgba(0,0,0,0.12)",
          }}
        />

        {/* Vertical Brushed Brass Pull Handle */}
        <div className="absolute left-8 sm:left-12 top-1/2 -translate-y-1/2 w-2 sm:w-2.5 h-36 sm:h-48 rounded-full bg-gradient-to-r from-[#8B6F47] via-[#E6C280] to-[#FBF5E6] shadow-[-2px_3px_8px_rgba(0,0,0,0.18)]" />
      </motion.div>

      {/* ── THE SIGNATURE WISHLYS SUSPENDED GOLD WAX MEDALLION ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0.2,
              opacity: 0,
              y: -50,
              transition: { duration: 0.5, ease: "backIn" },
            }}
            transition={{ duration: 0.8 }}
            className="door-center-seal absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none"
          >
            {/* Suspended Gold Cord from top */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 w-px h-[32vh]"
              style={{
                background: `linear-gradient(to bottom, transparent, ${palette.trimColor})`,
                opacity: 0.8,
              }}
            />
            {/* Hanging Diamond Knot */}
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-3px] w-2.5 h-2.5 rotate-45 shadow-sm"
              style={{ background: palette.trimColor }}
            />

            {/* Circular Gilded Wax Seal Medallion */}
            <div className="relative flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2.5 shadow-[0_15px_40px_rgba(139,111,71,0.35)]">
              {/* Outer Fluted Rim */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#C5A880]/70 animate-spin"
                style={{ animationDuration: "60s" }}
              />

              {/* Gold Seal Disc */}
              <div
                className="w-full h-full rounded-full flex flex-col items-center justify-center text-center p-3 border-2 border-[#FDFBF7] shadow-inner"
                style={{ background: palette.sealBg }}
              >
                {/* Lord Ganesha Fine Gold Motif */}
                <span className="text-xl sm:text-2xl drop-shadow-sm mb-0.5">🕉️</span>

                {/* Couple Monogram */}
                <h3
                  className="text-xl sm:text-2xl font-serif font-bold text-[#2B1E17] tracking-wider leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  S &amp; S
                </h3>

                {/* Subtitle inside seal */}
                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] font-semibold text-[#4A3828] mt-1">
                  GRIHA PRAVESHAM
                </p>
                <p className="text-[7px] sm:text-[8px] uppercase tracking-widest text-[#5C4533] opacity-80 mt-0.5">
                  ON CLOUD 33
                </p>
              </div>
            </div>

            {/* Tap / Click Prompt underneath */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="mt-6 text-center"
            >
              <p className="text-[#8B6F47] text-xs sm:text-sm font-serif font-semibold tracking-[0.3em] uppercase drop-shadow-sm">
                A Sacred New Beginning
              </p>
              <h1
                className="text-2xl sm:text-3xl text-[#2B1E17] font-serif font-bold mt-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Srikanth &amp; Sivapriya
              </h1>
              <p className="text-[#78614C] text-xs font-serif italic mt-0.5">
                With their two elder daughters
              </p>

              <div className="mt-4 inline-flex items-center gap-1.5 bg-white/80 border border-[#C5A880]/50 px-4 py-1.5 rounded-full shadow-sm text-[#8B6F47] text-[11px] font-sans font-medium tracking-wider uppercase">
                <Sparkles size={11} className="text-[#C5A880]" />
                <span>Tap anywhere or wait to enter</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM VENUE SUBTITLE ── */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-30">
        <p className="text-[#9C8B78] text-xs tracking-widest uppercase font-sans font-medium">
          Flat 1208 · Tower 3 · On Cloud 33 · Bachupally, Hyderabad
        </p>
      </div>
    </div>
  );
}
