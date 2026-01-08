"use client";

import Image from "next/image";

interface OrderItemsProps {
  items: any[];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase border-b">
            <tr>
              <th className="p-4 font-bold">Product</th>
              <th className="p-4 font-bold text-right">Price</th>
              <th className="p-4 font-bold text-center">Quantity</th>
              <th className="p-4 font-bold text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="border-b last:border-0 hover:bg-gray-50/50"
              >
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden relative">
                      {item.productId?.product_image?.[0] ? (
                        <Image
                          src={item.productId.product_image[0]}
                          alt={item.productId.product_name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.productId?.product_name || "Unknown Product"}
                      </div>
                      <div className="text-xs text-gray-500 uppercase mt-0.5">
                        Product ID:{" "}
                        {item.productId?._id
                          ? item.productId._id
                              .substring(item.productId._id.length - 8)
                              .toUpperCase()
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-medium text-gray-900">
                  ${item.price.toFixed(2)}
                </td>
                <td className="p-4 text-center text-gray-600">
                  {String(item.quantity).padStart(2, "0")}
                </td>
                <td className="p-4 text-right font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
