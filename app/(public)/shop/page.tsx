import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import ProductGrid from "@/components/sections/ProductGrid";
import { getShopProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the Aurevon amplifier collection. Handmade in Greater Noida.",
};

export default function ShopPage() {
  const products = getShopProducts();

  return (
    <>
      <PageHeader
        title="Shop"
        subtitle="Handmade amplifiers, built to order in Greater Noida."
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
