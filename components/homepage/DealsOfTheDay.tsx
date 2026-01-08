"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const dealProducts = [
  {
    id: "5", // Mock ID
    title: "Satin Dress",
    price: 112.0,
    rating: 5,
    imageColor: "bg-[#F0F8FF]",
    tag: "HOT",
  },
  {
    id: "6", // Mock ID
    title: "Winter Full Coat",
    price: 155.0,
    rating: 5,
    imageColor: "bg-[#FFF0F5]",
    tag: "DEAL",
  },
];

export function DealsOfTheDay() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-primary font-medium mb-2">Daily Deals</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Deals of The Day
            </h2>
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" /> 24h : 15m : 30s
              </span>
              <span>Hurry up! Offer ends soon.</span>
            </div>
          </div>

          <Button variant="outline" className="hidden md:flex">
            View All Deals <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dealProducts.map((product, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-6 p-6 border rounded-2xl bg-card hover:shadow-lg transition-all relative group"
            >
              <Link
                href={`/shop/product/${product.id}`}
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">View {product.title}</span>
              </Link>

              <div
                className={`w-full sm:w-1/2 h-[250px] ${product.imageColor} rounded-xl flex items-center justify-center relative`}
              >
                <span className="font-bold text-muted-foreground/20">
                  Product
                </span>
                <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                  {product.tag}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground line-through text-sm">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor.
                </p>
                <Button className="w-full sm:w-auto relative z-20">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full">
            View All Deals <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
