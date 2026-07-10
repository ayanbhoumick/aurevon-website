import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import SpecsTable from "@/components/product/SpecsTable";
import AddToCartButton from "@/components/product/AddToCartButton";
import StockBadge from "@/components/ui/StockBadge";
import ProductCard from "@/components/product/ProductCard";
import { getProductBySlug, getShopProducts } from "@/data/products";
import { productSchema, breadcrumbSchema, safeJsonLd } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = getShopProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  return {
    title: `${product.name}: ${product.tagline}`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getShopProducts().filter((p) => p.slug !== product.slug);

  const ldJson = [
    productSchema(product),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Shop", url: "/shop" },
      { name: product.name },
    ]),
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(ldJson) }}
      />
      {/* Breadcrumb */}
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      {/* Product layout */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Info */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-muted text-xs uppercase tracking-widest">
                {product.specs["Model"]}
              </span>
              <span className="text-border">·</span>
              <span className="text-muted text-xs">{product.color}</span>
            </div>
            <h1
              className="text-text capitalize"
              style={{
                fontFamily: "'Spaceman', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              {product.name}
            </h1>
            <p className="text-gold text-sm">{product.tagline}</p>
          </div>

          <StockBadge price={product.price} stock={product.stock} />

          <p className="text-muted text-sm leading-relaxed">
            {product.description}
          </p>

          {product.price !== null && (
            <div className="flex items-baseline gap-2">
              <span className="text-text text-3xl font-light">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-muted text-xs">incl. taxes</span>
            </div>
          )}

          <AddToCartButton price={product.price} stock={product.stock} />

          <div className="text-muted text-xs leading-relaxed pt-2 flex flex-col gap-1.5">
            <span className="flex items-center gap-2">
              <BulletIcon />
              Handmade in Greater Noida, India
            </span>
            <span className="flex items-center gap-2">
              <BulletIcon />
              Ships within 7–10 business days of order confirmation
            </span>
            <span className="flex items-center gap-2">
              <BulletIcon />
              Questions? Chat on WhatsApp
            </span>
          </div>
        </div>
      </div>

      {/* Specs */}
      <SpecsTable specs={product.specs} />

      {/* Related */}
      {related.length > 0 && (
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-px bg-gold" />
            <h2 className="text-text text-2xl font-light tracking-tight">
              Also from Aurevon
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BulletIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5 shrink-0 text-gold"
      aria-hidden="true"
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22 11 13 2 9z" />
    </svg>
  );
}
