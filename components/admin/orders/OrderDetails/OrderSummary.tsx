"use client";

import { Order } from "@/lib/services/orderService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const subtotal = order.totalPrices; // In this model, totalPrices seems to be the total
  const discount = 0;
  const shipping = 0;
  const tax = 0;
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 uppercase text-xs font-bold">
            Sub Total :
          </span>
          <span className="font-bold text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 uppercase text-xs font-bold">
            Discount :
          </span>
          <span className="font-bold text-gray-900">
            ${discount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 uppercase text-xs font-bold">
            Shipping Charge :
          </span>
          <span className="font-bold text-gray-900">
            ${shipping.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 uppercase text-xs font-bold">
            Estimated Tax :
          </span>
          <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t pt-4 mt-4 flex justify-between items-center">
          <span className="text-gray-500 uppercase text-xs font-bold">
            Total (USD) :
          </span>
          <span className="font-bold text-gray-900 text-lg">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <Input
          placeholder="Enter Discount Code"
          className="bg-gray-50 border-gray-200"
        />
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          Apply
        </Button>
      </div>
    </div>
  );
}
