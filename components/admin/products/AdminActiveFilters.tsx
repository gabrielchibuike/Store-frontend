"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function AdminActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = searchParams.getAll("category");
  const brands = searchParams.getAll("brand");
  const colors = searchParams.getAll("colors");
  const sizes = searchParams.getAll("sizes");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const hasFilters =
    categories.length > 0 ||
    brands.length > 0 ||
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
    params.set("page", "1");
    router.push(`/admin/products?${params.toString()}`);
  };

  const removePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    params.set("page", "1");
    router.push(`/admin/products?${params.toString()}`);
  };

  const clearAll = () => {
    router.push("/admin/products");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {categories.map((cat) => (
        <Button
          key={`cat-${cat}`}
          variant="outline"
          size="sm"
          onClick={() => removeFilter("category", cat)}
          className="h-7 text-xs bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-red-500 group"
        >
          {cat}{" "}
          <X className="ml-1 h-3 w-3 text-gray-400 group-hover:text-red-500" />
        </Button>
      ))}

      {brands.map((brand) => (
        <Button
          key={`brand-${brand}`}
          variant="outline"
          size="sm"
          onClick={() => removeFilter("brand", brand)}
          className="h-7 text-xs bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-red-500 group"
        >
          {brand}{" "}
          <X className="ml-1 h-3 w-3 text-gray-400 group-hover:text-red-500" />
        </Button>
      ))}

      {colors.map((color) => (
        <Button
          key={`col-${color}`}
          variant="outline"
          size="sm"
          onClick={() => removeFilter("colors", color)}
          className="h-7 text-xs bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-red-500 group"
        >
          {color}{" "}
          <X className="ml-1 h-3 w-3 text-gray-400 group-hover:text-red-500" />
        </Button>
      ))}

      {sizes.map((size) => (
        <Button
          key={`size-${size}`}
          variant="outline"
          size="sm"
          onClick={() => removeFilter("sizes", size)}
          className="h-7 text-xs bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-red-500 group"
        >
          {size}{" "}
          <X className="ml-1 h-3 w-3 text-gray-400 group-hover:text-red-500" />
        </Button>
      ))}

      {(minPrice || maxPrice) && (
        <Button
          variant="outline"
          size="sm"
          onClick={removePriceFilter}
          className="h-7 text-xs bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-red-500 group"
        >
          ${minPrice || 0} - ${maxPrice || 500}{" "}
          <X className="ml-1 h-3 w-3 text-gray-400 group-hover:text-red-500" />
        </Button>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={clearAll}
        className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 font-medium uppercase"
      >
        Clear All <X className="ml-1 h-3 w-3" />
      </Button>
    </div>
  );
}
