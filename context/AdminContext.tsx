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
        const storedData = getStorageItem<any>(Store_Data);

        if (!storedData) {
          setIsAuthenticated(false);
          return;
        }

        setLoginData(storedData);
      } catch (err) {
        console.warn("Error decoding token", err);
        setIsAuthenticated(false);
        removeStorageItem(Store_Data);
      }
    })();
  }, []);

  const setLoginData = async (storedData: LoginDataType) => {
    const decoded = jwtDecode<DecodedToken>(storedData.accessToken);
    const now = Date.now() / 1000; // current time in seconds

    if (decoded.exp > now) {
      // ✅ valid token
      setToken(storedData.accessToken);
      setUser(storedData.accountData);
      setIsExpired(false);
      setIsAuthenticated(true);
    } else {
      // ❌ expired token
      console.log("Token expired, clearing...");
      removeStorageItem(Store_Data);
      setToken(null);
      setUser(null);
      setIsExpired(true);
      setIsAuthenticated(false);
    }
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
    removeStorageItem(Store_Data);
    setToken(null);
    setUser(null);
    setIsExpired(true);
    setIsAuthenticated(false);
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
