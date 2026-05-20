# Portfolio — Vo Xuan Truyen

Personal portfolio website for UI/UX designer Vo Xuan Truyen.

## Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animation:** Framer Motion 11 + GSAP 3 (ScrollTrigger)
- **Dev server:** `npm run dev` → usually port 3000 or 3003

## Figma Source

File: `https://www.figma.com/design/JkeUsmkjHY3RYPZLGc756B/Portfolio-Ver-2.0`

Key nodes:
| Section | Node ID |
|---|---|
| Hero section | `2022:24517` |
| Work section (card state) | `2029:25107` |
| Work → About transition | `2032:25124` |

**Always fetch the Figma node before implementing any layout change.**

## Page Structure

```
app/page.tsx
├── <Navbar />
└── <main>
    ├── <HeroSection />
    ├── <WorkSection />
    ├── <AboutSection />
    └── <ContactSection />
```

## Components

### Navbar (`components/Navbar.tsx`)
- Fixed pill nav; collapses to rounded floating bar (800px wide, blur) after 60px scroll
- Mobile: hamburger with animated ×, dropdown links

### HeroSection (`components/HeroSection.tsx`)
- `min-height: max(100vh, 1110px)`, NO `overflow-hidden` on the section
- 12 floating image frames from Figma; left-constrained frames use `left: Xpx`, right-constrained use `right: Xpx`
- GSAP floating animation on frame refs, Framer Motion entrance on center text
- **Left-constrained frames (01,04,05,06,07,09):** fixed pixel `left` values
- **Right-constrained frames (02,03,08,10,11,12):** `right: Xpx` values  
  - Frames 03 (`right:-204`) and 11 (`right:-29`) intentionally peek from the right viewport edge

### WorkSection (`components/WorkSection.tsx`)
- **Interaction:** Deck-stacking scroll (yellowpeach.co.uk style) — 3 project cards stack via GSAP ScrollTrigger pin
- **CARD_H = 700** (explicit inline style on outer wrapper — use this constant directly, never measure offsetHeight)
- **PEEK = 80** (px of next card peeking at container bottom)
- Cards: `c0 z-10`, `c1 z-20`, `c2 z-30`; initial positions: `c1 y=620`, `c2 y=700`
- Section has `z-[50]` to stay above AboutSection when GSAP makes it `position:fixed`
- Header ("Selected Work") fades to `opacity:0` at first scroll
- After all 3 cards: `onLeave` scrolls to `#about`
- GSAP end = `+=${CARD_H * 2}` = 1400px of scroll

**Projects:**
| ID | Name | dark |
|---|---|---|
| nami-exchange | Nami Exchange / Mobile app & Website | false |
| nami-insurance | Nami Insurance / Website | true |
| highway | Highway / Mobile app | true |

### AboutSection (`components/AboutSection.tsx`)
- "My Story" — bio text + experience/awards/skills lists
- No explicit z-index (default auto)

### ContactSection (`components/ContactSection.tsx`)
- Scrolling ticker "Ready to get in touch?" + footer

## globals.css Rules

```css
html {
  scroll-behavior: smooth;
  /* NO overflow-x: hidden — lets hero frames peek from viewport edges */
}
body {
  overflow-x: hidden; /* propagates to viewport via CSS spec */
}
```

## Critical Patterns

### Never measure what we set explicitly
`CARD_H = 700` is the inline style value. Use it directly in GSAP calculations. `offsetHeight` can return wrong values during Next.js hydration.

### z-index on GSAP-pinned sections
GSAP `pin:true` applies `position:fixed`. Without explicit z-index, later DOM sections (position:relative) paint on top. Always add `z-[50]` to pinned sections.

### Framer Motion + CSS transform conflict
`motion.div` sets `transform: none` at rest, overwriting Tailwind transform utilities (e.g. `-translate-x-1/2`). Fix: outer plain `div` for CSS positioning, inner `motion.div` for opacity/y animation only.

### Hero overflow
Section must NOT have `overflow-hidden` — frames extend outside bounds intentionally. Remove `overflow-x:hidden` from `<html>` too (keep on `<body>`).

## Owner

- **Email:** truyen17031997@gmail.com  
- **Phone:** (+84) 399 712 946  
- **Location:** Ho Chi Minh, Vietnam
