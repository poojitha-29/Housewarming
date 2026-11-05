# 🏠 Srikanth & Sivapriya – Housewarming Invitation

A premium, cinematic, fully responsive 3D digital housewarming invitation website.

## ✨ Features

- **Automatic 3D Door Opening** – Cinematic Three.js door animation that plays automatically on first visit
- **CSS Fallback** – Graceful 3D-CSS fallback when WebGL is unavailable
- **Skip Animation** – Unobtrusive skip button for returning visitors
- **Session-level replay prevention** – Animation won't replay on back navigation
- **Two-Day Event Schedule** – Beautiful dark emerald (night) and ivory (morning) event cards
- **Live Countdown** – Real-time IST countdown to both celebrations
- **Luxury Invitation Poster** – Downloadable high-quality PNG poster
- **Gallery** – Urbanrise On Cloud 33 community showcase with lightbox
- **Digital Blessings Book** – Supabase-powered (or local demo) guest wishes
- **Add to Calendar** – Valid .ics files for both events with IST timezone
- **Share Invitation** – Native Web Share API + WhatsApp + copy link
- **Interactive Location Card** – Google Maps, directions, and share
- **Floating Particles** – Ambient gold particle canvas animation
- **Mobile Navigation** – Fixed bottom nav: HOME | INVITE | EVENTS | GALLERY | MAP | CALL
- **Mobile-First** – Tested at 320, 360, 375, 390, 430px breakpoints

## 📋 Event Details

| Event | Date | Day | Time |
|-------|------|-----|------|
| Night Celebration | 25 November 2026 | Wednesday | Evening onwards |
| Housewarming Ceremony | 26 November 2026 | Thursday | Morning onwards |

**Venue:** On Cloud 33 – Urbanrise, Tower 3, Floor 12, Flat 1208  
**Address:** 200 Ft Miyapur – Bachupally Main Road, Next to Mamata Academy of Medical Sciences, Bachupally, Hyderabad, Telangana – 500090  
**Contact:** 8106868686

## 🛠️ Tech Stack

- **React 19 + Vite 8 + TypeScript**
- **Three.js + @react-three/fiber + @react-three/drei** – 3D door animation
- **Framer Motion** – Smooth transitions and reveal animations
- **Tailwind CSS v4** – Utility-first styling
- **Lucide React** – Icons
- **html2canvas** – Poster download
- **Supabase** (optional) – Guest blessings persistence
- **date-fns** – Date utilities

## 🚀 Getting Started

### Prerequisites
- Node.js 22.12+ (recommended) or 20.19+
- npm 10+

### Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── config/
│   └── event.ts              # ⭐ CENTRAL CONFIG - Edit all event details here
├── components/
│   ├── DoorIntro.tsx          # 3D door opening animation
│   ├── MainSite.tsx           # Main site layout
│   ├── EventSchedule.tsx      # Two-day event cards
│   ├── CountdownSection.tsx   # Live countdown timers
│   ├── InvitationPoster.tsx   # Luxury invitation poster
│   ├── GallerySection.tsx     # Property gallery
│   ├── LocationCard.tsx       # Maps & directions
│   ├── BlessingsBook.tsx      # Guest wishes
│   ├── MobileNav.tsx          # Bottom mobile navigation
│   └── FloatingParticles.tsx  # Ambient particles
├── hooks/
│   ├── useWebGL.ts            # WebGL support detection
│   └── useCountdown.ts        # Live countdown hook
├── utils/
│   └── calendar.ts            # ICS file generation
├── App.tsx                    # Root orchestration
├── main.tsx                   # Entry point
└── index.css                  # Global styles + fonts
```

## ✏️ Customization

**All event details are centrally managed in [`src/config/event.ts`](src/config/event.ts)**

To update event times when confirmed:
```typescript
// In src/config/event.ts
events: [
  {
    id: "night-celebration",
    time: "7:00 PM onwards",  // ← Update here
    ...
  },
  {
    id: "housewarming",
    time: "9:00 AM onwards",  // ← Update here
    ...
  }
]
```

## 🗺️ Supabase Setup (Optional)

To enable persistent guest blessings:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run this SQL to create the blessings table:

```sql
CREATE TABLE blessings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE blessings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read and insert
CREATE POLICY "Anyone can read blessings" ON blessings FOR SELECT USING (true);
CREATE POLICY "Anyone can add blessings" ON blessings FOR INSERT WITH CHECK (true);
```

3. Create a `.env` file:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Without Supabase, the blessings book works in local demo mode.

## 📱 Mobile Testing Widths

The site is optimized for:
- 320px (small phones)
- 360px (Android standard)
- 375px (iPhone SE)
- 390px (iPhone 15)
- 430px (iPhone 15 Plus)
- 768px+ (Tablets & Desktop)

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### GitHub Pages
Add to `vite.config.ts`:
```typescript
base: '/your-repo-name/'
```
Then run `npm run build` and deploy the `dist/` folder.

## 📸 Adding Real Gallery Photos

Replace the placeholder gallery in [`src/components/GallerySection.tsx`](src/components/GallerySection.tsx):

1. Add photos to `public/gallery/`
2. Update the `GALLERY` array with actual `src` paths pointing to real Urbanrise On Cloud 33 images

---

Made with ❤️ for Srikanth & Sivapriya's new beginning 🏠
