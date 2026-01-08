"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useSidebar } from "@/components/ui/sidebar";
import { CustomersTable } from "./CustomersTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";

export function CustomersMainContent() {
  const { state } = useSidebar();

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <AdminHeader title="Customers" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-9 bg-gray-50 border-gray-200"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" className="text-gray-600">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="text-gray-600">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Customers Table */}
        <CustomersTable />
      </div>
    </main>
  );
}
