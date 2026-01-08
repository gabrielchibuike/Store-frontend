"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar } from "./FilterSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface MobileFiltersProps {
  total: number;
}

export function MobileFilters({ total }: MobileFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`/shop?${params.toString()}`);
  };

  const activeFilterCount = Array.from(searchParams.keys()).filter(
    (key) => key !== "page" && key !== "sort"
  ).length;

  return (
    <div className="flex items-center justify-between gap-4 py-4 md:hidden sticky top-[64px] bg-background border-b z-40 px-2 lg:px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-[90vh] p-0 overflow-hidden flex flex-col"
        >
          <SheetHeader className="p-6 border-b text-left shrink-0">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <FilterSidebar />
          </div>
          <div className="p-6 border-t bg-card shrink-0 flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/shop")}
            >
              Clear All
            </Button>
            <SheetTrigger asChild>
              <Button className="flex-1">Apply Filters</Button>
            </SheetTrigger>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2">
        <Select
          defaultValue={searchParams.get("sort") || "default"}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Sort by</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
