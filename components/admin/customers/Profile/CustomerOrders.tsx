"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCustomerOrders } from "@/lib/services/orderService";
import { format } from "date-fns";

interface CustomerOrdersProps {
  customerId: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  Pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  Processing: { label: "Processing", color: "bg-blue-100 text-blue-800" },
  Shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800" },
  Delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  Cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
  "Delivery Failed": {
    label: "Failed",
    color: "bg-orange-100 text-orange-800",
  },
  Returned: { label: "Returned", color: "bg-gray-100 text-gray-800" },
};

export function CustomerOrders({ customerId }: CustomerOrdersProps) {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-customer-orders", customerId],
    queryFn: () => getCustomerOrders(customerId),
    enabled: !!customerId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (orders!.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-md border">
        No orders found for this customer.
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders!.map((order) => {
            const statusCfg = STATUS_CONFIG[order.status] || {
              label: order.status,
              color: "bg-gray-100 text-gray-800",
            };
            return (
              <TableRow key={order._id}>
                <TableCell className="font-medium uppercase text-xs">
                  {order._id.substring(order._id.length - 8)}
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(order.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="font-bold">
                  ${order.totalPrices.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${statusCfg.color} border-none`}
                  >
                    {statusCfg.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/orders/${order._id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
