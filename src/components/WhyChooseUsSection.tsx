import React from 'react';
import { WHY_CHOOSE_US_CARDS } from '../data/funnelData';
import { Sparkles } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-us-section" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <span>The Smart SEO Solutions Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why Fiverr Sellers Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Our Service</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal">
            A methodical, conversion-centered approach that builds authority rather than surface-level keyword stuffing.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_CHOOSE_US_CARDS.map((card, index) => (
            <div
              key={card.id}
              className="bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-white/10 rounded-3xl p-6 sm:p-8 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-2xl sm:text-3xl p-3 rounded-2xl bg-white/10 border border-white/20 inline-block shadow-inner group-hover:scale-110 transition-transform">
                  {card.icon}
                </span>
                <span className="text-[10px] font-mono font-bold text-white/40 tracking-wider">
                  PILLAR 0{index + 1}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-orange-400 transition-colors">
                {card.title}
              </h3>

              <p className="text-sm sm:text-base font-semibold text-orange-300 mb-2 leading-relaxed">
                “{card.description}”
              </p>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {card.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
