import * as React from "react";

export default function Loading() {
  return (
    <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-12 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-8 w-48 bg-surface-container-high rounded-full mb-4" />
      <div className="h-12 w-3/4 max-w-xl bg-surface-container-high rounded-2xl mb-4" />
      <div className="h-6 w-1/2 max-w-md bg-surface-container rounded-xl mb-12" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-64 rounded-2xl bg-surface-container-low border border-outline-variant/20 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high mb-4" />
              <div className="h-6 w-32 bg-surface-container-high rounded-lg mb-2" />
              <div className="h-4 w-full bg-surface-container rounded-lg mb-1" />
              <div className="h-4 w-2/3 bg-surface-container rounded-lg" />
            </div>
            <div className="h-6 w-24 bg-surface-container-high rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
