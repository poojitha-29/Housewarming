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
  Volume2,
  VolumeX,
  ExternalLink,
  Navigation,
  Phone,
  MessageCircle,
  Share2,
  Download,
  Building2,
  Heart,
  Send,
  Loader
} from "lucide-react";
import html2canvas from "html2canvas";

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
