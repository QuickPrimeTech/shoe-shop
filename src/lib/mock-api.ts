import { Product } from "@/types/common";
const mockProducts: Product[] = [
  // regulared Products
  {
    id: 1,
    title: "Air Max Pro",
    price: 8999,
    rating: 4.8,
    reviews: 324,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    title: "Classic Leather",
    price: 5999,
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    title: "Urban Runner",
    price: 6999,
    rating: 4.7,
    reviews: 256,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    title: "Street Style",
    price: 49.99,
    rating: 4.5,
    reviews: 412,
    image: "/placeholder.svg?height=400&width=400",
  },
  // Latest Products
  {
    id: 5,
    title: "Future Boost 2024",
    price: 17999,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 6,
    title: "Quantum Leap",
    price: 19999,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 7,
    title: "Neo Sport",
    price: 149.99,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 8,
    title: "Elite Runner Pro",
    price: 18999,
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 9,
    title: "Comfort Max",
    price: 11999,
    rating: 4.6,
    reviews: 298,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 10,
    title: "Urban Flex",
    price: 9999,
    rating: 4.5,
    reviews: 412,
    image: "/placeholder.svg?height=400&width=400",
  },
  // Regular Products
  {
    id: 11,
    title: "Classic Stan Smith",
    price: 8599,
    rating: 4.7,
    reviews: 567,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 12,
    title: "Air Force 1",
    price: 11099,
    rating: 4.8,
    reviews: 789,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 13,
    title: "Chuck Taylor All Star",
    price: 6599,
    rating: 4.6,
    reviews: 345,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 14,
    title: "Suede Classic",
    price: 7599,
    rating: 4.5,
    reviews: 234,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 15,
    title: "Fresh Foam X",
    price: 13999,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 16,
    title: "Gel-Kayano 30",
    price: 15999,
    rating: 4.8,
    reviews: 278,
    image: "/placeholder.svg?height=400&width=400",
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  // Get all products with loading delay
  async getAllProducts(): Promise<Product[]> {
    await delay(6500); // 6.5 second delay
    return mockProducts;
  },

  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    await delay(2000); // Shorter delay for search
    return mockProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Get product by ID
  async getProductById(id: number): Promise<Product | null> {
    await delay(1000);
    return mockProducts.find((product) => product.id === id) || null;
  },

  // Simulate order placement
  async placeOrder(): Promise<{ success: boolean; orderId: string }> {
    await delay(3000);
    return {
      success: true,
      orderId: `ORD-${Date.now()}`,
    };
  },
};
