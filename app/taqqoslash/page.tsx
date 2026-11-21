import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import { getPlatforms, REVALIDATE_INTERVAL } from "@/lib/queries";
import { CompareView } from "@/components/sections/compare-view";
import messages from "@/messages/uz.json";

export const revalidate = REVALIDATE_INTERVAL;

export const metadata: Metadata = {
  title: messages.compare.title,
  description: messages.compare.subtitle,
};

interface ComparePageProps {
  searchParams: {
    items?: string;
  };
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const allPlatforms = await getPlatforms();
  const rawItems = searchParams.items || "";
  const selectedSlugs = rawItems
    ? rawItems.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
    : [];

  return (
    <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          {messages.common.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/platformalar" className="hover:text-primary transition-colors">
          {messages.nav.platforms}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-on-surface">{messages.nav.compare}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Interaktiv Matritsa</span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
          {messages.compare.title}
        </h1>
        <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mt-1">
          {messages.compare.subtitle}
        </p>
      </div>

      {/* Interactive Compare View */}
      <CompareView
        allPlatforms={allPlatforms}
        selectedSlugs={selectedSlugs}
      />
    </div>
  );
}
