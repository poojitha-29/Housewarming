
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, Loader, BookHeart } from "lucide-react";

interface Blessing {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const DEMO_BLESSINGS: Blessing[] = [];

export default function BlessingsBook() {
  const [blessings, setBlessings] = useState<Blessing[]>(DEMO_BLESSINGS);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);

    const whatsappMessage =
      `🙏 New Housewarming Blessing\n\n` +
      `Name: ${name.trim()}\n\n` +
      `Blessing:\n${message.trim()}\n\n` +
      `For: Srikanth & Sivapriya`;

    const whatsappURL =
      `https://wa.me/918106868686?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");

    setSubmitting(false);
    setSubmitted(true);

    setName("");
    setMessage("");

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-[#FAF6ED] border border-[#C5A059]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
          <BookHeart size={14} className="text-[#C5A059]" />
          <span className="text-[#99582A] text-xs tracking-[0.25em] uppercase font-bold">
            Guest Book &amp; Wishes
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl text-[#1C1917] font-serif font-bold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Digital Blessings Book
        </h2>

        <p className="text-[#78716C] text-sm">
          Leave your heartfelt blessings and warm wishes for Srikanth, Sivapriya &amp; family 🙏
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="bg-white border-2 border-[#E8DEC8] rounded-3xl p-7 sm:p-9 mb-10 shadow-[0_15px_40px_rgba(0,0,0,0.05)]"
      >
        <h3
          className="text-[#1C1917] text-2xl font-serif font-bold mb-5"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Share Your Heartfelt Blessing
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Full Name (e.g., Sharma Family, Hyderabad)"
            required
            className="w-full bg-[#FAF8F5] border border-[#E8DEC8] text-[#1C1917] placeholder-[#A8A29E] rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your blessing, congratulations, or auspicious message for the family…"
            required
            rows={4}
            className="w-full bg-[#FAF8F5] border border-[#E8DEC8] text-[#1C1917] placeholder-[#A8A29E] rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[#0F382C] font-semibold text-sm flex items-center gap-2"
              >
                <Heart size={15} className="fill-[#0F382C]" />
                WhatsApp opened! Please send your blessing 🙏
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={submitting}
            className="ml-auto flex items-center gap-2 bg-[#1E3A2F] hover:bg-[#152921] disabled:opacity-50 text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-full transition-all shadow-sm active:scale-95"
          >
            {submitting ? (
              <Loader size={15} className="animate-spin" />
            ) : (
              <Send size={15} />
            )}

            {submitting ? "Sending…" : "Send Blessing"}
          </button>
        </div>
      </motion.form>

      {/* Blessings cards */}
      <div className="space-y-4">
        <AnimatePresence>
          {blessings.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-[#E8DEC8] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF6ED] border border-[#C5A059]/40 flex items-center justify-center text-[#99582A] font-serif font-bold text-base">
                    {b.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-[#1C1917] font-semibold text-sm">
                      {b.name}
                    </p>
                    <p className="text-[#A8A29E] text-[10px]">
                      {b.timestamp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#851D2D]">
                  <Heart size={14} className="fill-[#851D2D]" />
                </div>
              </div>

              <p
                className="text-[#57534E] text-sm leading-relaxed italic font-serif"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "{b.message}"
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
