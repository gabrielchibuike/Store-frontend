"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  return (
    <section className="relative bg-[#FDF8F5] overflow-hidden">
      {/* Decorative background elements that shouldn't cause horizontal scroll */}
      <div className="absolute -z-10 top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute -z-10 bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-28 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/* Text Content */}
        <div className="flex-1 space-y-6 md:space-y-8 z-10 text-center md:text-left">
          <div className="inline-block rounded-full bg-[#E5DDB0] px-4 py-1.5 text-xs md:text-sm font-semibold text-[#8B7355] uppercase tracking-wider">
            UPTO 60% OFF Summer Collection
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Step into Style: Your <br className="hidden lg:block" />
            <span className="text-primary italic">Ultimate Fashion</span>{" "}
            Destination
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed">
            Explore our latest collection designed to elevate your look. From
            casual chic to elegant evening wear, we have everything you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto md:h-14 group"
              onClick={() => {
                router.push("/shop");
              }}
            >
              Shop Now{" "}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            {/* <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto md:h-14">
              View Collection
            </Button> */}
          </div>

          {/* Stats/Trust Indicators */}
          <div className="pt-8 flex flex-wrap justify-center md:justify-start gap-8 lg:gap-12 border-t border-border/50">
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-bold">20k+</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                Happy Customers
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-bold">2k+</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                Premium Products
              </p>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 relative w-full max-w-[500px] md:max-w-none">
          <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-muted shadow-2xl skew-y-1 md:skew-y-0 hover:skew-y-0 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
              alt="Summer Collection"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Floating Badge */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/90 backdrop-blur-sm p-3 md:p-5 rounded-full shadow-xl animate-bounce duration-[3000ms] border border-primary/10">
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                  Best
                </p>
                <p className="text-base md:text-xl font-black text-primary leading-none">
                  Seller
                </p>
              </div>
            </div>
          </div>

          {/* Decorative overlap shadow */}
          <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-24 md:w-40 h-24 md:h-40 bg-primary/20 rounded-full blur-2xl z-[-1]" />
        </div>
      </div>
    </section>
  );
}
