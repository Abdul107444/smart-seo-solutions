import React from 'react';
import { SERVICES_CHECKLIST, BUSINESS_INFO } from '../data/funnelData';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onNavigateToThankYou: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigateToThankYou }) => {
  return (
    <section id="services-section" className="py-16 md:py-24 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-700/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <span>Comprehensive Optimization Scope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            What We’ll Optimize <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">For You</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed">
            We don’t just change keywords. We optimize your complete Fiverr presence to make your profile more professional, searchable, clickable, and conversion-focused.
          </p>
        </div>

        {/* 2-Column Grid of 12 Services with Green Checkmarks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {SERVICES_CHECKLIST.map((service, index) => (
            <div
              key={service.title}
              className="bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex items-start gap-4 group"
            >
              {/* Green checkmark badge */}
              <div className="p-2 rounded-xl bg-green-500/10 border border-green-400/30 text-green-400 flex-shrink-0 mt-0.5">
                <span className="text-green-400 font-bold text-base leading-none">✓</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>
                  <span className="text-[11px] font-mono text-white/40 font-semibold">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Section Bottom Action */}
        <div className="text-center pt-2">
          <button
            onClick={onNavigateToThankYou}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-sm sm:text-base font-extrabold uppercase tracking-wide shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Get All 12 Features Optimized — {BUSINESS_INFO.price}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
