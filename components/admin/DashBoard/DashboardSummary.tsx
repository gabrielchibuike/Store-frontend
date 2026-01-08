"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "@/lib/services/dashboardService";
import { DollarSign, ShoppingBag, Users, Package, Loader2 } from "lucide-react";

export function DashboardSummary() {
  const { data: summary, isLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
  });

  const metrics = [
    {
      title: "Total Revenue",
      value: summary ? `$${summary.revenue.toLocaleString()}` : "$0",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Orders",
      value: summary?.orders || 0,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Customers",
      value: summary?.customers || 0,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Products",
      value: summary?.products || 0,
      icon: Package,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <Card
          key={idx}
          className="border-none shadow-sm overflow-hidden relative"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.bg} ${metric.color}`}>
              <metric.icon size={16} />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <div className="text-2xl font-bold">{metric.value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
