"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getLatestOffers } from "@/lib/services/dashboardService";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function LatestOffer() {
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["dashboard-latest-offers"],
    queryFn: getLatestOffers,
  });

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Latest Offer Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto w-full pb-2 scrollbar-hide">
          {isLoading ? (
            <div className="flex justify-center w-full py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : offers!.length === 0 ? (
            <div className="text-sm text-muted-foreground py-4">
              No active offers
            </div>
          ) : (
            offers!.map((product: any) => {
              const discountPrice =
                product.price * (1 - product.discount / 100);
              return (
                <div
                  key={product._id}
                  className="min-w-[160px] flex-shrink-0 space-y-2"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-square bg-muted rounded-md w-full overflow-hidden">
                    {product.product_image && product.product_image[0] && (
                      <Image
                        src={product.product_image[0]}
                        alt={product.product_name}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                      -{product.discount}%
                    </div>
                  </div>

                  {/* TEXT */}
                  <div>
                    <h4 className="font-bold text-sm truncate">
                      {product.product_name}
                    </h4>
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Category: {product.product_category}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-bold text-sm">
                        ${discountPrice.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
