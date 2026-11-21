"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/database";
import messages from "@/messages/uz.json";

interface CategoryFilterChipsProps {
  categories: Category[];
  selectedCategory?: string;
  onSelectCategory?: (slug: string) => void;
  syncWithUrl?: boolean;
}

export function CategoryFilterChips({
  categories,
  selectedCategory,
  onSelectCategory,
  syncWithUrl = true,
}: CategoryFilterChipsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = syncWithUrl
    ? searchParams.get("category") || "all"
    : selectedCategory || "all";

  const handleSelect = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
    if (syncWithUrl) {
      const params = new URLSearchParams(searchParams.toString());
      if (slug === "all") {
        params.delete("category");
      } else {
        params.set("category", slug);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const allCategories = [
    { id: "all", slug: "all", name_uz: messages.categories.all, sort_order: 0 },
    ...categories,
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 min-w-max pb-1">
        {allCategories.map((cat) => {
          const isActive = currentCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleSelect(cat.slug)}
              className={cn(
                "px-4 py-2 rounded-xl font-label-lg text-label-lg transition-all active:scale-95 border",
                isActive
                  ? "bg-primary-container text-on-primary font-bold shadow-md shadow-primary/20 border-primary"
                  : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low border-outline-variant/30"
              )}
            >
              {cat.name_uz}
            </button>
          );
        })}
      </div>
    </div>
  );
}
