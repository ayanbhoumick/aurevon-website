"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { AuroraHeroBg } from "@/components/ui/AuroraHeroBg";
import ShinyText from "@/components/ui/ShinyText";
import StarBorder from "@/components/ui/StarBorder";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentPointerEvents = useTransform(
    scrollYProgress,
    [0.6, 0.61],
    ["auto", "none"]
  );

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden bg-[#0a0a0a]">
      <AuroraHeroBg opacity={0.45} />

      <motion.div
        style={{ opacity: contentOpacity, pointerEvents: contentPointerEvents }}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
          <div className="flex flex-col items-center gap-5 max-w-2xl text-center px-4">
            {/* Main headline — split reveal */}
            <h1
              className="font-thin"
              style={{
                fontFamily: "'Tasa Orbiter', sans-serif",
                fontSize: "clamp(2.8rem, 10vw, 9rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
              }}
            >
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <ShinyText text="Aurevon" color="#a8a8a8" shineColor="#ffffff" speed={2.5} delay={1.5} spread={40} />
                </motion.span>
              </span>
              {" "}
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <ShinyText text="Labs" color="#a8a8a8" shineColor="#ffffff" speed={2.5} delay={1.5} spread={40} />
                </motion.span>
              </span>
            </h1>

            {/* Secondary — brand line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-muted font-light"
              style={{
                fontSize: "clamp(0.95rem, 3.5vw, 1.4rem)",
                letterSpacing: "0.01em",
                lineHeight: 1.4,
              }}
            >
              Experience music as it was recorded.
            </motion.p>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: "center" }}
              className="w-10 h-px bg-gold opacity-60"
              aria-hidden="true"
            />

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <StarBorder color="#c9a967" speed="4s" thickness={1}>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-bg text-sm font-medium tracking-wide hover:bg-[--gold-muted] transition-colors duration-200"
                >
                  Explore Collection
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M2 8a.5.5 0 01.5-.5h9.793L9.146 4.354a.5.5 0 11.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L12.293 8.5H2.5A.5.5 0 012 8z" />
                  </svg>
                </Link>
              </StarBorder>
            </motion.div>
          </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-muted text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none z-20" />
    </section>
  );
}
