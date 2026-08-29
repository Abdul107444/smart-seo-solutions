import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { PreviousWorkSection } from '../components/PreviousWorkSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { SocialProofSection } from '../components/SocialProofSection';
import { PricingSection } from '../components/PricingSection';
import { FeatureComparisonSection } from '../components/FeatureComparisonSection';
import { RefundPolicySection } from '../components/RefundPolicySection';
import { FaqSection } from '../components/FaqSection';
import { CtaBannerSection } from '../components/CtaBannerSection';

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

      {/* 6. Results / Social Proof Section */}
      <SocialProofSection />

      {/* 7. Pricing Section */}
      <PricingSection onNavigateToThankYou={onNavigateToThankYou} />

      {/* 8. Comparison Table Section */}
      <FeatureComparisonSection />

      {/* 9. 100% Refund Policy Section */}
      <RefundPolicySection onNavigateToThankYou={onNavigateToThankYou} />

      {/* 10. FAQ Section */}
      <FaqSection />

      {/* 10. CTA Banner Section */}
      <CtaBannerSection onNavigateToThankYou={onNavigateToThankYou} />
    </main>
  );
};
