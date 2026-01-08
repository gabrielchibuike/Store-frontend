"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative bg-[#FDF8F5] overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="flex-1 space-y-8 md:pr-12 z-10">
          <div className="inline-block rounded-full bg-[#E5DDB0] px-4 py-1.5 text-sm font-semibold text-[#8B7355]">
            UPTO 60% OFF Summer Collection
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Step into Style: Your <br className="hidden lg:block" />
            <span className="text-primary">Ultimate Fashion</span> Destination
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Explore our latest collection designed to elevate your look. From
            casual chic to elegant evening wear, we have everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8 py-6">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              View Collection
            </Button>
          </div>

          {/* Stats/Trust Indicators */}
          <div className="pt-8 flex gap-8 border-t border-border/50">
            <div>
              <p className="text-3xl font-bold">20k+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2k+</p>
              <p className="text-sm text-muted-foreground">Premium Products</p>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 relative mt- md:mt-0">
          <div className="relative h-[20px] md:h-[600px] w-full rounded-3xl overflow-hidden bg-muted">
            {/* Placeholder for Hero Image - In a real app, use next/image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E5DDB0] to-[#D4C4A8] flex items-center justify-center">
              <span className="text-4xl font-bold text-white opacity-50">
                Hero Image
              </span>
            </div>

            {/* Floating Badge */}
            <div className="absolute top-8 right-8 bg-white p-4 rounded-full shadow-lg animate-bounce duration-[3000ms]">
              <div className="text-center">
                <p className="text-xs font-bold text-muted-foreground">Best</p>
                <p className="text-lg font-bold text-primary">Seller</p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 top-1/2 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
