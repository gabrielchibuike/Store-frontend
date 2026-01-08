"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
}

export function ProductCard({
  id,
  category,
  title,
  price,
  rating,
  imageColor,
  tag,
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
    <div className="group relative bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div
        className={`relative h-[200px] md:h-[250px] w-full ${imageColor} flex items-center justify-center p-4`}
      >
        <Link href={`/shop/product/${id}`} className="absolute inset-0 z-10">
          <span className="sr-only">View {title}</span>
        </Link>

        <span className="text-sm md:text-2xl font-bold text-muted-foreground/20 pointer-events-none text-center">
          Product Image
        </span>

        {tag && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded z-20 pointer-events-none">
            {tag}
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full h-8 w-8 bg-secondary"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-4 w-4 text-white ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full h-8 w-8 bg-secondary"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className=" items-center gap-1 mb-2 lg:flex hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(rating || 0)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              )}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({rating}.0)
          </span>
        </div>
        <Link
          href={`/shop/product/${id}`}
          className="block hover:text-primary transition-colors"
        >
          <h1 className="font-medium text-xs  truncate uppercase text-muted-foreground">
            {category}
          </h1>
          <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-secondary">
            ${price.toFixed(2)}
          </span>
          {/* <Button
            size="sm"
            variant="ghost"
            className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button> */}
        </div>
      </div>
    </div>
  );
}
