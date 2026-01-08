"use client";

import React from "react";
import { format } from "date-fns";
import {
  CheckCircle2,
  Circle,
  Clock,
  Truck,
  Package,
  Home,
  AlertCircle,
} from "lucide-react";

interface StatusUpdate {
  status: string;
  timestamp: string;
  reason?: string;
}

const STATUS_ICONS: Record<string, any> = {
  PENDING: Package,
  PACKED: Package,
  SHIPPED: Truck,
  IN_TRANSIT: Truck,
  DELIVERED: Home,
  FAILED: AlertCircle,
  RETURNED: Clock,
};

const STATUS_ORDER = [
  "PENDING",
  "PACKED",
  "SHIPPED",
  "IN_TRANSIT",
  "DELIVERED",
];

export default function ShipmentTimeline({
  history,
}: {
  history: StatusUpdate[];
}) {
  const currentStatus = history[history.length - 1]?.status;

  // Create a display history that includes mandatory steps even if not yet reached
  const displaySteps = STATUS_ORDER.map((status) => {
    const update = history.find((h) => h.status === status);
    const isCompleted = !!update;
    const isCurrent = currentStatus === status;

    return {
      status,
      isCompleted,
      isCurrent,
      timestamp: update?.timestamp,
      reason: update?.reason,
    };
  });

  // Add special statuses like FAILED or RETURNED if they exist in history
  history.forEach((h) => {
    if (!STATUS_ORDER.includes(h.status)) {
      displaySteps.push({
        status: h.status,
        isCompleted: true,
        isCurrent: currentStatus === h.status,
        timestamp: h.timestamp,
        reason: h.reason,
      });
    }
  });

  return (
    <div className="space-y-8 relative">
      <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-200" />

      {displaySteps.map((step, idx) => {
        const Icon = STATUS_ICONS[step.status] || Circle;
        const colorClass = step.isCompleted
          ? step.status === "FAILED"
            ? "bg-red-500"
            : "bg-primary"
          : "bg-gray-200";
        const iconColor = step.isCompleted ? "text-white" : "text-gray-400";

        return (
          <div key={idx} className="relative pl-10">
            <div
              className={`absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center z-10 ${colorClass} ${iconColor}`}
            >
              {step.isCompleted ? (
                <Icon className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </div>

            <div
              className={`flex flex-col ${
                !step.isCompleted ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold ${
                    step.isCurrent
                      ? "text-primary text-lg"
                      : "text-sm text-gray-700"
                  }`}
                >
                  {step.status}
                </span>
                {step.isCompleted && step.timestamp && (
                  <span className="text-xs text-gray-500">
                    {format(new Date(step.timestamp), "MMM d, HH:mm")}
                  </span>
                )}
              </div>
              {step.reason && (
                <p className="text-xs text-gray-600 mt-1 italic">
                  {step.reason}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
