import { apiRequest } from "./api";
import { Product } from "./productService";

export interface Deal {
  _id: string;
  productId: any;
  discountType: "PERCENT" | "FLAT";
  discountValue: number;
  startAt: string;
  endAt: string;
  isActive: boolean;
  product: Product & {
    originalPrice: number;
    dealPrice: number;
    discountPercentage: number;
  };
}

export async function getActiveDeals() {
  return await apiRequest<Deal[]>("/deals/today", {
    method: "GET",
  });
}

export async function getAllDeals() {
  return await apiRequest<Deal[]>("/deals/all", {
    method: "GET",
  });
}

export async function createDeal(data: Partial<Deal>) {
  return await apiRequest<Deal>("/deals", {
    method: "POST",
    body: data,
  });
}

export async function updateDeal(id: string, data: Partial<Deal>) {
  return await apiRequest<Deal>(`/deals/${id}`, {
    method: "PATCH",
    body: data,
  });
}

export async function deleteDeal(id: string) {
  return await apiRequest<void>(`/deals/${id}`, {
    method: "DELETE",
  });
}
