"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/lib/services/cartService";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-6 border-b last:border-0">
      {/* Remove Button (Mobile: Top Right, Desktop: Left) */}
      <Button
        variant="ghost"
        size="icon"
        className="self-end sm:self-center text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(item._id)}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Image */}
      <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        {/* Placeholder for real image */}
        {item.productId.product_image &&
        item.productId.product_image.length > 0 ? (
          <img
            src={item.productId.product_image[0]}
            alt={item.productId.product_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
            Product
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 text-center sm:text-left space-y-1">
        <h3 className="font-semibold">{item.productId.product_name}</h3>
        <div className="text-sm text-muted-foreground">
          Color : {item.productId.color ? item.productId.color[0] : "N/A"} |
          Size : {item.productId.size ? item.productId.size[0] : "N/A"}
        </div>
      </div>

      {/* Price */}
      <div className="font-medium w-24 text-center">
        ${item.productId.price.toFixed(2)}
      </div>

      {/* Quantity */}
      <div className="flex items-center border rounded-md">
        <button
          className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"
          onClick={() =>
            onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))
          }
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="h-8 w-8 flex items-center justify-center text-sm font-medium border-x">
          {item.quantity}
        </span>
        <button
          className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors"
          onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="font-bold w-24 text-center sm:text-right">
        ${(item.productId.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
