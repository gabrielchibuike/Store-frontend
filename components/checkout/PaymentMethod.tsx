"use client";

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Wallet } from "lucide-react";
import Image from "next/image";

export function PaymentMethod() {
  return (
    <div className="space-y-6">
      <h2 className="font-bold text-lg">Select Payment Method</h2>

      <RadioGroup defaultValue="card" className="space-y-4">
        <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="paystack" id="paystack" className="size-6" />
          <Label
            htmlFor="paypal"
            className="flex items-center gap-2 cursor-pointer"
          >
            {/* <Wallet className="h-4 w-4 text-blue-600" /> */}
            <img src={"/download.png"} alt="download.png" className="w-12" />
            <div className="text-lg font-semibold">Paystack</div>
          </Label>
        </div>

        <span className="font-medium text-sm text-center">
          More Payment Method will be provided soon.
        </span>

        {/* <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="card" id="card" />
          <Label
            htmlFor="card"
            className="flex items-center gap-2 cursor-pointer"
          >
            <CreditCard className="h-4 w-4 text-blue-800" /> **** **** **** 8047
          </Label>
        </div>

        <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="gpay" id="gpay" />
          <Label
            htmlFor="gpay"
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="font-bold text-blue-500">G</span> Google Pay
          </Label>
        </div> */}

        {/* <div className="flex items-center space-x-2 border p-4 rounded-md">
          <RadioGroupItem value="cod" id="cod" />
          <Label
            htmlFor="cod"
            className="flex items-center gap-2 cursor-pointer"
          >
            Cash On Delivery
          </Label>
        </div> */}

        {/* <div className="border p-4 rounded-md space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new-card" id="new-card" />
            <Label htmlFor="new-card" className="cursor-pointer">
              Add New Credit/Debit Card
            </Label>
          </div>

          <div className="pl-6 space-y-4">
            <div className="space-y-2">
              <Label>Card Holder Name *</Label>
              <Input placeholder="Ex. John Doe" />
            </div>
            <div className="space-y-2">
              <Label>Card Number *</Label>
              <Input placeholder="4716 9627 1635 8047" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiry Date *</Label>
                <Input placeholder="03/30" />
              </div>
              <div className="space-y-2">
                <Label>CVV *</Label>
                <Input placeholder="000" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="save-card" />
              <Label htmlFor="save-card">Save card for future payments</Label>
            </div>
            <button className="bg-[#4A2B0F] text-white px-6 py-2 rounded-md hover:bg-[#3A220B] transition-colors">
              Add Card
            </button>
          </div>
        </div> */}
      </RadioGroup>
    </div>
  );
}
