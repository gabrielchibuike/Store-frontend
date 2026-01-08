"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useSidebar } from "@/components/ui/sidebar";
import { ReviewsTable } from "./ReviewsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "@/lib/services/reviewService";

export function ReviewsMainContent() {
  const { state } = useSidebar();

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: () => getAllReviews(),
  });

  const reviews = reviewsData?.reviews || [];
  const totalReviews = reviewsData?.reviews.length || 0;

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <AdminHeader title="Reviews" />

      <div className="p-6 space-y-6">
        {/* Filters & Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground overflow-x-auto">
              <button className="text-secondary border-b-2 border-secondary pb-1 px-1 font-medium whitespace-nowrap flex">
                ALL REVIEWS{" "}
                <div className="ml-1 h-5 text-xs bg-secondary/20 text-secondary px-1.5 py-0.5 rounded-full border border-secondary/100">
                  {totalReviews}
                </div>
              </button>
              <button className="hover:text-gray-900 pb-1 px-1 whitespace-nowrap">
                TRASH{" "}
                <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                  0
                </span>
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              Loading reviews...
            </div>
          ) : (
            <ReviewsTable reviews={reviews} />
          )}
        </div>
      </div>
    </main>
  );
}
