import { apiRequest } from "./api";

interface StoreConfigResponse {
  isSetup: boolean;
  categories: Category[];
}
export interface GetNavigationMenuResponse {
  gender: string;
  sections: [
    {
      title: string;
      items: [];
    }
  ];
  promo: {
    title: "Latest Offers";
    subtitle: "25% Off on Men's Collection";
    ctaText: "Shop Now";
    ctaLink: "/shop?category=Men";
    imageColor: "bg-blue-100";
  };
}

// export interface StoreConfigResponse {
//   data: FetchStoreResponse;
//   message: string;
// }

export async function getStoreConfig() {
  return await apiRequest<StoreConfigResponse>("/store/getStoreConfig", {
    method: "GET",
  });
}
export async function getNavigationMenu() {
  return await apiRequest<GetNavigationMenuResponse[]>(
    "/store/navigation-menu",
    {
      method: "GET",
    }
  );
}

export async function createStoreConfig(data: {
  isSetup: boolean;
  categories: Category[];
}) {
  return await apiRequest<{ message: string }>("/store/updateStoreConfig", {
    method: "PUT",
    body: data,
  });
}
