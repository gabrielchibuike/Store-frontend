"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminOrderDetails } from "@/components/admin/orders/OrderDetails/AdminOrderDetails";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  return <AdminOrderDetails orderId={id} />;
}
