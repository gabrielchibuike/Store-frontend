"use client";

import { DollarSign, ShoppingBag, Package, CreditCard } from "lucide-react";

interface AdminProductStatsProps {
  price: number;
  orders: number;
  stock: number;
  revenue: number;
}

export function AdminProductStats({
  price,
  orders,
  stock,
  revenue,
}: AdminProductStatsProps) {
  const stats = [
    {
      label: "PRICE",
      value: `$${price}`,
      icon: DollarSign,
      color: "text-teal-600",
    },
    {
      label: "ORDERS",
      value: orders,
      icon: ShoppingBag,
      color: "text-teal-600",
    },
    {
      label: "AVAILABLE STOCKS",
      value: stock,
      icon: Package,
      color: "text-teal-600",
    },
    {
      label: "TOTAL REVENUE",
      value: `$${revenue.toFixed(2)}`,
      icon: CreditCard,
      color: "text-teal-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 shadow-sm"
        >
          <div className="flex items-center gap-2 text-secondary font-bold text-lg">
            <stat.icon className="w-5 h-5" />
            {stat.value}
          </div>
          <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
