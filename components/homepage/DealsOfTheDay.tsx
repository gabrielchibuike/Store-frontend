"use client";

import { getActiveDeals } from "@/lib/services/dealService";
import { CountdownTimer } from "../shop/product/CountdownTimer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function DealsOfTheDay() {
  const queryClient = useQueryClient();
  const { data: response, isLoading } = useQuery({
    queryKey: ["active-deals"],
    queryFn: getActiveDeals,
  });

  const activeDeals = response?.data || [];

  if (!isLoading && activeDeals.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-primary font-medium mb-1 uppercase tracking-wider text-sm">
                Daily Deals
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Deals of The Day
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {activeDeals[0] && (
                <>
                  <CountdownTimer
                    expiryDate={activeDeals[0].endAt}
                    onExpire={() =>
                      queryClient.invalidateQueries({
                        queryKey: ["active-deals"],
                      })
                    }
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    Hurry up! Offer ends soon.
                  </span>
                </>
              )}
            </div>
          </div>

          <Button variant="outline" className="hidden md:flex group" asChild>
            <Link href="/shop">
              View All Deals{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="flex lg:grid lg:grid-cols-2 gap-6 overflow-x-auto pb-6 lg:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
          {isLoading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[280px] sm:min-w-[400px] lg:min-w-0 flex-shrink-0 h-[400px] lg:h-[300px] bg-muted animate-pulse rounded-2xl"
                />
              ))
            : activeDeals.map((deal) => (
                <div
                  key={deal._id}
                  className="min-w-[280px] sm:min-w-[450px] lg:min-w-0 flex-shrink-0 flex flex-col sm:flex-row gap-4 md:gap-6 p-4 md:p-6 border rounded-2xl bg-card hover:shadow-xl transition-all relative group snap-center"
                >
                  <Link
                    href={`/shop/product/${deal.product._id}`}
                    className="absolute inset-0 z-10"
                  >
                    <span className="sr-only">
                      View {deal.product.product_name}
                    </span>
                  </Link>

                  <div className="w-full sm:w-2/5 h-[200px] sm:h-auto min-h-[200px] bg-muted rounded-xl overflow-hidden flex items-center justify-center relative">
                    {deal.product.product_image?.[0] ? (
                      <Image
                        src={deal.product.product_image[0]}
                        alt={deal.product.product_name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 20vw"
                      />
                    ) : (
                      <span className="font-bold text-muted-foreground/20">
                        Product
                      </span>
                    )}
                    <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                      🔥 DEAL
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center space-y-3 md:space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-2xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                        {deal.product.product_name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xl md:text-2xl font-bold text-primary">
                          $
                          {deal.product.dealPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-muted-foreground line-through text-xs md:text-sm">
                          $
                          {deal.product.originalPrice.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-destructive bg-destructive/10 px-2 py-1 rounded">
                        {deal.product.discountPercentage}% OFF
                      </span>
                      {deal.product.quantity < 10 &&
                        deal.product.quantity > 0 && (
                          <span className="text-[10px] sm:text-xs font-medium text-orange-600">
                            Only {deal.product.quantity} left!
                          </span>
                        )}
                    </div>

                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {deal.product.description ||
                        "Experience premium quality with our exclusive limited-time deal. Grab yours while stock lasts!"}
                    </p>

                    <Button
                      className="w-full sm:w-auto relative z-20 h-10 md:h-12"
                      size="sm"
                    >
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full h-12" asChild>
            <Link href="/shop">
              View All Deals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
