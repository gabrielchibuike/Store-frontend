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
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/services/productService";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CountdownTimer } from "./CountdownTimer";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.color && product.color.length > 0 ? product.color[0] : "",
  );
  const [selectedSize, setSelectedSize] = useState(
    product.size && product.size.length > 0 ? product.size[0] : "",
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist, wishlistItems } =
    useWishlist();

  const isWishlisted = isInWishlist(product._id);

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      const wishlistItem = wishlistItems.find(
        (item) => item.productId._id === product._id,
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
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-2 py-1 rounded">
            {product.product_category}
          </span>
          {product.quantity && product.quantity > 0 ? (
            <span className="text-[10px] md:text-xs font-bold text-green-600 uppercase tracking-wider">
              • In Stock
            </span>
          ) : (
            <span className="text-[10px] md:text-xs font-bold text-destructive uppercase tracking-wider">
              • Out of Stock
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
          {product.product_name}
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 bg-yellow-400/10 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-black">{product.rating || 0}.0</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <span className="text-sm text-muted-foreground font-medium underline underline-offset-4 cursor-pointer hover:text-primary transition-colors">
            {product.reviews || 0} Customer Reviews
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex flex-col gap-3 p-4 md:p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-3xl md:text-4xl font-black text-secondary">
            $
            {(product.isDealActive && product.dealPrice
              ? product.dealPrice
              : product.price
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          {(product.isDealActive || product.discount) && (
            <div className="flex items-center gap-2">
              <span className="text-lg text-muted-foreground line-through decoration-destructive/30">
                $
                {(product.isDealActive && product.originalPrice
                  ? product.originalPrice
                  : product.price / (1 - (product.discount || 0) / 100)
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-xs font-black text-white bg-destructive px-2 py-1 rounded-md shadow-lg shadow-destructive/20 animate-pulse">
                {product.isDealActive
                  ? product.discountPercentage
                  : product.discount}
                % OFF
              </span>
            </div>
          )}
        </div>

        {product.isDealActive && product.dealExpiry && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 border-t border-gray-200/50">
            <span className="text-xs font-black text-destructive uppercase tracking-widest">
              Limited Time Offer:
            </span>
            <CountdownTimer expiryDate={product.dealExpiry} />
          </div>
        )}
      </div>

      {/* Description */}
      {/* Description */}
      <div className="space-y-2">
        <p
          className={cn(
            "text-muted-foreground leading-relaxed text-sm md:text-base max-w-xl transition-all duration-300",
            !isDescriptionExpanded && "line-clamp-3",
          )}
        >
          {product.description || "No description available."}
        </p>

        {product.description && product.description.length > 200 && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-primary text-sm font-bold hover:underline inline-flex items-center gap-1 group"
          >
            {isDescriptionExpanded ? "Read Less" : "Read More"}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                isDescriptionExpanded && "rotate-180",
              )}
            />
          </button>
        )}
      </div>

      {/* Selection Area */}
      <div className="space-y-6">
        {/* Color Selection */}
        {product.color && product.color.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                Select Color
              </span>
              <span className="text-sm font-bold text-primary">
                {selectedColor}
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              {product.color.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "h-10 w-10 rounded-full border-2 ring-offset-2 transition-all duration-300 transform active:scale-90",
                    selectedColor === color
                      ? "ring-2 ring-primary border-transparent scale-110"
                      : "border-transparent hover:scale-105",
                  )}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.size && product.size.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                Select Size
              </span>
              <button className="text-[10px] md:text-xs font-black uppercase tracking-tighter text-primary underline underline-offset-4 decoration-2">
                View Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.size.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "min-w-[60px] h-12 rounded-xl border-2 text-sm font-black transition-all duration-300 transform active:scale-95",
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-white border-gray-100 hover:border-primary/30 hover:bg-primary/5",
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 pt-4 md:pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Quantity selector */}
          <div className="flex items-center bg-gray-100/50 rounded-2xl p-1.5 h-14 w-full sm:w-auto">
            <button
              onClick={decrementQuantity}
              className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-muted-foreground hover:text-primary"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="flex-1 sm:w-14 text-center font-black text-lg">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-muted-foreground hover:text-primary"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Button
            className="h-14 flex-[2] bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-black text-base md:text-lg shadow-xl shadow-primary/20 transition-all active:scale-95"
            onClick={() => addToCart(product._id, quantity, product)}
          >
            Add To Cart
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-2xl border-2 border-gray-100 hover:border-destructive/20 hover:bg-destructive/5 shrink-0 group transition-all"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-all",
                isWishlisted
                  ? "fill-destructive text-destructive scale-110"
                  : "text-muted-foreground group-hover:text-destructive",
              )}
            />
          </Button>
        </div>

        <Button className="h-14 w-full bg-secondary hover:bg-secondary/90 text-white rounded-2xl font-black text-base md:text-lg shadow-xl shadow-secondary/20 transition-all active:scale-95">
          Buy It Now
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
