"use client";

import { Product } from "@/lib/services/productService";

interface AdminProductAdditionalInfoProps {
  product: Product;
}

export function AdminProductAdditionalInfo({
  product,
}: AdminProductAdditionalInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-4">
        Additional Information
      </h3>

      <div className="bg-gray-50/50 rounded-lg border overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b last:border-0">
          <div className="p-4 text-xs font-bold text-gray-500 uppercase bg-gray-50 flex items-center">
            Product
          </div>
          <div className="p-4 text-sm text-gray-600 bg-white">
            {product.product_name}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b last:border-0">
          <div className="p-4 text-xs font-bold text-gray-500 uppercase bg-gray-50 flex items-center">
            Item Details
          </div>
          <div className="p-4 text-sm text-gray-600 bg-white">
            {product.description}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b last:border-0">
          <div className="p-4 text-xs font-bold text-gray-500 uppercase bg-gray-50 flex items-center">
            Additional Info
          </div>
          <div className="p-4 text-sm text-gray-600 bg-white">
            {product.additionalInfo || "No additional information provided."}
          </div>
        </div>
      </div>
    </div>
  );
}
