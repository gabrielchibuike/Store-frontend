"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";

export function ProductPublish() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Publish</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-muted-foreground uppercase">
            Status
          </Label>
          <Controller
            control={control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger className="bg-muted/80 w-full font-medium">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="font-medium">
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-red-500 text-xs">
              {errors.status.message as string}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-muted-foreground uppercase">
            Visibility
          </Label>
          <Controller
            control={control}
            name="visibility"
            render={({ field: { value, onChange } }) => (
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger className="bg-muted/80 w-full font-medium">
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent className="font-medium">
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.visibility && (
            <p className="text-red-500 text-xs">
              {errors.visibility.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold text-muted-foreground uppercase">
          Publish Schedule
        </Label>
        <div className="relative">
          <Input
            placeholder="Enter Date & Time"
            className="bg-muted/80"
            {...register("publishSchedule")}
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
