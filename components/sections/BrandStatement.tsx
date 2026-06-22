"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const LINE_STYLE = {
  fontSize: "clamp(1.8rem, 3.8vw, 4.06rem)",
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
};

export default function BrandStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <section className="relative overflow-hidden">
      <LampContainer>
        <div ref={ref} className="flex flex-col items-center gap-4 text-center px-6 max-w-5xl">
          {/* Gold rule */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ transformOrigin: "center" }}
            className="w-10 h-px bg-gold mb-2"
          />

          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.85, delay: 0.05, ease: EASE }}
              className="text-text font-light"
              style={LINE_STYLE}
            >
              Every amplifier is{" "}
              <span className="text-gold">built by hand</span>
            </motion.p>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
              className="text-text font-light"
              style={LINE_STYLE}
            >
              Every component is{" "}
              <span className="text-gold">chosen with intent</span>
            </motion.p>
          </div>
        </div>
      </LampContainer>
    </section>
  );
}
