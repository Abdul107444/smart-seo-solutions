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
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToThankYou }) => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection onNavigateToThankYou={onNavigateToThankYou} />

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
