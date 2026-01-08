"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/lib/services/productService";
import { useStore } from "@/context/StoreContext";

export function AdminFilterSidebar({ products }: { products: Product[] }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { categories } = useStore();

  const [priceRange, setPriceRange] = useState([10, 500]);

  // Derive unique colors and sizes from products
  const availableColors = Array.from(
    new Set(products.flatMap((p) => p.color || []))
  ).filter(Boolean);

  const availableSizes = Array.from(
    new Set(products.flatMap((p) => p.size || []))
  ).filter(Boolean);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);

    if (current.includes(value)) {
      params.delete(key);
      current.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }

    // Reset page when filtering
    params.set("page", "1");

    router.push(`/admin/products?${params.toString()}`);
  };

  const updatePrice = (value: number[]) => {
    setPriceRange(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", value[0].toString());
    params.set("maxPrice", value[1].toString());
    params.set("page", "1");
    router.push(`/admin/products?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-6 bg-white p-4 rounded-lg shadow-sm border">
      <div>
        <h3 className="font-bold text-lg mb-4">Filters</h3>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "price", "color", "size"]}
        className="w-full"
      >
        <AccordionItem value="category" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {categories.map((cat) => {
                const count = products.filter(
                  (p) => p.product_category === cat.name
                ).length;
                return (
                  <div
                    key={cat._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={cat.name}
                        checked={searchParams
                          .getAll("category")
                          .includes(cat.name)}
                        onCheckedChange={() =>
                          updateFilter("category", cat.name)
                        }
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <label
                        htmlFor={cat.name}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {cat.name}
                      </label>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-1 pt-4 pb-2">
              <Slider
                // defaultValue={[10, 500]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                onValueCommit={updatePrice}
                className="mb-4"
              />
              <div className="flex justify-between items-center">
                <div className="bg-gray-100 rounded px-3 py-1 text-sm font-medium">
                  ${priceRange[0]}
                </div>
                <div className="bg-gray-100 rounded px-3 py-1 text-sm font-medium">
                  ${priceRange[1]}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {availableColors.length > 0 ? (
                availableColors.map((color) => (
                  <div
                    key={color}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color}`}
                        checked={searchParams.getAll("colors").includes(color)}
                        onCheckedChange={() => updateFilter("colors", color)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                        <label
                          htmlFor={`color-${color}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {color}
                        </label>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No colors available
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {availableSizes.length > 0 ? (
                availableSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={searchParams.getAll("sizes").includes(size)}
                      onCheckedChange={() => updateFilter("sizes", size)}
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {size}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No sizes available
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
