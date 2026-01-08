"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WishlistItem as WishlistItemType } from "@/lib/services/wishlistService";
import { useCart } from "@/context/CartContext";

interface WishlistItemProps {
  item: WishlistItemType;
  onRemove: (id: string) => void;
}

export function WishlistItem({ item, onRemove }: WishlistItemProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item.productId._id, 1);
  };

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
          Color : {item.productId.color[0]} | Size : {item.productId.size[0]}
        </div>
      </div>

      {/* Price */}
      <div className="font-medium w-24 text-center">
        ${item.productId.price.toFixed(2)}
      </div>

      {/* Date Added */}
      <div className="text-sm text-muted-foreground w-32 text-center hidden md:block">
        {item.productId.dateAdded}
      </div>

      {/* Stock Status */}
      <div className="text-sm font-medium text-green-600 w-24 text-center hidden sm:block">
        {item.productId.stockStatus}
      </div>

      {/* Add to Cart */}
      <Button
        className="bg-[#4A2B0F] hover:bg-[#3A220B] text-white w-full sm:w-auto"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
}
