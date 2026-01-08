"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/services/productService";

interface ProductGridProps {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  limit: number;
}

export function ProductGrid({
  products,
  totalProducts,
  currentPage,
  limit,
}: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalProducts / limit);
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalProducts);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/admin/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product._id}
            className="overflow-hidden group relative cursor-pointer hover:shadow-md transition-shadow py-0"
            onClick={() => router.push(`/admin/products/${product._id}`)}
          >
            <div
              className="absolute top-3 right-3 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox className="bg-white/80 backdrop-blur-sm border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
            </div>

            <div className="relative aspect-square bg-gray-100">
              {product.product_image && product.product_image.length > 0 ? (
                <Image
                  src={product.product_image[0]}
                  alt={product.product_name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs">
                  No Img
                </div>
              )}
              <div className="absolute top-3 left-3">
                <Badge
                  variant="secondary"
                  className={`${
                    product.status === "Available"
                      ? "bg-teal-100 text-teal-600 hover:bg-teal-100 border-teal-200"
                      : "bg-red-100 text-red-600 hover:bg-red-100 border-red-200"
                  } font-normal`}
                >
                  {product.status || "Unavailable"}
                </Badge>
              </div>
            </div>

            <CardContent className="p-2">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1 line-clamp-1">
                    CATEGORY: {product.product_category}
                  </p>
                  <h3
                    className="font-semibold text-foreground line-clamp-1"
                    title={product.product_name}
                  >
                    {product.product_name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">
                    {product.dateCreated
                      ? new Date(product.dateCreated).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <span className="font-bold text-foreground">
                    ${product.price}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t bg-white rounded-lg border shadow-sm">
        <div className="text-xs text-muted-foreground uppercase font-medium">
          Showing {totalProducts > 0 ? startItem : 0} of {totalProducts} results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </Button>

          {/* Render page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
            )
            .map((p, i, arr) => (
              <React.Fragment key={p}>
                {i > 0 && arr[i - 1] !== p - 1 && (
                  <span className="px-2">...</span>
                )}
                <Button
                  variant={p === currentPage ? "default" : "ghost"}
                  size="sm"
                  className={`h-8 w-8 p-0 ${
                    p === currentPage
                      ? "bg-secondary hover:bg-secondary/50"
                      : ""
                  }`}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </Button>
              </React.Fragment>
            ))}

          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
