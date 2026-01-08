"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/lib/services/productService";

interface ProductTableProps {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  limit: number;
}

export function ProductTable({
  products,
  totalProducts,
  currentPage,
  limit,
}: ProductTableProps) {
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
    <div className="bg-white rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-accent hover:bg-accent/50">
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>PRODUCT</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>SOLD</TableHead>
            <TableHead>TOTAL EARNING</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={index}
              className="text-muted-foreground cursor-pointer hover:bg-gray-50"
              onClick={() => router.push(`/admin/products/${product._id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 relative shrink-0">
                    {product.product_image &&
                    product.product_image.length > 0 ? (
                      <Image
                        src={product.product_image[0]}
                        alt={product.product_name}
                        className="object-cover"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-gray-900">
                      {product.product_name}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase">
                      CATEGORY: {product.product_category}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium ">${product.price}</TableCell>
              <TableCell></TableCell>
              <TableCell className="text-gray-600">
                {product.sold || 0} pcs
              </TableCell>
              <TableCell className="font-medium">
                ${(product.earnings || 0).toLocaleString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit product</DropdownMenuItem>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
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
