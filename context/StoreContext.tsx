"use client";

import { createStoreConfig, getStoreConfig } from "@/lib/services/storeConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface StoreContextType {
  isStoreSetup: boolean;
  categories: Category[];
  completeSetup: () => void;
  updateCategories: (categories: Category[]) => void;
  isLoading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [isStoreSetup, setIsStoreSetup] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const { data: storeConfig, isLoading } = useQuery({
    queryKey: ["store"],
    queryFn: () => getStoreConfig(),
    select: (response) => response.data,
  });

  useEffect(() => {
    if (storeConfig) {
      setIsStoreSetup(storeConfig.isSetup);
      setCategories(storeConfig.categories || []);
    }
  }, [storeConfig]);

  const { mutate: saveStoreConfig } = useMutation({
    mutationFn: (data: { isSetup: boolean; categories: Category[] }) =>
      createStoreConfig(data),
    onSuccess: (data) => {
      toast.success(data.message || "Store configuration saved");
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save store configuration");
    },
  });

  const completeSetup = () => {
    saveStoreConfig({ isSetup: true, categories });
  };

  const updateCategories = (newCategories: Category[]) => {
    // Optimistic update for local state
    setCategories(newCategories);
    saveStoreConfig({ isSetup: isStoreSetup, categories: newCategories });
  };

  return (
    <StoreContext.Provider
      value={{
        isStoreSetup,
        categories,
        completeSetup,
        updateCategories,
        isLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
