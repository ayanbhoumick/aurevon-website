import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import { getUpcomingProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Upcoming",
  description:
    "Aurevon amplifiers in development. Be the first to know when they launch.",
};

export default function UpcomingPage() {
  const upcoming = getUpcomingProducts();

  return (
    <>
      <PageHeader
        title="Coming Next"
        subtitle="New amplifiers in development. More details announced soon."
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        {upcoming.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center gap-6">
            <p className="text-muted text-sm">
              No upcoming products announced yet. Follow us on Instagram for
              updates.
            </p>
            <a
              href="https://www.instagram.com/aurevonlabs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-xs uppercase tracking-widest hover:text-gold-muted transition-colors duration-200"
            >
              @aurevonlabs →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((product) => (
              <div
                key={product.id}
                className="bg-surface border border-border rounded-sm p-6 flex flex-col gap-5"
              >
                {/* Placeholder image area */}
                <div className="aspect-[4/3] bg-raised rounded-sm flex items-center justify-center border border-border">
                  <span className="text-border-subtle text-xs uppercase tracking-widest">
                    Photo coming soon
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-text text-sm font-medium tracking-widest uppercase">
                      {product.name}
                    </h3>
                    <span className="text-muted text-xs">
                      {product.specs["Model"]}
                    </span>
                  </div>
                  <p className="text-muted text-xs leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                <span className="text-gold text-xs uppercase tracking-widest border border-gold/20 px-2.5 py-1 rounded-sm w-fit">
                  Coming Soon
                </span>

                <Link
                  href="/contact"
                  className="text-muted text-xs hover:text-gold transition-colors duration-200"
                >
                  Notify me when available →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
