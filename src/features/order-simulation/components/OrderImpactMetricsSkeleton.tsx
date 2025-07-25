"use client";

import Skeleton from "@/shared/components/Skeleton";

export default function OrderImpactMetricsSkeleton() {
  return (
    <div className="bg-bg-primary rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton height="1.25rem" className="w-5" rounded="full" />
        <Skeleton height="1.5rem" className="w-48" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="text-center p-4 bg-bg-secondary rounded-lg"
          >
            <div className="flex items-center justify-center mb-2">
              <Skeleton height="1.25rem" className="w-5" rounded="full" />
            </div>
            <Skeleton height="1rem" className="w-20 mx-auto mb-2" />
            <Skeleton height="1.5rem" className="w-16 mx-auto" />
          </div>
        ))}
      </div>

      {/* Order Details */}
      <div className="mt-6 p-4 bg-bg-secondary rounded-lg">
        <Skeleton height="1.25rem" className="w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <Skeleton height="1rem" className="w-24" />
              <Skeleton height="1rem" className="w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Warning/Info Section */}
      <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton height="1rem" className="w-4" rounded="full" />
          <Skeleton height="1rem" className="w-32" />
        </div>
        <Skeleton height="1rem" className="w-full" />
      </div>
    </div>
  );
}
