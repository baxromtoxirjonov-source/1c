"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, Boxes, Server, ShieldCheck, ArrowRight, CornerDownLeft } from "lucide-react";
import { searchAll } from "@/lib/queries";
import type { SearchResult } from "@/types/database";
import messages from "@/messages/uz.json";

interface SearchCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchCommandPalette({
  isOpen,
  onClose,
}: SearchCommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  // Debounced search
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      const found = await searchAll(query);
      setResults(found);
      setSelectedIndex(0);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          navigateToResult(results[selectedIndex]);
        } else if (query.trim()) {
          router.push(`/qidiruv?q=${encodeURIComponent(query.trim())}`);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, query]);

  if (!isOpen) return null;

  const navigateToResult = (item: SearchResult) => {
    if (item.result_type === "system_type") {
      router.push(`/tizimlar/${item.slug}`);
    } else if (item.result_type === "platform") {
      router.push(`/platformalar/${item.slug}`);
    } else {
      router.push("/ozbekiston");
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Qidiruv"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Well */}
        <div className="flex items-center px-4 border-b border-outline-variant/20 bg-surface-container-low/40">
          <Search className="w-5 h-5 text-primary mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={messages.site.searchPlaceholder}
            className="w-full py-4 bg-transparent text-on-surface placeholder:text-outline font-body-base focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block bg-surface-container-lowest text-on-surface-variant font-code-badge text-[11px] px-2 py-0.5 rounded shadow-sm border border-outline-variant/20">
            Esc
          </kbd>
        </div>

        {/* Search Results Body */}
        <div className="p-2 max-h-[420px] overflow-y-auto">
          {loading && (
            <div className="p-6 text-center text-sm text-outline">
              {messages.common.loading}
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="font-semibold text-on-surface mb-1">
                {messages.common.emptyStateTitle}
              </p>
              <p className="text-xs text-on-surface-variant">
                "{query}" bo'yicha hech qanday tizim topilmadi.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="flex flex-col gap-1">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={`${item.result_type}-${item.slug}`}
                    type="button"
                    onClick={() => navigateToResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                      isSelected
                        ? "bg-primary-container text-on-primary"
                        : "hover:bg-surface-container-low text-on-surface"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : item.result_type === "system_type"
                            ? "bg-primary/10 text-primary"
                            : item.result_type === "platform"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-tertiary/10 text-tertiary"
                        }`}
                      >
                        {item.result_type === "system_type" && <Boxes className="w-4 h-4" />}
                        {item.result_type === "platform" && <Server className="w-4 h-4" />}
                        {item.result_type === "local_system" && <ShieldCheck className="w-4 h-4" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{item.title}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-surface-container-high text-on-surface-variant"
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <div
                          className={`text-xs line-clamp-1 ${
                            isSelected ? "text-white/80" : "text-on-surface-variant"
                          }`}
                        >
                          {item.subtitle} — {item.description}
                        </div>
                      </div>
                    </div>

                    <CornerDownLeft
                      className={`w-4 h-4 ml-2 shrink-0 ${
                        isSelected ? "text-white opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {!query && (
            <div className="p-4">
              <div className="text-xs font-semibold text-outline uppercase tracking-wider mb-2">
                Ommabop qidiruvlar
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setQuery("ERP")}
                  className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-left text-xs font-bold text-on-surface"
                >
                  ⚡ ERP tizimlari
                </button>
                <button
                  type="button"
                  onClick={() => setQuery("CRM")}
                  className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-left text-xs font-bold text-on-surface"
                >
                  ⚡ CRM savdo voronkasi
                </button>
                <button
                  type="button"
                  onClick={() => setQuery("1C")}
                  className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-left text-xs font-bold text-on-surface"
                >
                  ⚡ 1C:Enterprise
                </button>
                <button
                  type="button"
                  onClick={() => setQuery("Didox")}
                  className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-left text-xs font-bold text-on-surface"
                >
                  ⚡ Didox elektron hisob
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-surface-container-low/60 border-t border-outline-variant/10 text-xs text-on-surface-variant flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Tanlash: <b>↑ / ↓</b></span>
            <span>Ochish: <b>↵ Enter</b></span>
          </div>
          <span>Yopish: <b>Esc</b></span>
        </div>
      </div>
    </div>
  );
}
