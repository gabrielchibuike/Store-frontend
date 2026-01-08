import { apiRequest } from "./api";
import { Product } from "./productService";

export interface WishlistItem {
  _id: string; // Wishlist Item ID (not product ID)
  productId: Product;
  quantity: number;
  createdAt: string;
}

export async function getWishlist(userId: string) {
  const res = await apiRequest<WishlistItem[]>(`/saveItem/getItem/${userId}`, {
    method: "GET",
  });
  console.log(res, "res");
  return res.data || [];
}

export async function addToWishlist(userId: string, productId: string) {
  const res = await apiRequest<any>(`/saveItem/addItem`, {
    method: "POST",
    body: { userId, productId, quantity: 1 },
  });
  // Refetch to get populated items
  return getWishlist(userId);
}

export async function removeFromWishlist(userId: string, itemId: string) {
  await apiRequest(`/saveItem/deleteItem/${userId}/${itemId}`, {
    method: "DELETE",
  });
  return getWishlist(userId);
}
