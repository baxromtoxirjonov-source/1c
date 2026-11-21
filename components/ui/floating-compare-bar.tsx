"use client";

import * as React from "react";
import Link from "next/link";
import { X, ArrowRight, Layers } from "lucide-react";
import messages from "@/messages/uz.json";

interface FloatingCompareBarProps {
  selectedSlugs: string[];
  onRemoveSlug: (slug: string) => void;
  onClearAll: () => void;
}

export function FloatingCompareBar({
  selectedSlugs,
  onRemoveSlug,
  onClearAll,
}: FloatingCompareBarProps) {
  if (selectedSlugs.length === 0) return null;

  const compareUrl = `/taqqoslash?items=${selectedSlugs.join(",")}`;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-surface-container-lowest/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-3 shadow-2xl shadow-primary/10 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold text-xs shrink-0">
          <Layers className="w-3.5 h-3.5" />
          <span>{selectedSlugs.length} / 3</span>
        </div>

        {selectedSlugs.map((slug) => (
          <span
            key={slug}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface uppercase shrink-0"
          >
            <span>{slug}</span>
            <button
              type="button"
              onClick={() => onRemoveSlug(slug)}
              className="p-0.5 rounded-full hover:bg-surface-container-high text-on-surface-variant"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-outline hover:text-on-surface transition-colors px-2 py-1"
        >
          {messages.common.clearCompare}
        </button>

        <Link
          href={compareUrl}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary font-label-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
        >
          <span>{messages.common.compareNow}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
