import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT_CONFIG } from "../config/event";
import { Download, Share2, ZoomIn, ZoomOut, X, Sparkles, MapPin, Calendar, Phone } from "lucide-react";
import html2canvas from "html2canvas";

export function PosterCardView({ forCapture = false }: { forCapture?: boolean }) {
  const { hosts, venue, events, sanskritBlessing, invitationMessage } = EVENT_CONFIG;
  const [ev1, ev2] = events;

  return (
    <div
      id="invitation-poster-canvas"
      className={`relative ${
        forCapture ? "w-[850px]" : "w-full max-w-2xl mx-auto"
      } bg-[#FCFBF7] text-[#1C1917] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(197,160,89,0.22)] border border-[#E8DEC8]`}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {/* 🌟 Royal Gold Foil Hairline Borders 🌟 */}
      <div className="absolute inset-3 border-2 border-[#C5A059]/60 rounded-2xl pointer-events-none z-10" />
      <div className="absolute inset-5 border border-[#C5A059]/30 rounded-xl pointer-events-none z-10" />

      {/* Elegant Corner Filigree */}
      <div className="absolute top-4 left-4 text-[#C5A059] text-xl select-none z-20">❖</div>
      <div className="absolute top-4 right-4 text-[#C5A059] text-xl select-none z-20">❖</div>
      <div className="absolute bottom-4 left-4 text-[#C5A059] text-xl select-none z-20">❖</div>
      <div className="absolute bottom-4 right-4 text-[#C5A059] text-xl select-none z-20">❖</div>

      {/* Subtle Background Watermark */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #C5A059 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-20 p-8 sm:p-12 text-center">
        {/* Lord Ganesha Fine Gold Crest */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FDFBF7] to-[#F5EFEB] border-2 border-[#C5A059] shadow-sm flex items-center justify-center text-3xl sm:text-4xl">
            🕉️
          </div>
          <p className="text-[#99582A] text-xs font-bold tracking-[0.35em] uppercase mt-2.5">
            ॥ ॐ श्री गणेशाय नमः ॥
          </p>
          <p className="text-[#78350F] text-xs sm:text-sm italic mt-1 font-serif max-w-md">
            "{sanskritBlessing.shloka}"
          </p>
        </div>

        {/* Auspicious Ribbon */}
        <div className="inline-block border-y-2 border-[#C5A059] py-1.5 px-8 mb-5">
          <span className="text-[#842A20] font-bold text-xs sm:text-sm tracking-[0.3em] uppercase">
            ॥ शुभ गृहप्रवेशम् ॥
          </span>
        </div>

        <p className="text-[#78716C] text-xs sm:text-sm uppercase tracking-widest mb-1 font-sans">
          With the divine blessings of God &amp; our Elders
        </p>

        {/* Couple Names in Regal High-Contrast Typography */}
        <div className="my-4">
          <h1
            className="text-4xl sm:text-6xl text-[#1E3A2F] font-serif font-bold tracking-tight"
            style={{ fontStyle: "italic" }}
          >
            {hosts.name1}
          </h1>
          <div className="flex items-center justify-center gap-4 my-1">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent w-24" />
            <span className="text-[#C5A059] text-3xl font-script">&amp;</span>
            <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent w-24" />
          </div>
          <h1
            className="text-4xl sm:text-6xl text-[#1E3A2F] font-serif font-bold tracking-tight"
            style={{ fontStyle: "italic" }}
          >
            {hosts.name2}
          </h1>
        </div>

        {/* Respectfully Including the Two Elder Daughters */}
        <div className="inline-flex items-center gap-2 bg-[#F9F6F0] border border-[#C5A059]/40 px-5 py-1.5 rounded-full my-2 shadow-sm">
          <span className="text-[#C5A059] text-xs">🌸</span>
          <span className="text-[#78350F] text-xs sm:text-sm font-serif font-semibold tracking-wide">
            Along with their Beloved Two Elder Daughters
          </span>
          <span className="text-[#C5A059] text-xs">🌸</span>
        </div>

        <p className="text-[#44403C] text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mt-3 mb-6 italic">
          "{invitationMessage}"
        </p>

        {/* ─── TWO ELEGANT CELEBRATION CARDS (Crisp & High Contrast) ─── */}
        <div className="grid sm:grid-cols-2 gap-4 my-6 text-left font-sans">
          {/* Card 1: Night Celebration (Emerald & Gold) */}
          <div className="relative rounded-2xl p-5 bg-[#0F382C] text-white border-2 border-[#C5A059] shadow-md overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#E6C875] text-xs font-bold uppercase tracking-widest">
                Night Celebration
              </span>
              <span className="text-xl">🪔</span>
            </div>
            <h3 className="text-xl sm:text-2xl text-white font-serif font-bold mb-1">
              {ev1.displayDate}
            </h3>
            <p className="text-[#E6C875] text-xs font-semibold mb-2">
              {ev1.day} · <span>{ev1.time}</span>
            </p>
            <p className="text-stone-200 text-xs leading-relaxed italic border-t border-white/20 pt-2 font-serif">
              Deepotsav, Family Sangeet &amp; Festive Musical Dinner
            </p>
          </div>

          {/* Card 2: Sacred Grihapravesham (Ivory & Crimson) */}
          <div className="relative rounded-2xl p-5 bg-[#FFF9F5] text-[#1C1917] border-2 border-[#851D2D] shadow-md overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#851D2D] text-xs font-bold uppercase tracking-widest">
                Housewarming Ceremony
              </span>
              <span className="text-xl">🌸</span>
            </div>
            <h3 className="text-xl sm:text-2xl text-[#851D2D] font-serif font-bold mb-1">
              {ev2.displayDate}
            </h3>
            <p className="text-[#99582A] text-xs font-semibold mb-2">
              {ev2.day} · <span>{ev2.time}</span>
            </p>
            <p className="text-[#57534E] text-xs leading-relaxed italic border-t border-[#851D2D]/20 pt-2 font-serif">
              Vastu Homam, Sacred Milk Boiling, Satyanarayana Puja &amp; Mahaprasadam
            </p>
          </div>
        </div>

        {/* ─── VENUE DETAILS (Clean Ivory Card) ─── */}
        <div className="bg-[#FAF8F5] border-2 border-[#C5A059]/60 rounded-2xl p-6 my-4 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 text-[#99582A] mb-1 font-sans">
            <MapPin size={16} />
            <span className="text-xs tracking-[0.25em] font-bold uppercase">Auspicious Venue</span>
          </div>

          <h4 className="text-2xl sm:text-3xl text-[#1E3A2F] font-serif font-bold mb-1">
            {venue.name}
          </h4>

          {/* Apartment unit badge */}
          <div className="inline-block bg-[#1E3A2F] text-white font-sans font-bold text-xs sm:text-sm px-4 py-1 rounded-full my-2 shadow-sm">
            {venue.apartment}
          </div>

          <p className="text-[#44403C] text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-sans">
            {venue.addressLine1},<br />
            {venue.addressLine2},<br />
            {venue.city}, {venue.state} – {venue.pincode}
          </p>

          <div className="mt-3.5 flex items-center justify-center gap-2 text-[#851D2D] font-sans text-xs sm:text-sm font-bold">
            <Phone size={14} />
            <span>RSVP / Contact: {hosts.contact}</span>
          </div>
        </div>

        {/* Footer Blessing */}
        <div className="mt-6 flex items-center justify-center gap-3 text-[#99582A]">
          <span>❖</span>
          <span className="text-xs uppercase tracking-widest font-semibold font-sans">
            సర్వేజనాః సుఖినోభవంతు · May all be blessed with peace and joy
          </span>
          <span>❖</span>
        </div>
      </div>
    </div>
  );
}

export default function InvitationPoster() {
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    const el = posterRef.current;
    if (!el) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#FCFBF7",
      });
      const link = document.createElement("a");
      link.download = "Srikanth-Sivapriya-Housewarming-Invitation.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      alert("Download failed. Please take a screenshot or try on desktop.");
    } finally {
      setDownloading(false);
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Srikanth & Sivapriya – Grihapravesham Invitation",
          text: "Warmly inviting you and your family to celebrate the Grihapravesham of Srikanth, Sivapriya & their two daughters at On Cloud 33, Urbanrise, Bachupally, Hyderabad! 🏠🌸",
          url: window.location.href,
        });
      } catch {
        // Share cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Invitation link copied to clipboard!");
    }
  };

  return (
    <section id="invite" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-[#FAF6ED] border border-[#C5A059]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
          <Sparkles size={14} className="text-[#C5A059]" />
          <span className="text-[#99582A] text-xs tracking-[0.25em] uppercase font-bold">
            Formal Wedding &amp; Grihapravesh Patrika
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl text-[#1C1917] font-serif font-bold mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Ceremonial Invitation Poster
        </h2>
        <p className="text-[#78716C] text-sm max-w-lg mx-auto">
          An auspicious luxury Indian invitation card designed with fine gold foil and royal jewel tones.
        </p>
      </motion.div>

      {/* Main Poster Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        ref={posterRef}
        className="cursor-pointer transition-transform hover:scale-[1.01]"
        onClick={() => setExpanded(true)}
      >
        <PosterCardView />
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3.5 justify-center mt-8">
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-2 bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all active:scale-95"
        >
          <ZoomIn size={16} />
          View Fullscreen Card
        </button>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 bg-[#851D2D] hover:bg-[#6A0D18] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          <Download size={16} />
          {downloading ? "Generating 300-DPI Image…" : "Download High-Res Poster"}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-white hover:bg-[#FAF8F5] text-[#1C1917] font-medium text-xs sm:text-sm px-6 py-3 rounded-full border border-[#D6CEBC] shadow-sm transition-all active:scale-95"
        >
          <Share2 size={16} />
          Share Invitation
        </button>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex flex-col items-center justify-center p-4 overflow-auto backdrop-blur-md"
            onClick={() => setExpanded(false)}
          >
            <div className="absolute top-4 right-4 flex items-center gap-3 z-50">
              <button
                onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.2, 1.8)); }}
                className="bg-white/20 text-white p-2.5 rounded-full hover:bg-white/30 backdrop-blur-sm"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.2, 0.6)); }}
                className="bg-white/20 text-white p-2.5 rounded-full hover:bg-white/30 backdrop-blur-sm"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={() => setExpanded(false)}
                className="bg-white text-[#1C1917] p-2.5 rounded-full hover:bg-stone-200"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            <motion.div
              style={{ scale: zoom }}
              className="max-w-2xl w-full my-auto transition-transform"
              onClick={(e) => e.stopPropagation()}
            >
              <PosterCardView />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
