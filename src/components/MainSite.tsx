import { motion } from "framer-motion";
import { EVENT_CONFIG } from "../config/event";
import { MapPin, Phone, MessageCircle, Heart, Sparkles, Building2, Flame } from "lucide-react";
import EventSchedule from "./EventSchedule";
import CountdownSection from "./CountdownSection";
import InvitationPoster from "./InvitationPoster";
import GallerySection from "./GallerySection";
import LocationCard from "./LocationCard";
import BlessingsBook from "./BlessingsBook";
import MobileNav from "./MobileNav";
import CelebrationMusic from "./CelebrationMusic";

export default function MainSite() {
  const { hosts, venue, invitationMessage, sanskritBlessing } = EVENT_CONFIG;

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#1C1917] overflow-x-hidden selection:bg-[#C5A059] selection:text-white">
      <CelebrationMusic />

      {/* ── Top Auspicious Vedic Shloka Ribbon ── */}
      <div className="bg-[#FAF6ED] border-b border-[#E8DEC8] text-center py-2.5 px-4 shadow-sm">
        <p className="text-[#842A20] text-xs sm:text-sm font-serif tracking-widest italic font-medium">
          ॥ शुक्लम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम् । प्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये ॥
        </p>
      </div>

      {/* ── HERO SECTION: PURE LUXURY WHITE & IVORY ── */}
      <section
        id="home"
        className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-20 text-center"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(197, 160, 89, 0.12) 0%, transparent 65%), linear-gradient(180deg, #FCFBF7 0%, #FAF7F0 60%, #FCFBF7 100%)",
        }}
      >
        {/* Elegant Corner Filigrees */}
        <div className="absolute top-8 left-8 text-[#C5A059]/40 text-2xl select-none">❖</div>
        <div className="absolute top-8 right-8 text-[#C5A059]/40 text-2xl select-none">❖</div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl mx-auto"
        >
          {/* Luminous Fine Gold Ganesha Crest */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 120 }}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 rounded-full bg-gradient-to-tr from-[#FFFDF9] to-[#F5EFEB] border-2 border-[#C5A059] shadow-[0_10px_30px_rgba(197,160,89,0.25)] flex items-center justify-center text-4xl sm:text-5xl"
          >
            🕉️
          </motion.div>

          <p className="text-[#99582A] text-xs sm:text-sm tracking-[0.35em] uppercase font-bold mb-2">
            ॥ शुभ गृहप्रवेशम् ॥
          </p>

          <p className="text-[#78350F] text-xs sm:text-sm font-serif italic mb-4 max-w-lg mx-auto">
            "{sanskritBlessing.shloka}"
          </p>

          {/* Couple Names */}
          <h1
            className="text-5xl sm:text-7xl md:text-8xl text-[#1E3A2F] font-serif font-bold tracking-tight mb-2 drop-shadow-sm"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {hosts.name1}
            <span className="text-[#C5A059] mx-3 sm:mx-4 font-script text-4xl sm:text-6xl font-normal">
              &amp;
            </span>
            {hosts.name2}
          </h1>

          {/* Respectfully Highlighting the Two Elder Daughters */}
          <div className="inline-flex items-center gap-2 bg-[#FAF6ED] border border-[#C5A059]/60 px-6 py-2 rounded-full my-4 shadow-sm">
            <span className="text-[#C5A059] text-xs">🌸</span>
            <span className="text-[#78350F] text-sm sm:text-base font-serif font-semibold tracking-wide">
              Along with their Beloved Two Elder Daughters
            </span>
            <span className="text-[#C5A059] text-xs">🌸</span>
          </div>

          <p className="text-[#78716C] text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mt-3 font-sans">
            Cordially invite you to celebrate the Grihapravesham of their dream abode
          </p>

          {/* Venue & Flat 1208 */}
          <h2
            className="text-2xl sm:text-4xl text-[#1C1917] font-serif font-bold mt-2 mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {venue.name}
          </h2>

          <div className="inline-block bg-[#1E3A2F] text-white font-sans font-bold text-xs sm:text-sm px-6 py-1.5 rounded-full shadow-sm">
            {venue.apartment}
          </div>

          {/* Gold Divider */}
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent flex-1 max-w-32" />
            <span className="text-[#C5A059] text-lg">🪔</span>
            <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent flex-1 max-w-32" />
          </div>

          <p
            className="text-[#44403C] text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto italic font-serif"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "{invitationMessage}"
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <span className="text-[#99582A] text-xs tracking-widest uppercase font-semibold">
            View Celebrations
          </span>
          <div className="w-5 h-8 border-2 border-[#C5A059]/70 rounded-full flex items-start justify-center pt-1.5 shadow-sm">
            <div className="w-1.5 h-2.5 bg-[#C5A059] rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ── THE SACRED FAMILY DEDICATION SECTION ── */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center font-sans">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-2 border-[#E8DEC8] rounded-3xl p-8 sm:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.05)] relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 bg-[#FAF6ED] border border-[#C5A059]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            <Heart size={14} className="text-[#851D2D] fill-[#851D2D]" />
            <span className="text-[#99582A] text-xs tracking-[0.25em] uppercase font-bold">
              Our Family Milestone
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl text-[#1C1917] font-serif font-bold mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A Sacred New Chapter For Our Family
          </h2>

          <p className="text-[#57534E] text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-serif italic">
            "With profound gratitude in our hearts, Srikanth, Sivapriya, and our two beloved elder daughters step across the sacred threshold of our new home, praying for peace, prosperity, and joy for all who enter."
          </p>

          {/* Three Auspicious Ceremonial Cards */}
          <div className="grid sm:grid-cols-3 gap-5 text-left">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8DEC8] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-white border border-[#C5A059]/40 flex items-center justify-center text-xl mb-3 shadow-xs">
                🕉️
              </div>
              <h4 className="text-[#1C1917] font-serif font-bold text-lg mb-1">
                Vastu Sanctification
              </h4>
              <p className="text-[#57534E] text-xs leading-relaxed">
                Cleansing and blessing every corner of Flat 1208 with sacred homams and invoking the grace of Vastu Purusha.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8DEC8] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-white border border-[#C5A059]/40 flex items-center justify-center text-xl mb-3 shadow-xs">
                🥛
              </div>
              <h4 className="text-[#1C1917] font-serif font-bold text-lg mb-1">
                Sacred Milk Boiling
              </h4>
              <p className="text-[#57534E] text-xs leading-relaxed">
                The auspicious ritual of allowing fresh milk to boil and gently overflow, symbolising endless abundance and sweet contentment.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8DEC8] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-white border border-[#C5A059]/40 flex items-center justify-center text-xl mb-3 shadow-xs">
                🌸
              </div>
              <h4 className="text-[#1C1917] font-serif font-bold text-lg mb-1">
                Lakshmi &amp; Prasadam
              </h4>
              <p className="text-[#57534E] text-xs leading-relaxed">
                Celebrating with loved ones through Sri Satyanarayana Swamy Vratam, traditional feast, and sharing warm blessings.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TWO-DAY CELEBRATION SCHEDULE ── */}
      <EventSchedule />

      {/* ── LIVE COUNTDOWN ── */}
      <CountdownSection />

      {/* ── BRIGHT & COLOURFUL INVITATION POSTER ── */}
      <InvitationPoster />

      {/* ── 4K URBANRISE GALLERY ── */}
      <GallerySection />

      {/* ── INTERACTIVE LOCATION CARD ── */}
      <LocationCard />

      {/* ── DIGITAL BLESSINGS BOOK ── */}
      <BlessingsBook />

      {/* ── FOOTER: CLEAN IVORY LUXURY ── */}
      <footer className="bg-[#FAF8F5] border-t border-[#E8DEC8] text-center py-12 px-6 pb-28 md:pb-12">
        <div className="text-4xl mb-3">🏠</div>
        <p className="text-[#1E3A2F] font-serif text-2xl font-bold italic mb-1">
          Srikanth &amp; Sivapriya &amp; Daughters
        </p>
        <p className="text-[#78716C] text-xs tracking-widest uppercase font-semibold">
          On Cloud 33 · Tower 3 · Floor 12 · Flat 1208 · Bachupally, Hyderabad
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href={EVENT_CONFIG.hosts.phoneLink}
            className="w-11 h-11 rounded-full bg-white border border-[#E8DEC8] flex items-center justify-center text-[#851D2D] hover:bg-[#851D2D] hover:text-white transition-all shadow-sm"
            title="Call"
          >
            <Phone size={18} />
          </a>
          <a
            href={EVENT_CONFIG.hosts.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white border border-[#E8DEC8] flex items-center justify-center text-[#0F382C] hover:bg-[#0F382C] hover:text-white transition-all shadow-sm"
            title="WhatsApp"
          >
            <MessageCircle size={18} />
          </a>
          <a
            href={EVENT_CONFIG.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white border border-[#E8DEC8] flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all shadow-sm"
            title="Location"
          >
            <MapPin size={18} />
          </a>
        </div>

        <p className="text-[#A8A29E] text-xs mt-8 font-sans">
          ॥ ॐ श्री महालक्ष्म्यै नमः ॥ Designed with devotion for Srikanth &amp; Sivapriya's New Home
        </p>
      </footer>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
