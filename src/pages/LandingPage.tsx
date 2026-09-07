import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { PreviousWorkSection } from '../components/PreviousWorkSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { PricingSection } from '../components/PricingSection';
import { RefundPolicySection } from '../components/RefundPolicySection';
import { FaqSection } from '../components/FaqSection';

interface LandingPageProps {
  onNavigateToThankYou: () => void;
  onNavigateToGigMethod?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToThankYou, onNavigateToGigMethod }) => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection onNavigateToThankYou={onNavigateToThankYou} />

      {/* Special Announcement Banner for 24h Gig Ranking Method */}
      {onNavigateToGigMethod && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-10 relative z-20">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-600/25 to-purple-900/40 border border-amber-500/40 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <span className="text-2xl animate-bounce">⚡</span>
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs font-black uppercase text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                    New Blueprint Released
                  </span>
                  <span className="text-xs text-white/70">
                    Gig rank on 1st page of fiverr within 24 hours Guranteded 100%
                  </span>
                </div>
                <p className="text-xs text-white/90 font-medium mt-0.5">
                  Method provided in confidential PDF format — read the points, follow the formula, and rank. Instant download upon verified checkout.
                </p>
              </div>
            </div>

            <button
              onClick={onNavigateToGigMethod}
              className="px-5 py-2.5 rounded-xl btn-gold-gradient text-black font-black text-xs uppercase tracking-wide flex-shrink-0 flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <span>Get Blueprint (599 PKR)</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Services Section */}
      <ServicesSection onNavigateToThankYou={onNavigateToThankYou} />

      {/* 3. Previous Work Section */}
      <PreviousWorkSection onNavigateToThankYou={onNavigateToThankYou} />

      {/* 4. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 5. Pricing Section */}
      <PricingSection onNavigateToThankYou={onNavigateToThankYou} />

      {/* 6. 100% Refund Policy Section */}
      <RefundPolicySection onNavigateToThankYou={onNavigateToThankYou} />

      {/* 7. FAQ Section */}
      <FaqSection />
    </main>
  );
};
