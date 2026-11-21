import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CheckCircle, HelpCircle, Layers, ArrowRight, Boxes, Lightbulb } from "lucide-react";
import { getSystemTypes, getSystemTypeBySlug, REVALIDATE_INTERVAL } from "@/lib/queries";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import messages from "@/messages/uz.json";

export const revalidate = REVALIDATE_INTERVAL;

interface SystemTypeDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const systems = await getSystemTypes();
  return systems.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: SystemTypeDetailPageProps): Promise<Metadata> {
  const system = await getSystemTypeBySlug(params.slug);
  if (!system) {
    return {
      title: "Tizim topilmadi",
    };
  }

  return {
    title: `${system.abbr} (${system.full_name_en}) - nima bu va qachon kerak?`,
    description: system.description_uz,
    openGraph: {
      title: `${system.abbr} — ${system.description_uz}`,
      description: system.definition_uz,
    },
  };
}

export default async function SystemTypeDetailPage({
  params,
}: SystemTypeDetailPageProps) {
  const system = await getSystemTypeBySlug(params.slug);

  if (!system) {
    notFound();
  }

  const allSystems = await getSystemTypes();
  const relatedSystems = allSystems.filter(
    (s) => s.slug !== system.slug && system.related_ids?.includes(s.id)
  );

  // JSON-LD for SEO (FAQPage & DefinedTerm)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: system.abbr,
    description: system.definition_uz,
    inDefinedTermSet: "https://tizimlugat.uz/tizimlar",
    termCode: system.slug,
  };

  const faqJsonLd = system.faq && system.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: system.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  } : null;

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-tablet py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            {messages.common.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tizimlar" className="hover:text-primary transition-colors">
            {messages.nav.systemTypes}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-on-surface uppercase font-bold">{system.abbr}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-10 border border-outline-variant/30 shadow-lg mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full font-code-badge text-xs font-black bg-primary text-on-primary">
              {system.abbr}
            </span>
            <span className="font-label-lg text-sm text-outline font-semibold">
              {system.full_name_en}
            </span>
          </div>

          <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight mb-4">
            {system.description_uz}
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {system.definition_uz}
          </p>
        </div>

        {/* Section: Qachon kerak? */}
        <div className="bg-surface-container-low rounded-3xl p-6 md:p-8 border border-outline-variant/20 mb-10">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-2">
            <Lightbulb className="w-4 h-4" />
            <span>Tavsiya va Ehtiyoj</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold mb-3">
            Qachon kompaniyangizga {system.abbr} kerak bo‘ladi?
          </h2>
          <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed">
            {system.when_needed_uz}
          </p>
        </div>

        {/* Section: Asosiy imkoniyatlari (Key Features) */}
        <div className="mb-10">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-tertiary" />
            <span>Asosiy funksional imkoniyatlari</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {system.key_features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-start gap-3 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="font-body-base text-sm text-on-surface font-medium">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: FAQ Accordion */}
        {system.faq && system.faq.length > 0 && (
          <div className="mb-12">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-secondary" />
              <span>Ko‘p beriladigan savollar (FAQ)</span>
            </h2>
            <FAQAccordion items={system.faq} />
          </div>
        )}

        {/* Section: Bog'liq tizimlar (Related Systems) */}
        {relatedSystems.length > 0 && (
          <div className="mb-10 pt-8 border-t border-outline-variant/20">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold mb-4">
              Bog‘liq tizimlar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedSystems.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/tizimlar/${rel.slug}`}
                  className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 flex items-center justify-between group transition-all"
                >
                  <div>
                    <div className="font-bold text-on-surface group-hover:text-primary transition-colors">
                      {rel.abbr} — {rel.full_name_en}
                    </div>
                    <div className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                      {rel.description_uz}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="pt-6">
          <Link
            href="/tizimlar"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-lg font-bold hover:bg-surface-container-high transition-colors"
          >
            <span>← {messages.common.back}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
