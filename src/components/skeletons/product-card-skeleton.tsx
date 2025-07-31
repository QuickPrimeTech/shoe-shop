import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <div className="relative">
        <Skeleton className="w-full h-80" />
        <div className="absolute top-4 left-4">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-16 h-4" />
          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-8 h-4" />
            <Skeleton className="w-12 h-4" />
          </div>
        </div>

        <Skeleton className="w-3/4 h-6" />

        <div className="flex items-center gap-2">
          <Skeleton className="w-16 h-6" />
          <Skeleton className="w-12 h-4" />
        </div>

        <Skeleton className="w-full h-10 rounded-md" />
      </div>
    </Card>
  );
}
