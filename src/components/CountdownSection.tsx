import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";
import { EVENT_CONFIG } from "../config/event";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="relative bg-white border border-[#E8DEC8] rounded-2xl p-3 sm:p-4 shadow-sm min-w-[65px] sm:min-w-[85px]">
        <motion.div
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-5xl font-bold text-[#1C1917] tabular-nums"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {String(value).padStart(2, "0")}
        </motion.div>
      </div>
      <div className="text-[#8B5E3C] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mt-2">
        {label}
      </div>
    </div>
  );
}

function CountdownCard({
  event,
}: {
  event: (typeof EVENT_CONFIG.events)[number];
}) {
  const isNight = event.theme === "night";
  const targetHour = isNight ? "T18:30:00" : "T08:00:00";
  const timeLeft = useCountdown(event.date + targetHour);

  if (timeLeft.total <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center p-8 rounded-3xl bg-white border-2 border-[#C5A059] shadow-sm"
      >
        <div className="text-4xl mb-3">🎉</div>
        <p className="text-[#1C1917] font-serif font-bold text-xl">{event.title}</p>
        <p className="text-[#851D2D] text-sm mt-1 font-semibold">The celebration has begun!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-7 sm:p-9 rounded-3xl border-2 ${
        isNight
          ? "bg-[#FAFDFB] border-[#0F382C]/30 shadow-[0_10px_35px_rgba(15,56,44,0.06)]"
          : "bg-[#FFFDFB] border-[#851D2D]/30 shadow-[0_10px_35px_rgba(133,29,45,0.06)]"
      }`}
    >
      <div className="text-center mb-6">
        <span className="text-3xl">{event.emoji}</span>
        <h3
          className="text-2xl text-[#1C1917] font-serif font-bold mt-2 mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {event.title}
        </h3>
        <p
          className={`text-xs sm:text-sm font-semibold tracking-wide ${
            isNight ? "text-[#0F382C]" : "text-[#851D2D]"
          }`}
        >
          {event.displayDate} · {event.day}
        </p>
      </div>

      <div className="flex justify-center items-center gap-2 sm:gap-4">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <span className="text-2xl font-bold text-[#C5A059] -mt-5">:</span>
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <span className="text-2xl font-bold text-[#C5A059] -mt-5">:</span>
        <CountdownUnit value={timeLeft.minutes} label="Mins" />
        <span className="text-2xl font-bold text-[#C5A059] -mt-5">:</span>
        <CountdownUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </motion.div>
  );
}

export default function CountdownSection() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-[#FAF6ED] border border-[#C5A059]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
          <span className="text-[#99582A] text-xs tracking-[0.25em] uppercase font-bold">
            Live Auspicious Countdown
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl text-[#1C1917] font-serif font-bold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Celebrations Begin In
        </h2>
        <p className="text-[#78716C] text-sm">
          Counting down to each sacred moment in Indian Standard Time (IST)
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {EVENT_CONFIG.events.map((event) => (
          <CountdownCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
