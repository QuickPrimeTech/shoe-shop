import ProductCardSkeleton from "./product-card-skeleton";

interface ProductsGridSkeletonProps {
  count?: number;
  columns?: "2" | "3" | "4";
}

export default function ProductsGridSkeleton({
  count = 6,
  columns = "3",
}: ProductsGridSkeletonProps) {
  const gridClass = {
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridClass[columns]} gap-8`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
