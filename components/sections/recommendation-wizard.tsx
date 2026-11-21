"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import {
  recommendSystems,
  type Sector,
  type CompanySize,
  type PrimaryGoal,
  type RecommendationResult,
} from "@/lib/recommend";
import messages from "@/messages/uz.json";

export function RecommendationWizard() {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [sector, setSector] = React.useState<Sector>("retail");
  const [size, setSize] = React.useState<CompanySize>("micro");
  const [goal, setGoal] = React.useState<PrimaryGoal>("sales");
  const [results, setResults] = React.useState<RecommendationResult[]>([]);
  const [showResults, setShowResults] = React.useState(false);

  const sectorOptions: { id: Sector; label: string; desc: string }[] = [
    { id: "retail", label: "Chakana & Ulgurji savdo", desc: "Do'kon, market, kiyim-kechak, distribyutsiya" },
    { id: "education", label: "Ta'lim & O'quv markazlari", desc: "Xususiy maktab, repetitorlik, o'quv kurslari" },
    { id: "horeca", label: "Umumiy ovqatlanish (HoReCa)", desc: "Restoran, kafe, qahvaxona, fast-fud" },
    { id: "manufacturing", label: "Ishlab chiqarish & Sanoat", desc: "Zavod, fabrikalar, hunarmandchilik sexlari" },
    { id: "services", label: "Xizmat ko'rsatish & IT", desc: "Konsalting, reklama, turizm, tibbiyot" },
    { id: "logistics", label: "Logistika & Yetkazib berish", desc: "Kuryerlik, yuk tashish, ombor xizmatlari" },
  ];

  const sizeOptions: { id: CompanySize; label: string; desc: string }[] = [
    { id: "micro", label: "1 - 5 xodim", desc: "Kichik startap yoki yakka tartibdagi tadbirkor" },
    { id: "small", label: "5 - 25 xodim", desc: "Rivojlanayotgan jamoa, 1-2 ta filial" },
    { id: "medium", label: "25 - 100 xodim", desc: "O'rta biznes, bir nechta bo'limlar" },
    { id: "enterprise", label: "100+ xodim", desc: "Yirik korxona yoki tarmoqli kompaniya" },
  ];

  const goalOptions: { id: PrimaryGoal; label: string; desc: string }[] = [
    { id: "sales", label: "Savdo va mijozlar hisobi", desc: "Buyurtmalar yo'qolmasligi, savdo voronkasi" },
    { id: "warehouse", label: "Ombor va qoldiqlar nazorati", desc: "Tovar kirim-chiqimi, kamomadning oldini olish" },
    { id: "finance", label: "Kassa, soliq va rasmiy hisobot", desc: "Fiskal chek, onlayn-NKM, Didox fakturalar" },
    { id: "employees", label: "Xodimlar va jamoaviy intizom", desc: "Vazifalar taqsimoti, tabel, KPI hisobi" },
    { id: "all", label: "Barcha jarayonlarni yagona markazda", desc: "To'liq kompleks korxona boshqaruvi (ERP)" },
  ];

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      const calculated = recommendSystems({ sector, size, goal });
      setResults(calculated);
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (showResults) {
      setShowResults(false);
      setStep(3);
    } else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  return (
    <section className="w-full py-space-xl bg-surface">
      <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-tablet">
        {/* Header */}
        <div className="text-center mb-space-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-space-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{messages.wizard.badge}</span>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
            {messages.wizard.title}
          </h2>
          <p className="font-body-base text-body-base text-on-surface-variant max-w-xl mx-auto mt-2">
            {messages.wizard.subtitle}
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-surface-container-lowest rounded-3xl p-space-lg md:p-space-xl border border-outline-variant/30 shadow-xl relative overflow-hidden">
          {/* Step Progress Indicators */}
          <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
            {/* Step 1 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                  step > 1 || showResults
                    ? "bg-tertiary text-on-tertiary shadow-sm"
                    : step === 1
                    ? "bg-primary text-on-primary ring-4 ring-primary/20 shadow-md"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {step > 1 || showResults ? <Check className="w-5 h-5" /> : "1"}
              </div>
            </div>
            <div
              className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                step > 1 || showResults ? "bg-tertiary" : "bg-surface-container-highest"
              }`}
            />

            {/* Step 2 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                  step > 2 || showResults
                    ? "bg-tertiary text-on-tertiary shadow-sm"
                    : step === 2
                    ? "bg-primary text-on-primary ring-4 ring-primary/20 shadow-md"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {step > 2 || showResults ? <Check className="w-5 h-5" /> : "2"}
              </div>
            </div>
            <div
              className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                step > 2 || showResults ? "bg-tertiary" : "bg-surface-container-highest"
              }`}
            />

            {/* Step 3 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                  showResults
                    ? "bg-tertiary text-on-tertiary shadow-sm"
                    : step === 3
                    ? "bg-primary text-on-primary ring-4 ring-primary/20 shadow-md"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {showResults ? <Check className="w-5 h-5" /> : "3"}
              </div>
            </div>
          </div>

          {/* Wizard Content Panes */}
          {!showResults ? (
            <div>
              {/* Step 1: Sector */}
              {step === 1 && (
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-center mb-6">
                    1-qadam: {messages.wizard.step1Title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {sectorOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSector(opt.id)}
                        className={`p-4 rounded-2xl text-left border transition-all active:scale-95 ${
                          sector === opt.id
                            ? "bg-primary-fixed border-primary shadow-md"
                            : "bg-surface-container-low border-outline-variant/20 hover:border-outline-variant"
                        }`}
                      >
                        <div className="font-bold text-sm text-on-surface mb-0.5">
                          {opt.label}
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Size */}
              {step === 2 && (
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-center mb-6">
                    2-qadam: {messages.wizard.step2Title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {sizeOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSize(opt.id)}
                        className={`p-4 rounded-2xl text-left border transition-all active:scale-95 ${
                          size === opt.id
                            ? "bg-primary-fixed border-primary shadow-md"
                            : "bg-surface-container-low border-outline-variant/20 hover:border-outline-variant"
                        }`}
                      >
                        <div className="font-bold text-sm text-on-surface mb-0.5">
                          {opt.label}
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Goal */}
              {step === 3 && (
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold text-center mb-6">
                    3-qadam: {messages.wizard.step3Title}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 mb-8">
                    {goalOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setGoal(opt.id)}
                        className={`p-4 rounded-2xl text-left border transition-all active:scale-95 ${
                          goal === opt.id
                            ? "bg-primary-fixed border-primary shadow-md"
                            : "bg-surface-container-low border-outline-variant/20 hover:border-outline-variant"
                        }`}
                      >
                        <div className="font-bold text-sm text-on-surface mb-0.5">
                          {opt.label}
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container text-on-surface-variant font-label-lg font-semibold hover:bg-surface-container-high transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{messages.wizard.prev}</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-md shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
                >
                  <span>{step === 3 ? messages.wizard.finish : messages.wizard.next}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Panel */
            <div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {messages.wizard.resultTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-8">
                {results.map((res, idx) => (
                  <div
                    key={res.id}
                    className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-base text-on-surface">
                          {res.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-md bg-surface-container-highest text-[11px] font-semibold text-on-surface-variant">
                          {res.category}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed pl-8">
                        <b className="text-on-surface font-semibold">{messages.wizard.whyThis}</b> {res.reason_uz}
                      </p>
                    </div>

                    <Link
                      href={res.link}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-lowest text-primary border border-outline-variant/30 font-label-sm font-bold hover:bg-primary hover:text-on-primary transition-all self-end sm:self-center shrink-0"
                    >
                      <span>{messages.common.learnMore}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container text-on-surface-variant font-label-lg font-semibold hover:bg-surface-container-high transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Qaytadan tanlash</span>
                </button>

                <Link
                  href="/taqqoslash"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-md shadow-primary/20 hover:bg-primary-container transition-all"
                >
                  <span>Platformalarni taqqoslash</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
