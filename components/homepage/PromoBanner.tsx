"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function PromoBanner() {
  return (
    <section className="py-12 md:py-24 bg-[#FDF8F5]">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 bg-white p-6 sm:p-10 md:p-16 lg:p-20 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-primary/5 overflow-hidden group">
          {/* Decorative background circle */}
          <div className="absolute -top-10 -right-10 w-40 md:w-64 h-40 md:h-64 bg-primary/5 rounded-full blur-3xl transition-transform group-hover:scale-110 duration-700" />

          <div className="flex-1 space-y-6 md:space-y-8 z-10 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-xs md:text-sm font-black tracking-[0.2em] text-primary/60 uppercase">
                Limited Time Offer
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-foreground">
                50% OFF with <br className="hidden lg:block" />
                <span className="text-primary italic">Fashion Favorites</span>
              </h2>
            </div>
            <p className="text-sm md:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 leading-relaxed">
              Don't miss out on our biggest sale of the season. Grab your
              favorites before they are gone forever.
            </p>
            <Button
              size="lg"
              className="h-12 md:h-14 px-8 md:px-10 text-base md:text-lg group"
            >
              Shop Now{" "}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="flex-1 w-full max-w-[500px] md:max-w-none relative">
            <div className="relative aspect-video sm:aspect-square md:aspect-[4/3] w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl group-hover:rotate-1 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
                alt="Promo Sale"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-destructive text-destructive-foreground font-black px-4 py-2 md:px-6 md:py-3 rounded-full z-10 shadow-xl text-lg md:text-2xl animate-pulse">
                -50%
              </div>
            </div>

            {/* Background accent */}
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#E5DDB0]/20 rounded-2xl md:rounded-[2rem] z-[-1] -rotate-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
