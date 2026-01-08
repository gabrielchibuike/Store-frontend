"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = searchParams.getAll("category");
  const colors = searchParams.getAll("colors");
  const sizes = searchParams.getAll("sizes");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const hasFilters =
    categories.length > 0 ||
    colors.length > 0 ||
    sizes.length > 0 ||
    minPrice ||
    maxPrice;

  if (!hasFilters) return null;

  const removeFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    params.delete(key);
    current.filter((v) => v !== value).forEach((v) => params.append(key, v));
    router.push(`/shop?${params.toString()}`);
  };

  const removePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    router.push(`/shop?${params.toString()}`);
  };

  const clearAll = () => {
    router.push("/shop");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-medium mr-2">Active Filters:</span>

      {categories.map((cat) => (
        <Button
          key={`cat-${cat}`}
          variant="secondary"
          size="sm"
          onClick={() => removeFilter("category", cat)}
          className="h-7 text-xs"
        >
          {cat} <X className="ml-1 h-3 w-3" />
        </Button>
      ))}

      {colors.map((color) => (
        <Button
          key={`col-${color}`}
          variant="secondary"
          size="sm"
          onClick={() => removeFilter("colors", color)}
          className="h-7 text-xs"
        >
          {color} <X className="ml-1 h-3 w-3" />
        </Button>
      ))}

      {sizes.map((size) => (
        <Button
          key={`size-${size}`}
          variant="secondary"
          size="sm"
          onClick={() => removeFilter("sizes", size)}
          className="h-7 text-xs"
        >
          {size} <X className="ml-1 h-3 w-3" />
        </Button>
      ))}

      {(minPrice || maxPrice) && (
        <Button
          variant="secondary"
          size="sm"
          onClick={removePriceFilter}
          className="h-7 text-xs"
        >
          Price: ${minPrice || 0} - ${maxPrice || 500}{" "}
          <X className="ml-1 h-3 w-3" />
        </Button>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={clearAll}
        className="h-7 text-xs text-muted-foreground hover:text-destructive"
      >
        Clear All
      </Button>
    </div>
  );
}
