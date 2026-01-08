"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { CustomersMainContent } from "@/components/admin/customers/CustomersMainContent";

export default function CustomersPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AdminSidebar />
        <CustomersMainContent />
      </div>
    </SidebarProvider>
  );
}
