
// ============================================================
// CENTRAL EVENT CONFIGURATION
// Srikanth & Sivapriya – Housewarming Invitation
// ============================================================

export const EVENT_CONFIG = {
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

  events: [
    {
      id: "housewarming",
      title: "శుభ గృహప్రవేశ మహోత్సవం",
      date: "2026-11-25",
      displayDate: "25 November 2026",
      day: "Wednesday",
      time: "9:30 PM onwards",
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

  // Four family contact persons
  familyContacts: [
    {
      id: "contact-1",
      name: "Srikanth",
      phone: "8106868686",
      phoneLink: "tel:+918106868686",
    },
    {
      id: "contact-2",
      name: "Sivapriya",
      phone: "9010723544",
      phoneLink: "tel:+919010723544",
    },
    {
      id: "contact-3",
      name: "Sangeetha",
      phone: "9182965179",
      phoneLink: "tel:+919182965179",
    },
    {
      id: "contact-4",
      name: "Poojitha",
      phone: "8106242929",
      phoneLink: "tel:+918106242929",
    },
  ],

  timezone: "Asia/Kolkata",
  timezoneDisplay: "IST",

  calendarDefaults: {
    duration: 3,
    organizer: "Srikanth & Sivapriya",
  },

  siteUrl: "",
  siteName: "Srikanth & Sivapriya – Grihapravesham Invitation",
} as const;

// ============================================================
// SUPABASE CONFIGURATION
// ============================================================

export const SUPABASE_CONFIG = {
  get url() {
    return (import.meta.env.VITE_SUPABASE_URL as string) || "";
  },
  get anonKey() {
    return (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "";
  },
};

export type EventConfig = typeof EVENT_CONFIG;
export type EventItem = (typeof EVENT_CONFIG.events)[number];
