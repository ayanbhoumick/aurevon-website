"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let ticking = false;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY));

      if (!ticking) {
        ticking = true;
        gsap.ticker.add(tick);
      }
    }

    function tick() {
      currentY += (targetY - currentY) * 0.1;

      if (Math.abs(targetY - currentY) < 0.5) {
        currentY = targetY;
        ticking = false;
        gsap.ticker.remove(tick);
      }

      window.scrollTo(0, currentY);
    }

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      gsap.ticker.remove(tick);
    };
  }, []);

  return <>{children}</>;
}
