import * as React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Server, ShieldCheck, Send } from "lucide-react";
import { getCounts, getSystemTypes, getPlatforms, getLocalSystems, REVALIDATE_INTERVAL } from "@/lib/queries";
import { Hero } from "@/components/sections/hero";
import { ArchitectureShowcase } from "@/components/sections/architecture-showcase";
import { SystemTypeCard } from "@/components/cards/system-type-card";
import { PlatformCard } from "@/components/cards/platform-card";
import { LocalSystemCard } from "@/components/cards/local-system-card";
import { RecommendationWizard } from "@/components/sections/recommendation-wizard";
import messages from "@/messages/uz.json";

export const revalidate = REVALIDATE_INTERVAL;

export default async function HomePage() {
  const [counts, systemTypes, platforms, localSystems] = await Promise.all([
    getCounts(),
    getSystemTypes(),
    getPlatforms(),
    getLocalSystems(),
  ]);

  const telegramLink =
    process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/tizimlugat";

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero counts={counts} />

      {/* 2. Architecture Showcase Matrix */}
      <ArchitectureShowcase />

      {/* 3. Section A: System Types (Tizim turlari) */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-space-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Asosiy Tushunchalar</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                {messages.nav.systemTypes}
              </h2>
              <p className="font-body-base text-body-base text-on-surface-variant mt-1">
                Har bir biznes tizimi nima vazifani bajarishi va qachon kerakligini o‘rganing
              </p>
            </div>

            <Link
              href="/tizimlar"
              className="inline-flex items-center gap-2 font-label-lg font-bold text-primary hover:text-primary-container transition-colors group"
            >
              <span>Barcha 14 ta tizimni ko‘rish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {systemTypes.slice(0, 8).map((system) => (
              <SystemTypeCard key={system.id} system={system} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section B: Popular Platforms (Platformalar) */}
      <section className="w-full py-space-xl bg-surface-container-low/40 border-y border-outline-variant/20">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-space-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                <Server className="w-3.5 h-3.5" />
                <span>Xalqaro & Milliy Bozor</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                {messages.nav.platforms}
              </h2>
              <p className="font-body-base text-body-base text-on-surface-variant mt-1">
                Bizneslar eng ko‘p foydalanadigan tayyor korporativ dasturlar tahlili
              </p>
            </div>

            <Link
              href="/platformalar"
              className="inline-flex items-center gap-2 font-label-lg font-bold text-secondary hover:text-secondary-container transition-colors group"
            >
              <span>Barcha platformalar va taqqoslash</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {platforms.slice(0, 6).map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section C: Local Systems (O'zbekiston tizimlari) */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-space-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Mahalliy Yechimlar</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                {messages.nav.local}
              </h2>
              <p className="font-body-base text-body-base text-on-surface-variant mt-1">
                O‘zbekiston soliq, kassa va qonunchilik talablariga to‘liq moslashtirilgan dasturlar
              </p>
            </div>

            <Link
              href="/ozbekiston"
              className="inline-flex items-center gap-2 font-label-lg font-bold text-tertiary hover:opacity-80 transition-colors group"
            >
              <span>Barcha mahalliy tizimlar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {localSystems.map((item) => (
              <LocalSystemCard key={item.id} system={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section D: Recommendation Wizard */}
      <RecommendationWizard />

      {/* 7. Bottom CTA Consultation Banner */}
      <section className="w-full py-16 bg-gradient-to-r from-primary via-primary-container to-secondary text-white">
        <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-tablet text-center">
          <h2 className="font-headline-xl text-headline-xl font-extrabold mb-4">
            Biznesingiz uchun qaysi dasturni tanlashda ikkilanyapsizmi?
          </h2>
          <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Bizning IT-arxitektorlarimiz bilan Telegram orqali bog‘laning va bepul dastlabki maslahatga ega bo‘ling.
          </p>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary font-label-lg font-extrabold shadow-xl hover:bg-surface-container-low transition-all active:scale-95"
          >
            <Send className="w-5 h-5" />
            <span>Telegram orqali maslahat olish</span>
          </a>
        </div>
      </section>
    </div>
  );
}
