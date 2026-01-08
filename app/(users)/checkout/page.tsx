"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { BillingForm } from "@/components/checkout/BillingForm";
import { PaymentMethod } from "@/components/checkout/PaymentMethod";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { getCart, calculateTotals, CartItem } from "@/lib/services/cartService";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Store_Data, useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getStorageItem } from "@/utils/storage";

const checkoutSchema = z.object({
  billingDetails: z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    streetAddress: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    country: z.string().min(2, "Country is required"),
    zipCode: z.string().min(4, "Zip code is required"),
    companyName: z.string().optional(),
  }),
  shippingAddress: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      streetAddress: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),
  useSameAddress: z.boolean(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<"billing" | "payment">("billing");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const getToken = () => {
    const data = getStorageItem<any>(Store_Data);
    return data?.accessToken;
  };

  let token = getToken();

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      billingDetails: {
        firstName: "",
        lastName: "",
        email: user?.email || "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        country: "ng",
        zipCode: "",
        companyName: "",
      },
      shippingAddress: {
        firstName: "",
        lastName: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        country: "ng",
        zipCode: "",
      },
      useSameAddress: true,
    },
  });

  const loadCart = async () => {
    setLoading(true);
    try {
      const items = await getCart(user?.id as string);
      if (items.length === 0) {
        // router.push("/cart");
        return;
      }
      setCartItems(items);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(isAuthenticated, "isAuthenticated");

    if (!isAuthenticated) {
      console.log(isAuthenticated, "isAuth");

      router.push("/auth/signIn");
      return;
    }
    loadCart();
    if (user?.email) {
      form.setValue("billingDetails.email", user.email);
    }
  }, [isAuthenticated, form]);

  const totals = calculateTotals(cartItems);

  const onSubmit = async (data: CheckoutFormData) => {
    if (step === "billing") {
      setStep("payment");
      window.scrollTo(0, 0);
      return;
    }

    // Place Order
    setIsProcessing(true);
    try {
      const payload = {
        userId: user?.id,
        userEmail: user?.email,
        items: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        billingDetails: data.billingDetails,
        shippingAddress: data.useSameAddress
          ? data.billingDetails
          : data.shippingAddress,
      };

      console.log(payload, "payload");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/order/create`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `SFX_Bearer_${token}`,
          },
        }
      );

      if (response.data.paymentLink) {
        window.location.href = response.data.paymentLink;
      } else {
        router.push("/track-order");
      }
    } catch (error: any) {
      console.error("Order Creation Failed:", error);
      alert(
        error.response?.data?.error ||
          "Order creation failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50/50">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">Checkout</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/cart" className="hover:text-primary">
                Shopping Cart
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Checkout</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-12">Loading checkout...</div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-card border rounded-lg p-6">
                {step === "billing" ? (
                  <BillingForm form={form} />
                ) : (
                  <PaymentMethod />
                )}
              </div>

              <div className="lg:col-span-1">
                <CheckoutSummary
                  subtotal={totals.subtotal}
                  shipping={totals.shipping}
                  tax={totals.tax}
                  total={totals.total}
                  itemCount={cartItems.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  )}
                  onConfirm={form.handleSubmit(onSubmit)}
                  isLoading={isProcessing}
                  buttonText={
                    step === "billing"
                      ? "Continue to Payment"
                      : "Place Order & Pay"
                  }
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
