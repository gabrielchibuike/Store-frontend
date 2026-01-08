"use client";

import React, { useState, useEffect } from "react";
import { trackShipment, Shipment } from "@/lib/services/shipmentService";
import ShipmentTimeline from "@/components/user/ShipmentTimeline";
import { Loader2, AlertCircle, Package, Truck, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TrackingResultProps {
  orderId: string;
}

export function TrackingResult({ orderId }: TrackingResultProps) {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracking = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await trackShipment(orderId);
        setShipment(data);
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            "Could not find tracking information for this ID."
        );
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchTracking();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-gray-500 animate-pulse">
          Retrieving tracking data...
        </p>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 flex flex-col items-center text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <div>
          <h3 className="text-lg font-bold text-red-700">Tracking Not Found</h3>
          <p className="text-red-600 max-w-md">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <Badge
          variant="outline"
          className="px-4 py-1 text-sm font-semibold uppercase tracking-widest text-primary border-primary"
        >
          {shipment.status}
        </Badge>
        <h2 className="text-3xl font-bold">Order Tracking</h2>
        <p className="text-muted-foreground font-mono">
          ID: #{orderId.toUpperCase()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Column */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border shadow-sm">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Delivery Progress
          </h3>
          <ShipmentTimeline history={shipment.statusHistory} />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Courier Info */}
          {shipment.courier?.name && (
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Shipping Info
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Courier:</span>{" "}
                  <span className="font-semibold">{shipment.courier.name}</span>
                </p>
                <p>
                  <span className="text-gray-500">Tracking #:</span>{" "}
                  <span className="font-mono font-medium text-primary">
                    {shipment.courier.trackingNumber}
                  </span>
                </p>
                {shipment.estimatedDelivery && (
                  <div className="pt-2 flex items-center gap-2 text-green-700 font-medium">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Est.{" "}
                      {format(
                        new Date(shipment.estimatedDelivery),
                        "MMM d, yyyy"
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Product List */}
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Package Contents
            </h4>
            <div className="space-y-4">
              {shipment.items.map((item: any, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 items-center border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase">
                    Item
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {item.productId?.product_name || "Product"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
