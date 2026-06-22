import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraHeroBgProps {
  className?: string;
  opacity?: number;
}

export function AuroraHeroBg({ className, opacity = 0.35 }: AuroraHeroBgProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      {/* Blurred animated gradient */}
      <div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
        <motion.div
          className="absolute inset-[-100%]"
          style={{
            background: `repeating-linear-gradient(100deg,
              #8b5cf6 10%,
              #3b82f6 15%,
              #ec4899 20%,
              #8b5cf6 25%,
              #3b82f6 30%)`,
            backgroundSize: "300% 100%",
            filter: "blur(80px)",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[-10px]"
          style={{
            background: `
              repeating-linear-gradient(100deg,
                rgba(139,92,246,0.1) 0%,
                rgba(139,92,246,0.1) 7%,
                transparent 10%,
                transparent 12%,
                rgba(139,92,246,0.1) 16%),
              repeating-linear-gradient(100deg,
                #8b5cf6 10%,
                #3b82f6 15%,
                #ec4899 20%,
                #8b5cf6 25%,
                #3b82f6 30%)`,
            backgroundSize: "200%, 100%",
            backgroundPosition: "50% 50%, 50% 50%",
            mixBlendMode: "difference" as const,
          }}
          animate={{
            backgroundPosition: [
              "50% 50%, 50% 50%",
              "100% 50%, 150% 50%",
              "50% 50%, 50% 50%",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Vignette — pulls edges back to bg */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
