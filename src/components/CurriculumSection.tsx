import React, { useState } from 'react';
import { ChevronDown, Check, ArrowRight, ShieldCheck, Monitor, Sparkles } from 'lucide-react';
import { MODULES, BONUS_MODULE, TECHPULSE_CONFIG } from '../data/techpulseData';

interface CurriculumProps {
  onEnroll: () => void;
}

export function CurriculumSection({ onEnroll }: CurriculumProps) {
  // Open the first 2 services by default
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    'mod-01': true,
    'mod-02': true
  });

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="services" className="bg-[#ecf3f8]/50 px-4 py-16 sm:px-6 sm:py-24 border-t border-[#dfe5ed]">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
            <Sparkles className="h-3.5 w-3.5" /> 100% Done-For-You Scope
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-[#0c172f] sm:text-5xl">
            10-Point Complete Optimization Process
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-base text-[#535f6f] px-2 sm:px-0">
            Zero guesswork. We manually audit, research, write, and configure every single element of your Fiverr profile and gigs to attract high-intent buyers and get your 1st paying client fast.
          </p>
        </div>

        {/* 10 Services Accordion */}
        <div className="mt-10 space-y-3.5">
          {MODULES.map((mod) => {
            const isOpen = !!openModules[mod.id];
            return (
              <div
                key={mod.id}
                className="overflow-hidden rounded-2xl border border-[#dfe5ed] bg-white transition-all shadow-sm hover:border-[#2b62ef]/30"
              >
                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[#f7fbfd]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 rounded-lg bg-[#2b62ef]/10 px-2.5 py-1 text-xs font-bold text-[#2b62ef]">
                      {mod.number}
                    </span>
                    <span className="font-display text-sm sm:text-base font-bold text-[#0c172f] truncate">
                      {mod.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#535f6f] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#2b62ef]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#dfe5ed] bg-[#f7fbfd]/60 px-5 py-4">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#535f6f]">
                      {mod.lessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2b62ef]" />
                          <span className="leading-relaxed text-[#0c172f]/85">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

          {/* Included AnyDesk Implementation Card */}
          <div className="overflow-hidden rounded-2xl border-2 border-[#2b62ef]/40 bg-gradient-to-r from-blue-500/10 via-sky-50 to-indigo-50/50 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#2b62ef] text-white font-bold shadow-sm">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-[#2b62ef]">
                      {BONUS_MODULE.badge}
                    </span>
                    <h3 className="font-display text-base font-bold text-[#0c172f]">
                      {BONUS_MODULE.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[#535f6f]">
                    {BONUS_MODULE.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="text-sm font-bold text-gray-400 line-through">
                  {BONUS_MODULE.originalValue}
                </span>
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white">
                  {BONUS_MODULE.currentPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-bold text-white shadow-glow hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Book Fiverr Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-[#535f6f]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              20–25 Days 100% Money-Back Guarantee
            </span>
            <span>•</span>
            <span>100% White-Hat Fiverr TOS Safe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
