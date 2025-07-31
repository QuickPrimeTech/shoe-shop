"use client";

import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/use-products";
import ProductsGridSkeleton from "@/components/skeletons/product-grid-skeleton";

export default function RegularProducts() {
  const { products, loading } = useProducts();

  if (products.length === 0 && !loading) return null;

  return (
    <section className="mb-20">
      {loading ? (
        <ProductsGridSkeleton count={6} columns="3" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
