import React from 'react';
import { ArrowRight, ShieldCheck, Infinity, Sparkles, CheckCircle2 } from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface HeroProps {
  onEnroll: () => void;
  onSeeModules: () => void;
}

export function TechPulseHero({ onEnroll, onSeeModules }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16">
      {/* Background subtle radial ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12),transparent_55%)]" />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Flag Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2b62ef]/30 bg-[#2b62ef]/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#2b62ef] shadow-sm">
          <span>{TECHPULSE_CONFIG.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-[#0c172f] sm:text-5xl md:text-6xl max-w-4xl mx-auto">
          Rank Your Fiverr Gigs on{' '}
          <span className="text-gradient">Page 1</span> — Turn Dead Profiles Into A{' '}
          <span className="text-gradient">Sales Machine</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#535f6f] sm:text-lg">
          {TECHPULSE_CONFIG.heroSubtitle}
        </p>

        {/* Video Prompt */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-[#0c172f]">
          <span className="animate-bounce">👇</span>
          <span>Watch this video below: How Fiverr Gig SEO & 1st Page Ranking Formula Works</span>
        </div>

        {/* Embedded YouTube Video with polished frame */}
        <div className="mx-auto mt-4 max-w-3xl overflow-hidden rounded-2xl border-2 border-[#2b62ef]/30 bg-[#0c172f] shadow-2xl shadow-blue-500/20">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={TECHPULSE_CONFIG.videoUrl}
              title="Fiverr Gig SEO & 1st Page Ranking Formula"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-base font-bold text-white shadow-glow transition-all hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
          >
            <span>Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onSeeModules}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dfe5ed] bg-white px-8 py-4 text-base font-bold text-[#0c172f] shadow-sm transition-all hover:bg-[#ecf3f8] hover:border-[#2b62ef]/40 active:scale-95 w-full sm:w-auto"
          >
            View Deliverables & Scope
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-[#535f6f]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#2b62ef]" />
            <span>Money-back guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#2b62ef]" />
            <span>100% White-Hat Fiverr TOS Safe</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🇵🇰</span>
            <span>Built for Pakistan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
