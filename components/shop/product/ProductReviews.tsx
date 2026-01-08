"use client";

import { useState, useEffect } from "react";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import {
  Review,
  addReview,
  getReviews,
  ReviewResponse,
} from "@/lib/services/reviewService";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    loadReviews(1);
  }, [productId]);

  const loadReviews = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await getReviews(productId, pageNum);
      if (data) {
        setReviews(data.reviews);
        setTotalPages(data.totalPages);
        setPage(data.currentPage);
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated || !user?.id) return;
    if (rating === 0) return;

    setSubmitting(true);
    try {
      await addReview(user.id, productId, rating, comment);
      setComment("");
      setRating(0);
      loadReviews(1); // Reload reviews to show the new one
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Customer Reviews</h2>

      {/* Add Review Form */}
      {isAuthenticated ? (
        <div className="bg-muted/30 p-6 rounded-lg space-y-4">
          <h3 className="font-medium">Write a Review</h3>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-6 w-6",
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Share your thoughts about this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button
            onClick={handleSubmitReview}
            disabled={submitting || rating === 0 || !comment.trim()}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      ) : (
        <div className="bg-muted/30 p-6 rounded-lg text-center">
          <p className="text-muted-foreground mb-2">
            Please log in to write a review.
          </p>
          {/* Add login button or link here if needed */}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border-b pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.userId?.image} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">
                      {review.userId?.firstname} {review.userId?.lastname}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-2">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => loadReviews(page - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => loadReviews(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
