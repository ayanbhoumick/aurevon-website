import Link from "next/link";
import type { Product } from "@/data/products";

type Props = {
  products: Product[];
};

export default function UpcomingTeaser({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-px bg-gold" />
            <h2 className="text-text text-2xl font-light tracking-tight">
              Coming Next
            </h2>
          </div>
          <Link
            href="/upcoming"
            className="text-muted text-xs uppercase tracking-widest hover:text-gold transition-colors duration-200"
          >
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.slice(0, 2).map((product) => (
            <div
              key={product.id}
              className="bg-surface border border-border rounded-sm p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-text text-sm font-medium tracking-widest uppercase">
                    {product.name}
                  </h3>
                  <p className="text-muted text-xs mt-1 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>
                <span className="text-muted text-xs shrink-0">
                  {product.specs["Model"]}
                </span>
              </div>
              <span className="text-gold text-xs uppercase tracking-widest border border-gold/20 px-2.5 py-1 rounded-sm w-fit">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
