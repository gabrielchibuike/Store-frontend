"use client";

import { useQuery } from "@tanstack/react-query";
import { OrderCard } from "@/components/account/OrderCard";
import { getOrders } from "@/lib/services/accountService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function OrdersPage() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-orders"],
    queryFn: getOrders,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !orders) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">
          Error loading orders. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Orders</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by :</span>
          <Select defaultValue="All">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Recent">Recent</SelectItem>
              <SelectItem value="Oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        ) : (
          <div className="text-center py-12 bg-white border rounded-lg">
            <p className="text-muted-foreground">
              You haven't placed any orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
