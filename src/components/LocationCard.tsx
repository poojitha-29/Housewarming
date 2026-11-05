import { motion } from "framer-motion";
import { MapPin, Navigation, Share2, ExternalLink, Phone, MessageCircle, Building2 } from "lucide-react";
import { EVENT_CONFIG } from "../config/event";

export default function LocationCard() {
  const { venue, hosts } = EVENT_CONFIG;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "On Cloud 33 – Urbanrise",
        text: `${venue.name} · ${venue.apartment}\n${venue.addressLine1}, ${venue.city}`,
        url: venue.googleMapsUrl,
      });
    } else {
      await navigator.clipboard.writeText(venue.googleMapsUrl);
      alert("Google Maps link copied!");
    }
  };

  return (
    <section id="map" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-[#FAF6ED] border border-[#C5A059]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
          <Building2 size={14} className="text-[#C5A059]" />
          <span className="text-[#99582A] text-xs tracking-[0.25em] uppercase font-bold">
            Venue &amp; Directions
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl text-[#1C1917] font-serif font-bold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Find Us Here
        </h2>
        <p className="text-[#78716C] text-sm">
          Join Srikanth, Sivapriya &amp; their two elder daughters at their new dream home
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border-2 border-[#E8DEC8] rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.06)]"
      >
        {/* Real Urbanrise Tower Photo Header */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <img
            src="/urbanrise/elevation-night.jpg"
            alt="Urbanrise On Cloud 33 Bachupally Hyderabad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-2"
            >
              📍
            </motion.div>
            <p className="font-serif text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {venue.name}
            </p>
            <p className="text-[#F4DF94] text-xs sm:text-sm tracking-wider mt-1 uppercase font-semibold">
              Bachupally, Hyderabad
            </p>
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 bg-white text-[#1C1917] hover:bg-[#C5A059] hover:text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-md"
            >
              <ExternalLink size={14} />
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Address and Apartment Details */}
        <div className="p-7 sm:p-9 bg-white">
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {/* Address */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8DEC8]">
              <div className="flex items-center gap-2 text-[#99582A] mb-2 font-bold text-xs uppercase tracking-wider">
                <MapPin size={16} />
                <span>Complete Address</span>
              </div>
              <p className="text-[#1C1917] font-bold text-base mb-1">{venue.name}</p>
              <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed">
                {venue.addressLine1},<br />
                {venue.addressLine2},<br />
                {venue.city},<br />
                {venue.state} – {venue.pincode}
              </p>
            </div>

            {/* Apartment Flat Details */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8DEC8]">
              <div className="flex items-center gap-2 text-[#99582A] mb-2 font-bold text-xs uppercase tracking-wider">
                <Building2 size={16} />
                <span>Apartment Location</span>
              </div>
              <div className="space-y-2 mt-3">
                {[
                  { label: "Tower", value: "Tower 3" },
                  { label: "Floor", value: "Floor 12" },
                  { label: "Flat Unit", value: "Flat 1208" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between border-b border-[#E8DEC8] pb-1.5">
                    <span className="text-[#78716C] text-xs">{label}</span>
                    <span className="text-[#1E3A2F] font-bold text-base font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1E3A2F] hover:bg-[#152921] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-sm"
            >
              <MapPin size={15} />
              Open Maps
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=Urbanrise+On+Cloud+33+Bachupally+Hyderabad`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border border-[#1E3A2F] text-[#1E3A2F] hover:bg-[#FAF8F5] text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-sm"
            >
              <Navigation size={15} />
              Get Directions
            </a>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white border border-[#E8DEC8] text-[#57534E] hover:bg-[#FAF8F5] text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-sm"
            >
              <Share2 size={15} />
              Share Location
            </button>
          </div>
        </div>
      </motion.div>

      {/* Direct Contact Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a
          href={hosts.phoneLink}
          className="flex items-center justify-center gap-3 bg-white hover:bg-[#FAF8F5] text-[#1C1917] font-semibold text-sm px-7 py-3.5 rounded-2xl border-2 border-[#E8DEC8] transition-all shadow-sm"
        >
          <Phone size={17} className="text-[#851D2D]" />
          <span>Call Host ({hosts.contact})</span>
        </a>
        <a
          href={hosts.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#0F382C] hover:bg-[#154a3a] text-white font-semibold text-sm px-7 py-3.5 rounded-2xl transition-all shadow-md"
        >
          <MessageCircle size={17} className="text-[#A7F3D0]" />
          <span>Message on WhatsApp</span>
        </a>
      </motion.div>
    </section>
  );
}
