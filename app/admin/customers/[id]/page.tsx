"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminCustomerProfile } from "@/components/admin/customers/Profile/AdminCustomerProfile";
import { useParams } from "next/navigation";

export default function CustomerProfilePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AdminSidebar />
        <AdminCustomerProfile customerId={id} />
      </div>
    </SidebarProvider>
  );
}
