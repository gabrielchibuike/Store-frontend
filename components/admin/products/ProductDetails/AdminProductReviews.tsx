"use client";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getReviews, Review } from "@/lib/services/reviewService";
import { getProductById } from "@/lib/services/productService";

export function AdminProductReviews() {
  const params = useParams();
  const productId = params.id as string;

  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviews(productId),
    enabled: !!productId,
  });

  const { data: productData } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  const reviews = reviewsData?.reviews || [];
  const totalRatings = productData?.data!.reviews || 0;
  const averageRating = productData?.data!.rating || 0;

  // Calculate rating distribution
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    const rating = Math.round(review.rating) as 1 | 2 | 3 | 4 | 5;
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating]++;
    }
  });

  const ratingDistribution = [
    { stars: "5 Stars", value: 5, color: "bg-teal-500" },
    { stars: "4 Stars", value: 4, color: "bg-blue-500" },
    { stars: "3 Stars", value: 3, color: "bg-orange-400" },
    { stars: "2 Stars", value: 2, color: "bg-orange-500" },
    { stars: "1 Stars", value: 1, color: "bg-red-500" },
  ].map((item) => {
    const count = ratingCounts[item.value as keyof typeof ratingCounts];
    const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
    return { ...item, count, percentage };
  });

  if (isReviewsLoading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase">
        Ratings & Reviews
      </h3>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Rating Summary */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-teal-500 text-white text-3xl font-bold rounded-lg w-16 h-16 flex items-center justify-center shadow-sm">
              {averageRating.toFixed(1)}
            </div>
            <div>
              <div className="flex text-yellow-400 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(averageRating)
                        ? "fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on {totalRatings} Ratings
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {ratingDistribution.map((rating) => (
              <div
                key={rating.stars}
                className="flex items-center gap-3 text-xs"
              >
                <span className="w-12 font-medium text-gray-500 uppercase">
                  {rating.stars}
                </span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${rating.color}`}
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right text-gray-400">
                  {rating.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="w-full lg:w-2/3 space-y-8">
          <h4 className="font-semibold text-gray-900">
            Global reviews ({totalRatings})
          </h4>

          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="border-b pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-sm text-gray-900">
                        {review.userId?.firstname} {review.userId?.lastname}
                      </h5>
                    </div>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating ? "fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{review.comment}</p>
                  {/* Review Images (if any - assuming backend supports it later) */}
                  {/* <div className="flex gap-2 mb-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=100&auto=format&fit=crop"
                      alt="Review"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div> */}
                  <div className="text-xs text-gray-400 text-right">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
