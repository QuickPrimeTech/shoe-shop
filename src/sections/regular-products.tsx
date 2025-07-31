"use client";

import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/use-products";
import ProductsGridSkeleton from "@/components/skeletons/product-grid-skeleton";

export default function RegularProducts() {
  const { products, loading } = useProducts();

  const regularProducts = products.filter(
    (product) => product.category === "regular"
  );

  if (regularProducts.length === 0 && !loading) return null;

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          All <span className="text-orange-600">Products</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Browse our complete collection of premium footwear for every occasion.
        </p>
      </div>
      {loading ? (
        <ProductsGridSkeleton count={6} columns="3" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
