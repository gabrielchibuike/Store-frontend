"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DealList } from "@/components/admin/deals/DealList";
import { DealForm } from "@/components/admin/deals/DealForm";
import { useSidebar } from "@/components/ui/sidebar";
import AdminHeader from "../AdminHeader";

export default function AdminDealsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<any>(null);
  const { state } = useSidebar();

  const handleCreate = () => {
    setEditingDeal(null);
    setIsFormOpen(true);
  };

  const handleEdit = (deal: any) => {
    setEditingDeal(deal);
    setIsFormOpen(true);
  };

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen  transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <AdminHeader title="" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Deals of the Day
            </h1>
            <p className="text-muted-foreground">
              Manage your daily discounts and limited-time offers.
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> Create Deal
          </Button>
        </div>

        <div className="border rounded-lg bg-card">
          <DealList onEdit={handleEdit} />
        </div>

        <DealForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          deal={editingDeal}
        />
      </div>
    </main>
  );
}
