"use client";

import ProductCard from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/use-products";
import ProductsGridSkeleton from "@/components/skeletons/product-grid-skeleton";

export default function LatestArrivals() {
  const { products, loading } = useProducts();

  const latestProducts = products.filter(
    (product) => product.category === "latest"
  );

  if (latestProducts.length === 0 && !loading) return null;

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <Badge className="bg-green-600 text-white text-lg px-6 py-2 mb-4">
          ✨ JUST ARRIVED
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Latest <span className="text-green-600">Products</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Discover the newest additions to our collection with cutting-edge
          technology and fresh styles.
        </p>
      </div>
      {loading ? (
        <ProductsGridSkeleton count={6} columns="3" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
