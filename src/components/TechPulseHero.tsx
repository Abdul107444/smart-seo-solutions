import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Maximize2,
  Star,
  Award,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

const TOP_RATED_IMAGE = '/src/assets/images/top_rated_profile_1790796871179.jpg';

interface HeroProps {
  onEnroll: () => void;
  onSeeModules?: () => void;
  onSeeDeliverables?: () => void;
  onOpenImage?: (src: string, alt: string) => void;
}

export function TechPulseHero({
  onEnroll,
  onSeeModules,
  onSeeDeliverables,
  onOpenImage
}: HeroProps) {
  const handleScroll = onSeeDeliverables || onSeeModules;
  const percentFilled = Math.round(
    (TECHPULSE_CONFIG.slotsFilled / TECHPULSE_CONFIG.slotsTotal) * 100
  );

  const handleImageClick = () => {
    if (onOpenImage) {
      onOpenImage(TOP_RATED_IMAGE, 'Fiverr Top Rated Seller Profile — Smart SEO Solutions Optimization Proof');
    }
  };

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

        {/* Top Rated Seller Profile Showcase Label */}
        <div className="mt-5 sm:mt-7 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#0c172f] px-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] sm:text-xs font-black text-amber-700 border border-amber-300">
            <Award className="h-3.5 w-3.5 fill-amber-500 text-amber-600" /> Top Rated Seller Proof
          </span>
          <span className="text-[#535f6f] hidden xs:inline">•</span>
          <span className="text-xs sm:text-sm text-[#0c172f]">
            Verified Results After 10-Point Full Optimization
          </span>
        </div>

        {/* --- TOP RATED SELLER PROFILE IMAGE SHOWCASE --- */}
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
                    <span>Fiverr Top Rated Seller Profile</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-black text-amber-300 border border-amber-400/30">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      5.0 (1,250+ Reviews)
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium hidden sm:block">
                    Optimized Profile &amp; Gigs · 100% White-Hat Algorithm Compliance
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
              aria-label="View full size Top Rated Seller profile screenshot"
              className="group relative mt-2.5 sm:mt-3 overflow-hidden rounded-xl bg-black border border-white/10 cursor-pointer"
            >
              <img
                src={TOP_RATED_IMAGE}
                alt="Fiverr Top Rated Seller Profile optimized by Smart SEO Solutions"
                className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
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
                <span className="inline-flex items-center gap-1 rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-xs font-bold text-emerald-300 border border-emerald-500/30 shadow-md">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Verified Top Rated Seller Optimization
                </span>
              </div>
            </div>

            {/* Quick Metrics Strip Below Image */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="rounded-lg bg-white/5 p-2 text-center border border-white/5">
                <div className="text-[10px] text-gray-400">Seller Level</div>
                <div className="font-extrabold text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                  <Award className="h-3 w-3 fill-amber-400 text-amber-400" /> Top Rated
                </div>
              </div>

              <div className="rounded-lg bg-white/5 p-2 text-center border border-white/5">
                <div className="text-[10px] text-gray-400">Client Rating</div>
                <div className="font-extrabold text-emerald-400 mt-0.5">5.0 ★ (1,250+)</div>
              </div>

              <div className="rounded-lg bg-white/5 p-2 text-center border border-white/5">
                <div className="text-[10px] text-gray-400">Delivery &amp; Response</div>
                <div className="font-extrabold text-cyan-300 mt-0.5">100% On-Time</div>
              </div>

              <div className="rounded-lg bg-white/5 p-2 text-center border border-white/5">
                <div className="text-[10px] text-gray-400">Guarantee</div>
                <div className="font-extrabold text-emerald-300 mt-0.5">20–25 Days</div>
              </div>
            </div>
          </div>
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
            <span>Meezan, Easypaisa &amp; JazzCash</span>
          </div>
        </div>
      </div>
    </section>
  );
}
