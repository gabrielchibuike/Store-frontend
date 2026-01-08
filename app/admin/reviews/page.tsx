"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ReviewsMainContent } from "@/components/admin/reviews/ReviewsMainContent";

export default function ReviewsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AdminSidebar />
        <ReviewsMainContent />
      </div>
    </SidebarProvider>
  );
}
