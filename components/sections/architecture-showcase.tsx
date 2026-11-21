"use client";

import * as React from "react";
import Link from "next/link";
import { Boxes, Users, Store, Warehouse, FolderArchive, BarChart3, ArrowRight, ShieldCheck } from "lucide-react";
import messages from "@/messages/uz.json";

export function ArchitectureShowcase() {
  const [activeTab, setActiveTab] = React.useState<"overview" | "retail" | "manufacturing">("overview");

  return (
    <section className="w-full py-space-xl bg-surface-container-low/30 border-y border-outline-variant/20">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="flex flex-col lg:flex-row items-stretch gap-space-xl">
          {/* Left Column: Explainer */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider mb-space-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Korporativ IT Arxitektura</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight mb-space-sm">
                Biznes tizimlari qanday <br className="hidden md:inline" />
                <span className="text-primary">bir-biriga bog‘lanadi?</span>
              </h2>
              <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed mb-space-lg">
                Har bir dastur kompaniyada alohida “orolcha” bo‘lib qolmasligi kerak. Yagona ERP markazi orqali mijozlar (CRM), ombor (WMS), savdo (POS) va soliq (DMS/Didox) o‘zaro uzluksiz ma’lumot almashadi.
              </p>

              {/* Tabs */}
              <div className="flex items-center gap-2 mb-space-md">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "overview"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Umumiy tuzilma
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("retail")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "retail"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Savdo va Do‘kon
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("manufacturing")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "manufacturing"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Ishlab chiqarish
                </button>
              </div>
            </div>

            <div className="flex items-center gap-space-md pt-space-sm">
              <Link
                href="/tizimlar"
                className="inline-flex items-center gap-2 px-space-md py-3 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-md shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
              >
                <span>Barcha tizimlar katalogi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Architecture Matrix */}
          <div className="flex-1 bg-surface-container-lowest rounded-3xl p-space-lg md:p-space-xl border border-outline-variant/30 shadow-lg relative overflow-hidden">
            <div className="text-center font-label-lg font-bold text-on-surface mb-6">
              {activeTab === "overview" && "Universal Korxona Arxitekturasi"}
              {activeTab === "retail" && "Chakana va Ulgurji Savdo Modeli"}
              {activeTab === "manufacturing" && "Sanoat va Ishlab Chiqarish Modeli"}
            </div>

            {/* Central ERP Hub */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative group p-4 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary text-center shadow-xl shadow-primary/25 border-2 border-white/20 w-48">
                <Boxes className="w-8 h-8 mx-auto mb-1 text-white animate-bounce" />
                <div className="font-headline-sm font-black tracking-wider">ERP</div>
                <div className="text-[11px] text-white/80 font-medium">Markaziy Moliya & Boshqaruv</div>
              </div>
              <div className="w-0.5 h-6 bg-primary/40 my-1" />
            </div>

            {/* Satellite Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-surface-container-low text-center border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="font-bold text-xs text-on-surface">CRM</div>
                <div className="text-[10px] text-on-surface-variant">Mijozlar & Savdo</div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low text-center border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <Store className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="font-bold text-xs text-on-surface">POS</div>
                <div className="text-[10px] text-on-surface-variant">Kassa & Chek</div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low text-center border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <Warehouse className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="font-bold text-xs text-on-surface">WMS</div>
                <div className="text-[10px] text-on-surface-variant">Omborxona</div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low text-center border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <FolderArchive className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="font-bold text-xs text-on-surface">DMS (Didox)</div>
                <div className="text-[10px] text-on-surface-variant">E-hujjat & Soliq</div>
              </div>
            </div>

            {/* Bottom BI Reporting Bar */}
            <div className="mt-4 p-3 rounded-xl bg-secondary-fixed/50 border border-secondary-fixed text-center flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4 text-secondary" />
              <span className="text-xs font-bold text-on-secondary-fixed">
                BI (Business Intelligence) — barcha tizimlardan tahliliy hisobot yig‘adi
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
