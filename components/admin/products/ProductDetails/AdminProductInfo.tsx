"use client";

import { Badge } from "@/components/ui/badge";

import { Product } from "@/lib/services/productService";

interface AdminProductInfoProps {
  product: Product;
}

export function AdminProductInfo({ product }: AdminProductInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {product.product_name}
        </h1>
        <p className="text-xs text-muted-foreground mt-1 uppercase">
          PRODUCT ID: {product._id}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase">
          Product Short Description
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {product.description || "No description available."}
        </p>
      </div>

      <div className="pt-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
          Colors :
        </h3>
        <div className="flex gap-3 flex-wrap">
          {product.color && product.color.length > 0 ? (
            product.color.map((c, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-md cursor-pointer ring-1 ring-offset-1 ring-gray-200"
                style={{ backgroundColor: c }}
                title={c}
              ></div>
            ))
          ) : (
            <span className="text-sm text-gray-500">No colors specified</span>
          )}
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
          Sizes :
        </h3>
        <div className="flex gap-3 flex-wrap">
          {product.size && product.size.length > 0 ? (
            product.size.map((s, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-teal-700 border-teal-100 bg-teal-50 hover:bg-teal-100 rounded-md px-3 py-1 text-sm font-normal"
              >
                {s}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-gray-500">No sizes specified</span>
          )}
        </div>
      </div>
    </div>
  );
}
