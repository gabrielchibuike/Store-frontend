"use client";

import { useState } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrackingResult } from "@/components/tracking/TrackingResult";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && email) {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50/50">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">
              Track Your Order
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">
                Track Your Order
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {!showResult ? (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  To track your order please enter your Order ID in the box
                  below and press the "Track Order" button. This was given to
                  you on your receipt and in the confirmation email you should
                  have received.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-card p-8 rounded-lg border"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Order ID *</label>
                  <Input
                    placeholder="Enter Your Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Billing Email *</label>
                  <Input
                    type="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-[#4A2B0F] hover:bg-[#3A220B] h-12 px-8"
                >
                  Track Order
                </Button>
              </form>
            </div>
          ) : (
            <TrackingResult orderId={orderId} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
