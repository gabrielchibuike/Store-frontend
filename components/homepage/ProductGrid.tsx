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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <p className="text-primary font-medium mb-2">Our Products</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Top Seller Products
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-6"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product.productId}
              title={product.name}
              price={product.price}
              rating={0} // Default rating if missing
              imageColor="bg-muted" // Default placeholder color
              category="Top Seller"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
