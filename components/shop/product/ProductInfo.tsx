"use client";

import { useState } from "react";
import {
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/services/productService";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.color && product.color.length > 0 ? product.color[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.size && product.size.length > 0 ? product.size[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist, wishlistItems } =
    useWishlist();

  const isWishlisted = isInWishlist(product._id);

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      const wishlistItem = wishlistItems.find(
        (item) => item.productId._id === product._id
      );
      if (wishlistItem) {
        removeFromWishlist(wishlistItem._id);
      }
    } else {
      addToWishlist(product._id);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground uppercase">
          {product.product_category}
        </div>
        <h1 className="text-3xl font-semibold">{product.product_name}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
            <span className="text-sm font-medium ml-2">
              {product.rating || 0}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews || 0} Reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
        {product.discount && (
          <span className="text-lg text-muted-foreground line-through">
            ${(product.price / (1 - product.discount / 100)).toFixed(2)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {product.description || "No description available."}
      </p>

      {/* <Separator /> */}

      {/* Color Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Color:</span>
          <span className="text-muted-foreground">{selectedColor}</span>
        </div>
        <div className="flex gap-3">
          {product.color &&
            product.color.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "h-8 w-8 rounded-full border-2 ring-offset-2 transition-all",
                  selectedColor === color
                    ? "ring-2 ring-primary border-transparent"
                    : "border-transparent hover:scale-110"
                )}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Size:</span>
            <span className="text-muted-foreground">{selectedSize}</span>
          </div>
          <button className="text-sm text-primary underline hover:text-primary/80">
            View Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.size &&
            product.size.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "h-10 w-14 rounded-md border text-sm font-medium transition-all",
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted"
                )}
              >
                {size}
              </button>
            ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        {/* Quantity */}
        <div className="flex items-center border rounded-md w-fit">
          <button
            onClick={decrementQuantity}
            className="h-12 w-12 flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="h-12 w-12 flex items-center justify-center font-medium border-x">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="h-12 w-12 flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          className="h-12 flex-1 bg-[#4A2B0F] hover:bg-[#3A220B] text-white"
          onClick={() => addToCart(product._id, quantity, product)}
        >
          Add To Cart
        </Button>
        <Button className="h-12 flex-1 bg-[#F5B041] hover:bg-[#D49838] text-black">
          Buy Now
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12"
          onClick={handleToggleWishlist}
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </div>

      <Separator />

      {/* Meta */}
      <div className="space-y-2 text-sm">
        <div className="flex gap-2">
          <span className="font-semibold min-w-[60px]">ID:</span>
          <span className="text-muted-foreground">{product._id}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold min-w-[60px]">Tags:</span>
          <span className="text-muted-foreground">
            {product.tags?.join(", ") || "None"}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold min-w-[60px]">Share:</span>
          <div className="flex gap-3 text-muted-foreground">
            <button className="hover:text-primary transition-colors">
              <Facebook className="h-4 w-4" />
            </button>
            <button className="hover:text-primary transition-colors">
              <Twitter className="h-4 w-4" />
            </button>
            <button className="hover:text-primary transition-colors">
              <Linkedin className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
