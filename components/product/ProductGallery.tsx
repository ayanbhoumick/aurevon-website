"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  images: string[];
  productName: string;
};

export default function ProductGallery({ images, productName }: Props) {
  const validImages = images.filter((src) => !src.includes("placeholder"));
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (validImages.length === 0) {
    return (
      <div className="aspect-square bg-raised border border-border rounded-sm flex items-center justify-center">
        <span className="text-muted text-xs uppercase tracking-widest">
          Photos coming soon
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <button
        onClick={() => setLightbox(true)}
        className="relative aspect-square overflow-hidden bg-raised rounded-sm border border-border group cursor-zoom-in"
        aria-label="Expand image"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={validImages[active]}
              alt={`${productName} , view ${active + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {validImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 shrink-0 rounded-sm overflow-hidden border transition-colors duration-200 ${
                active === i ? "border-gold" : "border-border hover:border-border-subtle"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-50 bg-bg/95 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <div className="relative w-full max-w-3xl aspect-square">
              <Image
                src={validImages[active]}
                alt={`${productName} , full view`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
