import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Aurevon. Handmade amplifiers built in Greater Noida to honour music in its truest form.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/about/BurrBrown.jpg"
          alt="Aurevon circuit board, handmade components"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
        <div className="absolute inset-0 flex items-end px-6 pb-10 max-w-7xl mx-auto">
          <div className="flex flex-col gap-1 max-w-xl">
            <span className="text-gold text-xs uppercase tracking-[0.2em]">
              About
            </span>
            <h1
              className="text-text font-light"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
            >
              Aurevon Labs
            </h1>
          </div>
        </div>
      </section>

      {/* Origin story */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Text */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="w-8 h-px bg-gold" />
              <h2 className="text-text text-2xl font-light tracking-tight">
                Built in Greater Noida, India
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-muted text-sm leading-relaxed max-w-prose">
              <p>
                Aurevon was founded with a single belief: that music deserves
                to be heard exactly as the artist intended it. Not compressed,
                not coloured, not compromised by mass-produced electronics
                optimised for margin rather than music.
              </p>
              <p>
                Every amplifier we build is assembled by hand in our workshop in
                Greater Noida, India. We select each component, the Burr-Brown ICs, the
                toroidal transformers, the precision capacitors, for what it
                contributes to sound, not for what it saves on cost.
              </p>
              <p>
                The result is an amplifier that doesn&apos;t just play music. It
                disappears. You stop hearing the system and start hearing the
                recording.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-bg text-sm font-medium tracking-wide hover:bg-gold-muted transition-colors duration-200 w-fit"
            >
              Shop the Collection
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M2 8a.5.5 0 01.5-.5h9.793L9.146 4.354a.5.5 0 11.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L12.293 8.5H2.5A.5.5 0 012 8z" />
              </svg>
            </Link>
          </div>

          {/* Craft photos */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { src: "/images/about/BurrBrown-1.jpg", alt: "Burr-Brown audio IC" },
              { src: "/images/about/TPA3118.jpg", alt: "TPA3118 amplifier chip" },
              { src: "/images/about/TPA3118-1.jpg", alt: "Amplifier components" },
              { src: "/images/about/Caps.jpg", alt: "Precision capacitors" },
            ].map(({ src, alt }) => (
              <div
                key={src}
                className="aspect-square relative overflow-hidden rounded-sm bg-raised border border-border"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy strip */}
      <section className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                label: "Handmade",
                text: "Every unit assembled by hand in our workshop. No assembly line.",
              },
              {
                label: "Audiophile Components",
                text: "Burr-Brown ICs, toroidal transformers, and precision passives.",
              },
              {
                label: "Greater Noida, India",
                text: "Designed, built, and tested in India. Shipped across the country.",
              },
            ].map(({ label, text }) => (
              <div key={label} className="flex flex-col gap-3">
                <div className="w-6 h-px bg-gold" />
                <h3 className="text-gold text-xs uppercase tracking-widest">
                  {label}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
