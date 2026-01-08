"use client";

import { CategoryConfiguration } from "@/components/admin/CategoryConfiguration";
import { useStore } from "@/context/StoreContext";
import { useSidebar } from "@/components/ui/sidebar";

export default function StorePage() {
  const { state } = useSidebar();
  const { categories, updateCategories } = useStore();

  return (
    <main
      className={`flex-1 flex bg-accent/80 flex-col min-h-screen transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">Store Configuration</h1>
        <CategoryConfiguration
          categories={categories}
          onUpdate={updateCategories}
        />
      </div>
    </main>
  );
}
