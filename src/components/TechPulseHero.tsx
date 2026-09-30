import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';
import { AiOptimizationVideoPlayer } from './AiOptimizationVideoPlayer';

interface HeroProps {
  onEnroll: () => void;
  onSeeModules?: () => void;
  onSeeDeliverables?: () => void;
}

export function TechPulseHero({ onEnroll, onSeeModules, onSeeDeliverables }: HeroProps) {
  const handleScroll = onSeeDeliverables || onSeeModules;
  const percentFilled = Math.round(
    (TECHPULSE_CONFIG.slotsFilled / TECHPULSE_CONFIG.slotsTotal) * 100
  );

  return (
    <section id="top" className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 px-3 sm:px-6">
      {/* Background subtle radial ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_55%)]" />

      <div className="mx-auto max-w-5xl text-center">
        {/* Authority Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#2b62ef]/30 bg-[#2b62ef]/10 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold text-[#2b62ef] shadow-xs max-w-full truncate">
          <span className="truncate">{TECHPULSE_CONFIG.badge}</span>
        </div>

        {/* Main Headline: Get 1st Client With Full Optimization */}
        <h1 className="mt-4 sm:mt-5 font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.18] sm:leading-[1.12] tracking-tight text-[#0c172f] max-w-4xl mx-auto px-2">
          Get Your 1st Client With{' '}
          <span className="text-gradient block xs:inline mt-1 xs:mt-0">Full Fiverr Optimization</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base leading-relaxed text-[#535f6f] px-2 sm:px-0">
          {TECHPULSE_CONFIG.heroSubtitle}
        </p>

        {/* Video Prompt */}
        <div className="mt-5 sm:mt-7 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0c172f] px-2">
          <span className="animate-bounce shrink-0">👇</span>
          <span className="line-clamp-2 sm:line-clamp-none">
            Watch AI Explainer Video: How Full Optimization Gets You Your 1st Client in 20–25 Days
          </span>
        </div>

        {/* AI Video Explainer Player Component */}
        <div className="mt-3 sm:mt-4">
          <AiOptimizationVideoPlayer onEnroll={onEnroll} />
        </div>

        {/* --- URGENCY 'LIMITED TIME SLOTS' COUNTER & SPOTS REMAINING BADGE --- */}
        <div className="mx-auto mt-6 sm:mt-8 max-w-md rounded-2xl border-2 border-amber-400/60 bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-orange-500/10 p-3.5 sm:p-4 shadow-xs text-left">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold gap-2">
            <span className="inline-flex items-center gap-1.5 text-amber-900 font-extrabold truncate">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-600" />
              </span>
              <Zap className="h-4 w-4 fill-amber-500 text-amber-600 shrink-0" />
              Limited Time Slots
            </span>
            <span className="shrink-0 rounded-full bg-rose-600 px-2.5 py-0.5 text-[11px] sm:text-xs font-black text-white animate-pulse shadow-xs">
              Only {TECHPULSE_CONFIG.slotsLeft} Spots Left!
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-2.5">
            <div className="flex justify-between text-[11px] font-semibold text-[#535f6f] mb-1">
              <span>{TECHPULSE_CONFIG.slotsFilled} Client Gigs Optimized This Month</span>
              <span className="text-[#0c172f] font-bold">{percentFilled}% Filled</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2b62ef] via-[#00bad2] to-emerald-500 transition-all duration-1000"
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>
        </div>

        {/* CTA Buttons with Integrated Urgency & 100% Mobile Friendly Target */}
        <div className="mt-5 sm:mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row w-full max-w-md sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-bold text-white shadow-glow transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto cursor-pointer"
          >
            <span>Book Full Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
          </button>

          {handleScroll && (
            <button
              type="button"
              onClick={handleScroll}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dfe5ed] bg-white px-5 py-3 sm:px-7 sm:py-4 text-xs sm:text-base font-bold text-[#0c172f] shadow-xs transition-all hover:bg-[#ecf3f8] hover:border-[#2b62ef]/40 active:scale-95 w-full sm:w-auto cursor-pointer"
            >
              View 10 Deliverables
            </button>
          )}
        </div>

        {/* Subtext urgency notice */}
        <p className="mt-2.5 text-[11px] sm:text-xs font-semibold text-[#535f6f] px-2">
          🔒 Promotional Fee Rs. 8,000 (Reg. Rs. 16,000) · 20–25 Days Money-Back Guarantee
        </p>

        {/* Trust Badges - Mobile Responsive Wrap */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs md:text-sm font-semibold text-[#535f6f]">
          <div className="flex items-center gap-1 bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full border border-gray-200 sm:border-0">
            <ShieldCheck className="h-3.5 w-3.5 text-[#2b62ef] shrink-0" />
            <span>20–25 Days 100% Refund Guarantee</span>
          </div>
          <div className="flex items-center gap-1 bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full border border-gray-200 sm:border-0">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>100% White-Hat Fiverr TOS Safe</span>
          </div>
          <div className="flex items-center gap-1 bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full border border-gray-200 sm:border-0">
            <span className="text-sm">🇵🇰</span>
            <span>Meezan, Easypaisa & JazzCash</span>
          </div>
        </div>
      </div>
    </section>
  );
}
