import React from 'react';
import { COMPANY_PARTNERS } from '../data/funnelData';

export const LogoWallSection: React.FC = () => {
  return (
    <section id="logos-section" className="py-14 border-y border-white/10 bg-black/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Trusted By Freelancers & Businesses
          </h2>
          <p className="text-xs sm:text-sm text-white/60">
            Helping clients improve their Fiverr presence and build stronger freelance businesses.
          </p>
        </div>

        {/* Logo Grid with Grayscale to Color Hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center">
          {COMPANY_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-default shadow-sm"
            >
              {/* Company Logo Badge */}
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform filter grayscale group-hover:grayscale-0">
                <span
                  className="font-extrabold text-sm sm:text-base tracking-wider"
                  style={{ color: partner.color }}
                >
                  {partner.name.split(' ').map(w => w[0]).join('')}
                </span>
              </div>

              {/* Name and Subtext */}
              <h3 className="text-xs sm:text-sm font-bold text-white/90 group-hover:text-white transition-colors">
                {partner.name}
              </h3>
              <span className="text-[10px] text-white/50 font-medium mt-0.5">
                {partner.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
