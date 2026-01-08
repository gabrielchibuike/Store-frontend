"use client";

import { useSidebar } from "@/components/ui/sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { AdminProductGallery } from "@/components/admin/products/ProductDetails/AdminProductGallery";
import { AdminProductInfo } from "@/components/admin/products/ProductDetails/AdminProductInfo";
import { AdminProductStats } from "@/components/admin/products/ProductDetails/AdminProductStats";
import { AdminProductAdditionalInfo } from "@/components/admin/products/ProductDetails/AdminProductAdditionalInfo";
import { AdminProductReviews } from "@/components/admin/products/ProductDetails/AdminProductReviews";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/services/productService";

interface AdminProductDetailsProps {
  productId: string;
}

export function AdminProductDetails({ productId }: AdminProductDetailsProps) {
  const { state } = useSidebar();

  const { data: productResponse, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    select: (res) => res.data,
  });

  const product = productResponse;

  if (isLoading) {
    return (
      <main
        className={`flex-1 flex flex-col min-h-screen bg-gray-50/50 transition-all duration-300 ease-in-out ${
          state === "collapsed" ? "ml-20" : "ml-72"
        }`}
      >
        <AdminHeader title="Product Page" />
        <div className="p-6 flex justify-center items-center h-64">
          <p>Loading product details...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main
        className={`flex-1 flex flex-col min-h-screen bg-gray-50/50 transition-all duration-300 ease-in-out ${
          state === "collapsed" ? "ml-20" : "ml-72"
        }`}
      >
        <AdminHeader title="Product Page" />
        <div className="p-6 flex justify-center items-center h-64">
          <p>Product not found.</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen bg-gray-50/50 transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <AdminHeader title="Product Page" />

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Gallery */}
            <div className="w-full lg:w-1/3">
              <AdminProductGallery images={product.product_image} />
            </div>

            {/* Right Column - Info */}
            <div className="w-full lg:w-2/3 space-y-8">
              <div className="flex justify-between items-start">
                <AdminProductInfo product={product} />
                <Button
                  variant="outline"
                  className="text-secondary border-secondary hover:bg-secondary/10 hover:text-secondary"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>

              <AdminProductStats
                price={product.price}
                orders={product.sold || 0}
                stock={product.quantity}
                revenue={product.earnings || 0}
              />

              {/* Colors & Description would go here, handled in ProductInfo or separate */}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-semibold text-sm uppercase text-gray-500">
                Product Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <AdminProductAdditionalInfo product={product} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <AdminProductReviews />
        </div>
      </div>
    </main>
  );
}
