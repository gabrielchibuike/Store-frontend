"use client";

import { MoreVertical, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/lib/services/orderService";
import { format } from "date-fns";

interface OrdersTableProps {
  status?: string;
  search?: string;
}

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  New: { color: "text-blue-500 bg-blue-50 border-blue-100", label: "New" },
  Pending: {
    color: "text-yellow-600 bg-yellow-50 border-yellow-100",
    label: "Pending",
  },
  Processing: {
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    label: "Processing",
  },
  Shipped: {
    color: "text-purple-600 bg-purple-50 border-purple-100",
    label: "Shipped",
  },
  Delivered: {
    color: "text-green-600 bg-green-50 border-green-100",
    label: "Delivered",
  },
  Completed: {
    color: "text-teal-600 bg-teal-50 border-teal-100",
    label: "Completed",
  },
  "Delivery Failed": {
    color: "text-red-600 bg-red-50 border-red-100",
    label: "Failed",
  },
  Returned: {
    color: "text-orange-600 bg-orange-50 border-orange-100",
    label: "Returned",
  },
  Cancelled: {
    color: "text-gray-500 bg-gray-50 border-gray-100",
    label: "Cancelled",
  },
};

export function OrdersTable({ status, search }: OrdersTableProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-orders", status, search],
    queryFn: () => getAllOrders({ status, search }),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        Error loading orders. Please try again.
      </div>
    );
  }

  const orders = data?.orders || [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-white border-b">
          <tr>
            <th className="p-4 w-4">
              <Checkbox />
            </th>
            <th className="p-4 font-bold">Order ID</th>
            <th className="p-4 font-bold">Customer</th>
            <th className="p-4 font-bold">Amount</th>
            <th className="p-4 font-bold">Payment</th>
            <th className="p-4 font-bold">Order Date</th>
            <th className="p-4 font-bold">Status</th>
            <th className="p-4 w-10"></th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => {
              const statusCfg = STATUS_CONFIG[order.status] || {
                color: "text-gray-500 bg-gray-50 border-gray-100",
                label: order.status,
              };
              return (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <Checkbox />
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="hover:underline hover:text-teal-600"
                    >
                      #{order._id.substring(order._id.length - 8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-600">
                    {order.userId?.firstname} {order.userId?.lastname}
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    ${order.totalPrices.toFixed(2)}
                  </td>
                  <td className="p-4 text-gray-600">
                    {order.paymentStatus === "Paid" ? "Online" : "Pending"}
                  </td>
                  <td className="p-4 text-gray-600">
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusCfg.color}`}
                    >
                      {statusCfg.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="p-10 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
