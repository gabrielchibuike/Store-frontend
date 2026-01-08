"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-16 bg-[#FDF8F5]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border">
          <div className="flex-1 space-y-4">
            <p className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
              Limited Time Offer
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              50% OFF with Fashion <br />
              <span className="text-primary">Favorites</span> - Limited Time!
            </h2>
            <p className="text-muted-foreground max-w-md">
              Don't miss out on our biggest sale of the season. Grab your
              favorites before they are gone.
            </p>
            <Button size="lg" className="mt-4">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            {/* Placeholder Image */}
            <div className="relative h-[300px] w-full md:w-[400px] bg-[#E5DDB0] rounded-2xl overflow-hidden flex items-center justify-center">
              <span className="text-2xl font-bold text-white/50">
                Promo Image
              </span>
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold px-4 py-2 rounded-full">
                -50%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
