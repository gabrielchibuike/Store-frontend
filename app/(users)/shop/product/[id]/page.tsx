import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { ProductGallery } from "@/components/shop/product/ProductGallery";
import { ProductInfo } from "@/components/shop/product/ProductInfo";
import { ProductTabs } from "@/components/shop/product/ProductTabs";
import { ProductCard } from "@/components/homepage/ProductCard";
import {
  getProductById,
  getRelatedProducts,
} from "@/lib/services/productService";
import { ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productResponse = await getProductById(id);
  const product = productResponse.data;

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.product_category,
    product._id
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">
              Product Details
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/shop" className="hover:text-primary">
                Shop
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/shop?category=${product.product_category}`}
                className="hover:text-primary"
              >
                {product.product_category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">
                Product Details
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 space-y-16">
          {/* Product Details Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            <ProductGallery images={product.product_image || []} />
            <ProductInfo product={product} />
          </div>

          {/* Tabs Section */}
          <ProductTabs product={product} />

          {/* Related Products */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <p className="text-primary font-medium">Related Products</p>
              <h2 className="text-3xl font-bold">Explore Related Products</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related._id}
                  id={related._id}
                  category={related.product_category}
                  title={related.product_name}
                  price={related.price}
                  rating={related.rating || 0}
                  imageColor="bg-muted"
                  tag={related.discount ? `-${related.discount}%` : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
