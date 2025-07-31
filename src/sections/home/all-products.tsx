"use client";

import ProductCard from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearch } from "@/contexts/search-context";
import { useProducts } from "@/hooks/use-products";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import ProductsGridSkeleton from "@/components/skeletons/product-grid-skeleton";
import { useMemo } from "react";

export default function AllProducts() {
  const { searchQuery } = useSearch();
  const { products, loading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const discountedProducts = filteredProducts.filter(
    (product) => product.category === "discount"
  );
  const latestProducts = filteredProducts.filter(
    (product) => product.category === "latest"
  );
  const regularProducts = filteredProducts.filter(
    (product) => product.category === "regular"
  );

  if (error) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Find Your Perfect <span className="text-orange-600">Shoes</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover premium footwear that combines style, comfort, and quality
            for every occasion.
          </p>
        </div>

        {searchQuery && !loading && (
          <div className="mb-8 text-center">
            <p className="text-slate-600">
              Found {filteredProducts.length} result
              {filteredProducts.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
            </p>
          </div>
        )}

        {/* Crazy Discounts Carousel Section */}
        {loading ? (
          <CarouselSkeleton />
        ) : discountedProducts.length > 0 ? (
          <section className="mb-20">
            <div className="text-center mb-12">
              <Badge className="bg-red-600 text-white text-lg px-6 py-2 mb-4">
                🔥 CRAZY DISCOUNTS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Up to <span className="text-red-600">50% OFF</span>
              </h2>
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
                <span className="animate-pulse">⏰</span>
                <span className="font-semibold">Limited time offers!</span>
              </div>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {discountedProducts.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </section>
        ) : null}

        {/* Latest Products Section */}
        {loading ? (
          <div className="mb-20">
            <div className="text-center mb-12 space-y-4">
              <div className="w-48 h-8 bg-slate-200 animate-pulse mx-auto rounded-full"></div>
              <div className="w-96 h-10 bg-slate-200 animate-pulse mx-auto"></div>
              <div className="w-80 h-6 bg-slate-200 animate-pulse mx-auto"></div>
            </div>
            <ProductsGridSkeleton count={6} columns="3" />
          </div>
        ) : latestProducts.length > 0 ? (
          <section className="mb-20">
            <div className="text-center mb-12">
              <Badge className="bg-green-600 text-white text-lg px-6 py-2 mb-4">
                ✨ JUST ARRIVED
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Latest <span className="text-green-600">Products</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Discover the newest additions to our collection with
                cutting-edge technology and fresh styles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ) : null}

        {/* All Products Section */}
        {loading ? (
          <div className="mb-20">
            <div className="text-center mb-12 space-y-4">
              <div className="w-64 h-10 bg-slate-200 animate-pulse mx-auto"></div>
              <div className="w-80 h-6 bg-slate-200 animate-pulse mx-auto"></div>
            </div>
            <ProductsGridSkeleton count={6} columns="3" />
          </div>
        ) : regularProducts.length > 0 ? (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                All <span className="text-orange-600">Products</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Browse our complete collection of premium footwear for every
                occasion.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ) : null}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No products found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search terms or browse all products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
