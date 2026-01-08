import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { Hero } from "@/components/homepage/Hero";
import { Features } from "@/components/homepage/Features";
import { CategoryGrid } from "@/components/homepage/CategoryGrid";
import { ProductGrid } from "@/components/homepage/ProductGrid";
import { PromoBanner } from "@/components/homepage/PromoBanner";
import { DealsOfTheDay } from "@/components/homepage/DealsOfTheDay";
import { Testimonials } from "@/components/homepage/Testimonials";
import { BlogSection } from "@/components/homepage/BlogSection";
import { FAQ } from "@/components/homepage/FAQ";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <CategoryGrid />
        <ProductGrid />
        <PromoBanner />
        <DealsOfTheDay />
        <Testimonials />
        <BlogSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
