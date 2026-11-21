"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import type { FAQItem } from "@/types/database";

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col divide-y divide-outline-variant/20 border-y border-outline-variant/20">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="py-4">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left font-title-md font-bold text-on-surface hover:text-primary transition-colors"
            >
              <span>{item.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-outline shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="pt-3 pb-1 text-sm text-on-surface-variant font-body-base leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
