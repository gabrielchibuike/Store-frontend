import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CategoryGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[600px]">
          {/* Women's Category - Tall Card */}
          <div className="relative group overflow-hidden rounded-2xl bg-muted h-[400px] md:h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            {/* Placeholder Image */}
            <div className="absolute inset-0 bg-[#F3E5DC] flex items-center justify-center">
              <span className="text-4xl font-bold text-muted-foreground/20">
                Women's Image
              </span>
            </div>

            <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
              <p className="mb-2 font-medium text-white/80">Hot List</p>
              <h3 className="text-3xl font-bold mb-4">For Women's</h3>
              <Button variant="secondary" asChild>
                <Link href="/shop/women">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-8 h-full">
            {/* Men's Category */}
            <div className="relative group overflow-hidden rounded-2xl bg-muted flex-1">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              {/* Placeholder Image */}
              <div className="absolute inset-0 bg-[#E5E5E5] flex items-center justify-center">
                <span className="text-3xl font-bold text-muted-foreground/20">
                  Men's Image
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
                <p className="mb-2 font-medium text-white/80">New Collection</p>
                <h3 className="text-2xl font-bold mb-4">For Men's</h3>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/shop/men">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Accessories Category */}
            <div className="relative group overflow-hidden rounded-2xl bg-muted flex-1">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              {/* Placeholder Image */}
              <div className="absolute inset-0 bg-[#D4C4A8] flex items-center justify-center">
                <span className="text-3xl font-bold text-muted-foreground/20">
                  Accessories Image
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
                <p className="mb-2 font-medium text-white/80">Explore</p>
                <h3 className="text-2xl font-bold mb-4">Accessories</h3>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/shop/accessories">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
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
