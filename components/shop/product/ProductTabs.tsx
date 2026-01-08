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
    <Tabs defaultValue="description" className="w-full overflow-x-auto">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8">
        <TabsTrigger
          value="description"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 text-base"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="additional"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 text-base"
        >
          Additional Information
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 text-base"
        >
          Review
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="py-8 space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">100% Cotton fabric</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Machine wash cold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Regular fit</span>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="additional" className="py-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 border-b last:border-0">
            <div className="col-span-4 bg-muted/50 p-4 font-medium">
              Material
            </div>
            <div className="col-span-8 p-4">Cotton</div>
          </div>
          <div className="grid grid-cols-12 border-b last:border-0">
            <div className="col-span-4 bg-muted/50 p-4 font-medium">Size</div>
            <div className="col-span-8 p-4">
              {product.size ? product.size.join(", ") : "N/A"}
            </div>
          </div>
          <div className="grid grid-cols-12 border-b last:border-0">
            <div className="col-span-4 bg-muted/50 p-4 font-medium">Color</div>
            <div className="col-span-8 p-4">
              {product.color ? product.color.join(", ") : "N/A"}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-4 bg-muted/50 p-4 font-medium">Brand</div>
            <div className="col-span-8 p-4">Clothing Co.</div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="py-8">
        <ProductReviews productId={product._id} />
      </TabsContent>
    </Tabs>
  );
}
