"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CART_STORAGE_KEY, useCart } from "@/context/CartContext";
import { getStorageItem, setStorageItem } from "@/utils/storage";
import { Store_Data } from "@/context/AuthContext";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const { dispatch } = useCart();

  const getToken = () => {
    const data = getStorageItem<any>(Store_Data);
    return data?.accessToken;
  };

  let token = getToken();

  useEffect(() => {
    if (reference) {
      verifyPayment();
    } else {
      setStatus("failed");
      setMessage("Invalid payment reference.");
    }
  }, [reference]);

  const verifyPayment = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/order/status/${reference}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `SFX_Bearer_${token}`,
          },
        }
      );
      if (
        response.data.success &&
        response.data.order.paymentStatus === "Paid"
      ) {
        setStatus("success");
        setStorageItem(CART_STORAGE_KEY, []);
        dispatch({ type: "SET_CART", payload: [] });
      } else {
        setStatus("failed");
        setMessage("Payment verification failed or was not completed.");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setStatus("failed");
      setMessage(
        error.response?.data?.error || "An error occurred during verification."
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      {status === "loading" && (
        <div className="space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <h2 className="text-2xl font-bold">Verifying Payment...</h2>
          <p className="text-muted-foreground">
            Please wait while we confirm your transaction.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-6">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-3xl font-bold text-green-600">
            Payment Successful!
          </h2>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button
              onClick={() => router.push("/track-order")}
              className="bg-[#4A2B0F]"
            >
              Track My Order
            </Button>
            <Button variant="outline" onClick={() => router.push("/shop")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      )}

      {status === "failed" && (
        <div className="space-y-6">
          <XCircle className="h-16 w-16 text-destructive mx-auto" />
          <h2 className="text-3xl font-bold text-destructive">
            Payment Failed
          </h2>
          <p className="text-lg text-muted-foreground">
            {message ||
              "We couldn't verify your payment. Please contact support if you were debited."}
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button
              onClick={() => router.push("/checkout")}
              className="bg-[#4A2B0F]"
            >
              Try Again
            </Button>
            <Button variant="outline" onClick={() => router.push("/contact")}>
              Contact Support
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-24 text-center">
              Loading...
            </div>
          }
        >
          <VerifyContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
