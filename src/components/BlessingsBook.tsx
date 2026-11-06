
import { motion } from "framer-motion";

export default function BlessingsBook() {
  return (
    <section className="w-full px-4 py-16 sm:py-20 bg-[#FFFCF6]">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="text-[#99582A] text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-3">
          Auspicious Occasion
        </p>

        <h2
          className="text-3xl sm:text-5xl font-bold text-[#1C1917] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          శ్రీ సత్యనారాయణ స్వామి వ్రతం
        </h2>

        <p className="text-[#78716C] text-sm sm:text-base mb-8">
          Seeking the divine blessings of Sri Satyanarayana Swamy
          on our new beginning.
        </p>

        <div className="w-full max-w-[480px] mx-auto overflow-hidden rounded-2xl">
          <img
            src="/satyanarayana-vratam.png"
            alt="Sri Satyanarayana Swamy Vratam"
            className="block w-full h-auto object-contain"
            loading="lazy"
          />
        </div>

        <p
          className="mt-7 text-xl sm:text-2xl text-[#99582A]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Om Namo Bhagavate Vasudevaya 🙏
        </p>
      </motion.div>
    </section>
  );
}

