import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Boxes, Users, Store, Warehouse, UserCheck, BadgeCheck, GraduationCap, GitBranch, FileText, FolderArchive, Truck, Navigation, BarChart3, Cloud } from "lucide-react";
import type { SystemType } from "@/types/database";
import messages from "@/messages/uz.json";

interface SystemTypeCardProps {
  system: SystemType;
}

const iconMap: Record<string, React.ElementType> = {
  Boxes,
  Users,
  Store,
  Warehouse,
  UserCheck,
  BadgeCheck,
  GraduationCap,
  GitBranch,
  FileText,
  FolderArchive,
  Truck,
  Navigation,
  BarChart3,
  Cloud,
};

export function SystemTypeCard({ system }: SystemTypeCardProps) {
  const IconComponent = (system.icon && iconMap[system.icon]) ? iconMap[system.icon] : Boxes;

  return (
    <Link
      href={`/tizimlar/${system.slug}`}
      className="group flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/30 shadow-sm hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-space-sm mb-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 group-hover:bg-primary group-hover:text-on-primary transition-all duration-200">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-code-badge text-code-badge font-bold bg-primary/10 text-primary border border-primary/20">
            {system.abbr}
          </span>
        </div>

        {/* Title & English Subtitle */}
        <div className="mb-space-sm">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors flex items-center justify-between">
            <span>{system.abbr}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-primary" />
          </h3>
          <p className="font-label-sm text-label-sm text-outline mt-0.5">
            {system.full_name_en}
          </p>
        </div>

        {/* Uzbek Description */}
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mb-space-md leading-relaxed">
          {system.description_uz}
        </p>
      </div>

      {/* Key Features Chips */}
      <div className="pt-space-sm border-t border-outline-variant/20">
        <div className="flex flex-wrap gap-1.5">
          {system.key_features.slice(0, 2).map((feat, idx) => (
            <span
              key={idx}
              className="inline-block px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface-variant font-label-sm text-[11px] truncate max-w-[200px]"
            >
              {feat}
            </span>
          ))}
          {system.key_features.length > 2 && (
            <span className="inline-block px-1.5 py-0.5 rounded-md bg-surface-container-low text-outline font-label-sm text-[11px]">
              +{system.key_features.length - 2}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
