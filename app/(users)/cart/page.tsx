"use client";

import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { calculateTotals } from "@/lib/services/cartService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, loading, updateQuantity, removeFromCart } = useCart();

  const totals = calculateTotals(cartItems);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        {/* Breadcrumbs */}
        <div className="bg-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">
              Shopping Cart
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Shopping Cart</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-12">Loading cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-lg text-muted-foreground">
                Your cart is empty.
              </p>
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-card border rounded-lg overflow-hidden">
                  <div className="hidden sm:grid grid-cols-[auto_1fr_100px_120px_100px] gap-4 p-4 bg-secondary/80 text-foreground  text-sm">
                    <div className="w-12"></div> {/* Remove button space */}
                    <div className="pl-24">Product</div>
                    <div className="text-center">Price</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-right">Subtotal</div>
                  </div>
                  <div className="p-4 sm:p-0">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="Coupon Code"
                    className="sm:w-64 bg-white"
                  />
                  <Button className="bg-[#4A2B0F] hover:bg-[#3A220B]">
                    Apply Coupon
                  </Button>
                  <div className="flex-1 text-right">
                    <Button
                      variant="link"
                      className="text-muted-foreground hover:text-primary underline"
                    >
                      Clear Shopping Cart
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <CartSummary
                  subtotal={totals.subtotal}
                  shipping={totals.shipping}
                  tax={totals.tax}
                  total={totals.total}
                  itemCount={cartItems.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
