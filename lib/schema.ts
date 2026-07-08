import type { Product } from "@/data/products";

const BASE_URL = "https://aurevonlabs.com";

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aurevon",
    url: BASE_URL,
    description:
      "Handmade amplifiers from Greater Noida, India. Built to honour music in its truest form.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greater Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    sameAs: ["https://www.instagram.com/aurevonlabs/"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aurevon",
    url: BASE_URL,
  };
}

export function productSchema(product: Product) {
  const url = `${BASE_URL}/shop/${product.slug}`;
  const offerAvailability =
    product.stock === 0
      ? "https://schema.org/SoldOut"
      : "https://schema.org/InStock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image:
      product.images[0] && !product.images[0].includes("placeholder")
        ? `${BASE_URL}${product.images[0]}`
        : undefined,
    brand: {
      "@type": "Brand",
      name: "Aurevon",
    },
    offers:
      product.price !== null
        ? {
            "@type": "Offer",
            url,
            priceCurrency: "INR",
            price: product.price,
            availability: offerAvailability,
          }
        : {
            "@type": "Offer",
            url,
            priceCurrency: "INR",
            availability: "https://schema.org/PreOrder",
          },
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; url?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.url ? { item: `${BASE_URL}${crumb.url}` } : {}),
    })),
  };
}
