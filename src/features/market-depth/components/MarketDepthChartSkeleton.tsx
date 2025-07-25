"use client";

import Skeleton from "@/shared/components/Skeleton";

export default function MarketDepthChartSkeleton() {
  return (
    <div className="bg-bg-primary rounded-lg p-4">
      {/* Header */}
      <Skeleton height="1.5rem" className="w-48 mb-4" />

      {/* Chart Container */}
      <div className="h-64 relative">
        {/* Chart Area */}
        <Skeleton height="100%" className="w-full" rounded="lg" />

        {/* Chart Elements Overlay */}
        <div className="absolute inset-0 p-4">
          {/* Y-axis labels */}
          <div className="h-full flex flex-col justify-between text-xs text-text-tertiary">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height="0.75rem" className="w-12" />
            ))}
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-text-tertiary px-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} height="0.75rem" className="w-16" />
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <Skeleton height="0.75rem" className="w-4" rounded="full" />
          <Skeleton height="0.75rem" className="w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton height="0.75rem" className="w-4" rounded="full" />
          <Skeleton height="0.75rem" className="w-16" />
        </div>
      </div>
    </div>
  );
}
