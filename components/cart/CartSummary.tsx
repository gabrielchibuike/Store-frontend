"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export function CartSummary({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
}: CartSummaryProps) {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-6">
      <h2 className="font-bold text-lg">Order Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Items</span>
          <span className="font-medium">{itemCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sub Total</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Taxes</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Coupon Discount</span>
          <span className="font-medium text-destructive">-$0.00</span>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-bold text-base">Total</span>
          <span className="font-bold text-lg">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full bg-[#4A2B0F] hover:bg-[#3A220B] h-12" asChild>
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  );
}
