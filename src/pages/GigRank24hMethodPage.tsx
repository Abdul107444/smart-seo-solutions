import React, { useState } from 'react';
import { TechPulseNavbar } from '../components/TechPulseNavbar';
import { GigRank24hHero } from '../components/GigRank24hHero';
import { GigRank24hProcess } from '../components/GigRank24hProcess';
import { GigRank24hPillars } from '../components/GigRank24hPillars';
import { TrustIndicatorsSection } from '../components/TrustIndicatorsSection';
import { ReviewsWallSection } from '../components/ReviewsWallSection';
import { LaunchOfferBox } from '../components/LaunchOfferBox';
import { GigRank24hFaq } from '../components/GigRank24hFaq';
import { TechPulseFooter } from '../components/TechPulseFooter';
import { SocialProofToast } from '../components/SocialProofToast';
import { TechPulseWhatsAppFloat } from '../components/TechPulseWhatsAppFloat';
import { ScreenshotLightbox } from '../components/ScreenshotLightbox';
import type { AppRoute } from '../App';

interface GigRank24hMethodPageProps {
  onNavigate: (page: AppRoute) => void;
}

export function GigRank24hMethodPage({ onNavigate }: GigRank24hMethodPageProps) {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
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
      <TechPulseNavbar onNavigate={onNavigate} currentPage="method" />

      {/* Main High-Impact Sections */}
      <main>
        {/* 1. Main 24-Hour Method Hero with exact headline:
               "Gig rank within 24 hours to get 1st order very soon method"
               featuring AQACCA (@aqacca) Level 2 Seller proof image */}
        <GigRank24hHero
          onEnroll={handleEnroll}
          onSeeMethod={() => scrollToSection('method-process')}
          onSeeReviews={() => scrollToSection('reviews')}
          onOpenImage={handleOpenImage}
        />

        {/* 2. 4-Phase Step-by-Step 24-Hour Chronological Process & Before-vs-After Comparison */}
        <GigRank24hProcess onEnroll={handleEnroll} />

        {/* 3. The 6 Structural Pillars of the 24h Ranking Architecture */}
        <GigRank24hPillars onEnroll={handleEnroll} />

        {/* 4. Trust Indicators: 20-25 Days Money Back Guarantee, Safe AnyDesk, 24/7 Support */}
        <TrustIndicatorsSection onEnroll={handleEnroll} />

        {/* 5. Verified Client Reviews & Proof Screenshots */}
        <ReviewsWallSection onEnroll={handleEnroll} onOpenImage={handleOpenImage} />

        {/* 6. Pricing Box (Rs. 8,000) with Urgency Slots Counter, Bank Details & Guarantee */}
        <LaunchOfferBox onEnroll={handleEnroll} />

        {/* 7. Dedicated 24-Hour Method FAQs */}
        <GigRank24hFaq />
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
