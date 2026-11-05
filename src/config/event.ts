// ============================================================
// CENTRAL EVENT CONFIGURATION FILE
// Edit this file to update all event details across the site
// ============================================================

export const EVENT_CONFIG = {
  hosts: {
    name1: "Srikanth",
    name2: "Sivapriya",
    displayName: "Srikanth & Sivapriya",
    familyTitle: "Srikanth, Sivapriya & Daughters",
    daughters: "Two Elder Daughters",
    familyBlessing: "Blessed with their two beloved daughters, beginning a golden chapter of joy, prosperity, and peace.",
    contact: "8106868686",
    phoneLink: "tel:+918106868686",
    whatsappLink: "https://wa.me/918106868686?text=Dear%20Srikanth%20%26%20Sivapriya%2C%20Heartiest%20congratulations%20on%20your%20new%20home%20at%20On%20Cloud%2033!%20Looking%20forward%20to%20joining%20the%20celebrations.",
  },

  occasion: "Sacred Housewarming Ceremony (Grihapravesham)",

  sanskritBlessing: {
    shloka: "ॐ श्री गणेशाय नमः । गृहे सुखं वसन्तु, धनधान्यसमृद्धिः अस्तु, मङ्गलं भवतु ॥",
    telugu: "॥ శుభ గృహప్రవేశం ॥ సర్వేజనాః సుఖినోభవంతు ॥",
    meaning: "With the divine blessings of Lord Ganesha, may our home always overflow with happiness, peace, and abundance.",
  },

  invitationMessage:
    "With the divine blessings of God, our elders, and our beloved family, we warmly invite you and your family to grace the auspicious Grihapravesham of our dream home. Your sacred presence and heartfelt blessings will sanctify our new abode.",

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

  events: [
    {
      id: "night-celebration",
      title: "Night Celebration & Sandhya Deepotsav",
      date: "2026-11-25",
      displayDate: "25 November 2026",
      day: "Wednesday",
      time: "Evening onwards",
      // Update time above when confirmed, e.g. "6:30 PM onwards"
      theme: "night",
      emoji: "🪔",
      rituals: ["Deepa Prajvalana (Lighting of Sacred Lamps)", "Family Sangeet & Musical Evening", "Festive Dinner Feast"],
      description: "An enchanting pre-celebration evening bathed in golden lights, melodious music, laughter, and culinary delights.",
    },
    {
      id: "housewarming",
      title: "Sacred Grihapravesham Ceremony",
      date: "2026-11-26",
      displayDate: "26 November 2026",
      day: "Thursday",
      time: "Morning onwards",
      // Update time above when confirmed, e.g. "8:15 AM onwards (Auspicious Muhurtham)"
      theme: "morning",
      emoji: "🌸",
      rituals: ["Vastu Puja & Navagraha Homam", "Ksheera Paal (Sacred Milk Boiling)", "Sri Satyanarayana Swamy Vratam", "Maha Prasadam & Feast"],
      description: "The traditional Vedic housewarming ceremony welcoming Lakshmi & prosperity with sacred chants and timeless rituals.",
    },
  ],

  timezone: "Asia/Kolkata",
  timezoneDisplay: "IST",

  calendarDefaults: {
    duration: 3, // hours
    organizer: "Srikanth & Sivapriya",
  },

  siteUrl: "",
  siteName: "Srikanth & Sivapriya – Grihapravesham Invitation",
} as const;

// Supabase config (optional – leave empty to use local demo)
export const SUPABASE_CONFIG = {
  get url() { return (import.meta.env.VITE_SUPABASE_URL as string) || ""; },
  get anonKey() { return (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || ""; },
};

export type EventConfig = typeof EVENT_CONFIG;
export type EventItem = (typeof EVENT_CONFIG.events)[number];
