"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "@/utils/storage";
import { AccountData, LoginDataType } from "@/lib/services/authEndPoint";
// import { AccountData, LoginResponseData } from "@/lib/access.Api";

export const Store_Data = "Store_Data";

// | Field             | Meaning                                       |
// | ----------------- | ---------------------------------------------- |
// | `token`           | Raw JWT string                                 |
// | `user`            | Decoded token data                             |
// | `isExpired`       | `true` if token has passed `exp` time          |
// | `isAuthenticated` | `true` only when token exists **and is valid** |
// | `logout()`     | Logs out (removes token + resets state)        |

interface DecodedToken {
  id: string;
  email?: string;
  exp: number; // expiry time in seconds
  iat?: number;
  [key: string]: any;
}

interface AuthContextType {
  token: string | null;
  user: AccountData | null;
  setUser: React.Dispatch<React.SetStateAction<AccountData | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isExpired: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  setLoginData: (data: LoginDataType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AccountData | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load token on app mount
  useEffect(() => {
    (async () => {
      try {
        const storedData = getStorageItem<LoginDataType>(Store_Data);
        if (!storedData) {
          // If no stored token, try refreshing anyway (in case we have the httpOnly cookie)
          await handleRefresh();
          return;
        }

        const decoded = jwtDecode<DecodedToken>(storedData.accessToken);
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          setToken(storedData.accessToken);
          setUser(storedData.accountData);
          setIsAuthenticated(true);
        } else {
          // Token expired, try to refresh
          await handleRefresh(storedData.accountData);
        }
      } catch (err) {
        console.warn("Error in auth initialization", err);
        setIsAuthenticated(false);
      }
    })();
  }, []);

  const handleRefresh = async (existingAccountData?: AccountData) => {
    try {
      const { refreshAccessToken } = await import(
        "@/lib/services/authEndPoint"
      );

      const storedData = getStorageItem<LoginDataType>(Store_Data);
      const response = await refreshAccessToken(storedData?.refreshToken);

      if (response.data?.accessToken) {
        const newAccessToken = response.data.accessToken;
        const newRefreshToken =
          response.data.refreshToken || storedData?.refreshToken;
        const decoded = jwtDecode<DecodedToken>(newAccessToken);

        const accountData = existingAccountData ||
          storedData?.accountData || {
            id: decoded.id,
            first_name: "",
            last_name: "",
            email: decoded.email || "",
            role: decoded.role || "user",
            profile_img: "",
          };

        const newData = {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          accountData,
        };
        setStorageItem(Store_Data, newData);
        setToken(newAccessToken);
        setUser(accountData);
        setIsAuthenticated(true);
        setIsExpired(false);
      } else {
        throw new Error("Refresh failed");
      }
    } catch (err) {
      console.log("Failed to refresh token", err);
      logout();
    }
  };

  const setLoginData = async (storedData: LoginDataType) => {
    setToken(storedData.accessToken);
    setUser(storedData.accountData);
    setIsExpired(false);
    setIsAuthenticated(true);
  };

  // // Re-check token when it changes manually
  // useEffect(() => {
  //   if (!token) {
  //     setIsAuthenticated(false);
  //     return;
  //   }

  //   try {
  //     const decoded = jwtDecode<DecodedToken>(token);
  //     const now = Date.now() / 1000;
  //     const expired = decoded.exp <= now;

  //     setUser(decoded);
  //     setIsExpired(expired);
  //     setIsAuthenticated(!expired);
  //   } catch {
  //     setIsExpired(true);
  //     setIsAuthenticated(false);
  //   }
  // }, [token]);

  // Clear token manually (logout or expired)
  const logout = async () => {
    try {
      const { logout: backendLogout } = await import(
        "@/lib/services/authEndPoint"
      );
      await backendLogout();
    } catch (err) {
      console.warn("Backend logout failed", err);
    } finally {
      removeStorageItem(Store_Data);
      setToken(null);
      setUser(null);
      setIsExpired(true);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        setToken,
        isExpired,
        isAuthenticated,
        logout,
        setLoginData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ easy hook access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
