import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="border-0 shadow-lg overflow-hidden rounded-lg">
      <div className="relative overflow-hidden rounded-lg">
        <Skeleton className="w-full h-80" />

        {/* Badge placeholders */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </Card>
  );
}
