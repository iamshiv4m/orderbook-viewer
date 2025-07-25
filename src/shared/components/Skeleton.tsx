"use client";

import { cn } from "../utils/cn";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export default function Skeleton({
  className,
  width,
  height,
  rounded = "md",
}: SkeletonProps) {
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-bg-secondary",
        roundedClasses[rounded],
        className
      )}
      style={{
        width: width,
        height: height,
      }}
    />
  );
}

// Predefined skeleton components for common use cases
export function SkeletonText({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="1rem"
          className={cn("w-full", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton height="2.5rem" className={cn("w-24", className)} />;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 space-y-4", className)}>
      <Skeleton height="1.5rem" className="w-1/2" />
      <SkeletonText lines={3} />
      <div className="flex gap-2">
        <SkeletonButton />
        <SkeletonButton />
      </div>
    </div>
  );
}
