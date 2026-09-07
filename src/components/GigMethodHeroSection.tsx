import React from 'react';
import { GIG_RANK_METHOD_INFO } from '../data/funnelData';
import { ArrowRight, CheckCircle2, Download, Zap, ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { TrustedPartnersShowcase } from './TrustedPartnersShowcase';

interface GigMethodHeroSectionProps {
  onScrollToOrder: () => void;
}

export const GigMethodHeroSection: React.FC<GigMethodHeroSectionProps> = ({ onScrollToOrder }) => {
  return (
    <section id="gig-hero-section" className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 left-8 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-8 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-500/15 border border-orange-500/30 rounded-full text-[11px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold backdrop-blur-md shadow-inner">
            <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-pulse" />
            <span>Fiverr Algorithm Secret Blueprint</span>
            <span className="text-white/30">•</span>
            <span className="text-white/90">2026 Updated Method</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-[11px] sm:text-xs font-bold text-emerald-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>100% Guaranteed 1st Page Rank</span>
          </div>
        </div>

        {/* Exact Main Headline as Requested */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Gig rank on 1st page of fiverr within 24 hours{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-500">
              Guranteded 100%
            </span>
          </h1>
        </div>

        {/* Subheadline explaining the PDF form and points */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed">
            The method is delivered in a confidential PDF blueprint. Simply read the actionable points, follow the exact placement instructions, and rank your gig on Fiverr’s 1st page within 24 hours!
          </p>
        </div>

        {/* Value Box Offer Banner */}
        <div className="max-w-2xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-500/15 via-purple-950/40 to-amber-500/15 border border-orange-500/30 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 text-orange-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-orange-400">Instant PDF Download</span>
                <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-bold border border-red-500/30">
                  {GIG_RANK_METHOD_INFO.discount}
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">
                Fiverr Gig Rank Method (Confidential PDF Blueprint)
              </div>
              <div className="text-xs text-white/60">
                Direct download button unlocks immediately after verified payment.
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end flex-shrink-0">
            <span className="text-xs text-white/40 line-through">{GIG_RANK_METHOD_INFO.originalPrice}</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{GIG_RANK_METHOD_INFO.price}</span>
            <span className="text-[10px] text-emerald-400 font-semibold">One-time payment</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
          <button
            id="gig-method-hero-cta"
            onClick={onScrollToOrder}
            className="w-full sm:w-auto px-8 py-4 rounded-xl btn-gold-gradient text-sm sm:text-base font-black uppercase tracking-wide flex items-center justify-center gap-3 shadow-xl glow-gold cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <span>🚀 Get Blueprint & Download PDF — {GIG_RANK_METHOD_INFO.price}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Micro Bullets */}
        <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-white/80 font-medium mb-12">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Works on Any Niche (Long-Tail)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>24 Hours Fast 1st Page Indexing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant PDF Download on Website</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Meezan Bank Verified Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Safe & White-Hat SEO</span>
          </div>
        </div>

        {/* Trusted By Freelancers & Agencies Card */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left backdrop-blur-md mb-8">
          <div className="flex -space-x-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-amber-600 flex items-center justify-center text-xs font-bold text-white shadow">
              AR
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow">
              HS
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shadow">
              MA
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-purple-600 flex items-center justify-center text-xs font-bold text-white shadow">
              UK
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <span>Over 140+ Freelancers Successfully Ranked</span>
              <span className="text-amber-400 text-xs">★★★★★</span>
            </div>
            <div className="text-white/60 text-xs italic mt-0.5">
              "Followed the 4 points in the PDF and my dead Squarespace gig jumped from Page 12 to Page 1 spot #4 within 20 hours!"
            </div>
          </div>
        </div>

        {/* Trusted Partners Showcase Marquee (exact requested: "baqi companies ka sat jin ka kam kia ha vo isi page sa same la leni") */}
        <div className="relative max-w-5xl mx-auto mt-4">
          <div className="text-center mb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
              Trusted by professionals and clients across global brands
            </span>
          </div>
          <TrustedPartnersShowcase />
        </div>
      </div>
    </section>
  );
};
