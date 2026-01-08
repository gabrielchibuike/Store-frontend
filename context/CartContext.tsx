"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import {
  CartItem,
  getCart,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
  updateQuantity as updateQuantityService,
  syncCart as syncCartService,
} from "@/lib/services/cartService";
import { Product } from "@/lib/services/productService";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { getStorageItem, setStorageItem } from "@/utils/storage";
import { toast } from "sonner";

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (
    productId: string,
    quantity?: number,
    product?: Product
  ) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  cartCount: number;
  dispatch: React.ActionDispatch<[action: CartAction]>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Action Types
type CartAction =
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { itemId: string; quantity: number } };

// Reducer
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "ADD_ITEM": {
      const existingItemIndex = state.findIndex(
        (item) => item.productId._id === action.payload.productId._id
      );
      if (existingItemIndex > -1) {
        const newState = [...state];
        newState[existingItemIndex] = {
          ...newState[existingItemIndex],
          quantity:
            newState[existingItemIndex].quantity + action.payload.quantity,
        };
        return newState;
      }
      return [...state, action.payload];
    }
    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action.payload);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item._id === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    default:
      return state;
  }
}

export const CART_STORAGE_KEY = "local_cart_state";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Refs for debouncing and preventing race conditions
  const updateTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const isHydrated = useRef(false);

  // 1. Hydrate from local storage on mount
  useEffect(() => {
    const storedCart = getStorageItem<CartItem[]>(CART_STORAGE_KEY);
    if (storedCart) {
      dispatch({ type: "SET_CART", payload: storedCart });
    }
    isHydrated.current = true;
  }, []);

  // 2. Sync with server ONLY when authenticated
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    syncCartWithServer(user.id);
  }, [isAuthenticated, user?.id]);

  // 3. Persist to local storage on change
  useEffect(() => {
    if (isHydrated.current) {
      setStorageItem(CART_STORAGE_KEY, cartItems);
    }
  }, [cartItems]);

  const syncCartWithServer = async (userId: string) => {
    try {
      const storedCart = getStorageItem<CartItem[]>(CART_STORAGE_KEY) || [];
      let finalCart: CartItem[] = [];

      if (storedCart.length > 0) {
        // Sync guest items with server
        const itemsToSync = storedCart.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        }));

        finalCart = await syncCartService(userId, itemsToSync);
        // Clear local storage after successful sync to avoid re-syncing
        localStorage.removeItem(CART_STORAGE_KEY);
      } else {
        // Just fetch server items
        finalCart = await getCart(userId);
      }

      dispatch({ type: "SET_CART", payload: finalCart });
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  };

  const addToCart = async (
    productId: string,
    quantity: number = 1,
    product?: Product
  ) => {
    // 1. Handle Local State (Optimistic / Guest)
    const optimisticItem: CartItem = {
      _id: `temp-${Date.now()}`,
      productId: product as Product,
      quantity: quantity,
    };
    dispatch({ type: "ADD_ITEM", payload: optimisticItem });
    toast.success("Item added to cart");

    // if (product) {
    // } else {
    //   // If we don't have product details and we are guest, we can't add to local cart properly
    //   // We might need to fetch it, but for now let's warn if dev didn't pass it
    //   if (!isAuthenticated) {
    //     console.warn("Cannot add to guest cart without product details");
    //     return;
    //   }
    // }

    // 2. Sync with Server (if authenticated)
    if (isAuthenticated && user?.id) {
      try {
        const updatedCart = await addToCartService(
          user.id,
          productId,
          quantity
        );
        dispatch({ type: "SET_CART", payload: updatedCart });
        // if (!product) toast.success("Item added to cart");
      } catch (error) {
        console.error("Failed to add to cart:", error);
        toast.error("Failed to add item to cart");
        // Rollback if optimistic update was done
        if (product) {
          syncCartWithServer(user.id);
        }
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    // Snapshot for rollback
    const previousCart = [...cartItems];

    // 1. Optimistic / Local Update
    dispatch({ type: "REMOVE_ITEM", payload: itemId });

    // 2. Sync with Server (if authenticated)
    if (isAuthenticated && user?.id) {
      try {
        await removeFromCartService(user.id, itemId);
      } catch (error) {
        console.error("Failed to remove from cart:", error);
        toast.error("Failed to remove item");
        // Rollback
        dispatch({ type: "SET_CART", payload: previousCart });
      }
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    // 1. Optimistic / Local Update
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity } });

    // 2. Sync with Server (if authenticated)
    if (isAuthenticated && user?.id) {
      // Debounce Server Sync
      if (updateTimeouts.current[itemId]) {
        clearTimeout(updateTimeouts.current[itemId]);
      }

      updateTimeouts.current[itemId] = setTimeout(async () => {
        try {
          const updatedCart = await updateQuantityService(
            user.id,
            itemId,
            quantity
          );
          dispatch({ type: "SET_CART", payload: updatedCart });
        } catch (error) {
          console.error("Failed to update quantity:", error);
          toast.error("Failed to update quantity");
          syncCartWithServer(user.id);
        }
        delete updateTimeouts.current[itemId];
      }, 500); // 500ms debounce
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading: false,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
