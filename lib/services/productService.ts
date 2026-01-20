import { apiRequest } from "./api";

export interface Product {
  _id: string;
  product_name: string;
  product_category: string;
  sub_category: string;
  product_gender: string;
  price: number;
  discount?: number;
  quantity: number;
  description?: string;
  product_image: string[];
  color: string[];
  size: string[];
  tags?: string[];
  status?: "Available" | "Disabled";
  dateCreated?: string;
  // Frontend specific or mapped fields (optional for now)
  rating?: number;
  reviews?: number;
  sold?: number;
  earnings?: number;
  dateAdded?: string;
  stockStatus?: string;
  additionalInfo?: string;
  isDealActive?: boolean;
  dealPrice?: number;
  originalPrice?: number;
  discountPercentage?: number;
  dealExpiry?: string;
}

export interface FilterOptions {
  category?: string[];
  subcategory?: string[];
  gender?: string[];
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  sort?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

// import { FetchResponse } from "./api";

export async function getProducts(options: FilterOptions) {
  const params = new URLSearchParams();

  if (options.category)
    options.category.forEach((c) => params.append("category", c));
  if (options.subcategory)
    options.subcategory.forEach((s) => params.append("subcategory", s));
  if (options.gender) options.gender.forEach((s) => params.append("gender", s));
  if (options.minPrice) params.append("price_min", options.minPrice.toString());
  if (options.maxPrice) params.append("price_max", options.maxPrice.toString());
  if (options.colors) options.colors.forEach((c) => params.append("color", c));
  if (options.sizes) options.sizes.forEach((s) => params.append("size", s));
  if (options.page) params.append("page", options.page.toString());
  if (options.limit) params.append("limit", options.limit.toString());
  if (options.search) params.append("search", options.search);

  if (options.sort) {
    // Map frontend sort options to backend
    // Backend expects sort_by and sort_order
    if (options.sort === "price-asc") {
      params.append("sort_by", "price");
      params.append("sort_order", "asc");
    } else if (options.sort === "price-desc") {
      params.append("sort_by", "price");
      params.append("sort_order", "desc");
    } else if (options.sort === "newest") {
      params.append("sort_by", "createdAt");
      params.append("sort_order", "desc");
    }
  }

  return await apiRequest<ProductsResponse>(
    `/product/get_products?${params.toString()}`,
    {
      method: "GET",
    }
  );
}

export async function getProductById(id: string) {
  return await apiRequest<Product>(`/product/get_product/${id}`, {
    method: "GET",
  });
}

export async function getRelatedProducts(category: string, currentId: string) {
  // The backend has a route /product/get_products/:slug which seems to be for category
  // We might need to filter out the current product client-side if the API doesn't support it
  const res = await apiRequest<Product[]>(`/product/get_products/${category}`, {
    method: "GET",
  });
  const products = res.data || [];
  return products.filter((p) => p._id !== currentId).slice(0, 4);
}

export async function createProducts(data: FormData) {
  return await apiRequest("/product/create_product", {
    method: "POST",
    formData: data,
  });
}

export async function createProductFromUrl(url: string) {
  return await apiRequest("createProductFromUrl", {
    method: "POST",
    body: { productUrl: url },
  });
}
