import React from "react";
import { SalesChart } from "./SalesChart";
import { NewUpdate } from "./NewUpdate";
import { TopSelling } from "./TopSelling";
import { OrderList } from "./OrderList";
import { LatestOffer } from "./LatestOffer";
import { useSidebar } from "@/components/ui/sidebar";
import AdminHeader from "../AdminHeader";

import { DashboardSummary } from "./DashboardSummary";

function DashBoadMainContent() {
  const { state } = useSidebar();

  return (
    <div>
      {/* Main content */}
      <main
        className={`flex-1 flex flex-col min-h-screen  transition-all duration-300 ease-in-out ${
          state === "collapsed" ? "ml-20" : "ml-72"
        }`}
      >
        <AdminHeader title="Dashboard" />
        <div className=" flex flex-col gap-4 p-4">
          <DashboardSummary />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SalesChart />
            <NewUpdate />
            <TopSelling />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <OrderList />
            <LatestOffer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashBoadMainContent;
