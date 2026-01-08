"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";

const history = [
  {
    device: "Web",
    date: "Apr 10, 2023 at 07:18AM",
    icon: Monitor,
  },
  {
    device: "Ipad",
    date: "Apr 09, 2023 at 09:20 AM",
    icon: Tablet,
  },
  {
    device: "Iphone",
    date: "Apr 02, 2023 at 09:00AM",
    icon: Smartphone,
  },
  {
    device: "Web",
    date: "Mar 28, 2023 at 08:08AM",
    icon: Monitor,
  },
  {
    device: "Web",
    date: "Mar 20, 2023 at 09:13AM",
    icon: Monitor,
  },
];

export function LoginHistory() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Login History</h3>
        <Button
          variant="outline"
          size="sm"
          className="text-teal-600 border-teal-200 bg-teal-50 hover:bg-teal-100"
        >
          All Logout
        </Button>
      </div>

      <div className="space-y-6">
        {history.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-teal-600 border border-gray-100">
                <item.icon size={18} />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">
                  {item.device}
                </div>
                <div className="text-xs text-gray-500">{item.date}</div>
              </div>
            </div>
            <button className="text-xs font-bold text-orange-500 hover:text-orange-600 uppercase">
              Logout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
