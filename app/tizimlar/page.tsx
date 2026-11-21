import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import { getCategories, getSystemTypes, REVALIDATE_INTERVAL } from "@/lib/queries";
import { SystemTypeCard } from "@/components/cards/system-type-card";
import { CategoryFilterChips } from "@/components/ui/category-filter-chips";
import messages from "@/messages/uz.json";

export const revalidate = REVALIDATE_INTERVAL;

export const metadata: Metadata = {
  title: messages.nav.systemTypes,
  description: "Barcha biznes boshqaruv tizimlari (ERP, CRM, POS, WMS, HRM, BI...) tushuntirishi va ensiklopediyasi.",
};

interface TizimlarPageProps {
  searchParams: {
    category?: string;
  };
}

export default async function TizimlarPage({ searchParams }: TizimlarPageProps) {
  const categorySlug = searchParams.category || "all";
  const [categories, systemTypes] = await Promise.all([
    getCategories(),
    getSystemTypes(categorySlug),
  ]);

  return (
    <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          {messages.common.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-on-surface">{messages.nav.systemTypes}</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Katalog</span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
          {messages.nav.systemTypes}
        </h1>
        <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mt-1">
          Kompaniyangiz jarayonlarini avtomatlashtirish uchun mavjud barcha asosiy axborot tizimlari turlari
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="mb-8">
        <CategoryFilterChips
          categories={categories}
          selectedCategory={categorySlug}
        />
      </div>

      {/* Grid */}
      {systemTypes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {systemTypes.map((system) => (
            <SystemTypeCard key={system.id} system={system} />
          ))}
        </div>
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
