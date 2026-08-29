import React from 'react';
import { BUSINESS_INFO } from '../data/funnelData';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CtaBannerSectionProps {
  onNavigateToThankYou: () => void;
}

export const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({ onNavigateToThankYou }) => {
  return (
    <section id="cta-banner-section" className="py-16 md:py-20 relative overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-yellow-500/10 to-orange-500/5 blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="max-w-3xl mx-auto mb-4">
            <div className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
              <span>Smart SEO Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Turn Your Fiverr Profile Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Stronger Sales Asset?</span>
            </h2>
          </div>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Get your Fiverr profile and gigs professionally optimized for better positioning, visibility, and buyer conversion.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-6">
            <button
              id="cta-banner-primary-btn"
              onClick={onNavigateToThankYou}
              className="w-full sm:w-auto px-10 py-4.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-sm sm:text-base font-extrabold uppercase tracking-wide flex items-center justify-center gap-3 shadow-xl hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>🎯 Get My Fiverr Optimized — {BUSINESS_INFO.price}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust line */}
          <p className="text-xs sm:text-sm text-green-400 font-medium flex items-center justify-center gap-1.5">
            <span>✓ No spam. Your information is kept private.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
