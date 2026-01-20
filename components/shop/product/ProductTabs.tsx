"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/lib/services/productService";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ProductReviews } from "./ProductReviews";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <div className="border-b overflow-x-auto scrollbar-hide">
        <TabsList className="flex w-max md:w-full justify-start md:justify-center rounded-none h-auto p-0 bg-transparent gap-4 md:gap-12 px-4 md:px-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 text-xs md:text-base font-black uppercase tracking-widest transition-all"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 text-xs md:text-base font-black uppercase tracking-widest transition-all"
          >
            Additional Infos
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 text-xs md:text-base font-black uppercase tracking-widest transition-all"
          >
            Reviews ({product.reviews || 0})
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="description"
        className="py-8 md:py-12 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground leading-relaxed">
          {product.description}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-bold text-gray-700">
              Premium quality fabric
            </span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-bold text-gray-700">
              Sustainable materials
            </span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-bold text-gray-700">
              Durable construction
            </span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-bold text-gray-700">
              Comfortable fit
            </span>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="additional"
        className="py-8 md:py-12 animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Material", value: "100% Cotton" },
            {
              label: "Size",
              value: product.size ? product.size.join(", ") : "N/A",
            },
            {
              label: "Color",
              value: product.color ? product.color.join(", ") : "N/A",
            },
            { label: "Brand", value: "Clothing Co." },
            { label: "Weight", value: "250g" },
            { label: "ID", value: product._id },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 md:p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                {item.label}
              </span>
              <span className="text-sm font-bold text-gray-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="py-8">
        <ProductReviews productId={product._id} />
      </TabsContent>
    </Tabs>
  );
}
