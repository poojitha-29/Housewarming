import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { EVENT_CONFIG } from "../config/event";
import { generateICS } from "../utils/calendar";

function EventCard({
  event,
  index,
}: {
  event: (typeof EVENT_CONFIG.events)[number];
  index: number;
}) {
  const isNight = event.theme === "night";

  const handleAddToCalendar = () => {
    const ics = generateICS(event);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={`relative overflow-hidden rounded-3xl ${
        isNight
          ? "bg-[#0F382C] text-white border-2 border-[#C5A059]"
          : "bg-white text-[#1C1917] border-2 border-[#851D2D]"
      } shadow-[0_15px_40px_rgba(0,0,0,0.06)]`}
    >
      {/* Decorative Gold Header Bar */}
      <div
        className={`h-2.5 w-full ${
          isNight
            ? "bg-gradient-to-r from-[#B48A3C] via-[#F4DF94] to-[#B48A3C]"
            : "bg-gradient-to-r from-[#851D2D] via-[#C5A059] to-[#851D2D]"
        }`}
      />

      <div className="relative p-7 sm:p-9">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{event.emoji}</span>
            <div>
              <span
                className={`text-xs tracking-[0.25em] uppercase font-bold ${
                  isNight ? "text-[#E6C875]" : "text-[#851D2D]"
                }`}
              >
                {isNight ? "Part 1 · Sandhya Deepotsav" : "Part 2 · Sacred Muhurtham"}
              </span>
              <p className={`text-xs ${isNight ? "text-stone-300" : "text-[#78716C]"}`}>
                {event.displayDate}
              </p>
            </div>
          </div>

          <span className="text-2xl opacity-60">{isNight ? "✨" : "☀️"}</span>
        </div>

        {/* Title */}
        <h3
          className={`text-2xl sm:text-3xl font-serif font-bold mb-3 ${
            isNight ? "text-white" : "text-[#1C1917]"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {event.title}
        </h3>

        {/* Gold Divider */}
        <div
          className={`h-px my-4 ${
            isNight
              ? "bg-gradient-to-r from-[#C5A059]/60 via-[#F4DF94] to-transparent"
              : "bg-gradient-to-r from-[#851D2D]/40 via-[#C5A059] to-transparent"
          }`}
        />

        {/* Details Grid */}
        <div className="space-y-3.5 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isNight ? "bg-white/10 text-[#E6C875]" : "bg-[#FAF6ED] text-[#851D2D]"
              }`}
            >
              <Calendar size={17} />
            </div>
            <div>
              <p
                className={`font-bold text-base sm:text-lg ${
                  isNight ? "text-white" : "text-[#1C1917]"
                }`}
              >
                {event.displayDate}
              </p>
              <p
                className={`text-xs font-semibold ${
                  isNight ? "text-[#E6C875]" : "text-[#851D2D]"
                }`}
              >
                {event.day}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isNight ? "bg-white/10 text-[#E6C875]" : "bg-[#FAF6ED] text-[#851D2D]"
              }`}
            >
              <Clock size={17} />
            </div>
            <div>
              <p
                className={`font-bold text-base sm:text-lg ${
                  isNight ? "text-white" : "text-[#1C1917]"
                }`}
              >
                {event.time}
              </p>
              <p
                className={`text-xs ${
                  isNight ? "text-stone-300" : "text-[#78716C]"
                }`}
              >
                {isNight ? "Evening celebrations & dinner" : "Sacred morning muhurtham & feast"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isNight ? "bg-white/10 text-[#E6C875]" : "bg-[#FAF6ED] text-[#851D2D]"
              }`}
            >
              <MapPin size={17} />
            </div>
            <div>
              <p
                className={`font-bold text-sm sm:text-base ${
                  isNight ? "text-white" : "text-[#1C1917]"
                }`}
              >
                {EVENT_CONFIG.venue.name}
              </p>
              <p
                className={`text-xs ${
                  isNight ? "text-[#E6C875]" : "text-[#851D2D]"
                }`}
              >
                {EVENT_CONFIG.venue.apartment}
              </p>
            </div>
          </div>
        </div>

        {/* Rituals List */}
        <div
          className={`rounded-2xl p-4 mb-6 border ${
            isNight
              ? "bg-black/30 border-white/10 text-stone-200"
              : "bg-[#FAF8F5] border-[#E8DEC8] text-[#44403C]"
          }`}
        >
          <p
            className={`text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
              isNight ? "text-[#E6C875]" : "text-[#851D2D]"
            }`}
          >
            <Sparkles size={13} />
            <span>Ceremonial Highlights:</span>
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm">
            {event.rituals.map((ritual, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2
                  size={14}
                  className={`flex-shrink-0 mt-0.5 ${
                    isNight ? "text-[#E6C875]" : "text-[#C5A059]"
                  }`}
                />
                <span>{ritual}</span>
              </li>
            ))}
          </ul>
        </div>

        <p
          className={`text-xs sm:text-sm italic mb-6 leading-relaxed font-serif ${
            isNight ? "text-stone-300" : "text-[#57534E]"
          }`}
        >
          "{event.description}"
        </p>

        {/* Add to Calendar Button */}
        <button
          onClick={handleAddToCalendar}
          className={`w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase py-3.5 rounded-full transition-transform active:scale-95 shadow-sm ${
            isNight
              ? "bg-[#C5A059] hover:bg-[#B48A3C] text-stone-950 font-bold"
              : "bg-[#851D2D] hover:bg-[#6A0D18] text-white"
          }`}
        >
          <Calendar size={16} />
          Add to Google / Apple Calendar (.ics)
        </button>
      </div>
    </motion.div>
  );
}

export default function EventSchedule() {
  return (
    <section id="events" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 bg-[#FAF6ED] border border-[#C5A059]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
          <span className="text-[#99582A] text-xs tracking-[0.25em] uppercase font-bold">
            Two Auspicious Occasions
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl text-[#1C1917] font-serif font-bold mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Ceremony &amp; Celebration Schedule
        </h2>
        <p className="text-[#78716C] text-sm sm:text-base max-w-xl mx-auto">
          Srikanth, Sivapriya &amp; their two elder daughters cordially invite you to grace both momentous celebrations.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {EVENT_CONFIG.events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
