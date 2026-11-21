"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, CheckCircle2, Minus, ExternalLink, Cloud, HardDrive, Cpu, Plus, Layers } from "lucide-react";
import type { Platform } from "@/types/database";
import messages from "@/messages/uz.json";

interface CompareViewProps {
  allPlatforms: Platform[];
  selectedSlugs: string[];
}

export function CompareView({ allPlatforms, selectedSlugs }: CompareViewProps) {
  const router = useRouter();

  const selectedPlatforms = allPlatforms.filter((p) =>
    selectedSlugs.includes(p.slug)
  );

  const availablePlatforms = allPlatforms.filter(
    (p) => !selectedSlugs.includes(p.slug)
  );

  const addPlatform = (slug: string) => {
    if (selectedSlugs.length >= 3) return;
    const next = [...selectedSlugs, slug];
    router.push(`/taqqoslash?items=${next.join(",")}`);
  };

  const removePlatform = (slug: string) => {
    const next = selectedSlugs.filter((s) => s !== slug);
    if (next.length === 0) {
      router.push("/taqqoslash");
    } else {
      router.push(`/taqqoslash?items=${next.join(",")}`);
    }
  };

  return (
    <div className="w-full">
      {/* If empty or less than 2, show selector prompts */}
      {selectedPlatforms.length < 3 && availablePlatforms.length > 0 && (
        <div className="mb-8 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-semibold text-on-surface flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            <span>Taqqoslashga yana platforma qo‘shish (maksimal 3 ta):</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {availablePlatforms.slice(0, 6).map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => addPlatform(p.slug)}
                className="px-3 py-1 rounded-xl bg-surface-container-lowest text-on-surface hover:text-primary hover:border-primary border border-outline-variant/30 text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                + {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPlatforms.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline-variant/30">
          <Layers className="w-12 h-12 text-outline mx-auto mb-3" />
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
            Hozircha birorta ham platforma tanlanmagan
          </h2>
          <p className="font-body-base text-sm text-on-surface-variant max-w-md mx-auto mb-6">
            Platformalar katalogidan yoki quyidagi tavsiya etilganlardan kamida 2 tasini tanlang.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/taqqoslash?items=1c,odoo,bitrix24")}
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md font-bold shadow-md shadow-primary/20 hover:bg-primary-container transition-all"
            >
              Misol: 1C vs Odoo vs Bitrix24
            </button>
            <Link
              href="/platformalar"
              className="px-5 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 font-label-md font-bold text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Katalogga qaytish
            </Link>
          </div>
        </div>
      ) : (
        /* Comparison Matrix Table */
        <div className="w-full overflow-x-auto rounded-3xl border border-outline-variant/30 bg-surface-container-lowest shadow-xl">
          <table className="w-full text-left border-collapse min-w-[650px]">
            {/* Sticky Header */}
            <thead>
              <tr className="bg-surface-container-high/80 border-b border-outline-variant/30 sticky top-20 z-20 backdrop-blur-md">
                <th className="p-5 font-bold text-sm text-on-surface w-1/4">
                  {messages.compare.feature}
                </th>
                {selectedPlatforms.map((p) => (
                  <th key={p.id} className="p-5 w-1/4 border-l border-outline-variant/20">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/platformalar/${p.slug}`}
                          className="font-headline-sm font-bold text-on-surface hover:text-primary transition-colors block"
                        >
                          {p.name}
                        </Link>
                        <span className="text-xs text-outline font-normal block truncate max-w-[180px]">
                          {p.full_name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePlatform(p.slug)}
                        title="O'chirish"
                        className="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-error transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
                {/* Empty slot placeholder */}
                {Array.from({ length: 3 - selectedPlatforms.length }).map((_, idx) => (
                  <th key={idx} className="p-5 w-1/4 border-l border-outline-variant/20 bg-surface-container-low/40 text-center">
                    <span className="text-xs text-outline font-semibold">
                      + Platforma qo'shish
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {/* Row: Pricing Model */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-5 font-bold text-on-surface bg-surface-container-low/20">
                  {messages.compare.pricingModel}
                </td>
                {selectedPlatforms.map((p) => {
                  const label =
                    messages.compare.pricingTypes[
                      p.pricing_model as keyof typeof messages.compare.pricingTypes
                    ] || p.pricing_model;
                  return (
                    <td key={p.id} className="p-5 border-l border-outline-variant/20">
                      <span className="px-2.5 py-1 rounded-md bg-primary-fixed text-on-primary-fixed-variant font-bold text-xs">
                        {label}
                      </span>
                    </td>
                  );
                })}
                {Array.from({ length: 3 - selectedPlatforms.length }).map((_, idx) => (
                  <td key={idx} className="p-5 border-l border-outline-variant/20 bg-surface-container-low/20" />
                ))}
              </tr>

              {/* Row: Deployment */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-5 font-bold text-on-surface bg-surface-container-low/20">
                  {messages.compare.deployment}
                </td>
                {selectedPlatforms.map((p) => {
                  const label =
                    messages.compare.deploymentTypes[
                      p.deployment as keyof typeof messages.compare.deploymentTypes
                    ] || p.deployment;
                  return (
                    <td key={p.id} className="p-5 border-l border-outline-variant/20 font-semibold text-on-surface">
                      <span className="inline-flex items-center gap-1.5">
                        {p.deployment === "cloud" && <Cloud className="w-4 h-4 text-primary" />}
                        {p.deployment === "onprem" && <HardDrive className="w-4 h-4 text-secondary" />}
                        {p.deployment === "hybrid" && <Cpu className="w-4 h-4 text-tertiary" />}
                        <span>{label}</span>
                      </span>
                    </td>
                  );
                })}
                {Array.from({ length: 3 - selectedPlatforms.length }).map((_, idx) => (
                  <td key={idx} className="p-5 border-l border-outline-variant/20 bg-surface-container-low/20" />
                ))}
              </tr>

              {/* Row: Audience */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-5 font-bold text-on-surface bg-surface-container-low/20">
                  {messages.compare.targetAudience}
                </td>
                {selectedPlatforms.map((p) => (
                  <td key={p.id} className="p-5 border-l border-outline-variant/20 text-on-surface-variant leading-relaxed text-xs">
                    {p.audience_uz}
                  </td>
                ))}
                {Array.from({ length: 3 - selectedPlatforms.length }).map((_, idx) => (
                  <td key={idx} className="p-5 border-l border-outline-variant/20 bg-surface-container-low/20" />
                ))}
              </tr>

              {/* Row: Integrations */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-5 font-bold text-on-surface bg-surface-container-low/20">
                  {messages.compare.integrations}
                </td>
                {selectedPlatforms.map((p) => (
                  <td key={p.id} className="p-5 border-l border-outline-variant/20">
                    <div className="flex flex-wrap gap-1.5">
                      {p.integrations.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
                {Array.from({ length: 3 - selectedPlatforms.length }).map((_, idx) => (
                  <td key={idx} className="p-5 border-l border-outline-variant/20 bg-surface-container-low/20" />
                ))}
              </tr>

              {/* Row: Uzbek Support */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-5 font-bold text-on-surface bg-surface-container-low/20">
                  {messages.compare.uzbekSupport}
                </td>
                {selectedPlatforms.map((p) => (
                  <td key={p.id} className="p-5 border-l border-outline-variant/20">
                    {p.local_support ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-tertiary">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{messages.common.hasLocalSupport}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-outline">
                        <Minus className="w-4 h-4" />
                        <span>{messages.common.noLocalSupport}</span>
                      </span>
                    )}
                  </td>
                ))}
                {Array.from({ length: 3 - selectedPlatforms.length }).map((_, idx) => (
                  <td key={idx} className="p-5 border-l border-outline-variant/20 bg-surface-container-low/20" />
                ))}
              </tr>

              {/* Row: Official Website */}
              <tr className="hover:bg-surface-container-low/40 transition-colors">
                <td className="p-5 font-bold text-on-surface bg-surface-container-low/20">
                  {messages.common.officialSite}
                </td>
                {selectedPlatforms.map((p) => (
                  <td key={p.id} className="p-5 border-l border-outline-variant/20">
                    {p.website_url ? (
                      <a
                        href={p.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                      >
                        <span>Saytga o‘tish</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-outline text-xs">—</span>
                    )}
                  </td>
                ))}
                {Array.from({ length: 3 - selectedPlatforms.length }).map((_, idx) => (
                  <td key={idx} className="p-5 border-l border-outline-variant/20 bg-surface-container-low/20" />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
