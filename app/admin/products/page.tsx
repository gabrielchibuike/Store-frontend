"use client";

import { ProductsMainContent } from "@/components/admin/products/ProductsMainContent";
import { Suspense } from "react";

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ProductsMainContent />
    </Suspense>
  );
}
