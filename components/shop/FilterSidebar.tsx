"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getNavigationMenu } from "@/lib/services/storeConfig";

const COLORS = [
  { name: "Black", class: "bg-black" },
  { name: "Grey", class: "bg-gray-500" },
  { name: "Green", class: "bg-green-500" },
  { name: "Red", class: "bg-red-500" },
  { name: "Orange", class: "bg-orange-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Pink", class: "bg-pink-500" },
  { name: "White", class: "bg-white border" },
];
const SIZES = ["S", "M", "L", "XL", "XXL"];

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: navigationMenu } = useQuery({
    queryKey: ["navigation-menu"],
    queryFn: () => getNavigationMenu(),
    select: (data) => data.data,
  });

  const [priceRange, setPriceRange] = useState([20, 150]);
  const [categories, setCategories] = useState<string[]>([]);

  // Dynamic Category Logic
  const selectedCategory = searchParams.get("category");
  const selectedGender = searchParams.get("gender");

  useEffect(() => {
    if (!navigationMenu) return;

    if (selectedCategory && selectedGender) {
      const menu = navigationMenu.find((m: any) => m.gender === selectedGender);
      if (menu) {
        const section = menu.sections.find(
          (s: any) => s.title === selectedCategory
        );
        if (section) {
          setCategories(section.items.map((item: any) => item.name));
          return;
        }
      }
    }

    // Default to showing genders
    // setCategories(navigationMenu.map((m: any) => m.gender));
  }, [navigationMenu, selectedCategory, selectedGender]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);

    console.log(current, "current");

    if (current.includes(value)) {
      params.delete(key);
      current.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }

    // Reset page when filtering
    params.set("page", "1");

    router.push(`/shop?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updatePrice = (value: number[]) => {
    setPriceRange(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", value[0].toString());
    params.set("maxPrice", value[1].toString());
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    router.push("/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasFilters = searchParams.toString().length > 0;

  // Determine which param to check against for the "Category" accordion
  // If we are in a specific section, we are filtering by 'subcategory'
  // If we are at root, we are filtering by 'category'
  const categoryParamKey =
    selectedCategory && selectedGender ? "subcategory" : "category";

  return (
    <div className="w-full md:w-64 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Filter Options</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs h-8 text-muted-foreground hover:text-primary"
          >
            Clear All
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "price", "color", "size"]}
        className="w-full"
      >
        {categories.length > 0 && (
          <AccordionItem value="category">
            <AccordionTrigger>SubCategory</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={searchParams
                        .getAll(categoryParamKey)
                        .includes(category)}
                      onCheckedChange={() =>
                        updateFilter(categoryParamKey, category)
                      }
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="px-2 pt-4">
              <Slider
                defaultValue={[20, 150]}
                max={500}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                onValueCommit={updatePrice}
                className="mb-4"
              />
              <div className="flex justify-between text-sm font-medium">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {COLORS.map((color) => (
                <div key={color.name} className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      color.class
                    } cursor-pointer ring-offset-1 ${
                      searchParams.getAll("colors").includes(color.name)
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => updateFilter("colors", color.name)}
                  />
                  <span className="text-sm">{color.name}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {SIZES.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={searchParams.getAll("sizes").includes(size)}
                    onCheckedChange={() => updateFilter("sizes", size)}
                  />
                  <label
                    htmlFor={`size-${size}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
