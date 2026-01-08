import { apiRequest } from "@/lib/services/api";

export interface AccountData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  profile_img: string;
}

export interface LoginDataType {
  accessToken: string;
  refreshToken: string;
  accountData: AccountData;
}

// export interface LoginResponse {
//   data: LoginDataType;
//   message: string;
// }

export const createUser = async ({ formInfo }: { formInfo: any }) => {
  return apiRequest("auth/signup", {
    method: "POST",
    body: formInfo,
  });
};

export const login = async ({ formInfo }: { formInfo: any }) => {
  return apiRequest<LoginDataType>("auth/login", {
    method: "POST",
    body: formInfo,
  });
};

export const forgetPassword = async ({ formInfo }: { formInfo: any }) => {
  return apiRequest<{ message: string }>("auth/forgot-password", {
    method: "POST",
    body: formInfo,
  });
};

export const resetPassword = async ({ formInfo }: { formInfo: any }) => {
  return apiRequest<{ message: string }>("auth/reset-password", {
    method: "POST",
    body: formInfo,
  });
};

export const changePassword = async ({ formInfo }: { formInfo: any }) => {
  return apiRequest<{ message: string }>("auth/change-password", {
    method: "POST",
    body: formInfo,
    token: formInfo.token, // If we pass token separately
  });
};

export const refreshAccessToken = async (refreshToken?: string) => {
  return apiRequest<{ accessToken: string; refreshToken?: string }>(
    "auth/refresh",
    {
      method: "POST",
      body: refreshToken ? { refreshToken } : undefined,
    }
  );
};

export const logout = async () => {
  return apiRequest("auth/logout", {
    method: "POST",
  });
};
