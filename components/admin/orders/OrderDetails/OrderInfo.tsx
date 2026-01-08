"use client";

import { Order } from "@/lib/services/orderService";

interface OrderInfoProps {
  order: Order;
}

export function OrderInfo({ order }: OrderInfoProps) {
  const { shippingAddress, billingDetails, userId } = order;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Comment Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Comment</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 min-h-[100px] text-sm text-gray-500">
          {order.invoiceReference
            ? `Invoice Ref: ${order.invoiceReference}`
            : "No additional comments from the customer."}
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase text-xs font-bold">
              Full Name
            </span>
            <span className="font-medium text-gray-900">
              {shippingAddress.firstName} {shippingAddress.lastName}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-gray-500 uppercase text-xs font-bold whitespace-nowrap">
              Address
            </span>
            <span className="font-medium text-gray-900 text-right">
              {shippingAddress.streetAddress}, {shippingAddress.city},{" "}
              {shippingAddress.state}, {shippingAddress.zipCode},{" "}
              {shippingAddress.country}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase text-xs font-bold">
              Phone Number
            </span>
            <span className="font-medium text-gray-900">
              {shippingAddress.phone}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase text-xs font-bold">
              Email
            </span>
            <span className="font-medium text-gray-900">
              {billingDetails.email}
            </span>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-[#EAE8E4] rounded-xl p-6 relative overflow-hidden min-h-[200px] flex flex-col justify-center">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            Sale Designer
          </h3>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Brands</h3>
          <button className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase">
            Sale -32%
          </button>
        </div>
        {/* Placeholder for the image background/element */}
        <div
          className="absolute right-0 bottom-0 h-full w-1/2 bg-contain bg-no-repeat bg-bottom opacity-80"
          style={{ backgroundImage: "url(/placeholder-woman.png)" }}
        ></div>
      </div>

      {/* Payment Details */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase text-xs font-bold whitespace-nowrap mr-4">
              Paystack Ref:
            </span>
            <span className="font-medium text-gray-900 break-all text-right">
              {order.paymentReference || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase text-xs font-bold">
              Payment Status:
            </span>
            <span
              className={`font-bold ${
                order.paymentStatus === "Paid"
                  ? "text-green-600"
                  : order.paymentStatus === "Failed"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase text-xs font-bold">
              Billing Name:
            </span>
            <span className="font-medium text-gray-900">
              {billingDetails.firstName} {billingDetails.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase text-xs font-bold">
              Invoice Num:
            </span>
            <span className="font-medium text-gray-900">
              {order.invoiceNumber || "Not Generated"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
