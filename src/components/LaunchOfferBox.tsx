import React from 'react';
import { ArrowRight, Lock, CheckCircle2, Zap, ShieldCheck, CreditCard } from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface LaunchOfferBoxProps {
  onEnroll: () => void;
}

export function LaunchOfferBox({ onEnroll }: LaunchOfferBoxProps) {
  const percentFilled = Math.round(
    (TECHPULSE_CONFIG.slotsFilled / TECHPULSE_CONFIG.slotsTotal) * 100
  );

  return (
    <section id="pricing" className="px-4 py-12 sm:px-6 sm:py-16 bg-gradient-to-b from-white to-[#f7fbfd]">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-[#2b62ef]/40 bg-white p-6 sm:p-10 shadow-glow text-center">
        {/* Launch Offer Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm">
          <Zap className="h-3.5 w-3.5 fill-current" />
          <span>Launch Offer — 50% Promotional Discount</span>
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

        {/* Urgency Slots Progress Bar */}
        <div className="mx-auto mt-6 max-w-md rounded-2xl bg-[#f7fbfd] p-3.5 border border-[#dfe5ed]">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#0c172f] mb-1.5">
            <span className="text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> {TECHPULSE_CONFIG.slotsFilled} Gigs Optimized
            </span>
            <span className="text-rose-600 font-extrabold animate-pulse">
              ⚡ Only {TECHPULSE_CONFIG.slotsLeft} Slots Left!
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2b62ef] via-[#00bad2] to-emerald-500 transition-all duration-1000"
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {/* Key Inclusions Bullets */}
        <div className="mx-auto mt-6 max-w-md text-left text-xs sm:text-sm text-[#0c172f] space-y-2 border-y border-[#dfe5ed] py-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>5 Low-Competition Buyer Search Tags & Keyword Placement</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Permanent SEO Title & 1,200-Character AIDA Description</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>3-Tier Decoy Pricing & High-CTR Thumbnail Visual Guide</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Live Screen-Share Setup & Transparent AnyDesk Support</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span><strong>20–25 Days 100% Money-Back Guarantee</strong></span>
          </div>
        </div>

        {/* Big Book Button with Urgency */}
        <div className="mt-7">
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex w-full items-center justify-center gap-2 rounded-full px-10 py-4 text-lg font-extrabold text-white shadow-glow transition-all hover:scale-[1.02] active:scale-95 sm:w-auto"
          >
            <span>Book Fiverr Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Payment Methods Accepted */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#535f6f]">
          <span className="font-semibold text-[#0c172f]">Accepted in Pakistan:</span>
          <span className="rounded bg-gray-100 px-2 py-0.5 font-bold">Meezan Bank</span>
          <span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-800">Easypaisa</span>
          <span className="rounded bg-red-50 px-2 py-0.5 font-bold text-red-800">JazzCash</span>
          <span className="rounded bg-blue-50 px-2 py-0.5 font-bold text-blue-800">Raast / Any Bank</span>
        </div>

        {/* Subtext guarantees */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#535f6f]">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>100% Risk-Free Guarantee · If no impressions surge in 20–25 days, get a full refund</span>
        </div>
      </div>
    </section>
  );
}
