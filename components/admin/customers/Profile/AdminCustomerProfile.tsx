"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerHeader } from "./CustomerHeader";
import { CustomerOverview } from "./CustomerOverview";
import { CustomerOrders } from "./CustomerOrders";
import { CustomerSupport } from "./CustomerSupport";
import { useQuery } from "@tanstack/react-query";
import { getCustomerProfile } from "@/lib/services/orderService";
import { Loader2 } from "lucide-react";

interface AdminCustomerProfileProps {
  customerId: string;
}

export function AdminCustomerProfile({
  customerId,
}: AdminCustomerProfileProps) {
  const { state } = useSidebar();

  const {
    data: customer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-customer", customerId],
    queryFn: () => getCustomerProfile(customerId),
    enabled: !!customerId,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen text-red-500 font-medium">
        Error loading customer profile. Please try again later.
      </div>
    );
  }

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <AdminHeader title="Customer Profile" />

      <div className="p-6 space-y-6">
        <CustomerHeader customer={customer} />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <CustomerOverview customer={customer} />
          </TabsContent>
          <TabsContent value="orders" className="mt-6">
            <CustomerOrders customerId={customerId} />
          </TabsContent>
          {/* <TabsContent value="support" className="mt-6">
            <CustomerSupport customerId={customerId} />
          </TabsContent> */}
        </Tabs>
      </div>
    </main>
  );
}
