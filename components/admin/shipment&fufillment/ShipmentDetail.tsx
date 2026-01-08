"use client";

import React, { useState, useEffect } from "react";
import {
  getShipmentById,
  updateShipmentStatus,
  assignCourier,
  Shipment,
} from "@/lib/services/shipmentService";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Truck, Package, MapPin, History, Info } from "lucide-react";
import { toast } from "sonner";

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["PACKED", "FAILED"],
  PACKED: ["SHIPPED", "FAILED"],
  SHIPPED: ["IN_TRANSIT", "FAILED"],
  IN_TRANSIT: ["DELIVERED", "FAILED"],
  DELIVERED: ["RETURNED"],
  FAILED: ["PENDING", "PACKED"],
  RETURNED: [],
};

export default function ShipmentDetail({
  shipmentId,
  onClose,
}: {
  shipmentId: string;
  onClose: () => void;
}) {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    fetchShipment();
  }, [shipmentId]);

  const fetchShipment = async () => {
    setLoading(true);
    try {
      const data = await getShipmentById(shipmentId);
      setShipment(data);
      setSelectedStatus("");
    } catch (error) {
      toast.error("Failed to load shipment details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return;
    setUpdating(true);
    try {
      await updateShipmentStatus(shipmentId, selectedStatus);
      toast.success(`Shipment updated to ${selectedStatus}`);
      fetchShipment();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignCourier = async (courierName: string) => {
    setUpdating(true);
    try {
      await assignCourier(shipmentId, courierName);
      toast.success(`Courier ${courierName} assigned`);
      fetchShipment();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to assign courier");
    } finally {
      setUpdating(false);
    }
  };

  if (!shipment && loading) return null;

  const nextStatuses = shipment
    ? ALLOWED_TRANSITIONS[shipment.status] || []
    : [];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="text-2xl">
              Shipment Details
              <span className="ml-2 text-sm font-mono text-gray-500">
                #{shipmentId.substring(shipmentId.length - 8).toUpperCase()}
              </span>
            </DialogTitle>
            <Badge className="bg-primary text-white">{shipment?.status}</Badge>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <div className="space-y-6 py-4 text-gray-800">
            {/* Quick Actions */}
            <div className="bg-gray-50 p-4 rounded-lg flex flex-wrap gap-4 items-end">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Update Status
                </p>
                <div className="flex gap-2">
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-40 h-9">
                      <SelectValue placeholder="Next Step" />
                    </SelectTrigger>
                    <SelectContent>
                      {nextStatuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    onClick={handleStatusUpdate}
                    disabled={!selectedStatus || updating}
                  >
                    Update
                  </Button>
                </div>
              </div>

              {!shipment?.courier?.name && shipment?.status === "PENDING" && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Assign Courier
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAssignCourier("GIGL")}
                      disabled={updating}
                    >
                      GIGL
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAssignCourier("KWIK")}
                      disabled={updating}
                    >
                      Kwik
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer & Address */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      Shipping To
                    </h4>
                    <p className="text-sm font-medium">
                      {shipment?.shippingAddress.firstName}{" "}
                      {shipment?.shippingAddress.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {shipment?.shippingAddress.streetAddress}
                    </p>
                    <p className="text-sm text-gray-600">
                      {shipment?.shippingAddress.city},{" "}
                      {shipment?.shippingAddress.state},{" "}
                      {shipment?.shippingAddress.zipCode}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {shipment?.shippingAddress.phone}
                    </p>
                  </div>
                </div>

                {shipment?.courier?.name && (
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold">Courier Information</h4>
                      <p className="text-sm">
                        Provider:{" "}
                        <span className="font-medium">
                          {shipment.courier.name}
                        </span>
                      </p>
                      <p className="text-sm">
                        Tracking:{" "}
                        <span className="font-mono text-primary">
                          {shipment.courier.trackingNumber}
                        </span>
                      </p>
                      {shipment.estimatedDelivery && (
                        <p className="text-xs text-green-600 mt-1 italic">
                          Estimated Delivery:{" "}
                          {format(
                            new Date(shipment.estimatedDelivery),
                            "MMM d, yyyy"
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-gray-400 mt-1" />
                  <div className="w-full">
                    <h4 className="font-semibold mb-2">Package Items</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {shipment?.items.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded"
                        >
                          <span className="truncate pr-2">
                            {item.productId?.product_name || "Unknown Product"}
                          </span>
                          <span className="font-semibold whitespace-nowrap">
                            x {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* History Timeline */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-semibold">
                <History className="h-5 w-5 text-gray-400" />
                <h4>Status History</h4>
              </div>
              <div className="space-y-4 pl-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
                {shipment?.statusHistory
                  .slice()
                  .reverse()
                  .map((h, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-5 top-1.5 h-3 w-3 rounded-full bg-white border-2 border-primary ring-4 ring-white" />
                      <div>
                        <p className="text-sm font-semibold">{h.status}</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(h.timestamp), "MMM d, yyyy HH:mm")}
                        </p>
                        {h.reason && (
                          <p className="text-xs text-gray-600 mt-1 italic">
                            "{h.reason}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
