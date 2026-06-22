"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setFired(true), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">

        {/* Left conic ray */}
        <motion.div
          initial={{ opacity: 0.5, width: "min(15rem, 42vw)" }}
          animate={fired ? { opacity: 1, width: "min(30rem, 84vw)" } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, #06b6d4, transparent, transparent)",
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible"
        >
          <div className="absolute w-full left-0 h-40 bottom-0 z-20 bg-[#0a0a0a] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-1/3 h-full left-0 bottom-0 z-20 bg-[#0a0a0a] [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic ray */}
        <motion.div
          initial={{ opacity: 0.5, width: "min(15rem, 42vw)" }}
          animate={fired ? { opacity: 1, width: "min(30rem, 84vw)" } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, #06b6d4)",
          }}
          className="absolute inset-auto left-1/2 h-56"
        >
          <div className="absolute w-1/3 h-full right-0 bottom-0 z-20 bg-[#0a0a0a] [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 h-40 bottom-0 z-20 bg-[#0a0a0a] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Background blur cover */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#0a0a0a] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Glow orbs */}
        <div
          className="absolute inset-auto z-50 -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"
          style={{ width: "min(28rem, 80vw)", height: "9rem" }}
        />
        <motion.div
          initial={{ width: "min(8rem, 22vw)" }}
          animate={fired ? { width: "min(16rem, 44vw)" } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        />

        {/* Thin horizontal line */}
        <motion.div
          initial={{ width: "min(15rem, 42vw)" }}
          animate={fired ? { width: "min(30rem, 84vw)" } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-cyan-400"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#0a0a0a]" />
      </div>

      <div
        className="relative z-50 flex flex-col items-center px-5"
        style={{ transform: "translateY(clamp(-22rem, -30vh, -18rem))" }}
      >
        {children}
      </div>
    </div>
  );
};
