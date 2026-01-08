"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useSidebar } from "@/components/ui/sidebar";
import { OrderStats } from "./OrderStats";
import { OrdersTable } from "./OrdersTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter } from "lucide-react";
import { useDebounce } from "use-debounce";

export function OrdersMainContent() {
  const { state } = useSidebar();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const stats = [
    { label: "ALL ORDERS", status: "ALL", color: "bg-primary" },
    { label: "DELIVERED", status: "Delivered", color: "gray" },
    { label: "PROCESSING", status: "Processing", color: "gray" },
    { label: "CANCELLED", status: "Cancelled", color: "gray" },
  ];

  return (
    <main
      className={`flex-1 flex bg-accent/80 flex-col min-h-screen transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <AdminHeader title="Orders" />

      <div className="p-6 space-y-6">
        {/* Stats Section */}
        <OrderStats />

        {/* Actions Bar */}
        <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Order ..."
              className="pl-9 bg-gray-50 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* <Button
              variant="outline"
              className="text-teal-700 border-teal-100 bg-teal-50 hover:bg-teal-100 hover:text-teal-800"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button> */}
            <Button className="bg-primary text-white">Create Order</Button>
          </div>
        </div>

        {/* Filters & Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground overflow-x-auto">
              {stats.map((stat) => (
                <button
                  key={stat.status}
                  onClick={() => setStatusFilter(stat.status)}
                  className={`${
                    statusFilter === stat.status
                      ? "text-secondary border-b-2 border-secondary"
                      : "hover:text-gray-900"
                  } pb-1 px-1 font-medium whitespace-nowrap transition-colors`}
                >
                  {stat.label}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          <OrdersTable status={statusFilter} search={debouncedSearch} />
        </div>
      </div>
    </main>
  );
}
