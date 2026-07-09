"use client";
import { motion } from "framer-motion";
import { getShopProducts } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

const products = getShopProducts();

const VIEWPORT = { once: true, margin: "-80px" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function FeaturedProductsSection() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <div className="w-8 h-px bg-gold" aria-hidden="true" />
          <h2
            className="text-text font-light"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
          >
            The Collection
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
              className="h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
