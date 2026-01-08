import { apiRequest } from "./api";

export interface Shipment {
  _id: string;
  orderId: any;
  items: any[];
  shippingAddress: any;
  status: string;
  courier?: {
    name: string;
    trackingNumber: string;
    contactInfo?: string;
  };
  statusHistory: {
    status: string;
    timestamp: string;
    reason?: string;
  }[];
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllShipments = async (params: any = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `shipment/admin/all?${query}` : `shipment/admin/all`;
  const response = await apiRequest<Shipment[]>(endpoint, {
    method: "GET",
  });
  console.log(response.data, "response.data");

  return response.data;
};

export const getShipmentById = async (id: string) => {
  const response = await apiRequest<Shipment>(`shipment/${id}`, {
    method: "GET",
  });
  return response.data;
};

export const updateShipmentStatus = async (
  id: string,
  status: string,
  reason?: string
) => {
  const response = await apiRequest<Shipment>(`shipment/status/${id}`, {
    method: "PATCH",
    body: { status, reason },
  });
  return response.data;
};

export const assignCourier = async (id: string, courierName: string) => {
  const response = await apiRequest<Shipment>(`shipment/assign-courier/${id}`, {
    method: "PATCH",
    body: { courierName },
  });
  return response.data;
};

export const trackShipment = async (id: string) => {
  const response = await apiRequest<Shipment>(`shipment/track/${id}`, {
    method: "GET",
  });
  return response.data;
};
