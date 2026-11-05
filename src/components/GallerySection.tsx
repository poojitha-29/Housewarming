import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, Building2, Sparkles } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: "towers" | "clubhouse" | "gardens" | "interiors";
  categoryLabel: string;
  src: string;
  description: string;
  specs: string;
}

const URBANRISE_GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: "Urbanrise On Cloud 33 – Grand Towers Elevation",
    category: "towers",
    categoryLabel: "Towers & Skyline",
    src: "/urbanrise/hero-tower.jpg",
    description: "Iconic 33-storey architectural towers soaring across North Hyderabad's skyline on the 200 Ft Miyapur-Bachupally Highway.",
    specs: "33 Floors · 5 Towers · 9.16 Acres Gated Community",
  },
  {
    id: 2,
    title: "85,000 Sq. Ft. Grand Moroccan Clubhouse",
    category: "clubhouse",
    categoryLabel: "Clubhouse",
    src: "/urbanrise/clubhouse-day.jpg",
    description: "One of Hyderabad's largest clubhouses featuring multi-level banquet halls, fine-dining restaurants, and luxury indoor recreation.",
    specs: "85,000 Sq. Ft. Built-up · Multi-level · Moroccan Architecture",
  },
  {
    id: 3,
    title: "Night Illuminated Elevation & Sky Scape",
    category: "towers",
    categoryLabel: "Towers & Skyline",
    src: "/urbanrise/elevation-night.jpg",
    description: "Magical night illumination across Tower 3 and the landscaped podium, providing 360-degree views of the city lights.",
    specs: "Tower 3 · Floor 12 (Flat 1208) · Panoramic Night Views",
  },
  {
    id: 4,
    title: "70,000 Sq. Ft. Rooftop Sky Lounge",
    category: "gardens",
    categoryLabel: "Sky Lounges & Gardens",
    src: "/urbanrise/sky-lounge.jpg",
    description: "Breathtaking sky lounges on the rooftop terraces offering peaceful sunsets, open-air stargazing, and private party decks.",
    specs: "Level 34 Rooftop · Sky Deck · Stargazing Telescopes",
  },
  {
    id: 5,
    title: "Lush Landscaped Central Gardens & Walking Trails",
    category: "gardens",
    categoryLabel: "Sky Lounges & Gardens",
    src: "/urbanrise/landscape-garden.jpg",
    description: "Nearly 70% open green space with curated Miyawaki forest, aromatic herbal gardens, and senior citizen seating pavilions.",
    specs: "70% Open Space · Miyawaki Forest · Reflexology Paths",
  },
  {
    id: 6,
    title: "Sunken Poolside Lounge & Water Cascades",
    category: "clubhouse",
    categoryLabel: "Clubhouse",
    src: "/urbanrise/sunken-lounge.jpg",
    description: "Resort-style sunken seating amidst sparkling turquoise swimming pools, jacuzzi jets, and tranquil water fountains.",
    specs: "Resort Pool · Sunken Seating · Kids Splash Deck",
  },
  {
    id: 7,
    title: "Rooftop Sky Recreation & Jogging Track",
    category: "gardens",
    categoryLabel: "Sky Lounges & Gardens",
    src: "/urbanrise/rooftop-render.jpg",
    description: "Panoramic rooftop walking and jogging loop overlooking Bachupally and Miyapur lakes, surrounded by sky greenery.",
    specs: "Sky Walkway · Sunset Amphitheatre · Barbecue Lawns",
  },
  {
    id: 8,
    title: "Luxury Apartment Living Room & Balcony",
    category: "interiors",
    categoryLabel: "Apartment Interiors",
    src: "/urbanrise/model-flat-interior.jpg",
    description: "Spacious, vastu-compliant living spaces with Italian marble finish flooring, high ceilings, and expansive glass balconies.",
    specs: "Vastu Compliant · 10.5 Ft Ceiling · Sunlit Balconies",
  },
  {
    id: 9,
    title: "Work From The Clouds – Executive Co-Working Lounge",
    category: "clubhouse",
    categoryLabel: "Clubhouse",
    src: "/urbanrise/co-working-clouds.jpg",
    description: "High-speed Wi-Fi enabled executive workstations, soundproof conference pods, and library lounge for hybrid working.",
    specs: "High-speed Internet · Meeting Pods · Quiet Reading Library",
  },
  {
    id: 10,
    title: "Urbanrise Genius – Kids Learning & Play Zone",
    category: "clubhouse",
    categoryLabel: "Clubhouse",
    src: "/urbanrise/kids-play.jpg",
    description: "Dedicated children's activity center with indoor robotics, music learning academy, dance studio, and soft play parks.",
    specs: "Robotics Hub · Music Studio · Safe Toddler Turf",
  },
];

type CategoryFilter = "all" | "towers" | "clubhouse" | "gardens" | "interiors";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filteredItems = activeCategory === "all"
    ? URBANRISE_GALLERY
    : URBANRISE_GALLERY.filter((item) => item.category === activeCategory);

  const currentItem = filteredItems[currentIndex] || filteredItems[0] || URBANRISE_GALLERY[0];

  useEffect(() => {
    if (isAutoPlay && filteredItems.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
      }, 4500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, filteredItems.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    setCurrentIndex(0);
    setIsAutoPlay(false);
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto font-sans">
      {/* ── Section Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-[#FAF6ED] border border-[#C5A059]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
          <Building2 size={14} className="text-[#C5A059]" />
          <span className="text-[#99582A] text-xs tracking-[0.25em] uppercase font-bold">
            Official 4K Architectural Showcase
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl text-[#1C1917] font-serif font-bold mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Urbanrise On Cloud 33
        </h2>
        <p className="text-[#78716C] text-sm sm:text-base max-w-2xl mx-auto">
          Explore genuine 4K photographs of Srikanth &amp; Sivapriya's gated community in Bachupally, Hyderabad — Tower 3, Floor 12, Flat 1208.
        </p>
      </motion.div>

      {/* ── Category Filter Tabs ── */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-8">
        {[
          { key: "all", label: "All Areas (10 Photos)" },
          { key: "towers", label: "Towers & Skyline" },
          { key: "clubhouse", label: "85K Sq.Ft. Clubhouse & Pool" },
          { key: "gardens", label: "Sky Lounges & Gardens" },
          { key: "interiors", label: "Apartment Interiors" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key as CategoryFilter)}
            className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
              activeCategory === key
                ? "bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-sm"
                : "bg-white text-[#57534E] border-[#E8DEC8] hover:border-[#C5A059]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Featured Main 4K Image Carousel ── */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-[0_15px_45px_rgba(0,0,0,0.08)] bg-white">
        <div className="relative h-72 sm:h-[450px] md:h-[520px] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.src}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <img
                src={currentItem.src}
                alt={currentItem.title}
                className="w-full h-full object-cover"
                loading="eager"
              />

              {/* Gradient Scrim for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-[#C5A059] text-stone-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {currentItem.categoryLabel}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-[#1C1917] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  4K Official
                </span>
              </div>

              {/* Zoom Button */}
              <button
                onClick={() => setLightboxIndex(currentItem.id - 1)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-[#C5A059] text-[#1C1917] hover:text-white p-3 rounded-full backdrop-blur-md transition-all shadow-md"
                title="View Fullscreen"
              >
                <ZoomIn size={18} />
              </button>

              {/* Bottom Caption & Specs */}
              <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                <p className="text-[#F4DF94] text-xs font-semibold uppercase tracking-[0.25em] mb-1">
                  On Cloud 33 · Urbanrise
                </p>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl text-white font-bold font-serif mb-2 drop-shadow"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {currentItem.title}
                </h3>
                <p className="text-stone-200 text-xs sm:text-sm max-w-2xl leading-relaxed mb-3">
                  {currentItem.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1 rounded-full text-white text-xs">
                  <Sparkles size={12} className="text-[#F4DF94]" />
                  <span>{currentItem.specs}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#C5A059] text-[#1C1917] hover:text-white p-3 rounded-full backdrop-blur-md transition-all shadow-md z-10"
            title="Previous Photo"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#C5A059] text-[#1C1917] hover:text-white p-3 rounded-full backdrop-blur-md transition-all shadow-md z-10"
            title="Next Photo"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Thumbnail Carousel Strip */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DEC8] flex gap-3 overflow-x-auto pb-3">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setIsAutoPlay(false);
                setCurrentIndex(index);
              }}
              className={`relative flex-shrink-0 w-24 sm:w-32 h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-[#1E3A2F] scale-105 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── 4K Lightbox Fullscreen Modal ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-between p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Header Controls */}
            <div className="w-full flex items-center justify-between z-50 text-white">
              <div>
                <span className="text-[#E6C875] text-xs tracking-widest uppercase font-semibold">
                  Urbanrise On Cloud 33
                </span>
                <p className="text-sm font-serif">
                  Photo {lightboxIndex + 1} of {URBANRISE_GALLERY.length}
                </p>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="bg-white/20 hover:bg-white text-white hover:text-black p-2.5 rounded-full transition-transform active:scale-95 shadow"
              >
                <X size={22} />
              </button>
            </div>

            {/* Active Image */}
            <div
              className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={URBANRISE_GALLERY[lightboxIndex].src}
                alt={URBANRISE_GALLERY[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />

              <button
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + URBANRISE_GALLERY.length) % URBANRISE_GALLERY.length
                  )
                }
                className="absolute left-2 bg-black/60 hover:bg-white hover:text-black text-white p-3 rounded-full transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % URBANRISE_GALLERY.length)
                }
                className="absolute right-2 bg-black/60 hover:bg-white hover:text-black text-white p-3 rounded-full transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Lightbox Footer Caption */}
            <div className="w-full text-center max-w-2xl text-white">
              <h4 className="text-lg sm:text-xl font-bold font-serif text-[#E6C875]">
                {URBANRISE_GALLERY[lightboxIndex].title}
              </h4>
              <p className="text-stone-300 text-xs sm:text-sm mt-1">
                {URBANRISE_GALLERY[lightboxIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
