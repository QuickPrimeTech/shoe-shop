"use client";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { mockApi, type Product } from "@/lib/mock-api";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
  allProducts: Product[];
  suggestions: Product[];
  searchProducts: (query: string) => Promise<Product[]>;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Load products for suggestions
  useState(() => {
    mockApi.getAllProducts().then(setAllProducts);
  });

  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || allProducts.length === 0) return [];

    return allProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery, allProducts]);

  const searchProducts = async (query: string): Promise<Product[]> => {
    return await mockApi.searchProducts(query);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isSearching,
        setIsSearching,
        allProducts,
        suggestions,
        searchProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
