import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import StockBadge from "@/components/ui/StockBadge";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const hasImage =
    product.images[0] && !product.images[0].includes("placeholder");

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col h-full bg-surface border border-border rounded-sm overflow-hidden hover:border-border-subtle transition-colors duration-300"
    >
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden bg-raised">
        {hasImage ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-border-subtle text-xs uppercase tracking-widest">
              Photo coming soon
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className="text-text text-sm tracking-widest capitalize group-hover:text-gold transition-colors duration-200"
              style={{ fontFamily: "'Spaceman', sans-serif", fontWeight: 400 }}
            >
              {product.name}
            </h3>
            <p className="text-muted text-xs mt-0.5 leading-relaxed line-clamp-2">
              {product.tagline}
            </p>
          </div>
          <span
            className="text-muted text-xs shrink-0 mt-0.5 capitalize"
            style={{ fontFamily: "'Spaceman', sans-serif", fontWeight: 400 }}
          >
            {product.specs["Model"]}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <StockBadge price={product.price} stock={product.stock} />
          {product.price !== null && (
            <span className="text-text text-sm font-medium">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
