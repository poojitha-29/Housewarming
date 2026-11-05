import { useState } from "react";
import { motion } from "framer-motion";
import { Home, FileText, Calendar, Image, MapPin, Phone } from "lucide-react";
import { EVENT_CONFIG } from "../config/event";

const NAV_ITEMS = [
  { id: "home", label: "HOME", icon: Home },
  { id: "invite", label: "INVITE", icon: FileText },
  { id: "events", label: "EVENTS", icon: Calendar },
  { id: "gallery", label: "GALLERY", icon: Image },
  { id: "map", label: "MAP", icon: MapPin },
];

export default function MobileNav() {
  const [active, setActive] = useState("home");

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E8DEC8] shadow-[0_-5px_20px_rgba(0,0,0,0.05)] safe-area-pb">
      <div className="flex items-stretch relative">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all ${
              active === id ? "text-[#0F382C] font-bold" : "text-[#78716C] hover:text-[#1C1917]"
            }`}
          >
            <Icon size={18} className={active === id ? "stroke-[2.5]" : "stroke-[1.8]"} />
            <span className="text-[9px] tracking-wider font-semibold">{label}</span>
            {active === id && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute top-0 h-0.5 bg-[#C5A059]"
                style={{
                  width: `${100 / (NAV_ITEMS.length + 1)}%`,
                  left: `${(NAV_ITEMS.findIndex((n) => n.id === id) / (NAV_ITEMS.length + 1)) * 100}%`,
                }}
              />
            )}
          </button>
        ))}

        {/* Call button */}
        <a
          href={EVENT_CONFIG.hosts.phoneLink}
          className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-[#851D2D] hover:text-[#6A0D18] transition-all"
        >
          <Phone size={18} className="stroke-[2.2]" />
          <span className="text-[9px] tracking-wider font-bold">CALL</span>
        </a>
      </div>
    </nav>
  );
}
