"use client";

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
import { Controller, useFormContext } from "react-hook-form";

export function ProductGeneralInfo() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const Colors = [
    "Red",
    "Blue",
    "Black",
    "Orange",
    "Pink",
    "Green",
    "Grey",
    "Gold",
    "White",
  ];

  const SIzes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">General Info</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase">
              Color
            </Label>
            <Controller
              control={control}
              name="color"
              render={({ field: { value, onChange } }) => {
                const handleAddcolor = (color: string) => {
                  if (!value.includes(color)) {
                    onChange([...value, color]);
                  }
                };

                const handleRemovecolor = (colorToRemove: string) => {
                  onChange(
                    value.filter((color: string) => color !== colorToRemove)
                  );
                };

                return (
                  <>
                    <Select onValueChange={handleAddcolor} value="">
                      <SelectTrigger className="bg-muted/80  w-full font-medium">
                        <SelectValue placeholder="Select Color" />
                      </SelectTrigger>
                      <SelectContent className="font-medium">
                        {Colors.map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            disabled={value.includes(color)}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Selected colors */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {value &&
                        value.map(
                          (color: string) =>
                            color && (
                              <span
                                key={color}
                                className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded flex items-center gap-1"
                              >
                                {color}
                                <X
                                  size={12}
                                  className="cursor-pointer hover:text-red-700"
                                  onClick={() => handleRemovecolor(color)}
                                />
                              </span>
                            )
                        )}
                    </div>

                    {errors.color && (
                      <p className="text-red-500 text-xs">
                        {errors.color.message as string}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase">
              Size
            </Label>
            <Controller
              control={control}
              name="size"
              render={({ field: { value, onChange } }) => {
                const handleAddsize = (size: string) => {
                  if (!value.includes(size)) {
                    onChange([...value, size]);
                  }
                };

                const handleRemovesize = (sizeToRemove: string) => {
                  onChange(
                    value.filter((size: string) => size !== sizeToRemove)
                  );
                };

                return (
                  <>
                    <Select onValueChange={handleAddsize} value="">
                      <SelectTrigger className="bg-muted/80 w-full font-medium">
                        <SelectValue placeholder="Select sizes" />
                      </SelectTrigger>
                      <SelectContent className="font-medium">
                        {SIzes.map((size) => (
                          <SelectItem
                            key={size}
                            value={size}
                            disabled={value.includes(size)}
                          >
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Selected sizes */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {value &&
                        value.map(
                          (size: string) =>
                            size && (
                              <span
                                key={size}
                                className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded flex items-center gap-1"
                              >
                                {size}
                                <X
                                  size={12}
                                  className="cursor-pointer hover:text-red-700"
                                  onClick={() => handleRemovesize(size)}
                                />
                              </span>
                            )
                        )}
                    </div>

                    {errors.size && (
                      <p className="text-red-500 text-xs">
                        {errors.size.message as string}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase">
              Quantity
            </Label>
            <Input
              type="text"
              placeholder="Stocks"
              className="bg-muted/80"
              {...register("quantity")}
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs">
                {errors.quantity.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase">
              Price, $
            </Label>
            <Input
              type="text"
              placeholder="Price"
              className="bg-muted/80"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">
                {errors.price.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase">
              Discount, %
            </Label>
            <Input
              type="text"
              placeholder="Discount"
              className="bg-muted/80  "
              {...register("discount")}
            />
            {errors.discount && (
              <p className="text-red-500 text-xs">
                {errors.discount.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase">
              Additional Information
            </Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-muted/80 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter additional product details..."
              {...register("additionalInfo")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
