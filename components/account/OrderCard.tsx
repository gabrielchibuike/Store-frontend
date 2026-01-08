"use client";

import { Order, cancelOrder } from "@/lib/services/accountService";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface OrderCardProps {
  order: Order;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

export function OrderCard({ order }: OrderCardProps) {
  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: () => cancelOrder(order._id),
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to cancel order");
    },
  });

  const canCancel = ["Pending", "Processing"].includes(order.status);

  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-[#F5B041] p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="text-black/60 mb-1">Order ID</div>
          <div className="font-bold">{order._id.substring(0, 10)}...</div>
        </div>
        <div>
          <div className="text-black/60 mb-1">Total Payment</div>
          <div className="font-bold">${order.totalPrices.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-black/60 mb-1">Payment Method</div>
          <div className="font-bold">
            {order.billingDetails?.paymentMethod || "N/A"}
          </div>
        </div>
        <div>
          <div className="text-black/60 mb-1">Order Date</div>
          <div className="font-bold">
            {format(new Date(order.createdAt), "dd MMM yyyy")}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="p-6 space-y-6">
        {order.items.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="h-20 w-20 bg-gray-100 rounded-md flex-shrink-0 relative overflow-hidden">
              {item.productId?.product_image?.[0] ? (
                <img
                  src={`${BASE_URL}/${item.productId.product_image[0]}`}
                  alt={item.productId.product_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                  No Img
                </div>
              )}
            </div>
            <div>
              <h4 className="font-bold">
                {item.productId?.product_name || "Unknown Product"}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Category : {item.productId?.product_category} | Qty :{" "}
                {item.quantity} | Price : ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        {/* Status & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div
              className={`px-4 py-1 rounded text-sm font-medium border ${
                order.status === "Pending" || order.status === "Processing"
                  ? "text-orange-600 border-orange-200 bg-orange-50"
                  : order.status === "Delivered"
                  ? "text-green-600 border-green-200 bg-green-50"
                  : order.status === "Cancelled"
                  ? "text-red-600 border-red-200 bg-red-50"
                  : "text-gray-600 border-gray-200 bg-gray-50"
              }`}
            >
              {order.status}
            </div>
            <span className="text-sm text-muted-foreground">
              {order.status === "Pending" && "Waiting for confirmation"}
              {order.status === "Processing" && "Order is being prepared"}
              {order.status === "Delivered" && "Your order has been delivered"}
              {order.status === "Cancelled" && "Your order was cancelled"}
              {order.status === "Shipped" && "Your order is on the way"}
            </span>
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            {canCancel && (
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 flex-1 sm:flex-none"
                onClick={() => cancelMutation.mutate()}
                disabled={cancelMutation.isPending}
              >
                {cancelMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Cancel Order
              </Button>
            )}
            <Button variant="outline" className="flex-1 sm:flex-none">
              Invoice
            </Button>
            {order.status === "Delivered" && (
              <Button className="bg-[#4A2B0F] hover:bg-[#3A220B] text-white flex-1 sm:flex-none">
                Add Review
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
