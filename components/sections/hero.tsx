"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Globe, Verified, Sparkles } from "lucide-react";
import messages from "@/messages/uz.json";

interface HeroProps {
  counts: {
    systemTypes: number;
    platforms: number;
    localSystems: number;
  };
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
}

export function Hero({ counts }: HeroProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const quickChips = [
    { label: "ERP", path: "/tizimlar/erp", color: "text-primary hover:bg-primary/10" },
    { label: "CRM", path: "/tizimlar/crm", color: "text-primary hover:bg-primary/10" },
    { label: "POS", path: "/tizimlar/pos", color: "text-primary hover:bg-primary/10" },
    { label: "WMS", path: "/tizimlar/wms", color: "text-primary hover:bg-primary/10" },
    { label: "1C", path: "/platformalar/1c", color: "text-secondary hover:bg-secondary/10" },
    { label: "BILLZ", path: "/ozbekiston", color: "text-tertiary hover:bg-tertiary/10" },
    { label: "Didox", path: "/ozbekiston", color: "text-tertiary hover:bg-tertiary/10" },
    { label: "Soliq.uz", path: "/ozbekiston", color: "text-tertiary hover:bg-tertiary/10" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/qidiruv?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low/40 to-surface py-space-xl md:py-16">
      {/* Subtle atmospheric glow orbs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[360px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-[300px] h-[300px] bg-tertiary-fixed/20 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        {/* Top Eyebrow Tag */}
        <div className="flex items-center justify-center mb-space-md">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 text-primary border border-primary/20 shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-code-badge text-code-badge uppercase tracking-wider font-bold">
              {messages.site.catalogTag}
            </span>
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-space-lg">
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface tracking-tight mb-space-md font-extrabold">
            {messages.site.heroTitle1}{" "}
            <span className="bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent">
              {messages.site.heroTitle2}
            </span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            {messages.site.description}
          </p>
        </div>

        {/* Hero Search Bar */}
        <div className="max-w-2xl mx-auto mb-space-md">
          <form
            onSubmit={handleSearch}
            className="relative flex items-center bg-surface-container-lowest rounded-2xl shadow-xl shadow-primary/5 p-2 transition-all border border-outline-variant/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
          >
            <Search className="w-5 h-5 text-primary ml-3 mr-2 shrink-0 select-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={messages.site.searchPlaceholder}
              className="w-full bg-transparent text-on-surface placeholder:text-outline font-body-base text-body-base focus:outline-none px-1"
            />
            <div className="flex items-center gap-space-xs pr-1">
              <kbd className="hidden sm:inline-flex items-center gap-0.5 bg-surface-container-low text-on-surface-variant font-code-badge text-code-badge px-2.5 py-1.5 rounded-lg select-none border border-outline-variant/20">
                ⌘K
              </kbd>
              <button
                type="submit"
                className="h-11 px-space-md bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                <span>{messages.site.searchButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-space-sm">
            <span className="font-label-sm text-label-sm text-outline mr-1">
              {messages.site.searchQuick}
            </span>
            {quickChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => router.push(chip.path)}
                className={`px-3 py-1 rounded-full bg-surface-container-lowest border border-outline-variant/25 transition-all font-code-badge text-code-badge shadow-sm active:scale-95 ${chip.color}`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Glassmorphic Stat Counters from real DB */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-space-lg mb-space-xl">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl p-space-md border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="font-headline-xl text-headline-xl text-primary font-extrabold flex items-baseline gap-0.5">
                  <Counter target={counts.systemTypes} />
                  <span className="text-secondary">+</span>
                </div>
                <div className="font-label-lg text-label-lg text-on-surface font-semibold">
                  {messages.stats.typesCount}
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  {messages.stats.typesDesc}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl p-space-md border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div className="font-headline-xl text-headline-xl text-secondary font-extrabold flex items-baseline gap-0.5">
                  <Counter target={counts.platforms} />
                  <span className="text-secondary">+</span>
                </div>
                <div className="font-label-lg text-label-lg text-on-surface font-semibold">
                  {messages.stats.platformsCount}
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  {messages.stats.platformsDesc}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl p-space-md border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <Verified className="w-6 h-6" />
              </div>
              <div>
                <div className="font-headline-xl text-headline-xl text-tertiary font-extrabold flex items-baseline gap-0.5">
                  <Counter target={counts.localSystems} />
                  <span className="text-tertiary">+</span>
                </div>
                <div className="font-label-lg text-label-lg text-on-surface font-semibold">
                  {messages.stats.localCount}
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  {messages.stats.localDesc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
