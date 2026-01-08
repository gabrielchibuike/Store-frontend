"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SettingsMainContent } from "@/components/admin/settings/SettingsMainContent";

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AdminSidebar />
        <SettingsMainContent />
      </div>
    </SidebarProvider>
  );
}
