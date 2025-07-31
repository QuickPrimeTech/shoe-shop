"use client";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { mockApi, type Product } from "@/lib/mock-api";

const allProducts = [
  // Discounted Products
  {
    id: 1,
    name: "Air Max Pro",
    brand: "Nike",
    price: 89.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 324,
    image: "/placeholder.svg?height=400&width=400",
    badge: "44% OFF",
    category: "discount",
  },
  {
    id: 2,
    name: "Classic Leather",
    brand: "Adidas",
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=400&width=400",
    badge: "40% OFF",
    category: "discount",
  },
  {
    id: 3,
    name: "Urban Runner",
    brand: "Puma",
    price: 69.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviews: 256,
    image: "/placeholder.svg?height=400&width=400",
    badge: "42% OFF",
    category: "discount",
  },
  {
    id: 4,
    name: "Street Style",
    brand: "Converse",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviews: 412,
    image: "/placeholder.svg?height=400&width=400",
    badge: "38% OFF",
    category: "discount",
  },
  // Latest Products
  {
    id: 5,
    name: "Future Boost 2024",
    brand: "Adidas",
    price: 179.99,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=400",
    badge: "NEW",
    category: "latest",
  },
  {
    id: 6,
    name: "Quantum Leap",
    brand: "Nike",
    price: 199.99,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=400",
    badge: "NEW",
    category: "latest",
  },
  {
    id: 7,
    name: "Neo Sport",
    brand: "Puma",
    price: 149.99,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=400&width=400",
    badge: "NEW",
    category: "latest",
  },
  {
    id: 8,
    name: "Elite Runner Pro",
    brand: "Under Armour",
    price: 189.99,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=400&width=400",
    badge: "NEW",
    category: "latest",
  },
  {
    id: 9,
    name: "Comfort Max",
    brand: "Sketchers",
    price: 119.99,
    rating: 4.6,
    reviews: 298,
    image: "/placeholder.svg?height=400&width=400",
    badge: "NEW",
    category: "latest",
  },
  {
    id: 10,
    name: "Urban Flex",
    brand: "Converse",
    price: 99.99,
    rating: 4.5,
    reviews: 412,
    image: "/placeholder.svg?height=400&width=400",
    badge: "NEW",
    category: "latest",
  },
  // Regular Products
  {
    id: 11,
    name: "Classic Stan Smith",
    brand: "Adidas",
    price: 85.99,
    rating: 4.7,
    reviews: 567,
    image: "/placeholder.svg?height=400&width=400",
    category: "regular",
  },
  {
    id: 12,
    name: "Air Force 1",
    brand: "Nike",
    price: 110.99,
    rating: 4.8,
    reviews: 789,
    image: "/placeholder.svg?height=400&width=400",
    category: "regular",
  },
  {
    id: 13,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 65.99,
    rating: 4.6,
    reviews: 345,
    image: "/placeholder.svg?height=400&width=400",
    category: "regular",
  },
  {
    id: 14,
    name: "Suede Classic",
    brand: "Puma",
    price: 75.99,
    rating: 4.5,
    reviews: 234,
    image: "/placeholder.svg?height=400&width=400",
    category: "regular",
  },
  {
    id: 15,
    name: "Fresh Foam X",
    brand: "New Balance",
    price: 139.99,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=400",
    category: "regular",
  },
  {
    id: 16,
    name: "Gel-Kayano 30",
    brand: "ASICS",
    price: 159.99,
    rating: 4.8,
    reviews: 278,
    image: "/placeholder.svg?height=400&width=400",
    category: "regular",
  },
];

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
