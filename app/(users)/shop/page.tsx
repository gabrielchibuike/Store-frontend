import { Suspense } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { Features } from "@/components/homepage/Features";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ProductSort } from "@/components/shop/ProductSort";
import { MobileFilters } from "@/components/shop/MobileFilters";
import { ActiveFilters } from "@/components/shop/ActiveFilters";
import { ShopPagination } from "@/components/shop/ShopPagination";
import { ProductCard } from "@/components/homepage/ProductCard";
import { getProducts } from "@/lib/services/productService";

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  // Parse search params
  const category =
    typeof params.category === "string"
      ? [params.category]
      : (params.category as string[]);
  const subcategory =
    typeof params.subcategory === "string"
      ? [params.subcategory]
      : (params.subcategory as string[]);
  const gender =
    typeof params.gender === "string"
      ? [params.gender]
      : (params.gender as string[]);
  const colors =
    typeof params.colors === "string"
      ? [params.colors]
      : (params.colors as string[]);
  const sizes =
    typeof params.sizes === "string"
      ? [params.sizes]
      : (params.sizes as string[]);
  const minPrice = params.minPrice
    ? parseInt(params.minPrice as string)
    : undefined;
  const maxPrice = params.maxPrice
    ? parseInt(params.maxPrice as string)
    : undefined;
  const sort = params.sort as string;
  const page = params.page ? parseInt(params.page as string) : 1;
  const limit = 12;

  const response = await getProducts({
    category,
    subcategory,
    gender,
    colors,
    sizes,
    minPrice,
    maxPrice,
    sort,
    page,
    limit,
  });

  const products = response.data?.products || [];
  const total = response.data?.total || 0;
  const totalPages = response.data?.totalPages || 0;

  const start = (page - 1) * limit;
  const end = start + products.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ShopHeader />

        <div className="container mx-auto px-2 lg:px-4 pb-16">
          <div className="flex flex-col md:flex-row gap-8 ">
            {/* Sidebar */}
            <aside className="hidden md:block">
              <Suspense fallback={<div>Loading filters...</div>}>
                <FilterSidebar />
              </Suspense>
            </aside>

            {/* Main Content */}
            <div className=" flex-1">
              <MobileFilters total={total} />

              <Suspense fallback={<div>Loading...</div>}>
                <div className="hidden md:block">
                  <ProductSort total={total} start={start} end={end} />
                </div>
                <ActiveFilters />

                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      No products found matching your criteria.
                    </p>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        id={product._id}
                        category={product.product_category}
                        title={product.product_name}
                        price={product.price}
                        rating={product.rating || 0}
                        imageColor="bg-muted" // Placeholder color
                        tag={
                          product.discount ? `-${product.discount}%` : undefined
                        }
                      />
                    ))}
                  </div>
                )}

                <ShopPagination
                  currentPage={page}
                  totalPages={totalPages || 1}
                />
              </Suspense>
            </div>
          </div>
        </div>

        <Features />
      </main>
      <Footer />
    </div>
  );
}
