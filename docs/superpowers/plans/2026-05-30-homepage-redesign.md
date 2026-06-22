# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Aurevon homepage with a cinematic aesthetic — animated frequency bar hero, scroll-triggered reveals throughout, and two new sections (About + Early Access).

**Architecture:** Five section components compose the homepage in order. HeroSection is rewritten from the image-parallax approach to an abstract audio-visual canvas with CSS-animated frequency bars and Framer Motion entrance/scroll animations. Existing ProductGrid and ProductCard are reused unchanged; new sections are wrapped with `whileInView` motion. EarlyAccessSection is the only component with side effects (Firestore write).

**Tech Stack:** Next.js 16 App Router, React 19, Framer Motion 12, Tailwind CSS v4, Firebase Firestore, TypeScript

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Modify | `components/sections/HeroSection.tsx` | Full rewrite — frequency bars, cinematic entrance, scroll parallax |
| Create | `components/sections/FeaturedProductsSection.tsx` | Heading + ProductGrid wrapped in motion |
| Modify | `components/sections/BrandStatement.tsx` | Rewrite to cinematic two-line split reveal |
| Create | `components/sections/AboutSection.tsx` | Two-column story section with motion |
| Create | `components/sections/EarlyAccessSection.tsx` | Email capture, Firestore waitlist write |
| Modify | `app/(public)/page.tsx` | Compose all 5 sections in final order |

---

## Task 1: Rewrite HeroSection

**Files:**
- Modify: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Replace HeroSection with the frequency bar implementation**

```tsx
// components/sections/HeroSection.tsx
"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const BARS = [
  { left: "4%",  maxH: 60,  duration: 1.2,  delay: 0    },
  { left: "9%",  maxH: 90,  duration: 0.9,  delay: 0.3  },
  { left: "14%", maxH: 50,  duration: 1.4,  delay: 0.1  },
  { left: "19%", maxH: 110, duration: 1.0,  delay: 0.5  },
  { left: "24%", maxH: 70,  duration: 1.3,  delay: 0.2  },
  { left: "29%", maxH: 130, duration: 0.85, delay: 0.7  },
  { left: "34%", maxH: 55,  duration: 1.5,  delay: 0.15 },
  { left: "39%", maxH: 95,  duration: 1.1,  delay: 0.4  },
  { left: "44%", maxH: 75,  duration: 0.95, delay: 0.6  },
  { left: "49%", maxH: 120, duration: 1.2,  delay: 0.25 },
  { left: "54%", maxH: 65,  duration: 1.35, delay: 0.45 },
  { left: "59%", maxH: 100, duration: 0.9,  delay: 0.8  },
  { left: "64%", maxH: 80,  duration: 1.15, delay: 0.1  },
  { left: "69%", maxH: 115, duration: 1.0,  delay: 0.55 },
  { left: "74%", maxH: 60,  duration: 1.4,  delay: 0.35 },
  { left: "79%", maxH: 90,  duration: 0.95, delay: 0.65 },
  { left: "84%", maxH: 70,  duration: 1.25, delay: 0.2  },
  { left: "89%", maxH: 105, duration: 1.05, delay: 0.75 },
  { left: "94%", maxH: 55,  duration: 1.3,  delay: 0.05 },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const barsY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden bg-bg">
      <style>{`
        @keyframes barPulse {
          0%, 100% { transform: scaleY(0.25); }
          50%       { transform: scaleY(1); }
        }
      `}</style>

      {/* Frequency bars */}
      <motion.div
        style={{ y: barsY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {BARS.map((bar, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 0,
              left: bar.left,
              width: "4px",
              height: `${bar.maxH}px`,
              background: "var(--gold)",
              opacity: 0.18,
              transformOrigin: "bottom",
              borderRadius: "2px 2px 0 0",
              animation: `barPulse ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,169,103,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <div className="flex flex-col items-center gap-6 max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-px bg-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.25em]">
              Aurevon Labs
            </span>
            <div className="w-6 h-px bg-gold" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-text font-light"
            style={{
              fontSize: "clamp(3rem, 9vw, 8rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            Experience music
            <br />
            <span className="text-gold">as it was recorded.</span>
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "center" }}
            className="w-10 h-px bg-gold opacity-60"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-bg text-sm font-medium tracking-wide hover:bg-[--gold-muted] transition-colors duration-200"
            >
              Explore Collection
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2 8a.5.5 0 01.5-.5h9.793L9.146 4.354a.5.5 0 11.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L12.293 8.5H2.5A.5.5 0 012 8z" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-muted text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd /Users/abhoumic/Documents/agency/clients/aurevon/build
node_modules/.bin/tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Visual check**

Open `http://localhost:3002` (or `npm run dev` if not running). Verify:
- Frequency bars animate up and down at different speeds
- Headline stagger entrance plays on load
- Content fades as you scroll down
- Bars move at slower rate than page scroll (parallax)

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroSection.tsx
git commit -m "feat: rewrite hero with animated frequency bars and cinematic entrance"
```

---

## Task 2: Create FeaturedProductsSection

**Files:**
- Create: `components/sections/FeaturedProductsSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/FeaturedProductsSection.tsx
"use client";
import { motion } from "framer-motion";
import { getShopProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

const products = getShopProducts();

const VIEWPORT = { once: true, margin: "-80px" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function FeaturedProductsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <div className="w-8 h-px bg-gold" />
          <h2
            className="text-text font-light tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
          >
            The Collection
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no errors. If ProductCard path is wrong, check `components/product/ProductCard.tsx` vs `components/ui/ProductCard.tsx` — verify with `ls components/product/ components/ui/ 2>/dev/null`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/FeaturedProductsSection.tsx
git commit -m "feat: add FeaturedProductsSection with staggered card reveal"
```

---

## Task 3: Rewrite BrandStatement (Statement Banner)

**Files:**
- Modify: `components/sections/BrandStatement.tsx`

- [ ] **Step 1: Rewrite BrandStatement**

```tsx
// components/sections/BrandStatement.tsx
"use client";
import { motion } from "framer-motion";

const VIEWPORT = { once: true, margin: "-80px" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function BrandStatement() {
  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Gold rule — draws in from center */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ transformOrigin: "center" }}
          className="w-10 h-px bg-gold"
        />

        {/* Line 1 — slides from left */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-text font-light"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Every amplifier is{" "}
          <span className="text-gold">built by hand.</span>
        </motion.p>

        {/* Line 2 — slides from right */}
        <motion.p
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          className="text-text font-light"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Every component is{" "}
          <span className="text-gold">chosen with intent.</span>
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/sections/BrandStatement.tsx
git commit -m "feat: rewrite BrandStatement as cinematic split-line reveal"
```

---

## Task 4: Create AboutSection

**Files:**
- Create: `components/sections/AboutSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/AboutSection.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const VIEWPORT = { once: true, margin: "-80px" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function AboutSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text — slides from left */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.25em]">
              Our Story
            </span>
          </div>

          <h2
            className="text-text font-light"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Music deserves to be heard as it was created.
          </h2>

          <div className="flex flex-col gap-4 text-muted text-sm leading-relaxed max-w-md">
            <p>
              Aurevon was born from a single conviction: that the music reaching
              your ears should sound exactly as the artist intended it.
            </p>
            <p>
              Every amplifier we make is assembled by hand in Greater Noida.
              Every component — from the Burr-Brown pre-amplification stage to
              the toroidal transformer — is chosen not for cost, but for
              character.
            </p>
            <p>We build for people who can tell the difference.</p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-gold text-sm hover:opacity-70 transition-opacity w-fit"
          >
            Learn More
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2 8a.5.5 0 01.5-.5h9.793L9.146 4.354a.5.5 0 11.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L12.293 8.5H2.5A.5.5 0 012 8z" />
            </svg>
          </Link>
        </motion.div>

        {/* Image — slides from right */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="relative h-96 md:h-[500px] border border-[--border] overflow-hidden"
        >
          <Image
            src="/images/products/harmion/20260416-ABH_6863-Edit.jpg"
            alt="Aurevon amplifier craftsmanship"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/sections/AboutSection.tsx
git commit -m "feat: add AboutSection with two-column layout and slide reveal"
```

---

## Task 5: Create EarlyAccessSection

**Files:**
- Create: `components/sections/EarlyAccessSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/EarlyAccessSection.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Status = "idle" | "loading" | "success" | "error";

const VIEWPORT = { once: true, margin: "-80px" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EarlyAccessSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!isValidEmail(email)) {
      setErrorMsg("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      await addDoc(collection(db, "waitlist"), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-lg mx-auto bg-[--surface] border border-[--border] p-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-gold" />
          <span className="text-gold text-xs uppercase tracking-[0.25em]">
            Coming Soon
          </span>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="18"
                cy="18"
                r="17"
                stroke="var(--gold)"
                strokeWidth="1.5"
              />
              <path
                d="M11 18l5 5 9-9"
                stroke="var(--gold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-text text-center text-sm">
              You're on the list.
            </p>
          </div>
        ) : (
          <>
            <h2
              className="text-text font-light mb-2"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Be the first to know.
            </h2>
            <p className="text-muted text-sm mb-8 leading-relaxed">
              Get notified when HARMION and DYNAVION launch.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-bg border border-[--border] text-text text-sm placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                  disabled={status === "loading"}
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-gold text-bg text-sm font-medium tracking-wide hover:bg-[--gold-muted] transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  {status === "loading" ? "..." : "Notify Me"}
                </button>
              </div>
              {errorMsg && (
                <p className="text-red-400 text-xs mt-2" role="alert">
                  {errorMsg}
                </p>
              )}
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/sections/EarlyAccessSection.tsx
git commit -m "feat: add EarlyAccessSection with Firestore waitlist write"
```

---

## Task 6: Wire the Homepage

**Files:**
- Modify: `app/(public)/page.tsx`

- [ ] **Step 1: Replace page.tsx**

```tsx
// app/(public)/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import BrandStatement from "@/components/sections/BrandStatement";
import AboutSection from "@/components/sections/AboutSection";
import EarlyAccessSection from "@/components/sections/EarlyAccessSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProductsSection />
      <BrandStatement />
      <AboutSection />
      <EarlyAccessSection />
    </>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
node_modules/.bin/tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Full visual QA in browser**

Open `http://localhost:3002` and verify the following:

**Hero:**
- Frequency bars animate continuously (equalizer effect)
- Eyebrow, headline, rule, CTA stagger in on load
- Content fades as you scroll
- Scroll indicator bounces at bottom

**Featured Products:**
- "The Collection" heading animates in on scroll
- 3 product cards stagger in (left to right delay)
- Cards link to `/shop/harmion`, `/shop/dynavion`, `/shop/fidelion`

**Statement Banner:**
- Gold rule draws in from center
- Line 1 slides from left, Line 2 from right
- Both lines render in full with gold highlights

**About:**
- Text column slides from left, image from right
- Image shows the atmospheric amp photo
- "Learn More" link navigates to `/about`

**Early Access:**
- Card fades up on scroll
- Email validation shows error for invalid input
- Valid email submits, success state shows checkmark
- Check Firestore console for `waitlist` collection entry

- [ ] **Step 4: Final commit**

```bash
git add app/(public)/page.tsx
git commit -m "feat: wire homepage — hero + products + statement + about + early access"
```
