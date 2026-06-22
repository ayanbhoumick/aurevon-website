import type { Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

type Props = {
  products: Product[];
  columns?: 2 | 3;
};

export default function ProductGrid({ products, columns = 3 }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted text-sm">No products available.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        columns === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
