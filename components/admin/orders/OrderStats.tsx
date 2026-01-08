"use client";

import {
  List,
  Loader2,
  CheckCircle2,
  Truck,
  RotateCcw,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOrderStats } from "@/lib/services/orderService";

export function OrderStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-order-stats"],
    queryFn: getOrderStats,
  });

  const stats = data || {
    allOrders: 0,
    pending: 0,
    completed: 0,
    processing: 0,
    returned: 0,
    cancelled: 0,
    failed: 0,
  };

  const formatCount = (num: number) => {
    return num > 1000 ? (num / 1000).toFixed(1) + "k" : num;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Order Statuses */}
      <div className="bg-teal-500 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-teal-500/50 flex items-center justify-center z-10 backdrop-blur-[1px]">
            <Loader2 className="animate-spin" />
          </div>
        )}
        <h3 className="text-xs font-bold uppercase mb-6 opacity-90 tracking-wider">
          Order Statuses
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center text-gray-800 shadow-sm border border-white/20">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-teal-50 rounded-full text-teal-600">
                <List size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold">
              {formatCount(stats.allOrders)}
            </div>
            <div className="text-[10px] uppercase text-gray-500 font-bold mt-1">
              All Orders
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm border border-white/20">
            <div className="flex justify-center mb-2 text-white">
              <Loader2 size={20} />
            </div>
            <div className="text-2xl font-bold">
              {formatCount(stats.pending)}
            </div>
            <div className="text-[10px] uppercase font-bold mt-1 opacity-80">
              Pending
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm border border-white/20">
            <div className="flex justify-center mb-2">
              <CheckCircle2 size={20} />
            </div>
            <div className="text-2xl font-bold">
              {formatCount(stats.completed)}
            </div>
            <div className="text-[10px] uppercase font-bold mt-1 opacity-80">
              Completed
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm border border-white/20">
            <div className="flex justify-center mb-2">
              <Truck size={20} />
            </div>
            <div className="text-2xl font-bold">
              {formatCount(stats.processing)}
            </div>
            <div className="text-[10px] uppercase font-bold mt-1 opacity-80">
              Progress
            </div>
          </div>
        </div>
      </div>

      {/* Failed/Issues Section */}
      <div className="bg-blue-500 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-blue-500/50 flex items-center justify-center z-10 backdrop-blur-[1px]">
            <Loader2 className="animate-spin" />
          </div>
        )}
        <h3 className="text-xs font-bold uppercase mb-6 opacity-90 tracking-wider">
          Issues & Returns
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center text-gray-800 shadow-sm border border-white/20">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-blue-50 rounded-full text-blue-500">
                <RotateCcw size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold">
              {formatCount(stats.returned)}
            </div>
            <div className="text-[10px] uppercase text-gray-500 font-bold mt-1">
              Returned
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm border border-white/20">
            <div className="flex justify-center mb-2">
              <XCircle size={20} />
            </div>
            <div className="text-2xl font-bold">
              {formatCount(stats.cancelled)}
            </div>
            <div className="text-[10px] uppercase font-bold mt-1 opacity-80">
              Canceled
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm border border-white/20">
            <div className="flex justify-center mb-2">
              <AlertTriangle size={20} />
            </div>
            <div className="text-2xl font-bold">
              {formatCount(stats.failed)}
            </div>
            <div className="text-[10px] uppercase font-bold mt-1 opacity-80">
              Failed
            </div>
          </div>
          {/* <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm border border-white/20 flex flex-col justify-center items-center">
            <div className="text-xs opacity-60 italic">Real-time</div>
            <div className="text-xs opacity-60 italic">Updates</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
