import React from 'react';
import { BUSINESS_INFO } from '../data/funnelData';
import { ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TrustedPartnersShowcase } from './TrustedPartnersShowcase';

interface HeroSectionProps {
  onNavigateToThankYou: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToThankYou }) => {
  return (
    <section id="hero-section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold backdrop-blur-md shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Professional Agency Service</span>
            <span className="text-white/30">•</span>
            <span className="text-white/90">Fiverr Optimization</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Get More Visibility & Clients on Fiverr
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 font-black">
              Through Professional Optimization
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-base sm:text-lg md:text-xl text-white/70 font-normal leading-relaxed">
            We optimize your Fiverr profile and gigs to improve search visibility, attract the right buyers, increase clicks, and turn your presence into a sales machine.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
          {/* Primary CTA */}
          <button
            id="hero-primary-cta"
            onClick={onNavigateToThankYou}
            className="w-full sm:w-auto px-8 py-4 rounded-xl btn-gold-gradient text-sm sm:text-base font-extrabold uppercase tracking-wide flex items-center justify-center gap-3 shadow-xl glow-gold cursor-pointer"
          >
            <span>🚀 Get My Fiverr Optimized — Rs. 10,000</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA */}
          <button
            id="hero-secondary-whatsapp-cta"
            onClick={onNavigateToThankYou}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-sm font-bold flex items-center justify-center gap-2.5 backdrop-blur-md transition-all shadow-md cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Key value micro-bullets */}
        <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-white/80 font-medium mb-10">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Profile SEO Optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Keyword Research</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>High-Converting Titles</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Thumbnail Strategy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Competitor Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Buyer-Focused Positioning</span>
          </div>
        </div>

        {/* Top-Rated Trust Card */}
        <div className="max-w-2xl mx-auto mb-12 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left backdrop-blur-md">
          <div className="flex -space-x-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow">
              HA
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-rose-600 flex items-center justify-center text-xs font-bold text-white shadow">
              GG
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-sky-500 flex items-center justify-center text-xs font-bold text-white shadow">
              KT
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-purple-600 flex items-center justify-center text-xs font-bold text-white shadow">
              CR
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-emerald-500 flex items-center justify-center text-xs font-bold text-black shadow">
              WB
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <span>Trusted By High-Growth Agencies & Software Clans</span>
              <span className="text-amber-400 text-xs">★★★★★</span>
            </div>
            <div className="text-white/50 text-xs italic mt-0.5">
              "Structured our profile and gig titles to rank for high-ticket buyer-intent keywords."
            </div>
          </div>
        </div>

        {/* TOP HERO VISUAL: ANIMATED BRAND PARTNERS SHOWCASE */}
        <div className="relative max-w-5xl mx-auto">
          <TrustedPartnersShowcase />
        </div>
      </div>
    </section>
  );
};

