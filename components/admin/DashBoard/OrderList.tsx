"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/lib/services/orderService";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-600 hover:bg-yellow-100",
  Processing: "bg-blue-100 text-blue-600 hover:bg-blue-100",
  Shipped: "bg-purple-100 text-purple-600 hover:bg-purple-100",
  Delivered: "bg-green-100 text-green-600 hover:bg-green-100",
  Completed: "bg-green-100 text-green-600 hover:bg-green-100",
  Cancelled: "bg-red-100 text-red-600 hover:bg-red-100",
  "Delivery Failed": "bg-orange-100 text-orange-600 hover:bg-orange-100",
  Returned: "bg-gray-100 text-gray-600 hover:bg-gray-100",
};

export function OrderList() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-latest-orders"],
    queryFn: () => getAllOrders({ limit: 7, page: 1 }),
  });

  const orders = data?.orders || [];

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Order List</CardTitle>
        <Select defaultValue="sort">
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="font-medium">
            <SelectItem value="sort">Sort by</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No orders found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="font-bold">
                <TableHead className="text-xs uppercase">Order ID</TableHead>
                <TableHead className="text-xs uppercase">Customer</TableHead>
                <TableHead className="text-xs uppercase">Amount</TableHead>
                <TableHead className="text-xs uppercase">Payment</TableHead>
                <TableHead className="text-xs uppercase">Order Date</TableHead>
                <TableHead className="text-xs uppercase">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  className="font-medium text-muted-foreground"
                >
                  <TableCell className=" text-sm uppercase">
                    {order._id.substring(order._id.length - 8)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {order.billingDetails.firstName}{" "}
                    {order.billingDetails.lastName}
                  </TableCell>
                  <TableCell className="text-sm font-bold text-foreground">
                    ${order.totalPrices.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {order.paymentReference ? "Card" : "Pending"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-normal ${
                        STATUS_COLORS[order.status] ||
                        "bg-gray-100 text-gray-600"
                      } border-none`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
