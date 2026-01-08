import { getStorageItem } from "@/utils/storage";
import { apiRequest } from "./api";
import { Product } from "./productService";
import { Store_Data } from "@/context/AuthContext";

export interface CartItem {
  _id: string; // Cart Item ID
  productId: Product; // Populated product
  quantity: number;
}

const getToken = () => {
  const data = getStorageItem<any>(Store_Data);
  return data?.accessToken;
};

export async function getCart(userId: string) {
  const token = getToken();
  const res = await apiRequest<CartItem[]>(`/cart/getItem/${userId}`, {
    method: "GET",
    token,
  });
  return res.data || [];
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number = 1
) {
  const token = getToken();
  const res = await apiRequest<any>(`/cart/addItem`, {
    method: "POST",
    token,
    body: { userId, productId, quantity },
  });
  if (res.error) throw new Error(res.error);
  return getCart(userId);
}

export async function syncCart(
  userId: string,
  items: { productId: string; quantity: number }[]
) {
  const token = getToken();
  const res = await apiRequest<any>(`/cart/sync`, {
    method: "POST",
    token,
    body: { userId, items },
  });
  if (res.error) throw new Error(res.error);
  return res.data || [];
}

export async function removeFromCart(userId: string, itemId: string) {
  const token = getToken();
  await apiRequest(`/cart/deleteItem/${userId}/${itemId}`, {
    method: "DELETE",
    token,
  });
  return getCart(userId);
}

export async function updateQuantity(
  userId: string,
  itemId: string,
  quantity: number
) {
  const token = getToken();
  await apiRequest(`/cart/editItem/${userId}/${itemId}`, {
    method: "PUT",
    token,
    body: { quantity },
  });
  return getCart(userId);
}

export function calculateTotals(items: CartItem[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
}
