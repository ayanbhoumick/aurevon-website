"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/upcoming", label: "Upcoming" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 h-16 transition-colors duration-300"
        style={{
          background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: "1px solid rgba(201,169,103,0.18)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo/final_logo_1.jpg"
              alt="Aurevon"
              width={80}
              height={28}
              className="h-7 w-auto object-contain"
              preload
            />
            <span
              className="text-white/80 font-light hidden sm:block"
              style={{ fontSize: "13px", letterSpacing: "0.28em", textTransform: "uppercase" }}
            >
              Aurevon
            </span>
          </Link>

          {/* Desktop links — absolutely centered */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map(({ href, label }, i) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + i * 0.06 }}
                  >
                    <Link
                      href={href}
                      className={`relative text-xs tracking-widest uppercase transition-colors duration-200 pb-1 ${
                        active ? "text-gold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {label}
                      {active && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-gold" />
                      )}
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ul>

          {/* Right — mobile burger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col gap-[5px] p-1 text-white/60 hover:text-white transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-5 h-px bg-current"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block w-5 h-px bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-5 h-px bg-current"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed top-16 inset-x-0 z-40 md:hidden"
            style={{
              background: "rgba(10,10,10,0.95)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {links.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block py-3 text-sm tracking-widest uppercase transition-colors ${
                        active ? "text-gold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
