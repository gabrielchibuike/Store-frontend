import { apiRequest } from "./api";
import { getStorageItem } from "@/utils/storage";
import { Store_Data } from "@/context/AuthContext";

export interface UserProfile {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  role: string;
  profileImg?: string;
}

export interface OrderItem {
  productId: {
    _id: string;
    product_name: string;
    product_image: string[];
    price: number;
    product_category: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrices: number;
  paymentStatus: string;
  status: string;
  createdAt: string;
  billingDetails: any;
  shippingAddress: any;
}

export interface Address {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  additionalInfo: string;
  city: string;
  state: string;
}

const getToken = () => {
  const data = getStorageItem<any>(Store_Data);
  return data?.accessToken;
};

export async function getUserProfile() {
  const token = getToken();
  const response = await apiRequest<UserProfile>("auth/me", {
    token,
  });
  return response.data;
}

export async function updateProfile(data: Partial<UserProfile>) {
  const token = getToken();
  const response = await apiRequest<UserProfile>("auth/me", {
    method: "PUT",
    token,
    body: {
      firstName: data.firstname,
      lastName: data.lastname,
      phone: data.phone,
      profileImg: data.profileImg,
    },
  });
  return response.data;
}

export async function changePassword(data: any) {
  const token = getToken();
  const response = await apiRequest("auth/change-password", {
    method: "POST",
    token,
    body: data,
  });
  return response.data;
}

export async function getOrders() {
  const token = getToken();
  const response = await apiRequest<Order[]>("order/my", {
    token,
  });
  return response.data;
}

export async function cancelOrder(orderId: string) {
  const token = getToken();
  const response = await apiRequest(`order/cancel/${orderId}`, {
    method: "PUT",
    token,
  });
  return response.data;
}

export async function getAddresses() {
  const token = getToken();
  const response = await apiRequest<Address[]>("shippingAddress", {
    token,
  });
  return response.data;
}

export async function addAddress(data: Omit<Address, "_id">) {
  const token = getToken();
  const response = await apiRequest<Address>("shippingAddress", {
    method: "POST",
    token,
    body: data,
  });
  return response.data;
}

export async function updateAddress(addressId: string, data: Partial<Address>) {
  const token = getToken();
  const response = await apiRequest<Address>(`shippingAddress/${addressId}`, {
    method: "PUT",
    token,
    body: data,
  });
  return response.data;
}

export async function deleteAddress(addressId: string) {
  const token = getToken();
  const response = await apiRequest(`shippingAddress/${addressId}`, {
    method: "DELETE",
    token,
  });
  return response.data;
}
