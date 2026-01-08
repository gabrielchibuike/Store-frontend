"use client";

import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { WishlistItem } from "@/components/wishlist/WishlistItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(isAuthenticated, "isAuthenticated");

    if (!isAuthenticated) {
      console.log(isAuthenticated, "isAuth");

      router.push("/auth/signIn");
      return;
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        {/* Breadcrumbs */}
        <div className="bg-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">Wishlist</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Wishlist</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-12">Loading wishlist...</div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-lg text-muted-foreground">
                Your wishlist is empty.
              </p>
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-card border rounded-lg overflow-hidden">
                <div className="hidden sm:grid grid-cols-[auto_1fr_100px_130px_100px_140px] gap-4 p-4 bg-secondary/80 text-foreground  text-sm items-center">
                  <div className="w-12"></div> {/* Remove button space */}
                  <div className="pl-24">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center hidden md:block">Date Added</div>
                  <div className="text-center hidden sm:block">
                    Stock Status
                  </div>
                  <div className="text-center"></div>{" "}
                  {/* Add to Cart button space */}
                </div>
                <div className="p-4 sm:p-0">
                  {wishlistItems.map((item) => (
                    <WishlistItem
                      key={item._id}
                      item={item}
                      onRemove={removeFromWishlist}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
