"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../reduxStore/store";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Provider store={store}>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </Provider>
    </>
  );
}

export default Providers;
