import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, CheckCircle2, Server, Cloud, HardDrive, Cpu, ShieldCheck, ArrowRight, Layers } from "lucide-react";
import { getPlatforms, getPlatformBySlug, REVALIDATE_INTERVAL } from "@/lib/queries";
import messages from "@/messages/uz.json";

export const revalidate = REVALIDATE_INTERVAL;

interface PlatformDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const platforms = await getPlatforms();
  return platforms.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlatformDetailPageProps): Promise<Metadata> {
  const platform = await getPlatformBySlug(params.slug);
  if (!platform) {
    return { title: "Platforma topilmadi" };
  }

  return {
    title: `${platform.name} - to'liq sharh, narxlari va integratsiyalari`,
    description: platform.description_uz,
  };
}

export default async function PlatformDetailPage({
  params,
}: PlatformDetailPageProps) {
  const platform = await getPlatformBySlug(params.slug);

  if (!platform) {
    notFound();
  }

  const pricingLabel =
    messages.compare.pricingTypes[
      platform.pricing_model as keyof typeof messages.compare.pricingTypes
    ] || platform.pricing_model;

  const deploymentLabel =
    messages.compare.deploymentTypes[
      platform.deployment as keyof typeof messages.compare.deploymentTypes
    ] || platform.deployment;

  return (
    <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-tablet py-8">
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
        <span className="text-on-surface font-bold">{platform.name}</span>
      </nav>

      {/* Main Platform Header Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-10 border border-outline-variant/30 shadow-lg mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center font-black text-2xl shadow-md">
              {platform.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                {platform.name}
              </h1>
              <p className="font-label-lg text-sm text-outline font-semibold">
                {platform.full_name}
              </p>
            </div>
          </div>

          {platform.website_url && (
            <a
              href={platform.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-md shadow-primary/20 hover:bg-primary-container transition-all self-start sm:self-center"
            >
              <span>{messages.common.officialSite}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
          {platform.description_uz}
        </p>

        {/* Local Support Banner */}
        {platform.local_support && (
          <div className="p-4 rounded-2xl bg-tertiary-fixed/30 border border-tertiary/20 flex items-center gap-3 text-tertiary">
            <ShieldCheck className="w-6 h-6 shrink-0" />
            <div className="text-sm font-semibold">
              Ushbu platforma O‘zbekistonda rasmiy vakillik, litsenziyalash yoki rasmiy integratsiya hamkorlariga ega.
            </div>
          </div>
        )}
      </div>

      {/* Grid: Audience & Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Kimlar uchun */}
        <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/20">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">
            Kimlar uchun mo‘ljallangan?
          </h2>
          <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed">
            {platform.audience_uz}
          </p>
        </div>

        {/* Texnik parametrlar */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-4">
            Texnik parametrlar
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <span className="text-outline font-medium">{messages.compare.pricingModel}:</span>
              <span className="font-bold text-on-surface px-2.5 py-1 rounded-md bg-primary-fixed text-on-primary-fixed-variant text-xs">
                {pricingLabel}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <span className="text-outline font-medium">{messages.compare.deployment}:</span>
              <span className="font-bold text-on-surface flex items-center gap-1.5">
                {platform.deployment === "cloud" && <Cloud className="w-4 h-4 text-primary" />}
                {platform.deployment === "onprem" && <HardDrive className="w-4 h-4 text-secondary" />}
                {platform.deployment === "hybrid" && <Cpu className="w-4 h-4 text-tertiary" />}
                <span>{deploymentLabel}</span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-outline font-medium">{messages.compare.uzbekSupport}:</span>
              <span className={`font-bold flex items-center gap-1 ${platform.local_support ? "text-tertiary" : "text-outline"}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>{platform.local_support ? messages.common.hasLocalSupport : messages.common.noLocalSupport}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations section */}
      {platform.integrations && platform.integrations.length > 0 && (
        <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-sm mb-10">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-4">
            Tayyor integratsiyalar
          </h2>
          <div className="flex flex-wrap gap-2">
            {platform.integrations.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-sm font-semibold text-on-surface"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Compare CTA */}
      <div className="p-6 rounded-3xl bg-secondary-fixed/50 border border-secondary-fixed flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-bold text-on-secondary-fixed text-base">
            Ushbu platformani boshqalar bilan solishtirmoqchimisiz?
          </h3>
          <p className="text-xs text-on-secondary-fixed-variant mt-0.5">
            Barcha imkoniyatlar va narxlarni taqqoslash matritsasida ko‘ring
          </p>
        </div>
        <Link
          href={`/taqqoslash?items=${platform.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-label-sm font-bold shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-all shrink-0"
        >
          <span>Taqqoslashga o‘tish</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Back button */}
      <div>
        <Link
          href="/platformalar"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-lg font-bold hover:bg-surface-container-high transition-colors"
        >
          <span>← {messages.common.back}</span>
        </Link>
      </div>
    </div>
  );
}
