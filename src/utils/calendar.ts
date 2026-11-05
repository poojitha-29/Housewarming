import type { EventItem } from "../config/event";

function padTo2(n: number) {
  return String(n).padStart(2, "0");
}

function formatICSDate(dateStr: string, timeStr: string): string {
  // dateStr: "2026-11-25", timeStr: "17:00" (IST = UTC+5:30)
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  void day; // used below via padTo2

  // Simple: just use floating time with TZID for reliability
  return `${year}${padTo2(month)}${padTo2(Number(dateStr.split("-")[2]))}T${padTo2(hour)}${padTo2(minute)}00`;
}

export interface CalendarEventInput {
  id: string;
  title: string;
  date: string;
  theme?: string;
  description?: string;
}

export function generateICS(event: CalendarEventInput): string {
  const isNight = event.theme === "night";
  const startTime = isNight ? "19:00" : "09:00";
  const endTime = isNight ? "22:00" : "12:00";
  const dtStart = formatICSDate(event.date, startTime);
  const dtEnd = formatICSDate(event.date, endTime);
  const uid = `${event.id}-${Date.now()}@srikanth-sivapriya-housewarming.com`;
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Srikanth & Sivapriya Housewarming//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Kolkata",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "DTSTART:19700101T000000",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=Asia/Kolkata:${dtStart}`,
    `DTEND;TZID=Asia/Kolkata:${dtEnd}`,
    `SUMMARY:${event.title} – Srikanth & Sivapriya Housewarming`,
    "DESCRIPTION:You are cordially invited to celebrate the housewarming of Srikanth & Sivapriya.\\n\\nOn Cloud 33 – Urbanrise\\nTower 3\\, Floor 12\\, Flat 1208\\n200 Ft Miyapur – Bachupally Main Road\\, Bachupally\\, Hyderabad – 500090\\n\\nContact: 8106868686",
    "LOCATION:On Cloud 33 – Urbanrise\\, Tower 3\\, Floor 12\\, Flat 1208\\, 200 Ft Miyapur – Bachupally Main Road\\, Bachupally\\, Hyderabad 500090",
    "GEO:17.5497;78.3772",
    "ORGANIZER;CN=Srikanth & Sivapriya:MAILTO:noreply@srikanth-sivapriya.com",
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}
