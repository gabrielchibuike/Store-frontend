"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminProductDetails } from "@/components/admin/products/ProductDetails/AdminProductDetails";
import { useParams } from "next/navigation";

export default function AdminProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <AdminProductDetails productId={id} />
      </div>
    </SidebarProvider>
  );
}
