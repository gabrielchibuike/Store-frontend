import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 min-h-[600px] md:h-[600px]">
          {/* Women's Category - Tall Card */}
          <div className="relative group overflow-hidden rounded-2xl bg-muted h-[350px] sm:h-[450px] md:h-full transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
              alt="Women's Fashion"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 text-white w-full">
              <p className="mb-1 font-medium text-white/90 text-sm md:text-base uppercase tracking-wider">
                Hot List
              </p>
              <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                For Women's
              </h3>
              <Button variant="secondary" className="group" asChild>
                <Link href="/shop/women">
                  Shop Now{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8 h-full">
            {/* Men's Category */}
            <div className="relative group overflow-hidden rounded-2xl bg-muted h-[250px] sm:h-[300px] md:flex-1 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
              <Image
                src="https://images.unsplash.com/photo-1488161628813-24479cdc194c?q=80&w=1964&auto=format&fit=crop"
                alt="Men's Fashion"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 text-white w-full">
                <p className="mb-1 font-medium text-white/90 text-sm md:text-base uppercase tracking-wider">
                  New Collection
                </p>
                <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
                  For Men's
                </h3>
                <Button variant="secondary" size="sm" className="group" asChild>
                  <Link href="/shop/men">
                    Shop Now{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Accessories Category */}
            <div className="relative group overflow-hidden rounded-2xl bg-muted h-[250px] sm:h-[300px] md:flex-1 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"
                alt="Accessories"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 text-white w-full">
                <p className="mb-1 font-medium text-white/90 text-sm md:text-base uppercase tracking-wider">
                  Explore
                </p>
                <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
                  Accessories
                </h3>
                <Button variant="secondary" size="sm" className="group" asChild>
                  <Link href="/shop/accessories">
                    Shop Now{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
