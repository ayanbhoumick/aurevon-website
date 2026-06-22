"use client";
import { motion } from "framer-motion";

interface EtherealShadowProps {
  color?: string;
  speed?: number;
  intensity?: number;
  className?: string;
}

export default function EtherealShadow({
  color = "rgba(90,65,18,1)",
  speed = 1,
  intensity = 0.8,
  className = "",
}: EtherealShadowProps) {
  // Extract RGB from rgba() string, inject custom opacity
  const rgb = color.match(/[\d.]+,\s*[\d.]+,\s*[\d.]+/)?.[0] ?? "90,65,18";
  const hi = `rgba(${rgb},${intensity})`;
  const lo = `rgba(${rgb},${(intensity * 0.45).toFixed(2)})`;

  const dur = (base: number) => base / speed;

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Blob A — large, slow drift */}
      <motion.div
        animate={{
          x: [0, 80, -50, 30, 0],
          y: [0, -50, 40, -20, 0],
          scale: [1, 1.2, 0.88, 1.05, 1],
        }}
        transition={{ duration: dur(22), repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: "-40%",
          background: `radial-gradient(ellipse 52% 48% at 54% 52%, ${hi} 0%, transparent 68%)`,
          filter: "blur(48px)",
        }}
      />

      {/* Blob B — smaller, faster counter-drift */}
      <motion.div
        animate={{
          x: [0, -60, 40, -20, 0],
          y: [0, 40, -60, 30, 0],
          scale: [1, 0.85, 1.15, 0.95, 1],
        }}
        transition={{
          duration: dur(28),
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{
          position: "absolute",
          inset: "-40%",
          background: `radial-gradient(ellipse 44% 40% at 46% 50%, ${lo} 0%, transparent 65%)`,
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
