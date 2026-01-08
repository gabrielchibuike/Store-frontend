"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

import { Review } from "@/lib/services/reviewService";

interface ReviewsTableProps {
  reviews: Review[];
}

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-white border-b">
          <tr>
            <th className="p-4 w-4">
              <Checkbox />
            </th>
            <th className="p-4 font-bold">Type</th>
            <th className="p-4 font-bold">Product</th>
            <th className="p-4 font-bold">Rating</th>
            <th className="p-4 font-bold">Review</th>
            <th className="p-4 font-bold">Author</th>
            <th className="p-4 font-bold text-right">Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr
              key={review._id}
              className="border-b hover:bg-gray-50/50 transition-colors"
            >
              <td className="p-4">
                <Checkbox />
              </td>
              <td className="p-4 font-medium text-gray-900">Review</td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                    {/* Placeholder for image */}
                    <div className="w-full h-full bg-gray-200" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {typeof review.productId === "object"
                        ? (review.productId as any).product_name
                        : "Unknown Product"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Category:{" "}
                      {typeof review.productId === "object"
                        ? (review.productId as any).product_category
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < review.rating ? "currentColor" : "none"}
                      className={i < review.rating ? "" : "text-gray-300"}
                    />
                  ))}
                </div>
              </td>
              <td className="p-4 text-gray-600 truncate max-w-[200px]">
                {review.comment}
              </td>
              <td className="p-4 font-medium text-gray-900">
                {review.userId?.firstname} {review.userId?.lastname}
              </td>
              <td className="p-4 text-right text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
