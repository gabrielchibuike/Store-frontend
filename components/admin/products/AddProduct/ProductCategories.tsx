"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { useStore } from "@/context/StoreContext";

export function ProductCategories() {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const availableTags = [
    "FURNITURE",
    "ELECTRONICS",
    "CLOTHING",
    "ACCESSORIES",
    "SHOES",
  ];

  const { categories } = useStore();

  const selectedCategoryName = watch("category");
  const selectedGender = watch("gender");

  const selectedCategory = categories.find(
    (c) => c.name === selectedCategoryName
  );

  const subCategories = selectedCategory
    ? selectedCategory.genderGroups?.find((g) => g.name === selectedGender)
        ?.subCategories || []
    : [];

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
      <div className="space-y-4">
        {/* Category & Gender Row */}
        <div className="flex items-center gap-2">
          <div className="w-1/2 space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase">
              Product Category
            </Label>
            <Controller
              control={control}
              name="category"
              render={({ field: { value, onChange } }) => (
                <Select
                  onValueChange={(val) => {
                    onChange(val);
                    setValue("gender", ""); // Reset gender
                    setValue("subCategory", ""); // Reset subcategory
                  }}
                  value={value}
                >
                  <SelectTrigger className="bg-muted/80  w-full font-medium">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="font-medium">
                    {categories.map((category) => (
                      <SelectItem
                        key={category._id || category.name}
                        value={category.name}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-xs">
                {errors.category.message as string}
              </p>
            )}
          </div>

          <div className="w-1/2 space-y-2">
            <Label className="text-xs font-bold text-gray-500 uppercase">
              Product gender
            </Label>
            <Controller
              control={control}
              name="gender"
              render={({ field: { value, onChange } }) => (
                <Select
                  onValueChange={(val) => {
                    onChange(val);
                    setValue("subCategory", ""); // Reset subcategory
                  }}
                  value={value}
                  disabled={!selectedCategoryName}
                >
                  <SelectTrigger className="bg-muted/80  w-full font-medium">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="font-medium">
                    <SelectItem value="Men">Men</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-xs">
                {errors.gender.message as string}
              </p>
            )}
          </div>
        </div>

        {/* SubCategory & Tags Row */}
        <div className="flex items-center gap-2">
          <div className="w-1/2 space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase">
              Sub Category
            </Label>
            <Controller
              control={control}
              name="subCategory"
              render={({ field: { value, onChange } }) => (
                <Select
                  onValueChange={onChange}
                  value={value}
                  disabled={!selectedGender}
                >
                  <SelectTrigger className="bg-muted/80  w-full font-medium">
                    <SelectValue placeholder="Select Sub Category" />
                  </SelectTrigger>
                  <SelectContent className="font-medium">
                    {subCategories.map((sub) => (
                      <SelectItem key={sub._id || sub.name} value={sub.name}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subCategory && (
              <p className="text-red-500 text-xs">
                {errors.subCategory.message as string}
              </p>
            )}
          </div>

          <div className="w-1/2 space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase">
              Product Tags
            </Label>

            <Controller
              control={control}
              name="tags"
              render={({ field: { value, onChange } }) => {
                const handleAddTag = (tag: string) => {
                  if (!value.includes(tag)) {
                    onChange([...value, tag]);
                  }
                };

                const handleRemoveTag = (tagToRemove: string) => {
                  onChange(value.filter((tag: string) => tag !== tagToRemove));
                };

                return (
                  <>
                    <Select onValueChange={handleAddTag} value="">
                      <SelectTrigger className="bg-muted/80 w-full font-medium">
                        <SelectValue placeholder="Select Tags" />
                      </SelectTrigger>
                      <SelectContent className="font-medium">
                        {availableTags.map((tag) => (
                          <SelectItem
                            key={tag}
                            value={tag}
                            disabled={value.includes(tag)}
                          >
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Selected tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {value.map(
                        (tag: string) =>
                          tag && (
                            <span
                              key={tag}
                              className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded flex items-center gap-1"
                            >
                              {tag}
                              <X
                                size={12}
                                className="cursor-pointer hover:text-red-700"
                                onClick={() => handleRemoveTag(tag)}
                              />
                            </span>
                          )
                      )}
                    </div>

                    {errors.tags && (
                      <p className="text-red-500 text-xs">
                        {errors.tags.message as string}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
