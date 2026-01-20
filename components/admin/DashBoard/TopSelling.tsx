"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getTopSellingProducts } from "@/lib/services/dashboardService";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function TopSelling() {
  const [range, setRange] = useState<"week" | "month">("week");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["top-selling-products", range],
    queryFn: () => getTopSellingProducts(range),
  });

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Top Selling Products
        </CardTitle>
        <Select value={range} onValueChange={(value: any) => setRange(value)}>
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Week" />
          </SelectTrigger>
          <SelectContent className="font-medium">
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : products!.length === 0 ? (
            <div className="text-sm text-muted-foreground py-4">
              No sales data available
            </div>
          ) : (
            products!.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-muted rounded-md overflow-hidden">
                    {product.product_image && (
                      <Image
                        src={product.product_image[0]}
                        alt={product.product_name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {product.product_name}
                    </p>
                    <p className="text-xs text-muted-foreground my-1 uppercase">
                      ID: {product._id.toString().substring(0, 8)}
                    </p>
                  </div>
                </div>
                <div className="font-bold text-sm">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
