"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const VIEWPORT = { once: true, margin: "0px" } as const;
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
            <div className="w-6 h-px bg-gold" aria-hidden="true" />
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
              Aurevon was born with the conviction that music should be heard
              the way the artist intended it to be heard, with no added colour.
            </p>
            <p>
              Each amplifier is hand made in our workshop in Greater Noida,
              India. Every component is carefully chosen for a purpose, be it
              the toroidal transformer, the extra large rectifier filters, the
              Burr Brown stage or the relay based speaker protection, not for
              cost, but for character.
            </p>
            <p>
              Production is meticulously slow. We build for listeners who can
              tell the difference.
            </p>
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
