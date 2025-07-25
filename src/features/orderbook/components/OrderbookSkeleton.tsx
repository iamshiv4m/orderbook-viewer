"use client";

import Skeleton from "@/shared/components/Skeleton";

export default function OrderbookSkeleton() {
  return (
    <div className="bg-bg-primary rounded-lg p-4">
      <Skeleton height="1.5rem" className="w-48 mb-4" />

      <div className="grid grid-cols-2 gap-4">
        {/* Asks Skeleton */}
        <div>
          <Skeleton height="1.25rem" className="w-20 mb-2" />
          <div className="space-y-1">
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={`ask-${index}`} className="flex justify-between p-1">
                <Skeleton height="1rem" className="w-20" />
                <Skeleton height="1rem" className="w-16" />
                <Skeleton height="1rem" className="w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Bids Skeleton */}
        <div>
          <Skeleton height="1.25rem" className="w-16 mb-2" />
          <div className="space-y-1">
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={`bid-${index}`} className="flex justify-between p-1">
                <Skeleton height="1rem" className="w-20" />
                <Skeleton height="1rem" className="w-16" />
                <Skeleton height="1rem" className="w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
