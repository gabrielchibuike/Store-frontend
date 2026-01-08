"use client";

import { Check, Package, Truck, MapPin, Box, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface OrderTrackingProps {
  shipment?: any;
  orderStatus: string;
}

const STEPS = [
  { status: "Pending", title: "Order Placed", icon: Box },
  { status: "PACKED", title: "Packed", icon: Package },
  { status: "SHIPPED", title: "Shipped", icon: Truck },
  { status: "IN_TRANSIT", title: "In Transit", icon: MapPin },
  { status: "DELIVERED", title: "Delivered", icon: Check },
];

export function OrderTracking({ shipment, orderStatus }: OrderTrackingProps) {
  const history = shipment?.statusHistory || [];
  const currentStatus = shipment?.status || orderStatus;

  // Find the index of the current status in STEPS
  const currentStepIndex = STEPS.findIndex(
    (s) => s.status.toUpperCase() === currentStatus.toUpperCase()
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Track Order</h3>
      <p className="text-xs text-gray-500 uppercase font-bold mb-6">
        Tracking ID: {shipment?.trackingId || "Not Available"}
      </p>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gray-100" />

        <div className="space-y-8">
          {STEPS.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const historyItem = history.find(
              (h: any) => h.status.toUpperCase() === step.status.toUpperCase()
            );

            return (
              <div key={step.status} className="relative flex gap-4">
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 ${
                    isActive
                      ? "border-teal-500 bg-white text-teal-500"
                      : "border-gray-100 bg-white text-gray-300"
                  }`}
                >
                  <step.icon size={18} />
                </div>
                <div className="flex flex-col pt-1">
                  <span
                    className={`font-bold text-sm ${
                      isActive ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5">
                    {historyItem?.comment ||
                      (isActive
                        ? "Processed successfully"
                        : "Pending processing")}
                  </span>
                  {historyItem && (
                    <span className="text-[10px] text-gray-400 mt-1">
                      {format(
                        new Date(historyItem.timestamp),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {shipment?.courier && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100 italic text-sm text-gray-600">
          Courier: {shipment.courier}
        </div>
      )}
    </div>
  );
}
