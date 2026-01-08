"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CheckoutSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  onConfirm: () => void;
  buttonText?: string;
  isLoading?: boolean;
}

export function CheckoutSummary({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
  onConfirm,
  buttonText = "Continue to Payment",
  isLoading = false,
}: CheckoutSummaryProps) {
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

        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-bold text-base">Total</span>
          <span className="font-bold text-lg">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        className="w-full bg-[#4A2B0F] hover:bg-[#3A220B] h-12"
        onClick={onConfirm}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {buttonText}
      </Button>
    </div>
  );
}
