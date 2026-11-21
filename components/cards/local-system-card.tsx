import * as React from "react";
import { CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import type { LocalSystem } from "@/types/database";
import messages from "@/messages/uz.json";

interface LocalSystemCardProps {
  system: LocalSystem;
}

export function LocalSystemCard({ system }: LocalSystemCardProps) {
  return (
    <div className="group flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm hover:border-tertiary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-tertiary/5 transition-all duration-200">
      <div>
        {/* Top Header with Verified badge */}
        <div className="flex items-start justify-between gap-space-sm mb-space-md">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center font-bold text-lg group-hover:scale-105 group-hover:bg-tertiary group-hover:text-on-tertiary transition-all">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-code-badge text-code-badge font-bold bg-tertiary/10 text-tertiary border border-tertiary/25">
            <CheckCircle2 className="w-3 h-3" />
            <span>{messages.common.verified}</span>
          </span>
        </div>

        {/* Name */}
        <div className="mb-space-sm">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-tertiary transition-colors">
            {system.name}
          </h3>
          <span className="font-label-sm text-label-sm text-tertiary font-semibold">
            O‘zbekiston milliy dasturiy yechimi
          </span>
        </div>

        {/* Description */}
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-space-md leading-relaxed">
          {system.description_uz}
        </p>
      </div>

      {/* Tags and External Website Link */}
      <div className="pt-space-sm border-t border-outline-variant/20 flex flex-col gap-3">
        {/* Use-case tags */}
        <div className="flex flex-wrap gap-1.5">
          {system.use_case_tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface-variant font-label-sm text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Official URL */}
        {system.official_url && (
          <a
            href={system.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-container transition-colors"
          >
            <span>{messages.common.officialSite}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
