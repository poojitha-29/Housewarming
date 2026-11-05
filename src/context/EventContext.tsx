import React, { createContext, useContext, useState, useEffect } from "react";
import { EVENT_CONFIG } from "../config/event";

export interface GalleryPhoto {
  src: string;
  label: string;
}

export interface EditableEvent {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  day: string;
  time: string;
  theme: string;
  emoji: string;
  rituals: string[];
  description: string;
}

export interface FullEventConfig {
  door: {
    badge: string;
    familyTitle: string;
    ctaPrompt: string;
    flatNumber: string;
    nameplateLine1: string;
    nameplateLine2: string;
    welcomeInteriorTitle: string;
    welcomeInteriorSubtitle: string;
  };
  hosts: {
    name1: string;
    name2: string;
    displayName: string;
    familyTitle: string;
    daughters: string;
    familyBlessing: string;
    contact: string;
    phoneLink: string;
    whatsappLink: string;
  };
  occasion: string;
  sanskritBlessing: {
    shloka: string;
    telugu: string;
    meaning: string;
  };
  invitationHeading: string;
  invitationMessage: string;
  posterMessage: string;
  venue: {
    name: string;
    apartment: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    googleMapsUrl: string;
  };
  events: EditableEvent[];
  gallery: GalleryPhoto[];
}

export const DEFAULT_CONFIG: FullEventConfig = {
  door: {
    badge: "YOU'RE INVITED HOME",
    familyTitle: "The Srikanth Family",
    ctaPrompt: "RING THE BELL TO ENTER",
    flatNumber: "1208",
    nameplateLine1: "THE SRIKANTH",
    nameplateLine2: "FAMILY",
    welcomeInteriorTitle: "Welcome to Flat 1208",
    welcomeInteriorSubtitle: "Srikanth, Sivapriya & Daughters",
  },
  hosts: {
    name1: "Srikanth",
    name2: "Sivapriya",
    displayName: "Srikanth & Sivapriya",
    familyTitle: "The Srikanth Family",
    daughters: "SRIKANTH & SIVAPRIYA & DAUGHTERS",
    familyBlessing: "Blessed with their two beloved daughters, beginning a golden chapter of joy, prosperity, and peace.",
    contact: "8106868686",
    phoneLink: "tel:+918106868686",
    whatsappLink: "https://wa.me/918106868686?text=Dear%20Srikanth%20%26%20Sivapriya%2C%20Heartiest%20congratulations%20on%20your%20new%20home%20at%20On%20Cloud%2033!%20Looking%20forward%20to%20joining%20the%20celebrations.",
  },
  occasion: "Sacred Housewarming Ceremony (Grihapravesham)",
  sanskritBlessing: {
    shloka: "|| Shree Ganeshaya Namah ||",
    telugu: "॥ శుభ గృహప్రవేశం ॥ సర్వేజనాః సుఖినోభవంతు ॥",
    meaning: "With the divine blessings of Lord Ganesha, may our home always overflow with happiness, peace, and abundance.",
  },
  invitationHeading: "Shubh Griha Pravesh",
  invitationMessage: "invite you to bless our new home with your presence",
  posterMessage: "With the blessings of God and our loved ones, we warmly invite you and your family to celebrate the beautiful beginning of our new journey in our dream home.",
  venue: {
    name: "On Cloud 33 – Urbanrise",
    apartment: "Tower 3 · Floor 12 · Flat 1208",
    addressLine1: "200 Ft Miyapur – Bachupally Main Road",
    addressLine2: "Next to Mamata Academy of Medical Sciences",
    city: "Bachupally, Hyderabad",
    state: "Telangana",
    pincode: "500090",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Urbanrise+On+Cloud+33+Bachupally+Hyderabad",
  },
  events: [
    {
      id: "night-celebration",
      title: "Night Celebration & Deepotsav",
      date: "2026-11-25",
      displayDate: "25 November 2026",
      day: "Wednesday",
      time: "Evening onwards",
      theme: "night",
      emoji: "🪔",
      rituals: ["Deepa Prajvalana (Lighting of Sacred Lamps)", "Family Sangeet & Musical Evening", "Festive Dinner Feast"],
      description: "Kalash sthapana, family sangeet and festive musical dinner to celebrate our new home with loved ones.",
    },
    {
      id: "housewarming",
      title: "Griha Pravesh Puja & Muhurtham",
      date: "2026-11-26",
      displayDate: "26 November 2026",
      day: "Thursday",
      time: "Morning onwards",
      theme: "morning",
      emoji: "🌸",
      rituals: ["Vastu Puja & Navagraha Homam", "Ksheera Paal (Sacred Milk Boiling)", "Sri Satyanarayana Swamy Vratam", "Maha Prasadam & Feast"],
      description: "Join us for the Vastu puja, sacred milk boiling and aarti as we bless every corner of the house.",
    },
  ],
  gallery: [
    { src: "/urbanrise/hero-tower.jpg", label: "Tower 3 Residential Elevation" },
    { src: "/urbanrise/clubhouse-day.jpg", label: "85,000 Sq.Ft. Clubhouse" },
    { src: "/urbanrise/elevation-night.jpg", label: "Night Illumination" },
    { src: "/urbanrise/sky-lounge.jpg", label: "Rooftop Sky Lounge" },
    { src: "/urbanrise/landscape-garden.jpg", label: "Miyawaki Urban Forest" },
    { src: "/urbanrise/sunken-lounge.jpg", label: "Poolside Sunken Lounge" },
    { src: "/urbanrise/model-flat-interior.jpg", label: "Luxury Model Living Room" },
  ],
};

const STORAGE_KEY = "srikanth_housewarming_custom_config_v1";

interface EventContextType {
  config: FullEventConfig;
  updateConfig: (newConfig: FullEventConfig) => void;
  resetConfig: () => void;
  exportConfigJson: () => void;
}

const EventContext = createContext<EventContextType>({
  config: DEFAULT_CONFIG,
  updateConfig: () => {},
  resetConfig: () => {},
  exportConfigJson: () => {},
});

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<FullEventConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          door: { ...DEFAULT_CONFIG.door, ...(parsed.door || {}) },
          hosts: { ...DEFAULT_CONFIG.hosts, ...(parsed.hosts || {}) },
          venue: { ...DEFAULT_CONFIG.venue, ...(parsed.venue || {}) },
          sanskritBlessing: { ...DEFAULT_CONFIG.sanskritBlessing, ...(parsed.sanskritBlessing || {}) },
          events: parsed.events || DEFAULT_CONFIG.events,
          gallery: parsed.gallery || DEFAULT_CONFIG.gallery,
        };
      }
    } catch (e) {
      console.warn("Failed to read saved event config from localStorage", e);
    }
    return DEFAULT_CONFIG;
  });

  const updateConfig = (newConfig: FullEventConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error("Failed to save event config to localStorage", e);
    }
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to reset event config in localStorage", e);
    }
  };

  const exportConfigJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "housewarming-event-config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <EventContext.Provider value={{ config, updateConfig, resetConfig, exportConfigJson }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventConfig() {
  return useContext(EventContext);
}
