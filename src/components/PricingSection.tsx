import React from 'react';
import { BUSINESS_INFO } from '../data/funnelData';
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface PricingSectionProps {
  onNavigateToThankYou: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigateToThankYou }) => {
  const packageFeatures = [
    'Complete Fiverr Profile Optimization',
    'Fiverr Gig SEO',
    'Keyword Research',
    'SEO-Friendly Titles',
    'Search Tags Optimization',
    'Description Optimization',
    'Pricing & Package Strategy',
    'FAQ Optimization',
    'Thumbnail Recommendations',
    'Competitor Research',
    'Buyer-Focused Positioning',
    'Professional Optimization Strategy',
  ];

  return (
    <section id="pricing-section" className="py-16 md:py-24 relative">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <span>Transparent Agency Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Complete Fiverr <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Optimization Package</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal">
            Everything you need to turn your Fiverr profile into a high-converting digital storefront.
          </p>
        </div>

        {/* ONE Main Premium Pricing Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl glow-gold relative overflow-hidden">
          {/* Top Highlight Badge */}
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-1.5 rounded-bl-2xl text-[10px] sm:text-xs font-extrabold tracking-wider uppercase text-black shadow-md flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>ONE-TIME OPTIMIZATION</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8 pt-2">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
                Full-Service Solution
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Fiverr Optimization Package
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Delivered by Smart SEO Solutions optimization specialists.
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-white/50 font-semibold block">One-Time Investment</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 tracking-tight">
                  {BUSINESS_INFO.price}
                </span>
              </div>
              <span className="text-[11px] text-green-400 font-medium">No hidden fees • No recurring costs</span>
            </div>
          </div>

          {/* 12 Feature List (2-column on tablet/desktop) */}
          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              What's Included in Your Complete Makeover:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {packageFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <span className="text-green-400 font-bold text-sm">✓</span>
                  <span className="text-xs sm:text-sm font-semibold text-white/90">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA & Trust */}
          <div className="space-y-4">
            <button
              id="pricing-card-primary-cta"
              onClick={onNavigateToThankYou}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-sm sm:text-base font-extrabold uppercase tracking-wide flex items-center justify-center gap-3 shadow-xl hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>🎯 Get Started for {BUSINESS_INFO.price}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-white/50 font-medium text-center">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Secure process • Professional service • No fake guarantees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
