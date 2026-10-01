import React from 'react';
import {
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Star,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';
import { ImageClickable } from './ScreenshotLightbox';

interface ReviewsWallProps {
  onEnroll: () => void;
  onOpenImage: (src: string, alt: string) => void;
}

// Exactly 4 Top-Tier Authentic Fiverr Proofs
const FEATURED_PROOFS = [
  {
    id: 'proof-01',
    img: '/techpulse-assets/fiverr-earnings-proof.svg',
    title: 'Zero Impressions Se 42,800 Impressions & Level 2 Seller!',
    seller: 'Hamza Saeed (@saqibshahid08) — WordPress & Laravel Developer',
    note: 'Pehle Fiverr par gig dead thi aur search clicks nahi aate the. Smart SEO Solutions se full optimization karwayi — 30 dino me +340% impressions surge hua aur direct international orders queue me aa gaye!',
    tag: 'Level 2 Seller',
    tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    result: '$1,450+ Cleared Earnings & Level 2 Status'
  },
  {
    id: 'proof-02',
    img: '/techpulse-assets/fiverr-first-order.svg',
    title: 'First International Customer — $250 Order Closed!',
    seller: 'Bushra Bano — UI/UX Designer',
    note: 'Alhamdulillah! Done-for-you gig optimize hone ke sirf 5 din baad UK se $250 ka first paying client mila — Rs. 8,000 optimization fee usi pehle order se foran recover ho gayi!',
    tag: 'First Client Won',
    tagColor: 'bg-blue-50 text-blue-800 border-blue-200',
    result: '$250 Order Closed in 5 Days'
  },
  {
    id: 'proof-03',
    img: '/techpulse-assets/fiverr-ranking-proof.svg',
    title: 'Page 1 #4 Rank — Repeated International Clients Alhamdulillah!',
    seller: 'Sikandar Usman (@sikandarusman1) — Video Editor',
    note: 'Competitive niche me gig Page 1 #4 par rank hui. Clicks +210% barh gaye aur USA/Canada ke recurring monthly clients lock ho gaye. Real algorithmic ranking strategy!',
    tag: 'Page 1 Ranking',
    tagColor: 'bg-purple-50 text-purple-800 border-purple-200',
    result: 'Page 1 #4 Rank & +210% Clicks'
  },
  {
    id: 'proof-04',
    img: '/techpulse-assets/fiverr-clicks-surge.svg',
    title: 'Clicks Grew by +265% in 2 Weeks — 40+ Daily Buyer Clicks',
    seller: 'Allah Bachaya — Voiceover Artist',
    note: 'Gigs par roz ke sirf 1-2 clicks aate the, optimization ke baad daily 40+ genuine international buyer clicks aa rahe hain aur continuous inbox inquiries receive ho rahi hain.',
    tag: 'Impressions Surge',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    result: '40+ Daily Buyer Clicks & +265% Surge'
  }
];

export function ReviewsWallSection({ onEnroll, onOpenImage }: ReviewsWallProps) {
  return (
    <section id="reviews" className="bg-[#ecf3f8]/50 px-4 py-16 sm:px-6 sm:py-24 border-t border-[#dfe5ed]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1dbf73]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#109655]">
            <MessageSquare className="h-3.5 w-3.5" /> Client Proofs &amp; Reviews
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-[#0c172f] sm:text-4xl md:text-5xl tracking-tight">
            Verified Fiverr Client Reviews &amp; Screenshots
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#535f6f] leading-relaxed">
            100% genuine results from Pakistani Fiverr sellers who booked our Done-For-You Profile &amp; Gig Optimization service (Rs. 8,000 package).
          </p>

          {/* Social Proof Stats Counter Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-[#0c172f]">
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-[#dfe5ed] shadow-xs">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-[#dfe5ed] shadow-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>954+ Fiverr Gigs &amp; Profiles Optimized</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-[#dfe5ed] shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2b62ef]" />
              <span>100% White-Hat Fiverr TOS Safe</span>
            </div>
          </div>
        </div>

        {/* --- EXACTLY 4 TOP-TIER VERIFIED PROOFS GRID --- */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {FEATURED_PROOFS.map((proof) => (
            <article
              key={proof.id}
              className="overflow-hidden rounded-3xl border-2 border-[#dfe5ed] bg-white p-5 sm:p-6 shadow-sm hover:border-[#1dbf73]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Top Header */}
                <div className="flex items-center justify-between gap-2 border-b border-[#dfe5ed]/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-[#1dbf73] text-[11px] font-black text-white shadow-xs">
                      fi
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${proof.tagColor}`}>
                    {proof.tag}
                  </span>
                </div>

                {/* Seller & Title */}
                <h3 className="mt-3.5 font-display text-base sm:text-lg font-extrabold text-[#0c172f] leading-snug">
                  {proof.title}
                </h3>
                <div className="text-xs font-bold text-[#109655] mt-1">
                  {proof.seller}
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#475569]">
                  {proof.note}
                </p>
              </div>

              {/* Verified Screenshot Container */}
              <div className="mt-4">
                <div className="overflow-hidden rounded-2xl border-2 border-[#1dbf73]/25 bg-[#f7fbfd] p-2 shadow-xs">
                  <div className="mb-1.5 flex items-center justify-between px-1.5 text-[10px] text-[#535f6f]">
                    <span className="font-semibold text-[#0c172f] flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1dbf73]" />
                      Official Fiverr Screenshot Proof
                    </span>
                    <span className="text-[10px] text-[#2b62ef] font-bold">Click to zoom 🔍</span>
                  </div>

                  <ImageClickable
                    src={proof.img}
                    alt={`Fiverr Seller Proof: ${proof.title}`}
                    onOpen={onOpenImage}
                    className="rounded-xl border border-gray-200 shadow-xs hover:scale-[1.01] transition-transform"
                  />

                  {/* Highlight Result Ribbon */}
                  <div className="mt-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-center text-[11px] font-extrabold text-emerald-800 border border-emerald-200/60">
                    ✓ {proof.result}
                  </div>
                </div>

                {/* Card Verified Footer */}
                <div className="mt-3 flex items-center justify-between text-xs text-[#535f6f] px-1">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified Client Result
                  </span>
                  <span className="text-[11px] font-medium text-gray-400">
                    Smart SEO Solutions
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 rounded-3xl border-2 border-[#2b62ef]/30 bg-gradient-to-r from-[#2b62ef]/10 via-white to-blue-50/50 p-6 sm:p-10 text-center shadow-card">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold text-[#2b62ef] mb-3">
            <TrendingUp className="h-3.5 w-3.5" /> Ready for similar results?
          </div>
          <h3 className="font-display text-xl sm:text-3xl font-extrabold text-[#0c172f]">
            Get Your 1st Paying Client With Full Fiverr Optimization
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-[#535f6f] leading-relaxed px-2 sm:px-0">
            Stop waiting months with zero clicks. Let our professional Fiverr agency audit, re-write, and optimize your profile and gigs to win your 1st high-paying international client in 20–25 days.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onEnroll}
              className="gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 sm:px-8 sm:py-3.5 text-sm sm:text-base font-extrabold text-white shadow-glow hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto cursor-pointer"
            >
              <span>Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-[#535f6f]">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> 20–25 Days 100% Money-Back Guarantee
            </span>
            <span>•</span>
            <span>100% White-Hat &amp; TOS Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
