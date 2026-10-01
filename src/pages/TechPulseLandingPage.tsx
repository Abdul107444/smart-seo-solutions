import React, { useState } from 'react';
import { TechPulseNavbar } from '../components/TechPulseNavbar';
import { TechPulseHero } from '../components/TechPulseHero';
import { TrustIndicatorsSection } from '../components/TrustIndicatorsSection';
import { ReviewsWallSection } from '../components/ReviewsWallSection';
import { LaunchOfferBox } from '../components/LaunchOfferBox';
import { FaqSection } from '../components/FaqSection';
import { TechPulseFooter } from '../components/TechPulseFooter';
import { SocialProofToast } from '../components/SocialProofToast';
import { TechPulseWhatsAppFloat } from '../components/TechPulseWhatsAppFloat';
import { ScreenshotLightbox } from '../components/ScreenshotLightbox';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'training' | 'enroll' | 'admin') => void;
}

export function TechPulseLandingPage({ onNavigate }: LandingPageProps) {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    src: string | null;
    alt: string;
  }>({
    isOpen: false,
    src: null,
    alt: ''
  });

  const handleOpenImage = (src: string, alt: string) => {
    setLightboxState({
      isOpen: true,
      src,
      alt
    });
  };

  const handleCloseImage = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const scrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnroll = () => {
    onNavigate('enroll');
  };

  return (
    <div className="min-h-screen bg-[#f7fbfd] text-[#0c172f] antialiased">
      {/* Sticky Header Navbar */}
      <TechPulseNavbar onNavigate={onNavigate} currentPage="landing" />

      {/* Main High-Impact Sections */}
      <main>
        {/* 1. Hero Section: Headline, Top Rated Seller Profile Showcase, Limited Time Slots counter */}
        <TechPulseHero
          onEnroll={handleEnroll}
          onSeeReviews={scrollToReviews}
          onOpenImage={handleOpenImage}
        />

        {/* 2. Trust Indicators: Secure Payment, 20-25 Days Money-Back Guarantee & 24/7 Support */}
        <TrustIndicatorsSection onEnroll={handleEnroll} />

        {/* 3. Real Fiverr Seller Reviews & Proof Screenshots */}
        <ReviewsWallSection onEnroll={handleEnroll} onOpenImage={handleOpenImage} />

        {/* 4. Pricing Box (Rs. 8,000) with Urgency Slots Counter, Bank Details & 20-25 Days Guarantee */}
        <LaunchOfferBox onEnroll={handleEnroll} />

        {/* 5. Concise Fiverr Seller Knowledge Base FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <TechPulseFooter onNavigate={onNavigate} />

      {/* Interactive Social Proof Live Toast */}
      <SocialProofToast />

      {/* Floating 24/7 WhatsApp Button */}
      <TechPulseWhatsAppFloat />

      {/* Lightbox image zoom viewer */}
      <ScreenshotLightbox
        isOpen={lightboxState.isOpen}
        src={lightboxState.src}
        alt={lightboxState.alt}
        onClose={handleCloseImage}
      />
    </div>
  );
}
