"use client";

import * as React from "react";
import Link from "next/link";
import { Server, CheckCircle2, ArrowUpRight, Cloud, HardDrive, Cpu } from "lucide-react";
import type { Platform } from "@/types/database";
import messages from "@/messages/uz.json";

interface PlatformCardProps {
  platform: Platform;
  isCompared?: boolean;
  onToggleCompare?: (slug: string) => void;
  disableCompare?: boolean;
}

export function PlatformCard({
  platform,
  isCompared = false,
  onToggleCompare,
  disableCompare = false,
}: PlatformCardProps) {
  const pricingLabel =
    messages.compare.pricingTypes[
      platform.pricing_model as keyof typeof messages.compare.pricingTypes
    ] || platform.pricing_model;

  const deploymentLabel =
    messages.compare.deploymentTypes[
      platform.deployment as keyof typeof messages.compare.deploymentTypes
    ] || platform.deployment;

  return (
    <div className="group relative flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm hover:border-secondary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-200">
      <div>
        {/* Top bar with icon and compare checkbox */}
        <div className="flex items-start justify-between gap-space-sm mb-space-md">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold text-lg group-hover:scale-105 group-hover:bg-secondary group-hover:text-on-secondary transition-all">
            {platform.name.slice(0, 2).toUpperCase()}
          </div>

          {/* Compare Checkbox */}
          {onToggleCompare && (
            <label
              className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-on-surface-variant hover:text-primary select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={isCompared}
                disabled={!isCompared && disableCompare}
                onChange={() => onToggleCompare(platform.slug)}
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 disabled:opacity-40 cursor-pointer"
              />
              <span className="hidden sm:inline-block">
                {messages.common.addToCompare}
              </span>
            </label>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="mb-space-sm">
          <Link href={`/platformalar/${platform.slug}`} className="block">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors flex items-center justify-between">
              <span>{platform.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-primary" />
            </h3>
          </Link>
          <p className="font-label-sm text-label-sm text-outline mt-0.5 line-clamp-1">
            {platform.full_name}
          </p>
        </div>

        {/* Description */}
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-sm leading-relaxed">
          {platform.description_uz}
        </p>

        {/* Target Audience */}
        <div className="p-2.5 rounded-xl bg-surface-container-low/70 mb-space-md border border-outline-variant/10 text-xs">
          <span className="font-bold text-on-surface block mb-0.5">
            Kimlar uchun:
          </span>
          <span className="text-on-surface-variant line-clamp-2">
            {platform.audience_uz}
          </span>
        </div>
      </div>

      {/* Badges / Specifications Footer */}
      <div className="pt-space-sm border-t border-outline-variant/20 flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-semibold">
          {/* Pricing Model */}
          <span className="px-2 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed-variant">
            {pricingLabel}
          </span>

          {/* Deployment Type */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface-variant">
            {platform.deployment === "cloud" && <Cloud className="w-3 h-3" />}
            {platform.deployment === "onprem" && <HardDrive className="w-3 h-3" />}
            {platform.deployment === "hybrid" && <Cpu className="w-3 h-3" />}
            <span>{deploymentLabel}</span>
          </span>
        </div>

        {/* Uzbek Support Badge */}
        {platform.local_support && (
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-tertiary">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{messages.common.localSupport}</span>
          </div>
        )}
      </div>
    </div>
  );
}
