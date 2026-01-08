// // api.ts

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_DOMAIN as string;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  token?: string;
  formData?: FormData;
}

export interface FetchResponse<T = unknown> {
  data: T | null;
  message: string;
  error?: string;
  // cursor: undefined;
  // nextCursor?: number;
  // status?: number;
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<FetchResponse<T>> {
  const {
    method = "GET",
    headers = {},
    body,
    token: providedToken,
    formData,
  } = options;

  const isFormData = formData instanceof FormData;

  const executeRequest = async (token?: string) => {
    const requestHeaders: Record<string, string> = {
      ...(token && { "x-auth-token": `SFX_Bearer_${token}` }),
      ...headers,
    };

    if (!isFormData) {
      requestHeaders["Content-Type"] = "application/json";
    }

    return fetch(`${BASE_URL}/api/${endpoint}`, {
      method,
      headers: requestHeaders,
      cache: "no-store",
      credentials: "include",
      ...(isFormData
        ? { body: formData }
        : body
        ? { body: JSON.stringify(body) }
        : {}),
    });
  };

  // Get token from storage if not provided
  let token = providedToken;
  if (!token && typeof window !== "undefined") {
    const { getStorageItem } = await import("@/utils/storage");
    const { Store_Data } = await import("@/context/AuthContext");
    const data = getStorageItem<any>(Store_Data);
    token = data?.accessToken;
  }

  let response = await executeRequest(token);

  if (response.status === 401 || response.status === 403) {
    // Attempt refresh
    try {
      if (typeof window !== "undefined") {
        const { getStorageItem, setStorageItem } = await import(
          "@/utils/storage"
        );
        const { Store_Data } = await import("@/context/AuthContext");
        const { refreshAccessToken } = await import(
          "@/lib/services/authEndPoint"
        );

        const storedData = getStorageItem<any>(Store_Data);
        if (storedData?.refreshToken) {
          const refreshRes = await refreshAccessToken(storedData.refreshToken);
          if (refreshRes.data?.accessToken) {
            const newToken = refreshRes.data.accessToken;
            // Update storage
            setStorageItem(Store_Data, {
              ...storedData,
              accessToken: newToken,
              ...(refreshRes.data.refreshToken && {
                refreshToken: refreshRes.data.refreshToken,
              }),
            });

            // Retry original request with new token
            response = await executeRequest(newToken);
          }
        }
      }
    } catch (refreshErr) {
      console.error("Auto-refresh failed", refreshErr);
    }
  }

  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");

  if (!response.ok) {
    const errorData = isJson ? await response.json().catch(() => ({})) : {};
    throw new Error(errorData.message || "API request failed");
  }

  if (isJson) {
    const json = await response.json().catch(() => ({}));
    return json as FetchResponse<T>;
  }

  return { data: null, message: "Success" } as FetchResponse<T>;
}
