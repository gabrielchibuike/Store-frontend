"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "../../context/StoreContext";
import { CategoryConfiguration } from "./CategoryConfiguration";

export function StoreSetupModal() {
  const {
    isStoreSetup,
    completeSetup,
    categories,
    updateCategories,
    isLoading,
  } = useStore();

  if (isLoading) return null;

  return (
    <Dialog open={!isStoreSetup}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Welcome to Your Store Setup</DialogTitle>
          <DialogDescription>
            Before you can start using the admin dashboard, you need to
            configure your store's product categories. You can always change
            these later in the Store section.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <CategoryConfiguration
            categories={categories}
            onUpdate={updateCategories}
          />
        </div>

        <DialogFooter>
          <Button
            onClick={completeSetup}
            disabled={categories.length === 0}
            className="w-full sm:w-auto"
          >
            Complete Setup & Enter Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
