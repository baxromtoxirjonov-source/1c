import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { getLocalSystems, REVALIDATE_INTERVAL } from "@/lib/queries";
import { LocalSystemCard } from "@/components/cards/local-system-card";
import messages from "@/messages/uz.json";

export const revalidate = REVALIDATE_INTERVAL;

export const metadata: Metadata = {
  title: messages.nav.local,
  description: "O'zbekiston soliq, kassa va qonunchiligiga to'liq moslashtirilgan milliy biznes dasturlari katalogi (BILLZ, Didox, Modme, Soliq.uz...).",
};

interface LocalPageProps {
  searchParams: {
    tag?: string;
  };
}

export default async function OzbekistonPage({ searchParams }: LocalPageProps) {
  const selectedTag = searchParams.tag || "all";
  const allSystems = await getLocalSystems();

  const filteredSystems =
    selectedTag === "all"
      ? allSystems
      : allSystems.filter((s) => s.use_case_tags.includes(selectedTag));

  const allTags = [
    "all",
    "Chakana savdo",
    "O'quv markazi",
    "Hujjat aylanmasi",
    "Soliq",
    "Restoran",
  ];

  return (
    <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          {messages.common.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-on-surface">{messages.nav.local}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Milliy Ekologiya</span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
          {messages.nav.local}
        </h1>
        <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mt-1">
          O‘zbekiston Respublikasi soliq tizimi (onlayn-NKM), elektron hisob-faktura (Didox) va mahalliy to‘lov tizimlari (Click, Payme, Uzum) bilan 100% integratsiyalangan dasturiy yechimlar.
        </p>
      </div>

      {/* Tags Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {allTags.map((tag) => {
          const isActive = selectedTag === tag;
          const href = tag === "all" ? "/ozbekiston" : `/ozbekiston?tag=${encodeURIComponent(tag)}`;
          return (
            <Link
              key={tag}
              href={href}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                isActive
                  ? "bg-tertiary text-on-tertiary border-tertiary shadow-md"
                  : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low border-outline-variant/30"
              }`}
            >
              {tag === "all" ? "Barcha sohalar" : tag}
            </Link>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filteredSystems.map((system) => (
          <LocalSystemCard key={system.id} system={system} />
        ))}
      </div>
    </div>
  );
}
