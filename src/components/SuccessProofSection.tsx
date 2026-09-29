import React from 'react';
import { DollarSign, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { ImageClickable } from './ScreenshotLightbox';

interface SuccessProofSectionProps {
  onOpenImage: (src: string, alt: string) => void;
}

export function SuccessProofSection({ onOpenImage }: SuccessProofSectionProps) {
  return (
    <section id="proofs" className="px-4 py-12 sm:px-6 sm:py-16 bg-[#f7fbfd]">
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow and heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
            <Sparkles className="h-3.5 w-3.5" /> Real Verified Results
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-[#0c172f] sm:text-4xl">
            A Glimpse of Our Clients' Rankings & Dollar Orders
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[#535f6f]">
            Real screenshots from Pakistani Fiverr sellers: organic search impressions, Page 1 rankings, and verified international USD orders.
          </p>
        </div>

        {/* 2 Big Visual Proof Cards */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Card 1: Dollar Orders Proof */}
          <div className="overflow-hidden rounded-3xl border border-[#dfe5ed] bg-white p-5 sm:p-7 shadow-card shadow-card-hover flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <DollarSign className="h-3.5 w-3.5" /> High-Ticket Orders Proof
                </span>
                <span className="text-xs font-semibold text-[#535f6f]">Verified Fiverr Orders</span>
              </div>
              <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-[#0c172f] leading-snug">
                Client locked <span className="text-emerald-600 font-extrabold">$1,450+ in international Fiverr orders</span> within 30 days of profile optimization.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#535f6f]">
                Incoming international buyers from the US, UK, and Europe with zero paid ads or artificial tricks.
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-2">
              <ImageClickable
                src="/techpulse-assets/student-earnings.png"
                alt="Fiverr client earnings screenshot showing international dollar orders"
                onOpen={onOpenImage}
                className="rounded-xl shadow-sm"
              />
            </div>
          </div>

          {/* Card 2: Ranking & Traffic Proof */}
          <div className="overflow-hidden rounded-3xl border border-[#dfe5ed] bg-white p-5 sm:p-7 shadow-card shadow-card-hover flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2b62ef]">
                  <TrendingUp className="h-3.5 w-3.5" /> Organic Traffic Surge
                </span>
                <span className="text-xs font-semibold text-[#535f6f]">Page 1 Ranking Proof</span>
              </div>
              <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-[#0c172f] leading-snug">
                <span className="text-[#2b62ef] font-extrabold">+340% Impressions surge</span> and top-ranked placement in high-intent buyer searches.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#535f6f]">
                Revived dead, zero-impression gigs into active lead generators with 40+ daily organic buyer clicks.
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-2">
              <ImageClickable
                src="/techpulse-assets/student-viral.png"
                alt="Fiverr seller analytics showing 42,000+ organic impressions and Page 1 ranking"
                onOpen={onOpenImage}
                className="rounded-xl shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
