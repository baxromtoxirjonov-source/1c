"use client";

import * as React from "react";
import type { Platform } from "@/types/database";
import { PlatformCard } from "@/components/cards/platform-card";
import { FloatingCompareBar } from "@/components/ui/floating-compare-bar";

interface PlatformsGridInteractiveProps {
  platforms: Platform[];
  initialComparedSlugs?: string[];
}

export function PlatformsGridInteractive({
  platforms,
  initialComparedSlugs = [],
}: PlatformsGridInteractiveProps) {
  const [comparedSlugs, setComparedSlugs] = React.useState<string[]>(initialComparedSlugs);

  const toggleCompare = (slug: string) => {
    setComparedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, slug];
    });
  };

  const removeSlug = (slug: string) => {
    setComparedSlugs((prev) => prev.filter((s) => s !== slug));
  };

  const clearAll = () => {
    setComparedSlugs([]);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {platforms.map((p) => (
          <PlatformCard
            key={p.id}
            platform={p}
            isCompared={comparedSlugs.includes(p.slug)}
            onToggleCompare={toggleCompare}
            disableCompare={comparedSlugs.length >= 3}
          />
        ))}
      </div>

      <FloatingCompareBar
        selectedSlugs={comparedSlugs}
        onRemoveSlug={removeSlug}
        onClearAll={clearAll}
      />
    </div>
  );
}
