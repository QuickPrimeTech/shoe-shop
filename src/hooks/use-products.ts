"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/common";
import { toast } from "sonner";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetch("/api/products");
        const res = await data.json();
        console.log(res);
        if (!data.ok) {
          throw toast.error("Network response was not ok");
        }
        setProducts(res.data || []);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
