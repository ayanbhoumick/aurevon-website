// app/(public)/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import BrandStatement from "@/components/sections/BrandStatement";
import AboutSection from "@/components/sections/AboutSection";
import EarlyAccessSection from "@/components/sections/EarlyAccessSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <FeaturedProductsSection />
      <AboutSection />
      <EarlyAccessSection />
    </>
  );
}
