"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  category?: string;
  title: string;
  price: number;
  rating: number;
  imageColor: string;
  tag?: string;
  image?: string;
  originalPrice?: number;
  discountPercentage?: number;
}

export function ProductCard({
  id,
  category,
  title,
  price,
  rating,
  imageColor,
  tag,
  image,
  originalPrice,
  discountPercentage,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist, wishlistItems } =
    useWishlist();

  const isWishlisted = isInWishlist(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();

    // Construct minimal product object for optimistic/guest add
    const product = {
      _id: id,
      product_name: title,
      price: price,
      product_image: [], // Placeholder or derived
      product_category: category,
      rating: rating,
      reviews: 0,
    } as any;

    addToCart(id, 1, product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      const wishlistItem = wishlistItems.find(
        (item) => item.productId._id === id
      );
      if (wishlistItem) {
        removeFromWishlist(wishlistItem._id);
      }
    } else {
      addToWishlist(id);
    }
  };

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden flex items-center justify-center transition-colors duration-500",
          imageColor || "bg-muted"
        )}
      >
        <Link href={`/shop/product/${id}`} className="absolute inset-0 z-10">
          <span className="sr-only">View {title}</span>
        </Link>

        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground/30">
            <span className="text-4xl font-black">?</span>
            <span className="text-xs font-bold uppercase tracking-tighter">
              No Image
            </span>
          </div>
        )}

        {tag && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full z-20 pointer-events-none shadow-lg">
            {tag}
          </div>
        )}

        {discountPercentage && (
          <div className="absolute top-3 right-3 bg-destructive text-white text-[10px] md:text-xs font-black px-2 py-1 rounded shadow-lg z-20">
            -{discountPercentage}%
          </div>
        )}

        {/* Hover Actions - Visible on mobile by default or on tap */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <Button
            size="icon"
            variant="secondary"
            className="flex-1 rounded-xl h-10 bg-white/90 backdrop-blur-sm border-none shadow-lg hover:bg-white text-foreground"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isWishlisted ? "fill-destructive text-destructive" : ""
              )}
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="flex-1 rounded-xl h-10 bg-primary text-primary-foreground border-none shadow-lg hover:bg-primary/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col flex-1 gap-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] truncate pr-4">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-bold">{rating || 0}.0</span>
          </div>
        </div>

        <Link
          href={`/shop/product/${id}`}
          className="block group-hover:text-primary transition-colors flex-1"
        >
          <h3 className="font-bold text-base md:text-lg mb-1 line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="space-y-0.5">
            <p className="text-secondary font-black text-lg md:text-xl leading-none">
              $
              {price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            {originalPrice && originalPrice > price && (
              <p className="text-xs text-muted-foreground line-through decoration-destructive/30">
                $
                {originalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
          </div>

          <div className="flex md:hidden">
            <Button
              size="sm"
              className="w-full text-[10px] h-8 rounded-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
