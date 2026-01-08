"use client";

import React, { useState, useEffect } from "react";
import { getAllShipments, Shipment } from "@/lib/services/shipmentService";
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Eye } from "lucide-react";
import ShipmentDetail from "@/components/admin/shipment&fufillment/ShipmentDetail";
import { useSidebar } from "@/components/ui/sidebar";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-500",
  PACKED: "bg-blue-500",
  SHIPPED: "bg-purple-500",
  IN_TRANSIT: "bg-indigo-500",
  DELIVERED: "bg-green-500",
  FAILED: "bg-red-500",
  RETURNED: "bg-orange-500",
};

export default function FulfillmentPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (statusFilter !== "all") params.status = statusFilter;
      const data = await getAllShipments(params);
      console.log(data, "data");
      setShipments(data!);
    } catch (error) {
      console.error("Failed to fetch shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, [statusFilter]);

  const filteredShipments =
    shipments &&
    shipments.filter((ship) => {
      const searchLow = searchTerm.toLowerCase();
      return (
        ship._id.toLowerCase().includes(searchLow) ||
        ship.orderId?._id?.toLowerCase().includes(searchLow) ||
        `${ship.shippingAddress.firstName} ${ship.shippingAddress.lastName}`
          .toLowerCase()
          .includes(searchLow)
      );
    });

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen  transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Fulfillment & Shipments</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by ID, Order, or Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PACKED">Packed</SelectItem>
              <SelectItem value="SHIPPED">Shipped</SelectItem>
              <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
              <SelectItem value="RETURNED">Returned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          {loading ? (
            <div className="flex justify-center items-center p-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Courier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments && filteredShipments.length > 0 ? (
                  filteredShipments.map((ship) => (
                    <TableRow key={ship._id}>
                      <TableCell className="font-mono text-xs">
                        #{ship._id.substring(ship._id.length - 8).toUpperCase()}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        #
                        {ship.orderId?._id
                          ? ship.orderId._id
                              .substring(ship.orderId._id.length - 8)
                              .toUpperCase()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {ship.shippingAddress.firstName}{" "}
                        {ship.shippingAddress.lastName}
                      </TableCell>
                      <TableCell>
                        {ship.courier?.name || "Not Assigned"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            STATUS_COLORS[ship.status]
                          } text-white border-0`}
                        >
                          {ship.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {format(new Date(ship.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedShipment(ship)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-gray-500"
                    >
                      No shipments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {selectedShipment && (
          <ShipmentDetail
            shipmentId={selectedShipment._id}
            onClose={() => {
              setSelectedShipment(null);
              fetchShipments();
            }}
          />
        )}
      </div>
    </main>
  );
}
