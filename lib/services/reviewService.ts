import { apiRequest } from "./api";

export interface Review {
  _id: string;
  userId: {
    _id: string;
    firstname: string;
    lastname: string;
    image: string;
  };
  productId:
    | string
    | { _id: string; product_name: string; product_category: string };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewResponse {
  reviews: Review[];
  totalPages: number;
  currentPage: number;
}

export async function getReviews(
  productId: string,
  page: number = 1,
  limit: number = 10
) {
  const res = await apiRequest<ReviewResponse>(
    `/review/get/${productId}?page=${page}&limit=${limit}`,
    {
      method: "GET",
    }
  );
  return res.data;
}

export async function getAllReviews(page: number = 1, limit: number = 10) {
  const res = await apiRequest<ReviewResponse>(
    `/review/all?page=${page}&limit=${limit}`,
    {
      method: "GET",
    }
  );
  return res.data;
}

export async function addReview(
  userId: string,
  productId: string,
  rating: number,
  comment: string
) {
  const res = await apiRequest<Review>(`/review/add`, {
    method: "POST",
    body: { userId, productId, rating, comment },
  });
  return res.data;
}
