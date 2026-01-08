"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  WishlistItem,
  getWishlist,
  addToWishlist as addToWishlistService,
  removeFromWishlist as removeFromWishlistService,
} from "@/lib/services/wishlistService";
import { Product } from "@/lib/services/productService";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  loading: boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (itemId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadWishlist(user.id);
    } else {
      setWishlistItems([]);
    }
  }, [isAuthenticated, user?.id]);

  const loadWishlist = async (userId: string) => {
    setLoading(true);
    try {
      const items = await getWishlist(userId);
      console.log(items, "items");

      setWishlistItems(items);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!isAuthenticated || !user?.id) {
      router.push("/auth/signIn");

      console.warn("User not authenticated");
      return;
    }
    try {
      const updatedWishlist = await addToWishlistService(user.id, productId);
      setWishlistItems(updatedWishlist);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    if (!isAuthenticated || !user?.id) return;
    try {
      const updatedWishlist = await removeFromWishlistService(user.id, itemId);
      setWishlistItems(updatedWishlist);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.productId._id === productId);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
