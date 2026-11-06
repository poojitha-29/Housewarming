
import React, { createContext, useContext, useState } from "react";

// ============================================================
// TYPES
// ============================================================

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

export interface FamilyContact {
  id: string;
  name: string;
  phone: string;
  phoneLink: string;
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
  familyContacts: FamilyContact[];
}

// ============================================================
// DEFAULT CONFIGURATION
// ============================================================

export const DEFAULT_CONFIG: FullEventConfig = {
  door: {
    badge: "YOU'RE INVITED HOME",
    familyTitle: "Pinnamaraju Venkata Srikanth & Family",
    ctaPrompt: "RING THE BELL TO ENTER",
    flatNumber: "1208",
    nameplateLine1: "Pinnamaraju Venkata Srikanth",
    nameplateLine2: "& Family",
    welcomeInteriorTitle: "Welcome to Flat 1208",
    welcomeInteriorSubtitle: "Srikanth, Sivapriya & Daughters",
  },

  hosts: {
    name1: "Srikanth",
    name2: "Sivapriya",
    displayName: "Srikanth & Sivapriya",
    familyTitle: "Srikanth, Sivapriya, Sangeetha & Poojitha",
    daughters: "Two Daughters",
    familyBlessing:
      "Blessed with their two beloved daughters, beginning a golden chapter of joy, prosperity, and peace.",
    contact: "8106868686",
    phoneLink: "tel:+918106868686",
    whatsappLink:
      "https://wa.me/918106868686?text=Dear%20Srikanth%20%26%20Sivapriya%2C%20Heartiest%20congratulations%20on%20your%20new%20home!",
  },

  occasion: "Sacred Housewarming Ceremony (Grihapravesham)",

  sanskritBlessing: {
    shloka: "ఓం శ్రీ గణేశాయ నమః",
    telugu: "శుభ గృహప్రవేశం | సర్వేజనాః సుఖినోభవంతు",
    meaning:
      "With the divine blessings of Lord Ganesha, may our home always overflow with happiness, peace, and abundance.",
  },

  invitationHeading: "Shubh Griha Pravesh",

  invitationMessage:
    "With the divine blessings of God, our elders, and our beloved family, we warmly invite you and your family to grace the auspicious Grihapravesham of our dream home. Your sacred presence and heartfelt blessings will sanctify our new abode.",

  posterMessage:
    "We warmly invite you and your family to celebrate this beautiful milestone with us. Your presence and blessings will make our special occasion even more memorable.",

  venue: {
    name: "On Cloud 33 – Urbanrise",
    apartment: "Tower 3 · Floor 12 · Flat 1208",
    addressLine1: "200 Ft Miyapur – Bachupally Main Road",
    addressLine2: "Next to Mamata Academy of Medical Sciences",
    city: "Bachupally, Hyderabad",
    state: "Telangana",
    pincode: "500090",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Urbanrise+On+Cloud+33+Bachupally+Hyderabad",
  },

  // ----------------------------------------------------------
  // EVENT SCHEDULE
  // ----------------------------------------------------------

  events: [
    {
      id: "housewarming",
      title: "శుభ గృహప్రవేశ మహోత్సవం",
      date: "2026-11-25",
      displayDate: "25 November 2026",
      day: "Wednesday",
      time: "9:30 PM  కర్కాటక లగ్నమున",
      theme: "night",
      emoji: "🏡",
      rituals: [
        "Sacred Gruhapravesham Ceremony",
      ],
      description:
        "మా జీవితంలో ఒక నూతన అధ్యాయానికి శ్రీకారం చుడుతూ, మా స్వగృహంలో గృహప్రవేశ శుభకార్యాన్ని నిర్వహించుకుంటున్నాము. ఈ శుభసందర్భంగా మీరు మీ కుటుంబ సభ్యులతో కలిసి విచ్చేసి, మీ అమూల్యమైన ఆశీస్సులతో మా ఇంటిని ఆనందం, ఐశ్వర్యం, సుఖశాంతులతో నింపవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము. మీ రాకే మాకు ఎంతో ఆనందం, మీ ఆశీస్సులే మాకు కొండంత బలం.",
    },

    {
      id: "satyanarayana-vratam",
      title: "శ్రీ సత్యనారాయణ స్వామి వ్రతం",
      date: "2026-11-26",
      displayDate: "26 November 2026",
      day: "Thursday",
      time: "Morning onwards",
      theme: "morning",
      emoji: "🙏",
      rituals: [
        "Sri Satyanarayana Swamy Vratam",
        "Maha Prasadam",
      ],
      description:
        "మా నూతన గృహంలో శ్రీ సత్యనారాయణ స్వామి వారి వ్రతాన్ని భక్తిశ్రద్ధలతో నిర్వహించుకుంటున్న ఈ పవిత్రమైన శుభసందర్భంగా, మీరు మీ కుటుంబ సభ్యులతో కలిసి విచ్చేసి స్వామివారి దివ్య ఆశీస్సులు పొందవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము. స్వామివారి కృపాకటాక్షాలు మీ అందరి జీవితాల్లో సుఖసంతోషాలు, ఆయురారోగ్యాలు, అష్టైశ్వర్యాలను ప్రసాదించాలని కోరుకుంటున్నాము. మీ రాకతో ఈ శుభకార్యం మరింత శోభాయమానం కావాలని ఆకాంక్షిస్తున్నాము.",
    },
  ],

  // ----------------------------------------------------------
  // GALLERY
  // ----------------------------------------------------------

  gallery: [
    {
      src: "/urbanrise/hero-tower.jpg",
      label: "Tower 3 Residential Elevation",
    },
    {
      src: "/urbanrise/clubhouse-day.jpg",
      label: "85,000 Sq.Ft. Clubhouse",
    },
    {
      src: "/urbanrise/elevation-night.jpg",
      label: "Night Illumination",
    },
    {
      src: "/urbanrise/sky-lounge.jpg",
      label: "Rooftop Sky Lounge",
    },
    {
      src: "/urbanrise/landscape-garden.jpg",
      label: "Miyawaki Urban Forest",
    },
    {
      src: "/urbanrise/sunken-lounge.jpg",
      label: "Poolside Sunken Lounge",
    },
    {
      src: "/urbanrise/model-flat-interior.jpg",
      label: "Luxury Model Living Room",
    },
  ],

  // ----------------------------------------------------------
  // FOUR FAMILY CONTACTS
  // Replace these placeholders with actual details.
  // ----------------------------------------------------------

  familyContacts: [
    {
      id: "contact-1",
      name: "",
      phone: "",
      phoneLink: "",
    },
    {
      id: "contact-2",
      name: "",
      phone: "",
      phoneLink: "",
    },
    {
      id: "contact-3",
      name: "",
      phone: "",
      phoneLink: "",
    },
    {
      id: "contact-4",
      name: "",
      phone: "",
      phoneLink: "",
    },
  ],
};

// ============================================================
// LOCAL STORAGE
// ============================================================

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

// ============================================================
// EVENT PROVIDER
// ============================================================

export function EventProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<FullEventConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        return {
          ...DEFAULT_CONFIG,
          ...parsed,

          door: {
            ...DEFAULT_CONFIG.door,
            ...(parsed.door || {}),
          },

          hosts: {
            ...DEFAULT_CONFIG.hosts,
            ...(parsed.hosts || {}),
          },

          venue: {
            ...DEFAULT_CONFIG.venue,
            ...(parsed.venue || {}),
          },

          sanskritBlessing: {
            ...DEFAULT_CONFIG.sanskritBlessing,
            ...(parsed.sanskritBlessing || {}),
          },

          events: parsed.events || DEFAULT_CONFIG.events,

          gallery: parsed.gallery || DEFAULT_CONFIG.gallery,

          familyContacts:
            parsed.familyContacts || DEFAULT_CONFIG.familyContacts,
        };
      }
    } catch (error) {
      console.warn(
        "Failed to read saved event config from localStorage",
        error
      );
    }

    return DEFAULT_CONFIG;
  });

  // ----------------------------------------------------------
  // SAVE CONFIGURATION
  // ----------------------------------------------------------

  const updateConfig = (newConfig: FullEventConfig) => {
    setConfig(newConfig);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(newConfig)
      );
    } catch (error) {
      console.error(
        "Failed to save event config to localStorage",
        error
      );
    }
  };

  // ----------------------------------------------------------
  // RESET CONFIGURATION
  // ----------------------------------------------------------

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(
        "Failed to reset event config in localStorage",
        error
      );
    }
  };

  // ----------------------------------------------------------
  // EXPORT CONFIGURATION BACKUP
  // ----------------------------------------------------------

  const exportConfigJson = () => {
    const dataStr =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(config, null, 2));

    const downloadAnchor = document.createElement("a");

    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      "housewarming-event-config.json"
    );

    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <EventContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        exportConfigJson,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

// ============================================================
// CUSTOM HOOK
// ============================================================

export function useEventConfig() {
  return useContext(EventContext);
}
