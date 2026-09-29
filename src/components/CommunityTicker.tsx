import React from 'react';
import { Users, Sparkles, ArrowRight } from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';
import { ImageClickable } from './ScreenshotLightbox';

interface CommunityTickerProps {
  onEnroll: () => void;
  onOpenImage: (src: string, alt: string) => void;
}

export function CommunityTicker({ onEnroll, onOpenImage }: CommunityTickerProps) {
  const tickerItems = [
    `Special Launch Offer Rs. ${TECHPULSE_CONFIG.pricePKR.toLocaleString()}`,
    `${TECHPULSE_CONFIG.slotsFilled} of ${TECHPULSE_CONFIG.slotsTotal} Client Slots Filled`,
    `${TECHPULSE_CONFIG.slotsFilled}+ Fiverr Gigs & Profiles Optimized`,
    `Regular Fee Rs. ${TECHPULSE_CONFIG.originalPricePKR.toLocaleString()}`,
    '100% White-Hat Fiverr SEO Blueprint',
    'Direct AnyDesk & Screen-Share Support',
    '20–25 Days 100% Money-Back Guarantee'
  ];

  return (
    <section className="border-y border-[#dfe5ed] bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <span className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-[#2b62ef] text-white text-xs font-bold flex items-center justify-center">
                AR
              </span>
              <span className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-[#00bad2] text-white text-xs font-bold flex items-center justify-center">
                FS
              </span>
              <span className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-[#fab72a] text-black text-xs font-bold flex items-center justify-center">
                SA
              </span>
              <span className="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-[#0c172f] text-white text-xs font-bold flex items-center justify-center">
                +950
              </span>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-[#0c172f] sm:text-xl">
                A strong community of {TECHPULSE_CONFIG.slotsFilled}+ Ranked Fiverr Freelancers
              </h2>
              <div className="flex items-center gap-2 text-xs font-medium text-[#535f6f]">
                <img
                  src="/techpulse-assets/skool-logo.png"
                  alt="Community"
                  className="h-3.5 w-auto object-contain inline"
                />
                <span>Private Freelancer & WhatsApp Community</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-glow hover:scale-105 transition-all"
          >
            <span>Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Real Community Screenshot Proof */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 sm:p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between text-xs text-[#535f6f]">
            <span className="flex items-center gap-1.5 font-semibold text-[#0c172f]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Fiverr Freelancers Network ({TECHPULSE_CONFIG.slotsFilled} active clients)
            </span>
            <span className="hidden sm:inline text-[11px] text-[#535f6f]">
              Click image to inspect high-resolution proof
            </span>
          </div>

          <ImageClickable
            src="/techpulse-assets/community-954.png"
            alt="Smart SEO Solutions Fiverr Freelancer Network"
            onOpen={onOpenImage}
            className="rounded-xl border border-[#dfe5ed] shadow-sm"
          />
        </div>
      </div>

      {/* Infinite Running Marquee Ticker */}
      <div className="relative mt-8 overflow-hidden border-t border-[#dfe5ed] bg-[#ecf3f8]/70 py-3">
        <div className="animate-marquee items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-bold text-[#0c172f]">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-[#2b62ef]">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
