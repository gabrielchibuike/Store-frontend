"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getTopSellingProducts } from "@/lib/services/dashboardService";

const categories = ["All", "Women", "Men", "Accessories"];

export function ProductGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-selling-products", "week"],
    queryFn: () => getTopSellingProducts("week"),
  });

  const products = data || [];

  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <div className="text-left space-y-2">
            <p className="text-primary font-medium uppercase tracking-wider text-sm">
              Our Products
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Our Top Seller <br className="hidden sm:block" /> Products
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-5 md:px-8 h-10 md:h-12 text-sm md:text-base transition-all"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-muted animate-pulse rounded-2xl"
                />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  title={product.product_name}
                  price={
                    product.isDealActive ? product.dealPrice! : product.price
                  }
                  originalPrice={product.originalPrice}
                  discountPercentage={product.discountPercentage}
                  rating={product.rating as number}
                  imageColor="bg-gray-50"
                  category={product.product_category}
                  image={product.product_image?.[0]}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
