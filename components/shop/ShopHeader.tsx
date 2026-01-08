"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function ShopHeader() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const gender = searchParams.get("gender");
  const subcategory = searchParams.get("subcategory");

  // Determine the display title
  const title = subcategory || category || gender || "Shop";

  return (
    <div className="bg-[#FDF8F5] py-8 md:py-12 mb-4 md:mb-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 capitalize">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <Link href="/shop" className="hover:text-primary">
            Shop
          </Link>

          {(gender || category) && (
            <>
              <ChevronRight className="h-4 w-4 shrink-0" />
              <Link
                href={`/shop?${
                  gender ? `gender=${gender}` : `category=${category}`
                }`}
                className="hover:text-primary capitalize"
              >
                {gender || category}
              </Link>
            </>
          )}

          {subcategory && (
            <>
              <ChevronRight className="h-4 w-4 shrink-0" />
              <span className="text-foreground font-medium capitalize truncate max-w-[150px]">
                {subcategory}
              </span>
            </>
          )}

          {!gender && !category && !subcategory && (
            <>
              <ChevronRight className="h-4 w-4 shrink-0" />
              <span className="text-foreground font-medium">All Products</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
