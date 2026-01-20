import { apiRequest } from "./api";
import { Product } from "./productService";

export interface DashboardSummary {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
}

export interface SalesByCategory {
  name: string;
  value: number;
}

export interface ActivityFeedItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "order" | "review";
  images?: string[];
}

export interface TopSellingProduct {
  _id: string;
  name: string;
  productId: string;
  price: number;
  image: string;
}

export const getDashboardSummary = async () => {
  const response = await apiRequest<DashboardSummary>("dashboard/summary", {
    method: "GET",
  });
  return response.data;
};

export const getSalesByCategory = async (range: "week" | "month" | "year") => {
  const response = await apiRequest<SalesByCategory[]>(
    `dashboard/sales-by-category?range=${range}`,
    {
      method: "GET",
    }
  );
  return response.data;
};

export const getActivityFeed = async () => {
  const response = await apiRequest<ActivityFeedItem[]>(
    "dashboard/activity-feed",
    {
      method: "GET",
    }
  );
  return response.data;
};

export const getTopSellingProducts = async (range: "week" | "month") => {
  const response = await apiRequest<Product[]>(
    `dashboard/top-selling?range=${range}`,
    {
      method: "GET",
    }
  );
  return response.data;
};

export const getLatestOffers = async () => {
  const response = await apiRequest<any[]>("dashboard/latest-offers", {
    method: "GET",
  });
  return response.data;
};
