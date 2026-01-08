import { getStorageItem } from "@/utils/storage";
import { apiRequest } from "./api";
import { Store_Data } from "@/context/AuthContext";

export interface Order {
  _id: string;
  userId: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    profileImg?: string;
  };
  items: {
    productId: any;
    quantity: number;
    price: number;
    _id: string;
  }[];
  billingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    companyName?: string;
  };
  shippingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  paymentStatus: "Pending" | "Paid" | "Failed";
  paymentReference?: string;
  status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Completed"
    | "Delivery Failed"
    | "Returned"
    | "Cancelled";
  totalPrices: number;
  invoiceNumber?: string;
  invoiceReference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerStat {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: boolean;
}

const getToken = () => {
  const data = getStorageItem<any>(Store_Data);
  return data?.accessToken;
};

export const getAllOrders = async (params: any = {}) => {
  const token = getToken();
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `order/admin/all?${query}` : `order/admin/all`;
  const response = await apiRequest<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
  }>(endpoint, {
    method: "GET",
  });
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await apiRequest<{
    order: Order;
    shipment?: any;
  }>(`order/admin/single/${id}`, {
    method: "GET",
  });
  return response.data;
};

export const getCustomerStats = async () => {
  const response = await apiRequest<CustomerStat[]>(`order/admin/customers`, {
    method: "GET",
  });
  return response.data;
};

export const getOrderStats = async () => {
  const token = getToken();
  const response = await apiRequest<{
    allOrders: number;
    pending: number;
    completed: number;
    processing: number;
    returned: number;
    cancelled: number;
    failed: number;
  }>(`order/admin/stats`, {
    method: "GET",
    token,
  });
  return response.data;
};

export const getCustomerProfile = async (id: string) => {
  const token = getToken();
  const response = await apiRequest<any>(`order/admin/customer/${id}`, {
    method: "GET",
    token,
  });
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const token = getToken();
  return apiRequest(`order/status/${orderId}`, {
    method: "PATCH",
    token,
    body: { status },
  });
};

export const getCustomerOrders = async (id: string) => {
  const token = getToken();
  const response = await apiRequest<Order[]>(
    `order/admin/customer/${id}/orders`,
    {
      method: "GET",
    }
  );
  return response.data;
};
