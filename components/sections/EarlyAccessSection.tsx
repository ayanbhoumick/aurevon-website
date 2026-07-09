"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Status = "idle" | "loading" | "success" | "error";

const VIEWPORT = { once: true, margin: "0px" } as const;
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

    if (!isValidEmail(email) || email.length > 254) {
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
    <section className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-lg mx-auto bg-[--surface] border border-[--border] p-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-gold" aria-hidden="true" />
          <span className="text-gold text-xs uppercase tracking-[0.25em]">
            Coming Soon
          </span>
        </div>

        {status === "success" ? (
          <motion.div
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4 py-6"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              {/* Circle border draws in */}
              <motion.circle
                cx="24" cy="24" r="22"
                stroke="var(--gold)"
                strokeWidth="1.5"
                fill="none"
                pathLength={1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ rotate: -90, transformOrigin: "24px 24px" }}
              />
              {/* Gold fill sweeps in radially */}
              <motion.circle
                cx="24" cy="24" r="22"
                fill="var(--gold)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeInOut", delay: 0.5 }}
                style={{ transformOrigin: "24px 24px" }}
              />
              {/* White checkmark on gold */}
              <motion.path
                d="M14 24l7 7 13-13"
                stroke="#0a0a0a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                pathLength={1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.85 }}
              />
            </svg>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1, ease: EASE }}
              className="text-text text-center text-sm"
            >
              You&apos;re on the list.
            </motion.p>
          </motion.div>
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
                  maxLength={254}
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
