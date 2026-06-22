# Homepage Redesign — Design Spec
Date: 2026-05-30
Status: Approved

## Overview

Full homepage redesign for aurevonlabs.com. Direction: Cinematic/Atmospheric. Scroll animations: Cinematic (staggered reveals, directional slides, delays). No structural changes to routing, data, or existing product pages.

---

## Section 1: Hero

**Layout:** Full-screen (`h-screen`, `min-h-[600px]`). Dark canvas (`#0a0a0a`). No product photo.

**Background:** Animated frequency bars — 15-20 vertical divs, gold (`--gold`) at 20% opacity, each animating height via CSS `@keyframes` with varied `animation-duration` (0.8s–1.8s) and `animation-delay` (0s–1.2s) per bar. `animation-timing-function: ease-in-out`, `animation-iteration-count: infinite`, `animation-direction: alternate`. Pure CSS, no JS per-frame cost. Bars scroll at slower rate than content (parallax via `useTransform`).

**Content (centered, max-width 600px):**
1. Eyebrow: gold line + "Aurevon Labs" in small caps/tracking
2. Headline: "Experience music / as it was recorded." — second line in `--gold`, `clamp(3rem, 9vw, 8rem)`, weight 300, `letter-spacing: -0.03em`, `line-height: 0.95`
3. Thin gold rule (`40px`, `1px`, fade in)
4. CTA: "Explore Collection" button in gold

**Entrance animation (Framer Motion):** Staggered `initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}`:
- Eyebrow: delay 0.2s
- Headline: delay 0.45s
- Rule: delay 0.65s, also `scaleX: 0 → 1` from left
- CTA: delay 0.85s

**Scroll behavior:** `useScroll` + `useTransform` — content opacity fades `[0, 0.6] → [1, 0]`, bars translateY slower than viewport.

**Scroll indicator:** Bouncing gold line at bottom, fades in at delay 1.2s. Same as current.

---

## Section 2: Featured Products

**Layout:** Full-width section, `py-24`. Dark bg.

**Heading block:**
- Eyebrow: "— Collection"
- H2: "Our Amplifiers"
- Animate: eyebrow fades up first (0s), H2 follows (0.1s). `whileInView`, `viewport={{ once: true, margin: "-80px" }}`.

**Product grid:** 3 columns desktop, 1 column mobile. Existing `ProductCard` component, wrapped in `motion.div`. Stagger: card 1 at 0s, card 2 at 0.15s, card 3 at 0.3s. Each: `initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}`, duration 0.7s.

No changes to ProductCard internals, product data, or routing.

---

## Section 3: Statement Banner

**Layout:** Full-width, `py-20`. Same dark bg — no surface elevation, no card.

**Content (centered, max-width 680px):**
- Gold hairline rule draws in from center outward (`scaleX: 0 → 1`, `transformOrigin: center`)
- Statement: "Every amplifier is built by hand. Every component is chosen with intent."
- "built by hand" and "chosen with intent" styled in `--gold`
- `clamp(1.8rem, 4vw, 3.2rem)`, weight 300, leading `1.2`

**Animation:** Statement rendered as two lines. Line 1 slides from left (`x: -40 → 0`, `opacity: 0 → 1`). Line 2 slides from right (`x: 40 → 0`, `opacity: 0 → 1`). 0.12s stagger between lines. Duration 0.8s each. `whileInView`, `once: true`.

---

## Section 4: About

**Layout:** Two-column (`grid grid-cols-1 md:grid-cols-2`), `py-24`. Gap `gap-12`.

**Left — text:**
- Eyebrow: "Our Story"
- H2: "Music deserves to be heard as it was created."
- 2–3 short paragraphs (drafted below)
- "Learn More →" link to `/about`

**Right — image:** `20260416-ABH_6863-Edit.jpg` (atmospheric PCB/amp shot). `object-cover`, full column height. Slight border `border border-[--border]`.

**Copy (draft):**
> Aurevon was born from a single conviction: that the music reaching your ears should sound exactly as the artist intended it.
>
> Every amplifier we make is assembled by hand in Greater Noida. Every component — from the Burr-Brown pre-amplification stage to the toroidal transformer — is chosen not for cost, but for character.
>
> We build for people who can tell the difference.

**Animation:** Left column `x: -32 → 0, opacity: 0 → 1`. Right column `x: 32 → 0, opacity: 0 → 1`. 0.15s stagger. Duration 0.8s. `whileInView`, `once: true`.

---

## Section 5: Early Access

**Layout:** Centered, max-width 560px, `py-24`. Surface card (`bg-[--surface]`, `border border-[--border]`), `p-10`.

**Content:**
- Eyebrow: "Coming Soon"
- H2: "Be the first to know."
- Subtext: "Get notified when HARMION and DYNAVION launch."
- Email input + "Notify Me" button — inline on desktop (flex row), stacked on mobile (flex col)
- Input: `border border-[--border]`, bg `--bg`, text `--text`. Focus ring in gold.

**Backend:** Firestore `addDoc` to `waitlist` collection. Document shape: `{ email: string, createdAt: serverTimestamp() }`. Client component (`'use client'`). Basic email format validation before submit.

**States:**
- Default: form visible
- Loading: button shows spinner, disabled
- Success: form replaced with "You're on the list." + gold checkmark SVG
- Error: inline error message below input

**Animation:** Entire card `y: 24 → 0, opacity: 0 → 1`. Duration 0.7s. `whileInView`, `once: true`.

---

## Implementation Notes

**Files to create:**
- `components/sections/FeaturedProductsSection.tsx`
- `components/sections/StatementBannerSection.tsx`
- `components/sections/AboutSection.tsx`
- `components/sections/EarlyAccessSection.tsx`

**Files to modify:**
- `components/sections/HeroSection.tsx` — full rewrite (waveform bars, new entrance animation)
- `app/(public)/page.tsx` — compose all 5 sections in order

**No changes to:**
- Product data (`data/products.ts`)
- Routing
- Navbar / Footer
- Product card component internals
- Any page outside `(public)/page.tsx`

**Dependencies:** All already installed — Framer Motion 12, Firebase/Firestore, next-themes. No new packages.

---

## Scroll Animation Summary

| Section | Animation type | Direction | Duration |
|---|---|---|---|
| Hero entrance | Staggered fade + Y | Up | 0.7–0.9s |
| Featured Products heading | Fade + Y | Up | 0.6s |
| Product cards | Staggered fade + Y | Up | 0.7s |
| Statement banner rule | Scale from center | — | 0.5s |
| Statement lines | Slide | Left / Right | 0.8s |
| About columns | Slide | Left / Right | 0.8s |
| Early Access card | Fade + Y | Up | 0.7s |
