"use client";

import React, { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { AdminFilterSidebar } from "./AdminFilterSidebar";
import { ProductTable } from "./ProductTable";
import { ProductGrid } from "./ProductGrid";
import { AdminActiveFilters } from "./AdminActiveFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, List } from "lucide-react";
import AdminHeader from "../AdminHeader";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts, Product } from "@/lib/services/productService";
import { useRouter, useSearchParams } from "next/navigation";

export function ProductsMainContent() {
  const { state } = useSidebar();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract filters from URL
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const category = searchParams.getAll("category");
  const subcategory = searchParams.getAll("subcategory");
  const minPrice = searchParams.get("minPrice")
    ? parseFloat(searchParams.get("minPrice")!)
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? parseFloat(searchParams.get("maxPrice")!)
    : undefined;
  const colors = searchParams.getAll("colors");
  const sizes = searchParams.getAll("sizes");
  const sort = searchParams.get("sort") || "newest";

  const { data: allProducts, isLoading } = useQuery({
    queryKey: [
      "products",
      {
        page,
        limit,
        search,
        category,
        subcategory,
        minPrice,
        maxPrice,
        colors,
        sizes,
        sort,
      },
    ],
    queryFn: () =>
      getProducts({
        page,
        limit,
        search,
        category,
        subcategory,
        minPrice,
        maxPrice,
        colors,
        sizes,
        sort,
      }),
    select: (response) => response.data,
  });

  useEffect(() => {
    console.log("Waiting for data");

    if (allProducts) {
      setProducts(allProducts?.products);
    }
  }, [allProducts]);

  const totalProducts = allProducts?.total || 0;

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to page 1 on search
    router.replace(`/admin/products?${params.toString()}`);
  };

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen bg-background transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      {/* Top Header */}
      <AdminHeader title="Products List" />

      <div className="p-6 flex gap-6">
        {/* Left Sidebar - Filters */}
        <aside className="w-64 shrink-0 hidden md:block">
          <AdminFilterSidebar products={products} />
        </aside>

        {/* Main Content - Product List */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Actions Bar */}
          <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Product ..."
                className="pl-9 bg-gray-50 border-gray-200"
                defaultValue={search}
                onChange={(e) => {
                  const value = e.target.value;
                  // Simple debounce
                  const timeoutId = setTimeout(() => handleSearch(value), 500);
                  return () => clearTimeout(timeoutId);
                }}
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Link href="/admin/products/create">
                <Button className="bg-primary hover:bg-primary/90  cursor-pointer">
                  Add Product
                </Button>
              </Link>
            </div>
          </div>

          {/* Active Filters */}
          <AdminActiveFilters />

          {/* Tabs & View Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button className="text-secondary border-b-2 border-secondary pb-1 px-1">
                ALL PRODUCTS{" "}
                <span className="ml-1 text-xs bg-secondary text-white px-1.5 py-0.5 rounded-full">
                  {totalProducts}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-md border p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-8 w-8 p-0 hover:bg-gray-100 ${
                  viewMode === "grid" ? "bg-gray-100" : ""
                }`}
              >
                <LayoutGrid
                  className={`h-4 w-4 ${
                    viewMode === "grid" ? "text-secondary" : "text-gray-500"
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 w-8 p-0 hover:bg-gray-100 ${
                  viewMode === "list" ? "bg-gray-100" : ""
                }`}
              >
                <List
                  className={`h-4 w-4 ${
                    viewMode === "list" ? "text-secondary" : "text-gray-500"
                  }`}
                />
              </Button>
            </div>
          </div>

          {/* Product Display */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading products...</p>
            </div>
          ) : viewMode === "list" ? (
            <ProductTable
              products={products}
              totalProducts={totalProducts}
              currentPage={page}
              limit={limit}
            />
          ) : (
            <ProductGrid
              products={products}
              totalProducts={totalProducts}
              currentPage={page}
              limit={limit}
            />
          )}
        </div>
      </div>
    </main>
  );
}
