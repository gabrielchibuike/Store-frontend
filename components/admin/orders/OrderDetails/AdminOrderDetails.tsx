"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useSidebar } from "@/components/ui/sidebar";
import { OrderItems } from "./OrderItems";
import { OrderSummary } from "@/components/admin/orders/OrderDetails/OrderSummary";
import { OrderTracking } from "./OrderTracking";
import { OrderInfo } from "./OrderInfo";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/lib/services/orderService";
import { Loader2 } from "lucide-react";

interface AdminOrderDetailsProps {
  orderId: string;
}

export function AdminOrderDetails({ orderId }: AdminOrderDetailsProps) {
  const { state } = useSidebar();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-order", orderId],
    queryFn: () => getOrderById(orderId),
  });

  if (isLoading) {
    return (
      <main
        className={`flex-1 flex flex-col bg-accent/80 min-h-screen transition-all duration-300 ease-in-out ${
          state === "collapsed" ? "ml-20" : "ml-72"
        }`}
      >
        <AdminHeader title="Order Detail" />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (error || !data?.order) {
    return (
      <main
        className={`flex-1 flex flex-col bg-accent/80 min-h-screen transition-all duration-300 ease-in-out ${
          state === "collapsed" ? "ml-20" : "ml-72"
        }`}
      >
        <AdminHeader title="Order Detail" />
        <div className="flex-1 flex justify-center items-center text-red-500">
          Error loading order details.
        </div>
      </main>
    );
  }

  const { order, shipment } = data;

  return (
    <main
      className={`flex-1 flex flex-col bg-accent/80 min-h-screen transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <AdminHeader title="Order Detail" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900">
              Order #{order._id.substring(order._id.length - 8).toUpperCase()}
            </h2>
            <p className="text-xs text-muted-foreground">
              Full ID: {order._id}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Items & Info */}
          <div className="lg:col-span-2 space-y-6">
            <OrderItems items={order.items} />
            <OrderInfo order={order} />
          </div>

          {/* Right Column - Summary & Tracking */}
          <div className="space-y-6">
            <OrderSummary order={order} />
            <OrderTracking shipment={shipment} orderStatus={order.status} />
          </div>
        </div>
      </div>
    </main>
  );
}
