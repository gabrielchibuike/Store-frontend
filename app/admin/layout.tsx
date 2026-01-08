import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StoreProvider } from "@/context/StoreContext";
import { StoreSetupModal } from "@/components/admin/StoreSetupModal";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <StoreProvider>
        <AdminSidebar />
        <StoreSetupModal />
        <div className="flex min-h-screen w-full">{children}</div>
      </StoreProvider>
    </SidebarProvider>
  );
}
