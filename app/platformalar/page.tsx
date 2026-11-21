import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Server } from "lucide-react";
import { getCategories, getPlatforms, REVALIDATE_INTERVAL } from "@/lib/queries";
import { CategoryFilterChips } from "@/components/ui/category-filter-chips";
import { PlatformsGridInteractive } from "@/components/sections/platforms-grid-interactive";
import messages from "@/messages/uz.json";

export const revalidate = REVALIDATE_INTERVAL;

export const metadata: Metadata = {
  title: messages.nav.platforms,
  description: "O'zbekistonda va dunyoda eng mashhur korporativ dasturlar katalogi va solishtiruvi (1C, Bitrix24, AmoCRM, SAP, Odoo...).",
};

interface PlatformsPageProps {
  searchParams: {
    category?: string;
  };
}

export default async function PlatformsPage({ searchParams }: PlatformsPageProps) {
  const categorySlug = searchParams.category || "all";
  const [categories, platforms] = await Promise.all([
    getCategories(),
    getPlatforms(categorySlug),
  ]);

  return (
    <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          {messages.common.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-on-surface">{messages.nav.platforms}</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
          <Server className="w-3.5 h-3.5" />
          <span>Platformalar katalogi</span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
          {messages.nav.platforms}
        </h1>
        <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mt-1">
          Dasturlarni tanlang, imkoniyatlarini o‘rganing va 3 tagacha tizimni yonma-yon taqqoslang
        </p>
      </div>

      {/* Categories Filter */}
      <div className="mb-8">
        <CategoryFilterChips
          categories={categories}
          selectedCategory={categorySlug}
        />
      </div>

      {/* Interactive Grid with Compare Support */}
      {platforms.length > 0 ? (
        <PlatformsGridInteractive platforms={platforms} />
      ) : (
        <div className="text-center py-16 bg-surface-container-low rounded-3xl border border-outline-variant/30">
          <p className="font-bold text-on-surface text-lg mb-1">
            {messages.common.emptyStateTitle}
          </p>
          <p className="text-sm text-on-surface-variant">
            {messages.common.emptyStateDesc}
          </p>
        </div>
      )}
    </div>
  );
}
