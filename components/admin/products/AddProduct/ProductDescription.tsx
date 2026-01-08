"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export function ProductDescription() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Description</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="productName"
            className="text-xs font-bold text-muted-foreground uppercase"
          >
            Product Name
          </Label>
          <Input
            id="productName"
            placeholder="Enter Product Name"
            className="bg-muted/80"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">
              {errors.name.message as string}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="productDescription"
            className="text-xs font-bold text-muted-foreground uppercase"
          >
            Product Description
          </Label>
          <Textarea
            id="productDescription"
            placeholder="Enter Product Description"
            className="bg-muted/80 min-h-[100px]"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">
              {errors.description.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
