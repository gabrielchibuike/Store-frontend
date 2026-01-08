// components/LoadingContext.tsx
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingOverlay } from "./../components/LoadingOverlay";

// Context Types
interface LoadingContextType {
  showLoading: (title?: string, description?: string) => void;
  hideLoading: () => void;
  isLoading: boolean;
}

// Create Context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Hook to use loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

// Provider Component
interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState<string>("Loading...");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const showLoading = useCallback(
    (newTitle?: string, newDescription?: string) => {
      if (newTitle) setTitle(newTitle);
      if (newDescription) setDescription(newDescription);
      setIsLoading(true);
    },
    []
  );

  const hideLoading = useCallback(() => {
    // Optionally reset title/description on hide
    setTitle("Loading...");
    setDescription("");
    setIsLoading(false);
  }, []);

  const contextValue = { showLoading, hideLoading, isLoading };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {isLoading && (
          <LoadingOverlay title={title} description={description} />
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};
