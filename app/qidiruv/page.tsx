import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronRight, Boxes, Server, ShieldCheck, ArrowRight } from "lucide-react";
import { searchAll, REVALIDATE_INTERVAL } from "@/lib/queries";
import messages from "@/messages/uz.json";

export const revalidate = REVALIDATE_INTERVAL;

export const metadata: Metadata = {
  title: "Qidiruv natijalari",
  description: "TizimLug'at bo'yicha biznes dasturlari va platformalari qidiruvi.",
};

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const results = query ? await searchAll(query) : [];

  return (
    <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-tablet py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          {messages.common.home}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-on-surface">Qidiruv</span>
      </nav>

      {/* Header and Search Well */}
      <div className="mb-8">
        <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight mb-4">
          Qidiruv natijalari
        </h1>

        <form action="/qidiruv" method="get" className="relative flex items-center bg-surface-container-lowest rounded-2xl p-2 border border-outline-variant/30 shadow-md">
          <Search className="w-5 h-5 text-primary ml-3 mr-2 select-none" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder={messages.site.searchPlaceholder}
            className="w-full bg-transparent text-on-surface placeholder:text-outline font-body-base focus:outline-none px-1"
          />
          <button
            type="submit"
            className="h-10 px-5 bg-primary text-on-primary font-label-md font-bold rounded-xl hover:bg-primary-container transition-all active:scale-95"
          >
            {messages.site.searchButton}
          </button>
        </form>
      </div>

      {/* Results Status */}
      {query && (
        <div className="mb-6 text-sm text-on-surface-variant font-medium">
          “<b>{query}</b>” so‘rovi bo‘yicha <b>{results.length}</b> {messages.common.resultsFound}:
        </div>
      )}

      {/* Results List */}
      {results.length > 0 ? (
        <div className="flex flex-col gap-3">
          {results.map((res) => {
            const href =
              res.result_type === "system_type"
                ? `/tizimlar/${res.slug}`
                : res.result_type === "platform"
                ? `/platformalar/${res.slug}`
                : `/ozbekiston`;

            return (
              <Link
                key={`${res.result_type}-${res.id}`}
                href={href}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-between gap-4 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      res.result_type === "system_type"
                        ? "bg-primary/10 text-primary"
                        : res.result_type === "platform"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-tertiary/10 text-tertiary"
                    }`}
                  >
                    {res.result_type === "system_type" && <Boxes className="w-6 h-6" />}
                    {res.result_type === "platform" && <Server className="w-6 h-6" />}
                    {res.result_type === "local_system" && <ShieldCheck className="w-6 h-6" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                        {res.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-surface-container-low text-[11px] font-semibold text-outline">
                        {res.category}
                      </span>
                    </div>
                    <p className="font-body-sm text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      {res.subtitle} — {res.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            );
          })}
        </div>
      ) : query ? (
        <div className="text-center py-16 bg-surface-container-low rounded-3xl border border-outline-variant/30">
          <p className="font-bold text-on-surface text-lg mb-1">
            {messages.common.emptyStateTitle}
          </p>
          <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
            "{query}" bo‘yicha hech qanday tizim topilmadi. Boshqa so‘z bilan qidirib ko‘ring (masalan: ERP, CRM, 1C, Didox).
          </p>
        </div>
      ) : (
        <div className="text-center py-16 bg-surface-container-low rounded-3xl border border-outline-variant/30">
          <p className="font-bold text-on-surface text-base">
            Qidirish uchun yuqoridagi maydonga tizim nomi yoki qisqartmasini kiriting.
          </p>
        </div>
      )}
    </div>
  );
}
