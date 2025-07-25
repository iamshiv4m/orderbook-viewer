"use client";

import Skeleton from "@/shared/components/Skeleton";

export default function OrderSimulationFormSkeleton() {
  return (
    <div className="bg-bg-primary rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton height="1.25rem" className="w-5" rounded="full" />
        <Skeleton height="1.5rem" className="w-48" />
      </div>

      <div className="space-y-4">
        {/* Venue Selector */}
        <div>
          <Skeleton height="1rem" className="w-20 mb-2" />
          <div className="flex space-x-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                height="2.5rem"
                className="w-20"
                rounded="md"
              />
            ))}
          </div>
        </div>

        {/* Symbol Input */}
        <div>
          <Skeleton height="1rem" className="w-16 mb-2" />
          <Skeleton height="2.5rem" className="w-full" rounded="md" />
        </div>

        {/* Order Type */}
        <div>
          <Skeleton height="1rem" className="w-24 mb-2" />
          <div className="flex space-x-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                key={index}
                height="2.5rem"
                className="w-20"
                rounded="md"
              />
            ))}
          </div>
        </div>

        {/* Side Selection */}
        <div>
          <Skeleton height="1rem" className="w-12 mb-2" />
          <div className="flex space-x-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                key={index}
                height="2.5rem"
                className="w-16"
                rounded="md"
              />
            ))}
          </div>
        </div>

        {/* Price Input */}
        <div>
          <Skeleton height="1rem" className="w-16 mb-2" />
          <Skeleton height="2.5rem" className="w-full" rounded="md" />
        </div>

        {/* Quantity Input */}
        <div>
          <Skeleton height="1rem" className="w-20 mb-2" />
          <Skeleton height="2.5rem" className="w-full" rounded="md" />
        </div>

        {/* Timing Selection */}
        <div>
          <Skeleton height="1rem" className="w-16 mb-2" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                height="2.5rem"
                className="w-full"
                rounded="md"
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Skeleton height="2.5rem" className="w-24" rounded="md" />
          <Skeleton height="2.5rem" className="w-20" rounded="md" />
        </div>
      </div>
    </div>
  );
}
