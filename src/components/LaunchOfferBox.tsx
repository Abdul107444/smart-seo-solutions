import React from 'react';
import { ArrowRight, Lock, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface LaunchOfferBoxProps {
  onEnroll: () => void;
}

export function LaunchOfferBox({ onEnroll }: LaunchOfferBoxProps) {
  const percentFilled = Math.round(
    (TECHPULSE_CONFIG.slotsFilled / TECHPULSE_CONFIG.slotsTotal) * 100
  );

  return (
    <section id="enroll-offer" className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-[#2b62ef]/40 bg-white p-6 sm:p-10 shadow-glow text-center">
        {/* Launch Offer Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm">
          <Zap className="h-3.5 w-3.5 fill-current" />
          <span>Launch Offer</span>
        </div>

        {/* Pricing Heading */}
        <div className="mt-5 flex items-baseline justify-center gap-3">
          <span className="font-display text-4xl font-extrabold text-[#0c172f] sm:text-6xl tracking-tight">
            Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[#535f6f] line-through">
            Rs. {TECHPULSE_CONFIG.originalPricePKR.toLocaleString()}
          </span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs sm:text-sm font-extrabold text-emerald-800">
            {TECHPULSE_CONFIG.discountPercentage}
          </span>
        </div>

        {/* Slots Progress Bar */}
        <div className="mx-auto mt-6 max-w-md">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#0c172f] mb-1.5">
            <span className="text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> {TECHPULSE_CONFIG.slotsFilled} gigs optimized
            </span>
            <span className="text-rose-600 font-extrabold animate-pulse">
              Only {TECHPULSE_CONFIG.slotsLeft} slots left
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#dfe5ed]">
            <div
              className="h-full rounded-full gradient-brand transition-all duration-1000"
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {/* Big Enroll Button */}
        <div className="mt-8">
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex w-full items-center justify-center gap-2 rounded-full px-10 py-4 text-lg font-extrabold text-white shadow-glow transition-all hover:scale-[1.02] active:scale-95 sm:w-auto"
          >
            <span>Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Subtext guarantees */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#535f6f]">
          <Lock className="h-3.5 w-3.5 text-[#2b62ef]" />
          <span>Secure · 100% Risk-Free Guarantee · Complete Done-For-You Delivery</span>
        </div>
      </div>
    </section>
  );
}
