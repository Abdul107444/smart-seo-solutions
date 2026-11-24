import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Maximize2,
  Star,
  Award,
  Clock,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

const AQACCA_IMAGE = '/techpulse-assets/fiverr-aqacca-seller.svg?v=2';

interface GigRank24hHeroProps {
  onEnroll: () => void;
  onSeeMethod?: () => void;
  onSeeReviews?: () => void;
  onOpenImage?: (src: string, alt: string) => void;
}

export function GigRank24hHero({
  onEnroll,
  onSeeMethod,
  onSeeReviews,
  onOpenImage
}: GigRank24hHeroProps) {
  const percentFilled = Math.round(
    (TECHPULSE_CONFIG.slotsFilled / TECHPULSE_CONFIG.slotsTotal) * 100
  );

  const handleImageClick = () => {
    if (onOpenImage) {
      onOpenImage(
        AQACCA_IMAGE,
        'Fiverr Verified Seller Profile AQACCA (@aqacca) — Gig Rank Within 24 Hours Method Proof'
      );
    }
  };

  return (
    <section id="method-hero" className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 px-3 sm:px-6">
      {/* Background subtle radial ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.14),transparent_60%)]" />

      <div className="mx-auto max-w-5xl text-center">
        {/* Authority Eyebrow Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#2b62ef]/30 bg-[#2b62ef]/10 px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold text-[#2b62ef] shadow-xs max-w-full">
          <Clock className="h-3.5 w-3.5 text-[#2b62ef] shrink-0 animate-pulse" />
          <span className="truncate">Done-For-You Fiverr Profile &amp; Gig Optimization · 20–25 Days Guarantee</span>
        </div>

        {/* Exact User-Requested Main Heading */}
        <h1 className="mt-4 sm:mt-5 font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.18] sm:leading-[1.12] tracking-tight text-[#0c172f] max-w-4xl mx-auto px-2">
          Get your 1st fiverr client within{' '}
          <span className="text-gradient block xs:inline mt-1 xs:mt-0">
            20-25 days with Guarantee
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base leading-relaxed text-[#535f6f] px-2 sm:px-0">
          Stop guessing keywords and getting zero impressions. Our Fiverr SEO team handles your complete profile bio, low-competition buyer keywords, SEO gig titles, descriptions, 3-tier pricing, and thumbnails for you—delivered in 2–4 days.
        </p>

        {/* Verified Seller Profile Showcase Label */}
        <div className="mt-5 sm:mt-7 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#0c172f] px-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] sm:text-xs font-black text-emerald-800 border border-emerald-300">
            <Award className="h-3.5 w-3.5 fill-emerald-500 text-emerald-600" /> 24-Hour Method Proof
          </span>
          <span className="text-[#535f6f] hidden xs:inline">•</span>
          <span className="text-xs sm:text-sm text-[#0c172f]">
            Real Results Achieved Using This 24h Micro-Niche Indexing Method
          </span>
        </div>

        {/* --- AQACCA SELLER PROFILE IMAGE SHOWCASE --- */}
        <div className="mt-3 sm:mt-4 mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border-2 border-[#1dbf73]/50 bg-gradient-to-b from-[#0c172f] via-[#091326] to-[#040915] p-2.5 sm:p-4 shadow-2xl shadow-emerald-950/20 text-left">
            {/* Card Top Bar */}
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/10 px-1 sm:px-2">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg bg-[#1dbf73] text-white font-extrabold text-xs shadow-md">
                  fi
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-white">
                    <span>AQACCA (@aqacca) — Level 2 Verified Profile</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-black text-amber-300 border border-amber-400/30">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      4.9 (1.0k Reviews)
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium hidden sm:block">
                    UK Accountant &amp; Consultant · PKR 21,800.60/hr Rate · 24h Indexing Method
                  </div>
                </div>
              </div>

              {/* Zoom Action Button */}
              <button
                type="button"
                onClick={handleImageClick}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 px-3 py-1.5 text-[11px] font-bold text-gray-200 hover:text-white transition-all cursor-pointer"
                title="Click to view full resolution"
              >
                <Maximize2 className="h-3.5 w-3.5 text-[#1dbf73]" />
                <span className="hidden xs:inline">Zoom Full Image</span>
              </button>
            </div>

            {/* Main Profile Screenshot Image */}
            <div
              onClick={handleImageClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleImageClick();
                }
              }}
              aria-label="View full size AQACCA seller profile screenshot"
              className="group relative mt-2.5 sm:mt-3 overflow-hidden rounded-xl bg-white border border-white/10 cursor-pointer"
            >
              <img
                src={AQACCA_IMAGE}
                alt="Fiverr Seller AQACCA Profile ranked within 24 hours"
                className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/80 border border-white/20 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-2xl backdrop-blur-md">
                  <Maximize2 className="h-4 w-4 text-[#1dbf73]" />
                  <span>Click to Expand High-Resolution Screenshot</span>
                </span>
              </div>

              {/* Watermark Ribbon */}
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-xs font-bold text-emerald-300 border border-emerald-500/30 shadow-md">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Verified 24-Hour Fiverr Indexing Formula
                </span>
              </div>
            </div>

            {/* Quick Metrics Strip Below Image */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="rounded-lg bg-white/5 p-2 text-center border border-white/5">
                <div className="text-[10px] text-gray-400">Indexed In</div>
                <div className="font-extrabold text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3 text-amber-400" /> Within 24h
                </div>
              </div>

              <div className="rounded-lg bg-white/5 p-2 text-center border border-white/5">
                <div className="text-[10px] text-gray-400">Client Rating</div>
                <div className="font-extrabold text-emerald-400 mt-0.5">4.9 ★ (1.0k+)</div>
              </div>

              <div className="rounded-lg bg-white/5 p-2 text-center border border-white/5">
                <div className="text-[10px] text-gray-400">Hourly Rate</div>
                <div className="font-extrabold text-cyan-300 mt-0.5">PKR 21,800/hr</div>
              </div>

              <div className="rounded-lg bg-white/5 p-2 text-center border border-white/5">
                <div className="text-[10px] text-gray-400">Refund Guarantee</div>
                <div className="font-extrabold text-emerald-300 mt-0.5">20–25 Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- URGENCY 'LIMITED TIME SLOTS' COUNTER --- */}
        <div className="mx-auto mt-6 sm:mt-8 max-w-md rounded-2xl border-2 border-amber-400/60 bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-orange-500/10 p-3.5 sm:p-4 shadow-xs text-left">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold gap-2">
            <span className="inline-flex items-center gap-1.5 text-amber-900 font-extrabold truncate">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-600" />
              </span>
              <Zap className="h-4 w-4 fill-amber-500 text-amber-600 shrink-0" />
              Optimization Service Slots
            </span>
            <span className="shrink-0 rounded-full bg-rose-600 px-2.5 py-0.5 text-[11px] sm:text-xs font-black text-white animate-pulse shadow-xs">
              Only {TECHPULSE_CONFIG.slotsLeft} Slots Left!
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-2.5">
            <div className="flex justify-between text-[11px] font-semibold text-[#535f6f] mb-1">
              <span>{TECHPULSE_CONFIG.slotsFilled} Freelancers Optimized This Month</span>
              <span className="text-[#0c172f] font-bold">{percentFilled}% Booked</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2b62ef] via-[#00bad2] to-emerald-500 transition-all duration-1000"
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-5 sm:mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row w-full max-w-md sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-bold text-white shadow-glow transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto cursor-pointer"
          >
            <span>Book Full Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
          </button>

          {onSeeMethod && (
            <button
              type="button"
              onClick={onSeeMethod}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dfe5ed] bg-white px-5 py-3 sm:px-7 sm:py-4 text-xs sm:text-base font-bold text-[#0c172f] shadow-xs transition-all hover:bg-[#ecf3f8] hover:border-[#2b62ef]/40 active:scale-95 w-full sm:w-auto cursor-pointer"
            >
              See What We Optimize
            </button>
          )}
        </div>

        {/* Subtext urgency notice */}
        <p className="mt-2.5 text-[11px] sm:text-xs font-semibold text-[#535f6f] px-2">
          Direct or Live AnyDesk Setup · Complete Delivery in 2–4 Days · 20–25 Days 1st Client Guarantee
        </p>

        {/* Trust Badges */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs md:text-sm font-semibold text-[#535f6f]">
          <div className="flex items-center gap-1 bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full border border-gray-200 sm:border-0">
            <Clock className="h-3.5 w-3.5 text-[#2b62ef] shrink-0" />
            <span>Complete Setup in 2–4 Days</span>
          </div>
          <div className="flex items-center gap-1 bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full border border-gray-200 sm:border-0">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>20–25 Days 1st Client Guarantee</span>
          </div>
          <div className="flex items-center gap-1 bg-white/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full border border-gray-200 sm:border-0">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Live AnyDesk Option Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
