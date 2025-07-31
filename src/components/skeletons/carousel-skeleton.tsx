import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./product-card-skeleton";

export default function CarouselSkeleton() {
  return (
    <div className="space-y-12">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <Skeleton className="w-48 h-8 mx-auto rounded-full" />
        <Skeleton className="w-96 h-10 mx-auto" />
        <Skeleton className="w-32 h-6 mx-auto rounded-full" />
      </div>

      {/* Carousel Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
