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
    product._id,
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50/50 py-4 md:py-8 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                Product Details
              </h1>
              <nav className="flex items-center gap-1.5 text-[10px] md:text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-1 md:pb-0">
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <Link
                  href="/shop"
                  className="hover:text-primary transition-colors"
                >
                  Shop
                </Link>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <Link
                  href={`/shop?category=${product.product_category}`}
                  className="hover:text-primary transition-colors"
                >
                  {product.product_category}
                </Link>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span className="text-foreground font-semibold truncate max-w-[150px] md:max-w-none">
                  {product.product_name}
                </span>
              </nav>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-16 space-y-12 md:space-y-24">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <ProductGallery images={product.product_image || []} />
            <ProductInfo product={product} />
          </div>

          {/* Tabs Section */}
          <div className="pt-8 border-t border-gray-100">
            <ProductTabs product={product} />
          </div>

          {/* Related Products */}
          <div className="space-y-6 md:space-y-10">
            <div className="space-y-2">
              <p className="text-primary font-black uppercase tracking-widest text-xs">
                Related Products
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Explore Similar Styles
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.slice(0, 4).map((related) => (
                <ProductCard
                  key={related._id}
                  id={related._id}
                  title={related.product_name}
                  price={
                    related.isDealActive ? related.dealPrice! : related.price
                  }
                  originalPrice={related.originalPrice}
                  discountPercentage={related.discountPercentage}
                  rating={related.rating || 0}
                  imageColor="bg-muted"
                  category={related.product_category}
                  image={related.product_image?.[0]}
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
