"use client";

import Skeleton from "@/shared/components/Skeleton";

export default function OrderbookViewerSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="bg-bg-primary rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton height="1.5rem" className="w-48" />
          <div className="flex space-x-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                height="2rem"
                className="w-16"
                rounded="md"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Skeleton height="1rem" className="w-16" />
            <Skeleton height="1rem" className="w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton height="1rem" className="w-20" />
            <Skeleton height="1rem" className="w-16" />
          </div>
        </div>
      </div>

      {/* Orderbook Table Skeleton */}
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

      {/* Market Depth Chart Skeleton */}
      <div className="bg-bg-primary rounded-lg p-4">
        <Skeleton height="1.5rem" className="w-48 mb-4" />
        <Skeleton height="16rem" className="w-full" rounded="lg" />
      </div>

      {/* Order Impact Metrics Skeleton */}
      <div className="bg-bg-primary rounded-lg p-4">
        <Skeleton height="1.5rem" className="w-48 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="text-center">
              <Skeleton height="1rem" className="w-20 mx-auto mb-2" />
              <Skeleton height="1.5rem" className="w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
